import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import { ExtendedRecordMap } from "notion-types"
import { FC, ComponentType } from "react";
import { BlockProps } from "../components/NotionRenderer/index"

interface PageDetailProps {
  recordMap: ExtendedRecordMap;
  components: {
    Code?: any;
    Collection?: any;
    Equation?: any;
    Modal?: any;
    Pdf?: any;
    nextImage?: any;
    nextLink?: any;
    Block: FC<BlockProps>;
  };
}

interface PostDetailProps {
  recordMap: ExtendedRecordMap;
  components: {
    Code?: any;
    Collection?: any;
    Equation?: any;
    Modal?: any;
    Pdf?: any;
    nextImage?: any;
    nextLink?: any;
    Block: FC<BlockProps>;
  };
}

interface Props  {
  recordMap: ExtendedRecordMap;
  components: {
    Code?: any;
    Collection?: any;
    Equation?: any;
    Modal?: any;
    Pdf?: any;
    nextImage?: any;
    nextLink?: any;
    Block: FC<BlockProps>;
  };
}

const Detail: FC<Props> = ({recordMap, components}) => {
  const data = usePostQuery()
  useMermaidEffect()

  if (!data) return null
  return (
    <StyledWrapper data-type={data.type}>
      {data.type[0] === "Page" && <PageDetail recordMap={recordMap} components={{...components, Block : components.Block }} />}
      {data.type[0] !== "Page" && <PostDetail  recordMap={recordMap} components={{...components, Block : components.Block }}/>}
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
    padding: 2rem 0;

    &[data-type="Paper"] {
        padding: 40px 0;
    }
    /** Reference: https://github.com/chriskempson/tomorrow-theme **/
    code[class*="language-mermaid"],
    pre[class*="language-mermaid"] {
        background-color: ${({ theme }) => theme.colors.gray5};
    }
`