import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import { ExtendedRecordMap, CodeBlock } from "notion-types";
import { FC, ComponentType } from "react";
import { CustomCodeProps, BlockProps } from '../components/NotionRenderer/components/NotionRenderer'; // 수정된 import 경로

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

const PostDetail: React.FC<PostDetailProps> = ({recordMap, components}) => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={recordMap} components={components}/>
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    border-radius: 1.5rem;
    max-width: 56rem;
    background-color: ${({ theme }) =>
            theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin: 0 auto;
    > article {
        margin: 0 auto;
        max-width: 42rem;
    }
`