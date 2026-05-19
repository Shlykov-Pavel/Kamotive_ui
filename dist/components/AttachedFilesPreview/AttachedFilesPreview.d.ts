import React, { CSSProperties } from 'react';
import { TAttachments } from '../../types';
export interface FilePreview {
    file: File;
    id: string;
    preview?: string;
    lng: string;
}
export declare const getFileIcon: (file: TAttachments) => React.JSX.Element;
export declare const formatFileSize: (bytes?: number, lng?: string) => string;
interface AttachedFilesProps {
    files: TAttachments[];
    onDownload?: (file: TAttachments) => void;
    allowDelete?: boolean;
    onDelete?: (id: string) => void;
    style?: CSSProperties;
    className?: string;
    maxFileCount?: number;
    lng: string;
    testId?: string;
}
export declare const AttachedFilesPreview: React.FC<AttachedFilesProps>;
export {};
