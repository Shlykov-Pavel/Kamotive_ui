import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './TextEditor.module.css';
import { IconClose, IconSubmit, IconRedoToString, IconUndoToString, IconBoldToString, IconItalicToString, IconAttachToString, IconHeader2ToString, IconUnderlineToString, IconBulletlistToString, IconStrikethroughToString, } from '../../Icons';
import { Typography } from '../Typography/Typography';
import { IconButton } from '../IconButton/IconButton';
import { AttachedFilesPreview } from '../AttachedFilesPreview/AttachedFilesPreview';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
const ACCEPTED_FILE_TYPES = 'image/*,audio/*,video/*,.doc,.docx,.html,.htm,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt,.zip,.djvu';
const MAX_FILE_SIZE = 2147483648; // 2 ГБ
export const formatFileSize = (bytes, lng) => {
    if (!bytes || bytes === 0) {
        return lng === 'ru' || (lng === null || lng === void 0 ? void 0 : lng.includes('ru')) ? '0 Байт' : '0 Bytes';
    }
    const k = 1024;
    const sizesEn = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const sizesRu = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sizes = lng === 'ru' || (lng === null || lng === void 0 ? void 0 : lng.includes('ru')) ? sizesRu : sizesEn;
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
//изменение формата File на TAttachments
const converFileToAttachment = (files) => {
    return files.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Генерируем ID
        filename: file.name,
        size: file.size,
        file: [file], // Сохраняем сам файл внутри
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
};
const convertAttacmentsToFile = (files) => {
    return files
        .map(att => att.file)
        .filter((f) => !!f)
        .reduce((acc, val) => acc.concat(val), []);
};
const parseFileSize = (sizeStr) => {
    const units = {
        'б': 1, 'байты': 1, 'bytes': 1,
        'кб': 1024, 'kb': 1024,
        'мб': 1024 * 1024, 'mb': 1024 * 1024,
        'гб': 1024 * 1024 * 1024, 'gb': 1024 * 1024 * 1024
    };
    const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([a-zа-я]+)$/);
    if (!match)
        return 0;
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
export const TextEditor = ({ defaultValue, attachedFiles, label, onSubmit, onCancel, onDelete, error, helperText, isEditMode, canAttachFiles = true, maxFileCount = 5, maxFileSize = '1Гб', required, className, lng = 'en', }) => {
    var _a;
    const uploaderRef = useRef(null);
    const [editorHtml, setEditorHtml] = useState(defaultValue || '');
    const [temporaryFiles, setTemporaryFiles] = useState(attachedFiles !== null && attachedFiles !== void 0 ? attachedFiles : []);
    const tempFilesRef = useRef(attachedFiles !== null && attachedFiles !== void 0 ? attachedFiles : []);
    useEffect(() => {
        tempFilesRef.current = temporaryFiles;
    }, [temporaryFiles]);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
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
    });
    const applyAction = (action) => {
        if (!editor)
            return;
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
        image: () => { var _a; return (_a = uploaderRef.current) === null || _a === void 0 ? void 0 : _a.click(); },
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
    const normalize = (html) => html.replace(/&nbsp;|\s+/g, ' ').replace(/>\s+</g, '><').trim();
    const normalizedEditor = normalize(editorHtml || '');
    const normalizedDefault = normalize(defaultValue || '');
    const isTextEmpty = normalizedEditor.replace(/<[^>]*>/g, '').trim().length === 0;
    const hasNoNewFiles = temporaryFiles.filter(f => f.file).length === 0 &&
        temporaryFiles.length === ((_a = attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.length) !== null && _a !== void 0 ? _a : 0);
    const hasErrorsInFiles = temporaryFiles.some(f => !!f.error);
    const hasNoTextChanges = normalizedEditor === normalizedDefault;
    const isSubmitDisabled = (hasNoTextChanges && hasNoNewFiles) || isTextEmpty || hasErrorsInFiles;
    const isCancelDisabled = !isEditMode && (hasNoTextChanges && hasNoNewFiles);
    // Функция обработки загрузки файлов
    const handleUploadFiles = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0)
            return;
        const filesArray = Array.from(files);
        const newAttachments = converFileToAttachment(filesArray);
        const uniqueFiles = newAttachments.filter((newFile) => {
            return !temporaryFiles.some((existing) => existing.filename === newFile.filename && existing.size === newFile.size);
        });
        if (uniqueFiles.length > 0) {
            setTemporaryFiles((prev) => {
                const updatedFiles = [...prev, ...uniqueFiles];
                return updatedFiles.map((file, index) => {
                    var _a;
                    const isSizeError = ((_a = file.size) !== null && _a !== void 0 ? _a : 0) > parseFileSize(maxFileSize);
                    const isCountError = index + 1 > maxFileCount;
                    let errorMessage = '';
                    if (isSizeError) {
                        errorMessage = lng === 'ru' ? `Файл превышает ${maxFileSize}` : `File exceed ${maxFileSize}`;
                    }
                    return Object.assign(Object.assign({}, file), { error: errorMessage || (isCountError ? true : '') });
                });
            });
        }
        event.target.value = '';
    };
    const removeAttachedFile = (id) => {
        setTemporaryFiles((prev) => {
            const filteredFiles = prev.filter((file) => {
                if (file.id === id) {
                    if (file.preview)
                        URL.revokeObjectURL(file.preview);
                    return false;
                }
                return true;
            });
            return filteredFiles.map((file, index) => {
                var _a;
                const isSizeError = ((_a = file.size) !== null && _a !== void 0 ? _a : 0) > parseFileSize(maxFileSize);
                const isCountError = (index + 1) > maxFileCount;
                let errorMessage = '';
                if (isSizeError) {
                    errorMessage = lng === 'ru' ? `Файл превышает ${maxFileSize}` : `File exceed ${maxFileSize}`;
                }
                return Object.assign(Object.assign({}, file), { error: errorMessage || (isCountError ? true : '') });
            });
        });
        if (attachedFiles === null || attachedFiles === void 0 ? void 0 : attachedFiles.some((file) => file.id === id)) {
            onDelete === null || onDelete === void 0 ? void 0 : onDelete(id);
        }
    };
    const handleSubmit = useCallback(() => {
        if (!editor)
            return;
        const filesToSend = convertAttacmentsToFile(tempFilesRef.current.filter(file => !Boolean(file.error) && file.file));
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(editor.getHTML(), filesToSend);
        editor.commands.clearContent();
        setTemporaryFiles([]);
    }, [editor, onSubmit]);
    const handleCancel = useCallback(() => {
        if (!editor)
            return;
        editor.commands.setContent(defaultValue || '');
        setTemporaryFiles(attachedFiles !== null && attachedFiles !== void 0 ? attachedFiles : []);
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
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
    return (React.createElement("div", { className: wrapperClassess },
        label && (React.createElement(Typography, { variant: "Caption", className: labelClasses }, label)),
        React.createElement("div", { className: inputClassess, title: '' },
            temporaryFiles.length > 0 && (React.createElement(AttachedFilesPreview, { files: temporaryFiles, allowDelete: true, onDelete: removeAttachedFile, className: styles.attachedFilesContainer, lng: lng, maxFileCount: maxFileCount })),
            React.createElement("div", { className: styles.editorContainer },
                React.createElement("div", { className: styles.pellActionbar },
                    React.createElement("div", { className: styles.buttonsContainer },
                        toolbarButtons.map((btn) => {
                            const isActive = btn.active ? editorState[btn.active] : false;
                            return (React.createElement("button", { key: btn.name, type: "button", className: `${styles.pellButton} ${btn.active && isActive ? styles.pellButtonSelected : ''}`, onMouseDown: (e) => {
                                    e.preventDefault();
                                    btn.action();
                                }, dangerouslySetInnerHTML: { __html: btn.icon }, title: btn.title }));
                        }),
                        canAttachFiles && (React.createElement("button", { type: "button", className: styles.pellButton, onMouseDown: (e) => { e.preventDefault(); commands.image(); }, dangerouslySetInnerHTML: { __html: IconAttachToString('', '', '1.5') }, title: lng === 'ru' ? 'Прикрепить файл' : 'Upload file' }))),
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                        React.createElement(IconButton, { disabled: isCancelDisabled, title: lng === 'ru' ? 'Отменить' : 'Cancel', icon: React.createElement(IconClose, null), onClick: handleCancel, style: {
                                width: '25px',
                                height: '25px',
                                padding: '5px',
                                backgroundColor: 'white',
                                opacity: isCancelDisabled ? 0.5 : 1,
                                cursor: isCancelDisabled ? 'default' : 'pointer',
                            }, color: "var(--blue-main)" }),
                        React.createElement(IconButton, { title: lng === 'ru' ? 'Отправить' : 'Submit', icon: React.createElement(IconSubmit, { width: '10', height: '10', htmlColor: 'blue', strokeWidth: '1' }), onClick: handleSubmit, disabled: isSubmitDisabled, style: {
                                width: '25px',
                                height: '25px',
                                padding: '5px',
                                backgroundColor: 'var(--blue-main)',
                                opacity: isSubmitDisabled ? 0.5 : 1,
                                cursor: isSubmitDisabled ? 'default' : 'pointer'
                            }, color: "white" }))),
                React.createElement("div", { className: styles.pellContent, onClick: () => editor === null || editor === void 0 ? void 0 : editor.chain().focus().run() }, editor && React.createElement(EditorContent, { editor: editor }))),
            canAttachFiles && (React.createElement("input", { ref: uploaderRef, type: "file", style: { display: 'none' }, multiple: true, onChange: handleUploadFiles, accept: ACCEPTED_FILE_TYPES }))),
        error && helperText && (React.createElement(Typography, { variant: "Caption", className: styles.helperText }, helperText))));
};
