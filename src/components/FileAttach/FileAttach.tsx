import React, { FC, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';

import { FileAttachProps } from '../../types';
import styles from './FileAttach.module.css';
import { Typography } from '../Typography/Typography';
import { IconUpload } from '../../Icons';
import { FileItem } from '../FileItem/FileItem';
import classNames from 'classnames';

export const FileAttach: FC<FileAttachProps> = ({
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
  disabled = false,
  className,
  style,
}) => {
  const [errorFiles, setErrorFiles] = useState<FileRejection[]>([]);

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

      setErrorFiles([...errorFiles, ...fileRejections]);
    },

    validator: fileValidator,
    accept: acceptedFormats,
    maxFiles: maxFileCount,
    disabled: disabled,
  });

  const acceptedFileItems = addedFiles.map((file: File, index: number) => (
    <FileItem
      name={file.name}
      size={file.size}
      onDelete={() => deleteAcceptedFile(addedFiles, setAddedFiles, file.name)}
      onDownload={onDownload}
      key={index}
    />
  ));

  const fileRejectionItems = errorFiles.map(({ file, errors }) => (
    <FileItem
      name={file.name}
      size={file.size}
      error={errors[0].message}
      onDelete={() => deleteRejectedFile(errorFiles, setErrorFiles, file.name)}
      key={file.path}
    />
  ));

  const deleteAcceptedFile = (addedFiles: File[], setAddedFiles: (addedFiles: File[]) => void, fileName: string) => {
    setAddedFiles(addedFiles.filter((file) => file.name !== fileName));
  };

  const deleteRejectedFile = (
    errorFiles: FileRejection[],
    setErrorFiles: (errorFiles: FileRejection[]) => void,
    fileName: string
  ) => {
    setErrorFiles(errorFiles.filter(({ file }) => file.name !== fileName));
  };

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

  return (
    <section className={classNames(styles['fileAttach'], className)} style={style}>
      <div {...getRootProps({ className: `${styles['dropzone']} ${disabled ? styles['disabled'] : ''}` })}>
        <input {...getInputProps()} />
        <IconUpload htmlColor={disabled ? 'var(--grey-medium)' : 'var(--icons-grey)'} />
        <Typography variant="Body1" color={disabled ? 'var(--grey-medium)' : 'var(--icons-grey)'}>
          <span style={{ textDecoration: 'underline' }}>Нажмите на область</span>
          <span> или перетащите файлы</span>
        </Typography>
        <div>
          {maxFileSize && (
            <Typography variant="Caption" color="var(--grey-medium)">
              {`Максимальный размер файла ${maxFileSize.toFixed(0)} ГБ`} <br />
            </Typography>
          )}
          {maxFileCount && (
            <Typography variant="Caption" color="var(--grey-medium)">
              {`За раз можно загрузить ${maxFileCount} ${maxFileCount > 1 ? `файлов` : `файл`}`}
            </Typography>
          )}
        </div>
      </div>
      {acceptedFormats && (
        <Typography variant="Caption" color="var(--grey-medium)">
          {`Поддерживаемые форматы: ${getAcceptedFormatsString(acceptedFormats)}`}
        </Typography>
      )}
      {addedFiles?.length > 0 || errorFiles?.length > 0 ? (
        <div className={styles['addedFiles']}>
          {acceptedFileItems}
          {fileRejectionItems}
        </div>
      ) : (
        <Typography variant="Caption" color="var(--text-dark)">
          Файлы не добавлены
        </Typography>
      )}
    </section>
  );
};
