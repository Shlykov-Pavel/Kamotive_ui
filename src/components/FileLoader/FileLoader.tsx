import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Accept, FileError, FileRejection, useDropzone } from 'react-dropzone';

import { FileLoaderHandle, FileLoaderProps, TAttachments } from '../../types';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';

interface CustomFileRejection extends Omit<FileRejection, 'file'> {
  file: TAttachments;
}

const getFileNameWithoutExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  
  if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === filename.length - 1) {
    return filename;
  }
  return filename.substring(0, lastDotIndex);
};

const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return '';
  }
  return filename.substring(lastDotIndex).toLowerCase();
};

// Функция для получения всех доступных форматов в виде строки
const getAcceptedFormatsString = (acceptedFormats: Accept) => {
  const uniqueFormats = new Set<string>();
  for (const key in acceptedFormats) {
    if (acceptedFormats.hasOwnProperty(key)) {
      acceptedFormats[key].forEach((format) => {
        uniqueFormats.add(format.replace('.', ''));
      });
    }
  }
  return Array.from(uniqueFormats).join(', ');
};

const fileValidatorInner = (
  file: File, 
  maxFileSize: number, 
  maxFileCount: number, 
  maxFileName: number,
  addedFilesLength: number,
  lng: string,
  acceptedFormats?: Accept,
  rejectedFormats?: Accept,
  fileValidator?: (file: File) => FileError | FileError[] | null
): FileError | FileError[] | null => {
  
  const fileExtension = getFileExtension(file.name);
  const fileNameWithoutExt = getFileNameWithoutExtension(file.name);
  const nameLength = Array.from(fileNameWithoutExt).length;
  const fileParts = file.name.split('.');
  const fileExt = fileParts.length > 1 ? `.${fileParts.pop()!.toLowerCase()}` : '';
  
  const checks = {
    isSizeTooLarge: file.size > maxFileSize * 1024 * 1024 * 1024,
    isTooManyFiles: addedFilesLength > maxFileCount - 1,
    isNameTooLarge: typeof maxFileName === 'number' && maxFileName > 0 && nameLength > maxFileName,
    isAcceptedFormatValid: true,
    isRejectedFormatValid: true
  };
  
  // Проверка форматов
  if (acceptedFormats && !rejectedFormats) {
    const acceptedExtensions = Object.values(acceptedFormats).reduce((acc: string[], val) => acc.concat(val), []);
    checks.isAcceptedFormatValid = acceptedExtensions.includes(fileExtension);
  }
  
  if (rejectedFormats) {
    const rejectedExtensions = Object.values(rejectedFormats).reduce((acc, val) => acc.concat(val), []);
    checks.isRejectedFormatValid = !rejectedExtensions.includes(fileExt);
  }
  
  switch (true) {
    case checks.isSizeTooLarge:
      return {
        code: 'size-too-large',
        message: lng === 'ru' || lng.includes('ru')
          ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
          : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
      };
    
    case checks.isTooManyFiles:
      return {
        code: 'files-count-too-large',
        message: lng === 'ru' || lng.includes('ru') 
          ? `Максимальное количество файлов ${maxFileCount}` 
          : `Maximum number of files ${maxFileCount}`,
      };
    
    case checks.isNameTooLarge:
      return {
        code: 'name-too-large',
        message: lng === 'ru' || lng.includes('ru') 
          ? `Имя файла не может превышать ${maxFileName} символов.`
          : `File name must be under ${maxFileName} symbols.`,
      };
    
    case !checks.isAcceptedFormatValid:
      return {
        code: 'file-invalid-type',
        message: lng === 'ru' || lng.includes('ru')
          ? `Файл должен быть одного из следующих типов: ${Object.values(acceptedFormats!).reduce((acc: string[], val) => acc.concat(val), []).join(', ')}`
          : `File must be one of: ${Object.values(acceptedFormats!).reduce((acc: string[], val) => acc.concat(val), []).join(', ')}`,
      };
    
    case !checks.isRejectedFormatValid:
      return {
        code: 'file-invalid-type',
        message: lng === 'ru' || lng.includes('ru')
          ? `Файл не должен быть одного из следующих типов: ${getAcceptedFormatsString(rejectedFormats!)}`
          : `File must not be one of: ${getAcceptedFormatsString(rejectedFormats!)}`,
      };
    
    default: {
      if (fileValidator) {
        const customValidationResult = fileValidator(file);
        if (customValidationResult) return customValidationResult;
      }
      return null;
    }
  }
};

export const FileLoader = forwardRef<FileLoaderHandle, FileLoaderProps>(({
  maxFileSize = 2,
  maxFileCount = 10,
  maxFileName = 0,
  acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx', '.log', '.syslog', '.txt'],
  },
  rejectedFormats,
  addedFiles,
  setAddedFiles,
  canAdd = true,
  lng = 'ru',
  className,
  style,
  fileValidator,
  testId ='default'
}, ref) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [loadingFilesNames, setLoadingFilesNames] = useState<string[]>([]);
  const [errorFiles, setErrorFiles] = useState<CustomFileRejection[]>([]);

  const [addedFilesFormated, setAddedFilesFormatted] = useState<TAttachments[]>([]);

  useImperativeHandle(ref, () => ({
    clearErrorFiles: () => {
      setErrorFiles([]);
    },
    clearAllFiles: () => {
      setErrorFiles([]);
      setAddedFiles([]);
      setAddedFilesFormatted([]);
      setLoadingFilesNames([]);
    }
  }));

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setAddedFiles([...addedFiles, ...acceptedFiles]);

      const newFormatAttachments: TAttachments[] = acceptedFiles.map((file) => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        filename: file.name,
        size: file.size,
        type: file.type,
      }));

      setLoadingFilesNames(newFormatAttachments.map((file) => file?.filename ?? 'Без названия'));
      setIsLoadingFiles(true);
      setAddedFilesFormatted([...addedFilesFormated, ...newFormatAttachments]);

      let formattedRejections: CustomFileRejection[] = [];
      // Проверяем, есть ли ошибка превышения количества файлов
      const hasTooManyFilesError = fileRejections.some((rejection) =>
        rejection.errors.some((error) => error.code === 'too-many-files')
      );

      if (hasTooManyFilesError) {
        const remainingFiles = Math.max(0, maxFileCount - addedFiles.length);

        const filesToAdd = fileRejections.slice(0, remainingFiles).map((rejection) => rejection.file);
        setAddedFiles([...addedFiles, ...filesToAdd]);
        const newFormatFilesToAdd: TAttachments[] = filesToAdd.map((rejectionAdd) => ({
          id: Math.random().toString(36).substring(2, 9),
          filename: rejectionAdd.name,
          size: rejectionAdd.size,
          type: rejectionAdd.type,
        }));
        setAddedFilesFormatted([...addedFilesFormated, ...newFormatFilesToAdd]);
        const filesToReject = fileRejections.slice(remainingFiles);
        formattedRejections = filesToReject.map((rejection) => ({
          errors: [
            {
              code: 'files-count-too-large',
              message:
                lng === 'ru' || lng.includes('ru')
                  ? `Максимальное количество файлов ${maxFileCount}`
                  : `Maximum number of files ${maxFileCount}`,
            },
          ],
          file: {
            id: Math.random().toString(36).substring(2, 9),
            filename: rejection.file.name,
            size: rejection.file.size,
            path: rejection.file.path,
          },
        }));
        setErrorFiles([...errorFiles, ...formattedRejections]);
      } else {
        formattedRejections = fileRejections.map((rejection) => ({
          errors: rejection.errors,
          file: {
            id: Math.random().toString(36).substring(2, 9),
            filename: rejection.file.name,
            size: rejection.file.size,
            path: rejection.file.path,
          },
        }));
        setErrorFiles([...errorFiles, ...formattedRejections]);
      }
    },

    validator: (file) => fileValidatorInner(
      file, 
      maxFileSize, 
      maxFileCount, 
      maxFileName,
      addedFiles.length,
      lng,
      acceptedFormats,
      rejectedFormats,
      fileValidator
    ),
    accept: undefined,
    maxFiles: maxFileCount,
    disabled: !canAdd,
  });

  const handleDeleteFiles = (id: string) => {
    const fileIndex = addedFilesFormated.findIndex((file: TAttachments) => file.id === id);
    if (fileIndex !== -1) {
      const newAddedFiles = [...addedFiles];
      newAddedFiles.splice(fileIndex, 1);
      setAddedFiles(newAddedFiles);
      
      const fileToDelete = addedFilesFormated[fileIndex];
      setAddedFilesFormatted(addedFilesFormated.filter((file: TAttachments) => file.id !== id));
      setLoadingFilesNames(loadingFilesNames.filter((name) => name !== fileToDelete.filename));
    }
  };

  const handleDeleteRejectedFile = (id: string) => {
    setErrorFiles(errorFiles.filter((rejection) => rejection.file.id !== id));
  };

  const acceptedFileItems = addedFilesFormated.map((file: TAttachments, index) => (
    <FileItem
      key={file.id}
      file={file}
      onDelete={handleDeleteFiles}
      isAddedFile={true}
      lng={lng}
      testId={`${testId}-dropzone-accepted-${index}`}
    />
  ));
  
  const fileRejectionItems = errorFiles.map(({ file, errors }, index) => (
    <FileItem
      key={file.id}
      file={file}
      error={errors[0].message}
      onDelete={handleDeleteRejectedFile}
      isRejectedFile={true}
      lng={lng}
      testId={`${testId}-dropzone-rejected-${index}`}
    />
  ));

  useEffect(()=>{
    if (addedFiles.length === 0) {
      setAddedFilesFormatted([]);
    }
  }, [addedFiles]);

  useEffect(() => {
    if (loadingFilesNames.length === 0 && isLoadingFiles) {
      setIsLoadingFiles(false);
    }
  }, [loadingFilesNames, isLoadingFiles]);

  return (
    <section className={classNames(styles['fileLoader'], className)} style={style} data-test-id={`${testId}-loader-section`}>
      <div {...getRootProps({ className: `${styles['dropzone']} ${!canAdd ? styles['disabled'] : ''}` })} data-test-id={`${testId}-dropzone-block`}>
        <input {...getInputProps()} data-test-id={`${testId}-dropzone-input`} name='file' />
          <span data-test-id={`${testId}-dropzone-upload-icon`} style={{ display: 'inline-flex' }}>
            <IconUpload htmlColor={!canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)'} width='34' height='34' />
          </span>
        <Typography
          variant="Body1"
          color={!canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)'}
          style={{ textAlign: 'center' }}
          testId={`${testId}-dropzone`}
        >
          {lng === 'ru' || lng.includes('ru') ? (
            <>
              <span style={{ textDecoration: 'underline' }}>Нажмите на область</span> 
              <span> или перетащите файлы</span>
            </>
          ) : (
            <>
              <span style={{ textDecoration: 'underline' }}>Click on this area</span> 
              <span> or drag files here</span>
            </>
          )}
        </Typography>
        <div>
          {maxFileSize &&
            (lng === 'ru' || lng.includes('ru') ? (
              <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-sizelimits`}>
                {`Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`} <br />
              </Typography>
            ) : (
              <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-sizelimits`}>
                {`Maximum file size ${maxFileSize.toFixed(0)} GB`} <br />
              </Typography>
            ))}
          {maxFileCount &&
            (lng === 'ru' || lng.includes('ru') ? (
              <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-countlimits`}>
                {`За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`}
              </Typography>
            ) : (
              <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-countlimits`}>
                {`You can upload ${maxFileCount} ${maxFileCount > 1 ? `files` : `file`}`}
              </Typography>
            ))}
        </div>
      </div>
      {acceptedFormats && !rejectedFormats && (
        <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-acceptformats`}>
          {`${lng === 'ru' || lng.includes('ru') ? 'Поддерживаемые форматы:' : 'Supported formats:'} ${getAcceptedFormatsString(acceptedFormats)}`}
        </Typography>
      )}
      {rejectedFormats && (
        <Typography variant="Body2" color="var(--grey-medium)" testId={`${testId}-dropzone-rejectformats`}>
          {`${lng === 'ru' || lng.includes('ru') ? 'Неподдерживаемые форматы:' : 'Unsupported formats:'} ${getAcceptedFormatsString(rejectedFormats)}`}
        </Typography>
      )}
      {addedFiles?.length > 0 || errorFiles?.length > 0 ? (
        <div className={styles['addedFiles']} data-test-id={`${testId}-dropzone-added-list`}>
          {acceptedFileItems}
          {fileRejectionItems}
        </div>
      ) : (
        <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }} testId={`${testId}-dropzone-empty`}>
          {lng === 'ru' || lng.includes('ru') ? 'Файлы не добавлены' : 'Files not added'}
        </Typography>
      )}
    </section>
  );
});
