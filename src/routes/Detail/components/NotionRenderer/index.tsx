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
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h1 {...props} />
      )
    },
    h2: (props: any) => {
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h2 {...props} />
      )
    },
    h3: (props: any) => {
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h3 {...props} />
      )
    },
    h4: (props: any) => {
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h4 {...props} />
      )
    },
    h5: (props: any) => {
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h5 {...props} />
      )
    },
    h6: (props: any) => {
      return props.className === 'notion-h' ? (
        <div>{props.children}</div>
      ) : (
        <h6 {...props} />
      )
    },
  }

  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          ...customComponents,
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
