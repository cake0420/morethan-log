// global.d.ts
import { FC, ComponentType } from 'react';
import {
  CodeBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block
} from 'notion-types';
import { NotionComponents as BaseNotionComponents } from 'react-notion-x';

declare module 'react-notion-x' {
  interface NotionComponents extends BaseNotionComponents {
    heading_1: ComponentType<{ block: Heading1Block }>;
    heading_2: ComponentType<{ block: Heading2Block }>;
    heading_3: ComponentType<{ block: Heading3Block }>;
    code: ComponentType<{ block: CodeBlock }>; // Code 컴포넌트 타입
  }
}