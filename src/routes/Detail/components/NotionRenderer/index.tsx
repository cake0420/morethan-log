import { NotionComponents } from 'react-notion-x'; // NotionComponents 타입 import
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap, CodeBlock, Block as NotionBlock } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC, ComponentType, HTMLAttributes, ReactNode } from "react"
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

interface CustomCodeProps {
  block: CodeBlock;
  className?: string;
  defaultLanguage?: string;
}

interface BlockProps {
  block: NotionBlock;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageTitle?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;
  hideBlockId?: boolean;
  disableHeader?: boolean;
  level?: number;
}

const CustomBlock: FC<BlockProps> = ({ block, children, className }) => {
  const headingStyle = {
    width: '100%',
    display: 'block',
    backgroundColor: block?.format?.block_color || 'transparent',
  };

  let Tag:any = 'h1'
  if (block.type === 'sub_header') {
    Tag = 'h2'
  } else if (block.type === 'sub_sub_header') {
    Tag = 'h3'
  }

  return (
    <div style={headingStyle}>
      <Tag className={className}>
        {block.properties?.title?.[0]?.[0]}
      </Tag>
      {children}
    </div>
  );
};

type Props = {
  recordMap: ExtendedRecordMap;
  components?: Partial<NotionComponents> ;
  darkMode?: boolean;
  mapPageUrl?: (id: string) => string;
}

const NotionRenderer: FC<Props> = ({ recordMap, darkMode, mapPageUrl, components, }) => {
  const [scheme] = useScheme()

  return (
    <_NotionRenderer
      darkMode={scheme === "dark"}
      recordMap={recordMap}
      components={{
        ...components,
        Block: CustomBlock, // CustomBlock 컴포넌트로 Block 컴포넌트 대체
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
        nextImage: Image,
        nextLink: Link,
      }}
      mapPageUrl={mapPageUrl}
    />
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

`;