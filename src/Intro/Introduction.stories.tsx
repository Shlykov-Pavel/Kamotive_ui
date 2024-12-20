import React from 'react';
import { WelcomePage } from './Welcome'; // Путь к вашему компоненту

const withWrapper = (Story: any) => <div>{<Story />}</div>;

export default {
  title: 'Introduction/Welcome', // Укажите путь в Storybook
  component: WelcomePage,
  decorators: [withWrapper],
};

export const Default = () => <WelcomePage />;

Default.storyName = 'Введение'