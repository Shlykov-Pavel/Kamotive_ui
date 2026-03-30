import React, { useCallback, useEffect, useRef, useState } from 'react'; 

import classNames from 'classnames';
import styles from './TextEditor.module.css';
import {
  IconClose,
  IconSubmit,
  IconRedoToString,
  IconUndoToString,
  IconBoldToString,
  IconItalicToString,
  IconAttachToString,
  IconHeader2ToString,
  IconUnderlineToString,
  IconBulletlistToString,
  IconStrikethroughToString,
} from '../../Icons';
import { Typography } from '../Typography/Typography';
import { IconButton } from '../IconButton/IconButton';
import { TAttachments, TextEditorProps } from '../../types';
import { AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';

import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor, Editor, useEditorState } from '@tiptap/react';


const ACCEPTED_FILE_TYPES =
  'image/*,audio/*,video/*,.doc,.docx,.html,.htm,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt,.zip,.djvu';
const MAX_FILE_SIZE = 2147483648; // 2 ГБ


export const formatFileSize = (bytes?: number, lng?:string): string => {
  if (!bytes || bytes === 0) {
    return lng === 'ru' || lng?.includes('ru') ? '0 Байт' : '0 Bytes';
  }

  const k = 1024;
  const sizesEn = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const sizesRu = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = lng === 'ru' || lng?.includes('ru') ? sizesRu : sizesEn;

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

//изменение формата File на TAttachments
const converFileToAttachment = (files: File[])=>{
  return files.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Генерируем ID
        filename: file.name,
        size: file.size,
        file: [file],  // Сохраняем сам файл внутри
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))
}

const convertAttacmentsToFile = (files: TAttachments[])=>{
  return files
      .map(att => att.file)
      .filter((f): f is File[] => !!f)
      .reduce((acc, val) => acc.concat(val), []);
}

const parseFileSize = (sizeStr: string): number => {
  const units: { [key: string]: number } = {
    'б': 1, 'байты': 1, 'bytes': 1,
    'кб': 1024, 'kb': 1024,
    'мб': 1024 * 1024, 'mb': 1024 * 1024,
    'гб': 1024 * 1024 * 1024, 'gb': 1024 * 1024 * 1024
  };
  
  const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([a-zа-я]+)$/);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  return value * (units[unit] || 0);
};

const Hotkeys = Extension.create({
  name: 'customHotkeys',
  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.chain().focus().toggleBold().run(),
      'Mod-i': () => this.editor.chain().focus().toggleItalic().run(),
      'Mod-u': () => this.editor.chain().focus().toggleUnderline().run(),
      'Mod-z': () => this.editor.chain().focus().undo().run(),
      'Mod-Shift-z': () => this.editor.chain().focus().redo().run(),
      'Mod-y': () => this.editor.chain().focus().redo().run(),
    };
  },
});


export const TextEditor: React.FC<TextEditorProps> = ({
  defaultValue,
  attachedFiles, 
  label,
  onSubmit,
  onCancel,
  onDelete,
  error,
  helperText,
  isEditMode,
  canAttachFiles = true,
  maxFileCount = 5,
  maxFileSize = '1Гб', 
  required,
  className,
  lng = 'en',
}) => {
  const uploaderRef = useRef<HTMLInputElement>(null);

  const [editorHtml, setEditorHtml] = useState(defaultValue || '');
  const [temporaryFiles, setTemporaryFiles] = useState<TAttachments[]>(attachedFiles ?? []);
  const tempFilesRef = useRef<TAttachments[]>(attachedFiles ?? []);

  useEffect(() => {
    tempFilesRef.current = temporaryFiles;
  }, [temporaryFiles]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      } as any),
      Underline,
      Hotkeys,
    ],
    content: defaultValue || '',
    editorProps: {
      attributes: {
        class: styles.pellContent,
        style: 'overflow: visible; height: auto; outline: none;',
      },
    },
    onUpdate: ({ editor }) => {
      const cleanHtml = editor.getHTML().replace(/\u200B/g, '');
      setEditorHtml(cleanHtml);
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      strikethrough: editor.isActive('strike'),
      heading2: editor.isActive('heading', { level: 2 }),
      olist: editor.isActive('orderedList'),
    }),
  })  as Record<string, boolean>;

  const applyAction = (action: (e: Editor) => void) => {
    if (!editor) return;
    action(editor);
    editor.commands.focus();
  };

  const commands = {
    bold: () => applyAction((e) => e.chain().toggleBold().run()),
    italic: () => applyAction((e) => e.chain().toggleItalic().run()),
    underline: () => applyAction((e) => e.chain().toggleUnderline().run()),
    strikethrough: () => applyAction((e) => e.chain().toggleStrike().run()),
    heading2: () => applyAction((e) => e.chain().toggleHeading({ level: 2 }).run()),
    olist: () => applyAction((e) => e.chain().toggleOrderedList().run()),
    undo: () => applyAction((e) => e.chain().undo().run()),
    redo: () => applyAction((e) => e.chain().redo().run()),
    image: () => uploaderRef.current?.click(),
  };

  const toolbarButtons = [
    {
      name: 'bold',
      icon: IconBoldToString('', '', '1.5'),
      action: commands.bold,
      active: 'bold',
      title: lng === 'ru' ? 'Жирный (Ctrl+B)' : 'Bold (Ctrl+B)',
    },
    {
      name: 'italic',
      icon: IconItalicToString('', '', '1.5'),
      action: commands.italic,
      active: 'italic',
      title: lng === 'ru' ? 'Курсив (Ctrl+I)' : 'Italic (Ctrl+I)',
    },
    {
      name: 'underline',
      icon: IconUnderlineToString('', '', '1.5'),
      action: commands.underline,
      active: 'underline',
      title: lng === 'ru' ? 'Подчеркнутый (Ctrl+U)' : 'Underline (Ctrl+U)',
    },
    {
      name: 'strikethrough',
      icon: IconStrikethroughToString('', '', '1.5'),
      action: commands.strikethrough,
      active: 'strikethrough',
      title: lng === 'ru' ? 'Зачеркнутый' : 'Strike-through',
    },
    {
      name: 'heading2',
      icon: IconHeader2ToString('', '', '1.5'),
      action: commands.heading2,
      active: 'heading2',
      title: lng === 'ru' ? 'Заголовок' : 'Heading 2',
    },
    {
      name: 'olist',
      icon: IconBulletlistToString(),
      action: commands.olist,
      active: 'olist',
      title: lng === 'ru' ? 'Список' : 'Bullet List',
    },
    {
      name: 'undo',
      icon: IconUndoToString('', '', '1.5'),
      action: commands.undo,
      title: lng === 'ru' ? 'Возврат последнего действия' : 'Return last action',
    },
    {
      name: 'redo',
      icon: IconRedoToString('', '', '1.5'),
      action: commands.redo,
      title: lng === 'ru' ? 'Отмена последнего действия' : 'Cancel last action',
    },
  ];

  const normalize = (html: string) => html.replace(/&nbsp;|\s+/g, ' ').replace(/>\s+</g, '><').trim();
  const normalizedEditor = normalize(editorHtml || '');
  const normalizedDefault = normalize(defaultValue || '');
  const isTextEmpty = normalizedEditor.replace(/<[^>]*>/g, '').trim().length === 0;
  const hasNoNewFiles = temporaryFiles.filter(f => f.file).length === 0 && 
                        temporaryFiles.length === (attachedFiles?.length ?? 0);
  const hasErrorsInFiles = temporaryFiles.some(f => !!f.error);    
  const hasNoTextChanges = normalizedEditor === normalizedDefault;
  const isSubmitDisabled = (hasNoTextChanges && hasNoNewFiles) || isTextEmpty || hasErrorsInFiles;
  const isCancelDisabled = !isEditMode && (hasNoTextChanges && hasNoNewFiles);

  // Функция обработки загрузки файлов
  const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);    
    
    const newAttachments: TAttachments[] = converFileToAttachment(filesArray);

    const uniqueFiles = newAttachments.filter((newFile) => {
      return !temporaryFiles.some(
        (existing) => existing.filename === newFile.filename && existing.size === newFile.size
      );
    });    
    
    if (uniqueFiles.length > 0) {
      setTemporaryFiles((prev) => {
        const updatedFiles = [...prev, ...uniqueFiles];
        return updatedFiles.map((file, index) => {
          const isSizeError = (file.size ?? 0) > parseFileSize(maxFileSize);
          const isCountError = index + 1 > maxFileCount;          
          let errorMessage = '';
          if (isSizeError) {
              errorMessage = lng === 'ru' ? `Файл превышает ${maxFileSize}` : `File exceed ${maxFileSize}`;
          } 
          return {
              ...file,
              error: errorMessage || (isCountError ? true : ''),
          };
      });
          
      
      });
    }
    event.target.value = '';
};


const removeAttachedFile = (id: string) => {
  setTemporaryFiles((prev) => {
    const filteredFiles = prev.filter((file) => {
      if (file.id === id) {
        if (file.preview) URL.revokeObjectURL(file.preview);
        return false;
      }
      return true;
    });
    return filteredFiles.map((file, index) => {
      const isSizeError = (file.size ?? 0) > parseFileSize(maxFileSize);
      const isCountError = (index + 1) > maxFileCount;

      let errorMessage = '';
      if (isSizeError) {
        errorMessage = lng === 'ru' ? `Файл превышает ${maxFileSize}` : `File exceed ${maxFileSize}`;
      }

      return {
        ...file,
        error: errorMessage || (isCountError ? true : ''),
      };
    });
  });

  if (attachedFiles?.some((file) => file.id === id)) {
    onDelete?.(id);
  }
};


  const handleSubmit = useCallback(() => {
    if (!editor) return;
    const filesToSend = convertAttacmentsToFile(
      tempFilesRef.current.filter(file => !Boolean(file.error) && file.file)
    );

    onSubmit?.(editor.getHTML(), filesToSend);
    editor.commands.clearContent();
    setTemporaryFiles([]);
  }, [editor, onSubmit]);

  const handleCancel = useCallback(() => {
    if (!editor) return;

    editor.commands.setContent(defaultValue || '');
    setTemporaryFiles(attachedFiles ?? []);
    onCancel?.();
  }, [editor, defaultValue, attachedFiles, onCancel]);

  const wrapperClassess = classNames(styles['wrapper--input'], {
    [styles['wrapper--input-label']]: label && !required,
    [styles['wrapper--input-helperText']]: error,
  });

  const inputClassess = classNames(styles.input, className, {
    [styles['input--error']]: error,
  });

  const labelClasses = classNames(styles.label, {
    [styles['label--required']]: required,
  });

  return (
    <div className={wrapperClassess}>
      {label && (
        <Typography variant="Caption" className={labelClasses}>
          {label}
        </Typography>
      )}

      <div className={inputClassess} title=''>
        {temporaryFiles.length > 0 && (
          <AttachedFilesPreview
            files={temporaryFiles}
            allowDelete={true}
            onDelete={removeAttachedFile}
            className={styles.attachedFilesContainer}
            lng={lng}
            maxFileCount={maxFileCount}
          />
        )}
        <div className={styles.editorContainer}>
          <div className={styles.pellActionbar}>
            <div className={styles.buttonsContainer}>
              {toolbarButtons.map((btn) => {
                const isActive = btn.active ? editorState[btn.active] : false;

                 return (
                  <button
                    key={btn.name}
                    type="button"
                    className={`${styles.pellButton} ${
                      btn.active && isActive ? styles.pellButtonSelected : ''
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      btn.action();
                    }}
                    dangerouslySetInnerHTML={{ __html: btn.icon }}
                    title={btn.title}
                  />
                )
              })}
              {canAttachFiles && (
                <button
                  type="button"
                  className={styles.pellButton}
                  onMouseDown={(e) => { e.preventDefault(); commands.image(); }}
                  dangerouslySetInnerHTML={{ __html: IconAttachToString('', '', '1.5') }}
                  title={lng === 'ru' ? 'Прикрепить файл' : 'Upload file'}
                />
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconButton 
                disabled={isCancelDisabled}
                title={lng === 'ru' ? 'Отменить' : 'Cancel'}
                icon={<IconClose />} 
                onClick={handleCancel}
                style={{ 
                  width: '25px', 
                  height: '25px', 
                  padding:'5px', 
                  backgroundColor: 'white',
                  opacity: isCancelDisabled ? 0.5 : 1,
                  cursor: isCancelDisabled ? 'default' : 'pointer',
                }} 
                color="var(--blue-main)"
              />
              <IconButton 
                title={lng === 'ru' ? 'Отправить' : 'Submit'}
                icon={<IconSubmit width={'10'} height={'10'} htmlColor='blue' strokeWidth={'1'} />} 
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                style={{ 
                  width: '25px', 
                  height: '25px', 
                  padding:'5px', 
                  backgroundColor: 'var(--blue-main)',
                  opacity: isSubmitDisabled ? 0.5 : 1,
                  cursor: isSubmitDisabled ? 'default' : 'pointer'
                }}
                color="white"
              />
            </div>
          </div>

          <div className={styles.pellContent} onClick={() => editor?.chain().focus().run()}>
            {editor && <EditorContent editor={editor} />}
          </div>

        </div>

        {canAttachFiles && (
          <input
            ref={uploaderRef}
            type="file"
            style={{ display: 'none' }}
            multiple
            onChange={handleUploadFiles}
            accept={ACCEPTED_FILE_TYPES}
          />
        )}
      </div>
      {error && helperText && (
        <Typography variant="Caption" className={styles.helperText}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
