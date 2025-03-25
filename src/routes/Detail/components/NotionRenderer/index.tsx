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
import { FC, ComponentType, HTMLAttributes } from "react"
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
  block: any; // 정확한 Block 타입으로 대체
  className?: string;
  defaultLanguage?: string;
}

const CustomCode: FC<CustomCodeProps> = ({ block, className, defaultLanguage }) => {
  const backgroundColor = block?.format?.backgroundColor;
  const isHeading = block.type === 'header' || block.type === 'sub_header' || block.type === 'heading_3'; // Notion 데이터 구조에 따라 수정

  const headingStyle = isHeading ? {
    width: '100%', // 전체 가로 폭 차지
    display: 'block', // 블록 레벨 요소로 만들기
    backgroundColor: backgroundColor || 'transparent', // 배경색 적용
  } : {};

  return (
    <div style={{ ...headingStyle }}> {/* div 태그로 감싸고 스타일 적용 */}
      <code className={className}> {/* code 스타일 적용 */}
        {block.properties?.title}
      </code>
    </div>
  );
};

type Props = {
  recordMap: ExtendedRecordMap;
  components?: {
    Code?: ComponentType<CustomCodeProps>;
    Collection?: any;
    Equation?: any;
    Modal?: any;
    Pdf?: any;
    nextImage?: any;
    nextLink?: any;
  };
  darkMode?: boolean;
  mapPageUrl?: (id: string) => string;
}

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
    </_NotionRenderer>
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

`;