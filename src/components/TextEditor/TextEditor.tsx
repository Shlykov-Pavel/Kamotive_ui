import React, { useCallback, useEffect, useRef, useState } from 'react';
import { init, exec, PellEditor } from 'pell';
import {
  IconAttachToString,
  IconBoldToString,
  IconBulletlistToString,
  IconHeader2ToString,
  IconItalicToString,
  IconStrikethroughToString,
  IconSubmitToString,
  IconUnderlineToString,
} from '../../Icons';
import { Typography } from '../Typography/Typography';
import classNames from 'classnames';
import { FilePreview, AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { TextEditorProps } from '../../types';
import styles from './TextEditor.module.css';

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

const getElementFromRange = (range: Range): Element | null => {
  const container = range.commonAncestorContainer;
  return container.nodeType === Node.TEXT_NODE ? container.parentElement : (container as Element);
};

export const TextEditor: React.FC<TextEditorProps> = ({
  label,
  onSubmit,
  onChange,
  defaultValue,
  error,
  helperText,
  canAttachFiles = false,
  files,
  required,
  className,
  isButtonDisabled,
  lng = 'ru',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const uploaderRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLElement }>({});

  const [editor, setEditor] = useState<PellEditor | null>(null);
  const [temporaryFiles, setTemporaryFiles] = useState<File[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<FilePreview[]>(files || []);
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    heading2: false,
    ulist: false,
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
      if (!editor?.content) return;

      const content = editor.content;
      content.focus();

      const selection = window.getSelection();
      if (!selection) return;

      const range = document.createRange();

      if (content.childNodes.length === 0) {
        const textNode = document.createTextNode('');
        content.appendChild(textNode);
        range.setStart(textNode, 0);
        range.setEnd(textNode, 0);
      } else {
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null);

        let lastTextNode = null;
        let node;
        while ((node = walker.nextNode())) {
          lastTextNode = node;
        }

        if (lastTextNode) {
          range.setStart(lastTextNode, lastTextNode.textContent?.length || 0);
          range.setEnd(lastTextNode, lastTextNode.textContent?.length || 0);
        } else {
          range.selectNodeContents(content);
          range.collapse(false);
        }
      }

      selection.removeAllRanges();
      selection.addRange(range);
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
    if (!editor?.content) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      const defaultStates = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        heading2: false,
        ulist: false,
      };

      setActiveStates(defaultStates);
      updateButtonStates(defaultStates);
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
      ulist: checkFormatting(element, ['UL']) || !!element.closest('ul'),
    };

    setActiveStates(newStates);
    updateButtonStates(newStates);
  }, [editor, isFormatActive, checkFormatting, updateButtonStates]);

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

    const isInList = !!currentElement.closest('ul');
    exec('insertUnorderedList');
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

    // Проверка размера файла (2 ГБ)
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        return;
      }
    }

    event.stopPropagation();
    event.preventDefault();

    const newTemporaryFiles = [...temporaryFiles, ...Array.from(files)];
    setTemporaryFiles(newTemporaryFiles);

    const newAttachedFiles: FilePreview[] = Array.from(files).map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      lng,
    }));

    setAttachedFiles((prev) => [...prev, ...newAttachedFiles]);

    event.target.value = '';
  };

  const removeAttachedFile = (fileId: string) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const getEditorActions = useCallback(
    () => {
      const baseActions = [
        {
          name: 'bold',
          icon: IconBoldToString('', '', '1.5'),
          title: 'Bold (Ctrl+B)',
          result: () => {},
        },
        {
          name: 'italic',
          icon: IconItalicToString('', '', '1.5'),
          title: 'Italic (Ctrl+I)',
          result: () => {},
        },
        {
          name: 'underline',
          icon: IconUnderlineToString('', '', '1.5'),
          title: 'Underline (Ctrl+U)',
          result: () => {},
        },
        {
          name: 'strikethrough',
          icon: IconStrikethroughToString('', '', '1.5'),
          title: 'Strike-through',
          result: () => {},
        },
        {
          name: 'heading2',
          icon: IconHeader2ToString('', '', '1.5'),
          title: 'Heading 2',
          result: () => {},
        },
        {
          name: 'ulist',
          icon: IconBulletlistToString(),
          title: 'Bullet List',
          result: () => {},
        },
      ];
      if (canAttachFiles) {
        baseActions.push({
          name: 'image',
          icon: IconAttachToString('', '', '1.5'),
          title: 'Upload Image',
          result: () => {},
        });
      }
  
      return baseActions;
    },
    [canAttachFiles]
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

  const createSubmitButton = useCallback(() => {
    const submitButton = document.createElement('button');
    submitButton.className = styles.submitButton;
    submitButton.disabled = !!error || !!isButtonDisabled;
    submitButton.innerHTML = IconSubmitToString('', '', '1.5');
    submitButton.type = 'button';

    (submitButtonRef as React.MutableRefObject<HTMLButtonElement | null>).current = submitButton;

    return submitButton;
  }, [error, isButtonDisabled]);

  const setupToolbar = (pellEditor: PellEditor) => {
    if (!editorRef.current) return;
    const actionbar = editorRef.current.querySelector(`.${styles.pellActionbar}`);
    const content = editorRef.current.querySelector(`.${styles.pellContent}`);

    if (actionbar && content && editorRef.current) {
      const toolbarContainer = document.createElement('div');
      toolbarContainer.className = styles.toolbarContainer;

      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = styles.buttonsContainer;

      while (actionbar.firstChild) {
        buttonsContainer.appendChild(actionbar.firstChild);
      }

      const submitButton = createSubmitButton();

      actionbar.appendChild(buttonsContainer);
      actionbar.appendChild(submitButton);

      editorRef.current.appendChild(actionbar);
    }

    const buttons = editorRef.current.querySelectorAll(`.${styles.pellButton}`);
    const commands = ['bold', 'italic', 'underline', 'strikethrough', 'heading2', 'ulist'];
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
          } else if (command === 'ulist') {
            toggleBulletList();
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
  };

  // Функция для открытия диалога выбора файлов
  const handleAttachFiles = () => {
    uploaderRef.current?.click();
  };

  const handleEditorChange = useCallback(() => {
    updateActiveStates();
    if (onChange && editor?.content) {
      onChange(editor.content.innerHTML, attachedFiles);
    }
  }, [onChange, editor, attachedFiles, updateActiveStates]);

  const handleSubmit = useCallback(() => {
    if (!editor?.content) {
      return;
    }
    if (onSubmit) {
      onSubmit(editor.content.innerHTML, attachedFiles);
      editor.content.innerHTML = '';
      setAttachedFiles([]);
    }
  }, [editor, attachedFiles]);

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
    const button = submitButtonRef.current;
    if (button) {
      button.removeEventListener('click', handleSubmit);
      button.addEventListener('click', handleSubmit);

      return () => {
        button.removeEventListener('click', handleSubmit);
      };
    }
  }, [handleSubmit, submitButtonRef.current]);

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

      <div className={inputClassess}>
        {attachedFiles.length > 0 && (
          <AttachedFilesPreview
            files={attachedFiles}
            onDelete={(id) => removeAttachedFile(id)}
            className={styles.attachedFilesContainer}
            isEdit={true}
            lng={lng}
          />
        )}
        <div ref={editorRef}></div>

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
        <Typography variant="Caption" className={classNames(styles.helperText)}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
