import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
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

import { NotionRenderer as ReactNotionXNotionRenderer } from 'react-notion-x';

// Declaration Merging을 사용하여 react-notion-x의 IProps 인터페이스 확장
declare module 'react-notion-x' {
  interface IProps {
    recordMap: ExtendedRecordMap;
    darkMode?: boolean;
    mapPageUrl?: (id: string) => string;
    blockRenderer?: (block: any) => React.ReactNode;
  }
}

type Props = React.ComponentProps<typeof ReactNotionXNotionRenderer>;
const NotionRenderer: FC<Props> = ({ recordMap, darkMode, mapPageUrl, blockRenderer, ...props }) => {
  const [scheme] = useScheme()

  const getInlineCodeStyle = (block: any) => { // block 타입을 any로 임시 처리
    // block에서 스타일 정보 추출 (예시)
    const backgroundColor = block?.format?.backgroundColor;
    return {
      width: '100%',
      display: 'inline-block',
      padding: '2px 4px',
      margin: 0,
      backgroundColor: backgroundColor || 'transparent', // 배경색이 없으면 투명하게 처리
    };
  };

  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
        blockRenderer={blockRenderer}
        {...props} // 나머지 props 전달
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