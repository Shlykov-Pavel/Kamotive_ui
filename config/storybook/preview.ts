import type { Preview } from "@storybook/react";
// @ts-ignore
import '../../src/fonts.scss';
// @ts-ignore
import '../../src/variables.scss';



const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
