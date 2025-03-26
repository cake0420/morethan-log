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

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()

  const customComponents = {
    Code,
    Collection,
    Equation,
    Modal,
    Pdf,
    nextImage: Image,
    nextLink: Link,
    // Custom render for h tags
    h1: (props: any) => {
      const { block, children, ...rest } = props;
      const className = block?.format?.block_color ? `notion-${block.format.block_color}` : '';
      return className.includes('notion-h') ? (
        <div {...rest}>{children}</div>
      ) : (
        <h1 {...rest}>{children}</h1>
      );
    },
    h2: (props: any) => {
      const { block, children, ...rest } = props;
      const className = block?.format?.block_color ? `notion-${block.format.block_color}` : '';
      return className.includes('notion-h') ? (
        <div {...rest}>{children}</div>
      ) : (
        <h2 {...rest}>{children}</h2> // 여기서 <h2>로 변경
      );
    },
    h3: (props: any) => {
      const { block, children, ...rest } = props;
      const className = block?.format?.block_color ? `notion-${block.format.block_color}` : '';
      return className.includes('notion-h') ? (
        <div {...rest}>{children}</div>
      ) : (
        <h3 {...rest}>{children}</h3> // 여기서 <h3>로 변경
      );
    },
  }

  console.log(customComponents.h1, customComponents.h2)
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          ...customComponents, // 여기서 customComponents를 사용합니다.
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}


export default NotionRenderer

const StyledWrapper = styled.div`
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
