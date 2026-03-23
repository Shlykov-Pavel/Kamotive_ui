import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';  

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
import { EditorContent, useEditor, Editor } from '@tiptap/react';


const ACCEPTED_FILE_TYPES =
  'image/*,audio/*,video/*,.doc,.docx,.html,.htm,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt,.zip,.djvu';
const MAX_FILE_SIZE = 2147483648; // 2 ГБ

const getSafeSelection = () => {
  try {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    return selection;
  } catch (error) {
    return null;
  }
};

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
  const editorRef = useRef<HTMLDivElement>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLElement }>({});

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

  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    heading2: false,
    olist: false,
  });

  const updateActiveStates = useCallback(() => {
    if (!editor) return;

    const newStates = {
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      strikethrough: editor.isActive('strike'),
      heading2: editor.isActive('heading', { level: 2 }),
      olist: editor.isActive('orderedList'),
    };

    setActiveStates(newStates);

    Object.entries(newStates).forEach(([key, val]) => {
      const btn = buttonRefs.current[key];
      if (btn) btn.classList.toggle(styles.pellButtonSelected, val);
    });
  }, [editor]);

  const applyAction = (action: (e: Editor) => void) => {
    if (!editor) return;
    action(editor);
    editor.commands.focus();
    updateActiveStates();
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

  useEffect(() => {
    if (!editorRef.current || !editor) return;

    editorRef.current.innerHTML = '';

    const actionbar = document.createElement('div');
    actionbar.className = styles.pellActionbar;

    const content = document.createElement('div');
    content.className = styles.pellContent;

    editorRef.current.appendChild(actionbar);
    editorRef.current.appendChild(content);

    const root = createRoot(content);
    root.render(<EditorContent editor={editor} />);

    const createBtn = (name: string, icon: string) => {
      const btn = document.createElement('button');
      btn.className = styles.pellButton;
      btn.innerHTML = icon;
      buttonRefs.current[name] = btn;

      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        commands[name as keyof typeof commands]?.();
      });

      actionbar.appendChild(btn);
    };

    createBtn('bold', IconBoldToString('', '', '1.5'));
    createBtn('italic', IconItalicToString('', '', '1.5'));
    createBtn('underline', IconUnderlineToString('', '', '1.5'));
    createBtn('strikethrough', IconStrikethroughToString('', '', '1.5'));
    createBtn('heading2', IconHeader2ToString('', '', '1.5'));
    createBtn('olist', IconBulletlistToString());
    createBtn('undo', IconUndoToString('', '', '1.5'));
    createBtn('redo', IconRedoToString('', '', '1.5'));

    if (canAttachFiles) {
      createBtn('image', IconAttachToString('', '', '1.5'));
    }

    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = styles.actionsWrapper || 'actions-container';
    actionsWrapper.style.display = 'flex';
    actionsWrapper.style.alignItems = 'center';
    actionsWrapper.style.gap = '8px';
    actionsWrapper.style.marginLeft = 'auto';
    actionbar.appendChild(actionsWrapper);

    const actionsRoot = createRoot(actionsWrapper);
    actionsRoot.render(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconButton 
          ref={cancelButtonRef} 
          title={lng === 'ru' ? 'Отменить' : 'Cancel'}
          icon={<IconClose />} 
          onClick={handleCancel}
          style={{ 
            width: '25px', 
            height: '25px', 
            padding:'5px', 
            backgroundColor: 'white',
          }} 
          color="var(--blue-main)"
        />
        <IconButton 
          ref={submitButtonRef}
          title={lng === 'ru' ? 'Отправить' : 'Submit'}
          icon={<IconSubmit  width={'10'} height={'10'} htmlColor='blue' strokeWidth={'1'}/>} 
          onClick={handleSubmit}
          style={{ 
            width: '25px', 
            height: '25px', 
            padding:'5px', 
            backgroundColor: 'var(--blue-main)',
          }}
          color="white"
        />
      </div>
    );

    setTimeout(updateActiveStates, 0);

    return () => {
      editorRef.current && (editorRef.current.innerHTML = '');
    };
  }, [editor]);

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
        <div className={styles.editorContainer} ref={editorRef}></div>

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
