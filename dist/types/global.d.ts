declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: any;
  export default content;
}

declare module '*.svg' {
    import React from 'react';

    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
