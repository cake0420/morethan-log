import React, { FC } from 'react';
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import useScheme from "src/hooks/useScheme";
import styled from "@emotion/styled";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
);

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
);

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

type Props = {
  recordMap: ExtendedRecordMap;
};

// 제목 행 컴포넌트 오버라이딩
const CustomHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="notion-header-block"> {/* div로 감싸기 */}
      {children}
    </div>
  );
};

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme();

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
          Header: CustomHeading, // Header 컴포넌트 오버라이딩
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  );
};

export default NotionRenderer;

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

    /* 제목 행 스타일 */
    .notion-header-block {
        /* 모든 heading block 에 적용*/
        & > h2,
        & > h3,
        & > h4 {
            /* h2, h3, h4 태그를 div로 감싸기 */
            display: block; /* 또는 inline-block */
            /* 필요한 스타일 추가 */
            margin-bottom: 1rem; /* 예시 */
            /* background-color: #f0f0f0; /* 예시 */
        }
    }
`;