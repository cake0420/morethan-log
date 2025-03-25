import React from 'react';
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

// 제목 행 컴포넌트 오버라이딩
const CustomHeading = ({ children, level }: { children: React.ReactNode; level: 1 | 2 | 3 }) => {
  let Tag: string = 'h2'; // Tag 타입을 string으로 변경
  switch(level){
    case 1:
      Tag = 'h1';
      break;
    case 2:
      Tag = 'h2';
      break;
    case 3:
      Tag = 'h3';
      break;
  }

  return (
    <div> {/* div로 감싸기 */}
      {React.createElement(Tag, null, children)} {/* React.createElement 사용 */}
    </div>
  );
};

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
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
          // Heading: CustomHeading, // 제목 행 컴포넌트 오버라이딩
          h1: (props) => <CustomHeading level={1} {...props}/>,
          h2: (props) => <CustomHeading level={2} {...props}/>,
          h3: (props) => <CustomHeading level={3} {...props}/>,
        }}
        mapPageUrl={mapPageUrl}
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