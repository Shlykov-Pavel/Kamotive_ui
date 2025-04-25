import React, { FC, useEffect, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { FileLoaderProps, TAttachemnts } from '../../types';
import styles from './FileLoader.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';

interface CustomFileRejection extends Omit<FileRejection, 'file'> {
  file: TAttachemnts;
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
  onDownload,
  canAdd = true,
  className,
  style,
}) => {
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [errorFiles, setErrorFiles] = useState<CustomFileRejection[]>([]);

  const [addedFilesFormated, setAddedFilesFormatted] = useState<TAttachemnts[]>([]);

  const fileValidator = (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024 * 1024) {
      return {
        code: 'name-too-large',
        message: `Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`,
      };
    }
    if (addedFiles.find((addedFile: File) => addedFile.name === file.name)) {
      return {
        code: 'repeating-file-name',
        message: `Файл уже добавлен`,
      };
    }
    if (addedFiles.length > maxFileCount - 1) {
      return {
        code: 'files-count-too-large',
        message: `Максимальное количество файлов ${maxFileCount}`,
      };
    }
    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setAddedFiles([...addedFiles, ...acceptedFiles]);

      //преобразование типа файлов для отрисовки в списке
      const newFormatAttachments: TAttachemnts[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        filename: file.name,
        size: file.size,
        type: file.type,
      }));
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
        const newFormatFilesToAdd: TAttachemnts[] = filesToAdd.map((rejectionAdd) => ({
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
              message: `Максимальное количество файлов ${maxFileCount}`,
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
    const filename = addedFilesFormated.find((file: TAttachemnts) => file.id === id)?.filename;
    setAddedFiles(addedFiles.filter((file: File) => file.name !== filename));
    setAddedFilesFormatted(addedFilesFormated.filter((file: TAttachemnts) => file.filename !== filename));
  };

  const acceptedFileItems = addedFilesFormated.map((file: TAttachemnts) => (
    <FileItem
      key={file.id}
      file={file}
      loading={isLoadingFiles}
      onDelete={handleDeleteFiles}
      onDownload={onDownload}
      isAddedFile={true}
    />
  ));

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

  //Для истории
  useEffect(() => {
    if (addedFiles.length > 0) {
      setAddedFilesFormatted(
        addedFiles.map((file: File) => ({
          id: Math.random().toString(36).substring(2, 9),
          filename: file.name,
          size: file.size,
          type: file.type,
        }))
      );
    }
  }, [addedFiles]);

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
          <span style={{ textDecoration: 'underline' }}>Нажмите на область</span>
          <span> или перетащите файлы</span>
        </Typography>
        <div>
          {maxFileSize && (
            <Typography variant="Body2" color="var(--grey-medium)">
              {`Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`} <br />
            </Typography>
          )}
          {maxFileCount && (
            <Typography variant="Body2" color="var(--grey-medium)">
              {`За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`}
            </Typography>
          )}
        </div>
      </div>
      {acceptedFormats && (
        <Typography variant="Body2" color="var(--grey-medium)">
          {`Поддерживаемые форматы: ${getAcceptedFormatsString(acceptedFormats)}`}
        </Typography>
      )}
      {addedFiles?.length > 0 || errorFiles?.length > 0 ? (
        <div className={styles['addedFiles']}>
          {acceptedFileItems}
          {fileRejectionItems}
        </div>
      ) : (
        <Typography variant="Body2-SemiBold" color="var(--grey-medium)" style={{ marginTop: '5px' }}>
          Файлы не добавлены
        </Typography>
      )}
    </section>
  );
};
