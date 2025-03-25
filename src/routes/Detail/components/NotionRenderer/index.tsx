import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap, CodeBlock } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC, ComponentType } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

import { NotionRenderer as ReactNotionXNotionRenderer, IProps, NotionComponents } from 'react-notion-x';

interface CustomCodeProps {
  block: any; // 정확한 Block 타입으로 대체
  className?: string;
  defaultLanguage?: string;
}

const CustomCode: FC<CustomCodeProps> = ({ block, className, defaultLanguage }) => {
  const backgroundColor = block?.format?.backgroundColor;
  const style = {
    width: '100%',
    display: 'inline-block',
    padding: '2px 4px',
    margin: 0,
    backgroundColor: backgroundColor || 'transparent',
  };

  return (
    <code className={className} style={style}>
      {block.properties?.title}
    </code>
  );
};

type Props = {
  recordMap: ExtendedRecordMap;
  components?: Partial<NotionComponents>;
  darkMode?: boolean;
  mapPageUrl?: (id: string) => string;
} & Omit<IProps, 'recordMap' | 'darkMode' | 'mapPageUrl' | 'components' | 'className' | 'style'>;

const NotionRenderer: FC<Props> = ({ recordMap, darkMode, mapPageUrl, components, ...props }) => {
  const [scheme] = useScheme()

  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code: CustomCode, // CustomCode 컴포넌트로 Code 컴포넌트 대체
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
          ...components,
        }}
        mapPageUrl={mapPageUrl}
        {...props}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
    /* // TODO: why render? */
    .notion-collection-page-properties {
        display: none !important;
    }
    .notion-page {
        padding: 0;
    }
    .notion-list {
        width: 100%;
    }

`