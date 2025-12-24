import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { init, exec, PellEditor } from 'pell';
import {
  IconAttachToString,
  IconBoldToString,
  IconBulletlistToString,
  IconHeader2ToString,
  IconItalicToString,
  IconStrikethroughToString,
  IconUnderlineToString,
  IconSubmit,
  IconClose,
  IconRedoToString,
  IconUndoToString,
} from '../../Icons';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';
import { FilePreview, AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { TAttachments, TextEditorProps } from '../../types';
import styles from './TextEditor.module.css';
import { IconButton } from '../IconButton/IconButton';
import { set } from 'react-datepicker/dist/date_utils';

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


const getElementFromRange = (range: Range): HTMLElement | null => {
  let node = range.startContainer;

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement;
    
    if (element.childNodes.length > 0) {
      const childIndex = range.startOffset > 0 ? range.startOffset - 1 : 0;
      let lastChild = element.childNodes[childIndex];

      while (lastChild && lastChild.hasChildNodes()) {
        lastChild = lastChild.lastChild!;
      }

      return lastChild.nodeType === Node.ELEMENT_NODE 
        ? (lastChild as HTMLElement) 
        : lastChild.parentElement;
    }
    return element;
  }

  return node.parentElement;
};
//изменение формата File на TAttachments
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



export const TextEditor: React.FC<TextEditorProps> = ({
  defaultValue,
  attachedFiles, 
  label,
  onSubmit,
  onCancel,
  error,
  helperText,
  isEditMode,
  canAttachFiles = true,
  files,
  required,
  className,
  isButtonDisabled,
  lng = 'en',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const pellRef = useRef<PellEditor | null>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLElement }>({});
  const redoContentRef = useRef<string>('');

  const [editor, setEditor] = useState<PellEditor | null>(null);
  const [editorHtml, setEditorHtml] = useState(defaultValue || ''); 
  const [temporaryFiles, setTemporaryFiles] = useState<TAttachments[]>(attachedFiles ?? []);
  const tempFilesRef = useRef(temporaryFiles);
  tempFilesRef.current = temporaryFiles; 
  // console.log('__temporaryFiles__',temporaryFiles);
  
  // const [attachedFiles, setAttachedFiles] = useState<any>(files || []);
  // console.log('___attachedFiles___',attachedFiles);
  
  const [filesErrorText, setFilesErrorText] = useState('');
  

  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    heading2: false,
    olist: false,
  }); 

  const checkFormatting = useCallback(
    (element: Element, tagNames: string[]): boolean => {
      let current = element;
      while (current && current !== editor?.content) {
        if (tagNames.includes(current.tagName)) {
          return true;
        }
        current = current.parentElement as Element;
      }
      return false;
    },
    [editor]
  );

  const hasStyle = useCallback(
    (element: Element, property: string, values: string[]): boolean => {
      let current = element;
      while (current && current !== editor?.content) {
        const computedStyle = window.getComputedStyle(current);
        const styleValue = computedStyle.getPropertyValue(property);

        if (values.some((value) => styleValue.includes(value))) {
          return true;
        }
        current = current.parentElement as Element;
      }
      return false;
    },
    [editor]
  );

  const isFormatActive = useCallback(
    (element: Element, tagNames: string[], styleProperty?: string, styleValues?: string[]): boolean => {
      return (
        checkFormatting(element, tagNames) ||
        (styleProperty && styleValues ? hasStyle(element, styleProperty, styleValues) : false)
      );
    },
    [checkFormatting, hasStyle]
  );

  const setCursorToEnd = () => {
    try {
      const content = pellRef.current?.content;
      if (!content) return;
      content.focus();

      const selection = window.getSelection();
      if (!selection) return;
      const range = document.createRange();
      range.selectNodeContents(content);
      range.collapse(false);
      
      selection.removeAllRanges();
      selection.addRange(range);
       content.scrollTop = content.scrollHeight;
    } catch (error) {
      console.warn('Error setting cursor to end:', error);
    }
  };

  const getSafeRange = () => {    
    try {
      const selection = getSafeSelection();
      if (!selection || selection.rangeCount === 0) {
        setCursorToEnd();

        const newSelection = getSafeSelection();
        if (!newSelection || newSelection.rangeCount === 0) {
          return null;
        }
        return newSelection.getRangeAt(0);
      }
      return selection.getRangeAt(0);
    } catch (error) {
      setCursorToEnd();
      return null;
    }
  };

  const updateButtonStates = useCallback((states: typeof activeStates) => {
    Object.entries(states).forEach(([command, isActive]) => {
      const button = buttonRefs.current[command];
      if (button) {
        button.classList.toggle(styles.pellButtonSelected, isActive);
      }
    });
  }, []);

  const updateActiveStates = useCallback(() => {
    const contentElement = pellRef.current?.content;
    if (!contentElement) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      const defaultStates = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        heading2: false,
        olist: false,
      };

      setActiveStates(defaultStates);
      updateButtonStates(defaultStates);
      return;
    }
    if (!contentElement.contains(selection.anchorNode)) {
      return;
    }

    const range = selection.getRangeAt(0);
    const element = getElementFromRange(range);

    if (!element) return;

    const newStates = {
      bold: isFormatActive(element, ['B', 'STRONG'], 'font-weight', ['bold', '700', '800', '900']),
      italic: isFormatActive(element, ['I', 'EM'], 'font-style', ['italic']),
      underline: isFormatActive(element, ['U'], 'text-decoration', ['underline']),
      strikethrough: isFormatActive(element, ['S', 'STRIKE', 'DEL'], 'text-decoration', ['line-through']),
      heading2: checkFormatting(element, ['H2']),
      olist: checkFormatting(element, ['OL']) || !!element.closest('ol'),
    };
    setActiveStates(newStates);
    updateButtonStates(newStates);
    
  }, [isFormatActive, checkFormatting, updateButtonStates]);

  const toggleHeading2 = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = getSafeRange();
    if (!range) return;
    let h2Element = null;

    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      const parentElement = range.startContainer.parentElement;
      h2Element = parentElement?.closest('h2') || null;
    } else {
      const container = range.startContainer as Element;

      if (container.querySelector) {
        h2Element = container.querySelector('h2');
      }

      if (!h2Element && (container as Element).tagName === 'H2') {
        h2Element = container as Element;
      }

      if (!h2Element && container.nodeType === Node.ELEMENT_NODE) {
        h2Element = (container as Element).closest('h2');
      }
    }

    if (h2Element) {
      const div = document.createElement('div');
      div.innerHTML = h2Element.innerHTML;

      const rangeOffset = range.startOffset;
      const textNode = range.startContainer;

      h2Element.parentNode?.replaceChild(div, h2Element);

      try {
        const newRange = document.createRange();
        if (textNode.nodeType === Node.TEXT_NODE && div.contains(textNode)) {
          newRange.setStart(textNode, rangeOffset);
          newRange.setEnd(textNode, rangeOffset);
        } else {
          newRange.setStart(div, 0);
          newRange.setEnd(div, 0);
        }
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (e) {
        const newRange = document.createRange();
        newRange.selectNodeContents(div);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      exec('formatBlock', 'h2');
    }
  };

  const toggleBulletList = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = getSafeRange();
    if (!range) return;
    const container = range.commonAncestorContainer;
    const currentElement = container.nodeType === Node.TEXT_NODE ? container.parentElement : (container as Element);

    if (!currentElement) return;

    const isInList = !!currentElement.closest('ol');
    exec('insertOrderedList');
    if (isInList) {
      const contentElement = editorRef.current?.querySelector(`.${styles.pellContent}`) as HTMLElement;
      if (!contentElement) return;

      const spans = contentElement.querySelectorAll('span');

      spans.forEach((span) => {
        const computedStyle = window.getComputedStyle(span);
        const fontSize = computedStyle.fontSize;
        const fontWeight = computedStyle.fontWeight;

        if (fontSize && (parseFloat(fontSize) > 16 || fontWeight === 'bold' || fontWeight === '700')) {
          const div = document.createElement('div');
          div.innerHTML = span.innerHTML;
          span.parentNode?.replaceChild(div, span);
        } else {
          const parent = span.parentNode;
          if (parent) {
            while (span.firstChild) {
              parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
          }
        }
      });

      const allElements = contentElement.querySelectorAll('*');
      allElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        const fontSize = computedStyle.fontSize;

        if (!['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
          if (fontSize && parseFloat(fontSize) > 18) {
            htmlElement.style.fontSize = '';
            htmlElement.style.fontWeight = '';
            htmlElement.style.fontFamily = '';
          }
        }
      });
      updateActiveStates();
    }
  };

  // Функция обработки загрузки файлов
  const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const incomingFiles = filesArray.filter(file => file.size <= MAX_FILE_SIZE);
    const oversizedFiles = filesArray.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => f.name).join(', ');
      const message = lng === 'ru' 
        ? `Файлы ${fileNames} превышают ${formatFileSize(MAX_FILE_SIZE)}`
        : `Files exceed ${fileNames} ${formatFileSize(MAX_FILE_SIZE)}`;
        
      setFilesErrorText(message);
    }

    const newAttachments: TAttachments[] = converFileToAttachment(incomingFiles)
    
    const uniqueFiles = newAttachments.filter((newFile) => {
      return !temporaryFiles.some(
        (existing) => existing.filename === newFile.filename && existing.size === newFile.size
      );
    });
    
    if (uniqueFiles.length > 0) {
      setTemporaryFiles((prev) => [...prev, ...uniqueFiles]);
    }
    event.target.value = '';
};
  
const removeAttachedFile = (id: string) => {
  setTemporaryFiles((prev) => {
    const fileToRemove = prev.find(f => f.id === id);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    return prev.filter((file) => file.id !== id);
  });
};

  const getEditorActions = useCallback(
    () => {
      const baseActions = [
        {
          name: 'bold',
          icon: IconBoldToString('', '', '1.5'),
           title: lng === 'ru' ? 'Жирный (Ctrl+B)' : 'Bold (Ctrl+B)',
          result: () => {},
        },
        {
          name: 'italic',
          icon: IconItalicToString('', '', '1.5'),
          title: lng === 'ru' ? 'Курсив (Ctrl+I)' : 'Italic (Ctrl+I)',
          result: () => {},
        },
        {
          name: 'underline',
          icon: IconUnderlineToString('', '', '1.5'),
          title: lng === 'ru' ? 'Подчеркнутый (Ctrl+U)' : 'Underline (Ctrl+U)',
          result: () => {},
        },
        {
          name: 'strikethrough',
          icon: IconStrikethroughToString('', '', '1.5'),
          title: lng === 'ru' ? 'Зачеркнутый' : 'Strike-through',
          result: () => {},
        },
        {
          name: 'heading2',
          icon: IconHeader2ToString('', '', '1.5'),
          title: lng === 'ru' ? 'Заголовок' : 'Heading 2',
          result: () => {},
        },
        {
          name: 'olist',
          icon: IconBulletlistToString(),
          title: lng === 'ru' ? 'Список' : 'Bullet List',
          result: () => {},
        },
        {
          name: 'undo',
          icon: IconUndoToString('', '', '1.5'),
          title: lng === 'ru' ? 'Возврат последнего действия' : 'Return last action',
          result: () => {},
        },
        {
          name: 'redo',
          icon: IconRedoToString('', '', '1.5'),
          title: lng === 'ru' ? 'Отмена последнего действия' : 'Cancel last action',
          result: () => {},
        },
        
      ];
      if (canAttachFiles) {
        baseActions.push({
          name: 'image',
          icon: IconAttachToString('', '', '1.5'),
          title: lng === 'ru' ? 'Прикрепить изображение' : 'Upload Image',
          result: () => {},
        });
      }
  
      return baseActions;
    },
    [canAttachFiles,lng]
  );

  const getEditorClasses = useCallback(
    () => ({
      actionbar: styles.pellActionbar,
      button: styles.pellButton,
      content: styles.pellContent,
      selected: styles.pellButtonSelected,
    }),
    []
  );

  const initializePellEditor = () => {
    return init({
      element: editorRef.current!,
      onChange: handleEditorChange,
      defaultParagraphSeparator: 'div',
      actions: getEditorActions(),
      classes: getEditorClasses(),
    });
  };


  const handleSubmit = useCallback(() => {
    const currentPell = pellRef.current; 
    if (!currentPell?.content) {
      return;
    }
    if (onSubmit) {
      const filesToSend: File[] = convertAttacmentsToFile(tempFilesRef.current)
      console.log('filesToSend',filesToSend);
      // const filesToSend = tempFilesRef.current;
      // console.log('Отправляем файлы:', filesToSend);
      onSubmit(currentPell.content.innerHTML, filesToSend);
      currentPell.content.innerHTML = '';
      setTemporaryFiles([]);
      setEditorHtml('');
    }
  }, [onSubmit]);

  const handleCancel = useCallback(() => {
    const currentPell = pellRef.current;
    if (!currentPell?.content) {
      return;
    }
    currentPell.content.innerHTML = defaultValue || '';
    setEditorHtml(defaultValue || ''); 
    // setAttachedFiles([]);

    if (onCancel) {
      onCancel?.();
    }
  }, [defaultValue, onCancel]); 

const hadleRedo = useCallback(()=>{  
  
  const currentPell = pellRef.current;
  const contentToRestore = redoContentRef.current;  
  if (!currentPell?.content || !contentToRestore) {
      return;
    }

  currentPell.content.innerHTML = contentToRestore;
  setEditorHtml(contentToRestore);
  currentPell.content.focus();
   setTimeout(setCursorToEnd, 0); 

},[])

  const handleUndo = useCallback(()=>{
    const currentPell = pellRef.current;
    if (!currentPell?.content) {
        return;
    }
    redoContentRef.current = currentPell.content.innerHTML
    currentPell.content.innerHTML = defaultValue || '';
    setEditorHtml(defaultValue || '');
    setTimeout(setCursorToEnd, 0); 
  },[defaultValue])

  const setupToolbar = (pellEditor: PellEditor) => {
    if (!editorRef.current) return;
    const actionbar = editorRef.current.querySelector(`.${styles.pellActionbar}`);
    const content = editorRef.current.querySelector(`.${styles.pellContent}`);

    if (actionbar && content) {
      // 1. Контейнер для кнопок форматирования
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = styles.buttonsContainer;
      while (actionbar.firstChild) {
        buttonsContainer.appendChild(actionbar.firstChild);
      }
     
      // 2. Контейнер для Отменить/Добавить
      const actionsWrapper = document.createElement('div');
      actionsWrapper.className = styles.actionsWrapper || 'actions-container';
      actionsWrapper.style.display = 'flex';
      actionsWrapper.style.alignItems = 'center';
      actionsWrapper.style.gap = '8px';
      actionsWrapper.style.marginLeft = 'auto'; 

      actionbar.appendChild(buttonsContainer);
      actionbar.appendChild(actionsWrapper);

      const root = createRoot(actionsWrapper);
      root.render(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isEditMode && (
                <IconButton
                  ref={cancelButtonRef}
                  title={lng === 'ru' ? 'Отменить' : 'Cancel'}
                  icon={<IconClose/>} 
                  onClick={handleCancel} 
                   style={{ 
                    width: '25px', 
                    height: '25px', 
                    padding:'5px', 
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }} 
                   color="var(--blue-main)"
                />
            )}  
          
                <IconButton
                  ref={submitButtonRef}
                  title={lng === 'ru' ? 'Отправить' : 'Submit'}
                  icon={<IconSubmit width={'10'} height={'10'} htmlColor='blue' strokeWidth={'1'}/>} 
                  onClick={handleSubmit} 
                  style={{ 
                    width: '25px', 
                    height: '25px', 
                    padding:'5px', 
                    backgroundColor: 'var(--blue-main)',
                    opacity: 0.5,
                    cursor: 'pointer'
                  }} 
                  color="white"
                />             
        </div>
      );
    }
    
    const buttons = editorRef.current.querySelectorAll(`.${styles.pellButton}`);
    const commands = ['bold', 'italic', 'underline', 'strikethrough', 'heading2', 'olist', 'undo','redo'];
    if (canAttachFiles) {
      commands.push('image');
    }

    buttons.forEach((button: Element, index: number) => {
      const command = commands[index];  
      if (command) {
        const htmlButton = button as HTMLElement;
        buttonRefs.current[command] = htmlButton;
        htmlButton.setAttribute('data-command', command);
        htmlButton.onclick = null;
        htmlButton.addEventListener('mousedown', (e) => {
          e.preventDefault();
          e.stopPropagation();

          if (command === 'heading2') {
            toggleHeading2();
          } else if (command === 'olist') {
            toggleBulletList();
          } else if (command === 'undo'){
             handleUndo()
          } else if (command === 'redo'){
            hadleRedo()
          } else if (command === 'image') {
            handleAttachFiles();
          } else {
            document.execCommand(command, false, undefined);
          }

          pellEditor.content.focus();
          updateActiveStates();
          
        });

        htmlButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    });
  }


  // Функция для открытия диалога выбора файлов
  const handleAttachFiles = () => {
    uploaderRef.current?.click();
  };

  const handleEditorChange = useCallback((html: string) => {
    setEditorHtml(html);
    redoContentRef.current = html;
    updateActiveStates();
    // if (onChange) {
    //   onChange(html, attachedFiles);
    // }
}, [updateActiveStates]);

useEffect(() => {
  if (!submitButtonRef.current) return;
  
  const normalizeHtml = (html: string | undefined | null) => {
    if (!html) return '';
    return html
      .replace(/&nbsp;/g, ' ')      // неразрывные пробелы
      .replace(/\s+/g, ' ')         // лишние пробелы и переносы
      .replace(/>\s+</g, '><')      // пробелы между тегами
      .trim();
  };

  const normalizedEditor = normalizeHtml(editorHtml);
  const normalizedDefault = normalizeHtml(defaultValue);

  const contentOnly = normalizedEditor
    .replace(/<[^>]*>/g, '') // все теги
    .replace(/\s/g, '')      // все пробелов
    .trim();
  const isTextEmpty = contentOnly.length === 0
  const hasNoNewFiles = temporaryFiles.length === 0; 
  const hasNoTextChanges = normalizedEditor === normalizedDefault;
  const hasNoChanges = hasNoTextChanges && hasNoNewFiles;
  
  if (submitButtonRef.current) {
    submitButtonRef.current.disabled = hasNoChanges || isTextEmpty;
    submitButtonRef.current.style.opacity = hasNoChanges || isTextEmpty ? '0.5' : '1';
  }
 
  // if (cancelButtonRef.current) {
  //   cancelButtonRef.current.disabled = hasNoChanges;
  // }


}, [editorHtml, defaultValue]);


  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false, undefined);
          updateActiveStates();
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false, undefined);
          updateActiveStates();
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false, undefined);
          updateActiveStates();
          break;
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      const pellEditor = initializePellEditor();
      pellRef.current = pellEditor;

      pellEditor.content.innerHTML = defaultValue || '';
      setEditor(pellEditor);
      setupToolbar(pellEditor);

      const pellEditorContent = pellEditor.content;
      const handleInput = () => updateActiveStates();
      const handleKeyUp = () => setTimeout(updateActiveStates, 10);
      const handleMouseUp = () => setTimeout(updateActiveStates, 10);
      const handleFocus = () => setTimeout(updateActiveStates, 10);

      pellEditorContent.addEventListener('input', handleInput);
      pellEditorContent.addEventListener('keyup', handleKeyUp);
      pellEditorContent.addEventListener('mouseup', handleMouseUp);
      pellEditorContent.addEventListener('focus', handleFocus);
      setTimeout(setCursorToEnd, 0); 

      return () => {
        pellEditorContent.removeEventListener('input', handleInput);
        pellEditorContent.removeEventListener('keyup', handleKeyUp);
        pellEditorContent.removeEventListener('mouseup', handleMouseUp);
        pellEditorContent.removeEventListener('focus', handleFocus);

        if (editorRef.current) {
          editorRef.current.innerHTML = '';
        }
      };
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (editor) {
      setTimeout(updateActiveStates, 100);
    }
  }, [editor]);

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
            onDelete={removeAttachedFile}
            className={styles.attachedFilesContainer}
            isEdit={true}
            lng={lng}
            error={filesErrorText}
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
      {(error && helperText) && (
        <Typography variant="Caption" className={classNames(styles.helperText)}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
