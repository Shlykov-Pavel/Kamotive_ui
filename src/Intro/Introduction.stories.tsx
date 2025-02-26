import React from 'react';
import { WelcomePage } from './Welcome';

const withWrapper = (Story: React.ComponentType) => <div>{<Story />}</div>;

export default {
  title: 'Introduction/Welcome',
  component: WelcomePage,
  decorators: [withWrapper],
};

export const Default = () => <WelcomePage />;

Default.storyName = 'Введение'