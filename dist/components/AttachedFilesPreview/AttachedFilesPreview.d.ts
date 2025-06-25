import React, { CSSProperties } from 'react';
export interface FilePreview {
    file: File;
    id: string;
    preview?: string;
}
export declare const getFileIcon: (file: File) => React.JSX.Element;
export declare const formatFileSize: (bytes?: number) => string;
interface AttachedFilesProps {
    files: FilePreview[];
    onDelete?: (id: string) => void;
    onDownload?: (file: File) => void;
    style?: CSSProperties;
    className?: string;
    isEdit?: boolean;
    allowDownload?: boolean;
}
export declare const AttachedFilesPreview: React.FC<AttachedFilesProps>;
export {};
