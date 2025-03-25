import { FC, ComponentType } from 'react';
import { CodeBlock } from 'notion-types';
// import { BlockProps } from "./src/routes/Detail/components/NotionRenderer"; // Import BlockProps
import { NotionComponents as BaseNotionComponents } from 'react-notion-x';

declare module 'react-notion-x' {
  interface NotionComponents {
    Block?: FC<any>; //
    Code?: ComponentType<{
      block: CodeBlock;
      defaultLanguage?: string;
      className?: string;
    }>;
    Collection?: any;
    Equation?: any;
    Modal?: any;
    Pdf?: any;
    nextImage?: any;
    nextLink?: any;
  }
}