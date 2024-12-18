import type { Preview } from "@storybook/react";
import '../../src/fonts.css';
import '../../src/colors.css';



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
