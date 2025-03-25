import { FC, ComponentType } from 'react';
import { CodeBlock } from 'notion-types';
import { BlockProps } from './src/routes/Detail/components/NotionRenderer/index'; // Import BlockProps

declare module 'react-notion-x' {
  interface NotionComponents {
    Block?: FC<BlockProps>;
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