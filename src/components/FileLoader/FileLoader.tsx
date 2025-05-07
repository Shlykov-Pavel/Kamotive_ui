import React, { FC, useEffect, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { FileLoaderProps, TAttachments } from '../../types';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';

interface CustomFileRejection extends Omit<FileRejection, 'file'> {
  file: TAttachments;
}
export const FileLoader: FC<FileLoaderProps> = ({
  maxFileSize = 2,
  maxFileCount = 10,
  acceptedFormats = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc', '.docx'],
  },
  addedFiles,
  setAddedFiles,
  canAdd = true,
  lng = 'ru',
  className,
  style,
}) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [loadingFilesNames, setLoadingFilesNames] = useState<string[]>([]);
  const [errorFiles, setErrorFiles] = useState<CustomFileRejection[]>([]);

  const [addedFilesFormated, setAddedFilesFormatted] = useState<TAttachments[]>([]);

  const fileValidator = (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024 * 1024) {
      return {
        code: 'name-too-large',
        message:
          lng === 'ru' || lng.includes('ru')
            ? `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`
            : `Maximum file size ${maxFileSize.toFixed(0)} GB`,
      };
    }
    if (addedFiles.find((addedFile: File) => addedFile.name === file.name)) {
      return {
        code: 'repeating-file-name',
        message: lng === 'ru' || lng.includes('ru') ? `Файл уже добавлен` : `File already added`,
      };
    }
    if (addedFiles.length > maxFileCount - 1) {
      return {
        code: 'files-count-too-large',
        message:
          lng === 'ru' || lng.includes('ru') ? `Максимальное количество файлов ${maxFileCount}` : `Maximum number of files ${maxFileCount}`,
      };
    }
    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setAddedFiles([...addedFiles, ...acceptedFiles]);
      //преобразование типа файлов для отрисовки в списке
      const newFormatAttachments: TAttachments[] = acceptedFiles.map((file) => {
        return {
          id: `file-${file.name}`,
          filename: file.name,
          size: file.size,
          type: file.type,
        };
      });
      setLoadingFilesNames(newFormatAttachments.map((file) => file.filename));

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

    validator: fileValidator,
    accept: acceptedFormats,
    maxFiles: maxFileCount,
    disabled: !canAdd,
  });

  const handleDeleteFiles = (id: string) => {
    const filename = addedFilesFormated.find((file: TAttachments) => file.id === id)?.filename;
    setAddedFiles(addedFiles.filter((file: File) => file.name !== filename));
    setAddedFilesFormatted(addedFilesFormated.filter((file: TAttachments) => file.filename !== filename));
    setLoadingFilesNames(loadingFilesNames.filter((id) => id !== id));
  };

  const acceptedFileItems = addedFilesFormated.map((file: TAttachments) => {
    return (
      <FileItem
        key={file.id}
        file={file}
        loading={loadingFilesNames.includes(file.filename)} // Показываем лоадер только для новых файлов
        onDelete={handleDeleteFiles}
        isAddedFile={true}
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
    />
  ));

  // Функция для получения всех доступных форматов в виде строки
  const getAcceptedFormatsString = (acceptedFormats: Accept) => {
    const formats = [];
    for (const key in acceptedFormats) {
      if (acceptedFormats.hasOwnProperty(key)) {
        formats.push(...acceptedFormats[key].map((format) => format.replace('.', '')));
      }
    }
    return formats.join(', ');
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
        <IconUpload htmlColor={!canAdd ? 'var(--grey-medium)' : 'var(--icons-grey)'} />
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
            (lng === 'ru'|| lng.includes('ru') ? (
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
      {acceptedFormats &&
        (lng === 'ru' || lng.includes('ru') ? (
          <Typography variant="Body2" color="var(--grey-medium)">
            {`Поддерживаемые форматы: ${getAcceptedFormatsString(acceptedFormats)}`}
          </Typography>
        ) : (
          <Typography variant="Body2" color="var(--grey-medium)">
            {`Supported formats: ${getAcceptedFormatsString(acceptedFormats)}`}
          </Typography>
        ))}
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
};
