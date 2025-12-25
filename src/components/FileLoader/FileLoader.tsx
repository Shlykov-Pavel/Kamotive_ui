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
  fileValidator
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

  const fileValidatorInner = (file: File): FileError | FileError[] | null => {
    if (file.size > maxFileSize * 1024 * 1024 * 1024) {
      return {
        code: 'size-too-large',
        message:
          lng === 'ru' || lng.includes('ru')
            ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
            : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
      };
    }
    // Проверка на дубликаты в filesList
    // if (filesList.find((existingFile: TAttachments) => existingFile.filename === file.name)) {
    //   return {
    //     code: 'repeating-file-name',
    //     message: lng === 'ru' || lng.includes('ru') ? `Файл уже существует в списке прикрепленных файлов` : `File already exists in the list of attached files`,
    //   };
    // }
    // Проверка на дубликаты в addedFiles
    // if (addedFiles.find((addedFile: File) => addedFile.name === file.name)) {
    //   return {
    //     code: 'repeating-file-name',
    //     message: lng === 'ru' || lng.includes('ru') ? `Файл уже добавлен` : `File already added`,
    //   };
    // }
    if (addedFiles.length > maxFileCount - 1) {
      return {
        code: 'files-count-too-large',
        message:
          lng === 'ru' || lng.includes('ru') ? `Максимальное количество файлов ${maxFileCount}` : `Maximum number of files ${maxFileCount}`,
      };
    }

    if(maxFileName && file.name.length > maxFileName){      
      return {
        code: 'name-too-large',
        message: lng === 'ru' || lng.includes('ru') ? `Имя файла не может превышать ${maxFileName} символов` : `File name must be under ${maxFileName} symbols`,
      }
    }

    if (acceptedFormats && !rejectedFormats) {
      const acceptedExtensions = Object.values(acceptedFormats)
        .reduce((acc, val) => acc.concat(val), []);
      
      const fileParts = file.name.split('.');
      const fileExtension = fileParts.length > 1 
        ? `.${fileParts.pop()!.toLowerCase()}` 
        : '';

      if (!acceptedExtensions.includes(fileExtension)) {
        return {
          code: 'file-invalid-type',
          message: lng === 'ru' || lng.includes('ru')
            ? `Файл должен быть одного из следующих типов: ${acceptedExtensions.join(', ')}`
            : `File must be one of: ${acceptedExtensions.join(', ')}`,
        };
      }
    }

    if (rejectedFormats) {
      const rejectedExtensions = Object.values(rejectedFormats)
        .reduce((acc, val) => acc.concat(val), []);
      
      const fileParts = file.name.split('.');
      const fileExtension = fileParts.length > 1 
        ? `.${fileParts.pop()!.toLowerCase()}` 
        : '';

      if (rejectedExtensions.includes(fileExtension)) {
        return {
          code: 'file-invalid-type',
          message: lng === 'ru' || lng.includes('ru')
            ? `Файл не должен быть одного из следующих типов: ${getAcceptedFormatsString(rejectedFormats)}`
            : `File must not be one of: ${getAcceptedFormatsString(rejectedFormats)}`,
        };
      }
    }

    if (fileValidator) {
      const customValidationResult = fileValidator(file);
       if (customValidationResult) {
          return customValidationResult;
        }
    }
    return null;
  };  
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setAddedFiles([...addedFiles, ...acceptedFiles]);  
      const newFormatAttachments: TAttachments[] = acceptedFiles.map((file) => {
        return {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          filename: file.name,
          size: file.size,
          type: file.type,
        };
      });
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

    validator: fileValidatorInner,
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

  const acceptedFileItems = addedFilesFormated.map((file: TAttachments) => {
    return (
      <FileItem
        key={file.id}
        file={file}
        //loading={loadingFilesNames.includes(file.filename)} // Показываем лоадер только для новых файлов
        onDelete={handleDeleteFiles}
        isAddedFile={true}
        lng={lng}
      />
    );
  });
  const handleDeleteRejectedFile = (id: string) => {
    setErrorFiles(errorFiles.filter((rejection) => rejection.file.id !== id));
  };

  const fileRejectionItems = errorFiles.map(({ file, errors }) => (
    <FileItem
      key={file.id}
      file={file}
      error={errors[0].message}
      onDelete={handleDeleteRejectedFile}
      isRejectedFile={true}
      lng={lng}
    />
  ));

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
    <section className={classNames(styles['fileLoader'], className)} style={style}>
      <div {...getRootProps({ className: `${styles['dropzone']} ${!canAdd ? styles['disabled'] : ''}` })}>
        <input {...getInputProps()} />
        <IconUpload htmlColor={!canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)'} width='34' height='34' />
        <Typography
          variant="Body1"
          color={!canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)'}
          style={{ textAlign: 'center' }}
        >
          {lng === 'ru' || lng.includes('ru') ? (
            <>
              <span style={{ textDecoration: 'underline' }}>Нажмите на область</span> <span> или перетащите файлы</span>
            </>
          ) : (
            <>
              <span style={{ textDecoration: 'underline' }}>Сlick on this area</span> <span>or drag files here</span>
            </>
          )}
        </Typography>
        <div>
          {maxFileSize &&
            (lng === 'ru' || lng.includes('ru') ? (
              <Typography variant="Body2" color="var(--grey-medium)">
                {`Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`} <br />
              </Typography>
            ) : (
              <Typography variant="Body2" color="var(--grey-medium)">
                {`Maximum file size ${maxFileSize.toFixed(0)} GB`} <br />
              </Typography>
            ))}
          {maxFileCount &&
            (lng === 'ru' || lng.includes('ru') ? (
              <Typography variant="Body2" color="var(--grey-medium)">
                {`За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`}
              </Typography>
            ) : (
              <Typography variant="Body2" color="var(--grey-medium)">
                {`You can upload ${maxFileCount} ${maxFileCount > 1 ? `files` : `file`}`}
              </Typography>
            ))}
        </div>
      </div>
      {acceptedFormats && !rejectedFormats && (
        <Typography variant="Body2" color="var(--grey-medium)">
          {`${lng === 'ru' || lng.includes('ru') ? 'Поддерживаемые форматы:' : 'Supported formats:'} ${getAcceptedFormatsString(acceptedFormats)}`}
        </Typography>
      )}
      {rejectedFormats && (
        <Typography variant="Body2" color="var(--grey-medium)">
          {`${lng === 'ru' || lng.includes('ru') ? 'Неподдерживаемые форматы:' : 'Unsupported formats:'} ${getAcceptedFormatsString(rejectedFormats)}`}
        </Typography>
      )}
      {addedFiles?.length > 0 || errorFiles?.length > 0 ? (
        <div className={styles['addedFiles']}>
          {acceptedFileItems}
          {fileRejectionItems}
        </div>
      ) : lng === 'ru' || lng.includes('ru') ? (
        <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
          Файлы не добавлены
        </Typography>
      ) : (
        <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
          Files not added
        </Typography>
      )}
    </section>
  );
});
