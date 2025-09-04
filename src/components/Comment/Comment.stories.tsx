import type { Meta } from '@storybook/react';
import React from 'react';
import { Comment } from './Comment';
import { CommentProps } from '../../types';

const withWrapper = (Story: React.ComponentType) => (
  <div
    style={{
      backgroundColor: 'var(--white)',
      width: '500px',
    }}
  >
    {<Story />}
  </div>
);

const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  args: {
    label: 'Наименование поля',
    placeholder: 'Введите текст...',
    error: false,
    helperText: 'Поле обязательно для заполнения',
    username: 'Имя пользователя',
    creationDate: new Date().toUTCString(),
    avatar:
      'data:image/jpeg;base64,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',
  },
  argTypes: {
    id: { description: 'Идентификатор компонента' },
    label: { description: 'Текст метки инпута' },
    placeholder: { description: 'Текст подсказки инпута' },
    value: { description: 'Значение поля инпут' },
    className: { description: 'Дополнительный CSS класс для обертки инпута' },
    error: { description: 'Условие показа ошибки инпута', type: 'boolean', control: { type: 'boolean' } },
    helperText: { description: 'Строка для вспомогательно текста под инпутом', type: 'string' },
    onChange: {
      description: 'Callback, который будет вызван при изменении значения внутри инпута',
      action: 'изменено value',
    },
  },
};

export default meta;

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum erat, vehicula at euismod et, tempor sit amet lacus. Vestibulum ac aliquam ligula, quis auctor massa. Integer dignissim eget mi nec dictum. Praesent posuere sed risus eget luctus. Phasellus nec luctus erat. Nam eu mauris malesuada, congue dui non, pretium nunc. Nunc viverra est et metus malesuada, in semper nisi ultricies. Sed erat lorem, efficitur sit amet ultrices nec, tempor et elit. Maecenas non bibendum mi. Suspendisse rhoncus aliquet nibh a tincidunt. Aenean lobortis faucibus ultricies.';

export const CommentDefault = (argTypes: CommentProps): JSX.Element => {
  return <Comment value={value} {...argTypes} />;
};
CommentDefault.storyName = 'Comment по умолчанию';

export const CommentEditable = (argTypes: CommentProps): JSX.Element => {
  return <Comment value={value} {...argTypes} />;
};
CommentEditable.args = {
  canEdit: true,
};
CommentEditable.storyName = 'Comment с возможностью редактировать';

export const CommentEditableWithFiles = (argTypes: CommentProps): JSX.Element => {
  return <Comment value={value} {...argTypes} />;
};
CommentEditableWithFiles.args = {
  canEdit: true,
  canAttachFiles: true,
};
CommentEditableWithFiles.storyName = 'Comment с возможностью прикреплять файлы';

export const CommentEditableWithoutAvatar = (argTypes: CommentProps): JSX.Element => {
  return <Comment value={value} {...argTypes} />;
};
CommentEditableWithoutAvatar.args = {
  avatar: '',
  canEdit: true,
  canAttachFiles: true,
};
CommentEditableWithoutAvatar.storyName = 'Comment без аватара';
