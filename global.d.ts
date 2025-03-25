import { FC, ComponentType } from 'react';
import { CodeBlock } from 'notion-types';
import { NotionComponents as BaseNotionComponents } from 'react-notion-x';

declare module 'react-notion-x' {
  interface NotionComponents {
    Block?: FC<any>; // BlockProps 타입을 정확하게 지정
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