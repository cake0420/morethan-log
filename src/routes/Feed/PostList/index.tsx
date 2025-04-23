import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";
import { TPost } from "src/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Props = {
  q: string;
};

const POSTS_PER_PAGE = 4;

const PostList: React.FC<Props> = ({ q }: Props) => {
  const router = useRouter();
  const data: TPost[] = usePostsQuery();
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>(data);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTag = `${router.query.tag || ``}` || undefined;
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;
  const currentOrder = `${router.query.order || ``}` || "desc";

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data;

      newFilteredPosts = newFilteredPosts.filter((post: TPost) => {
        const tagContent = post.tags ? post.tags.join(" ") : "";
        const searchContent = post.title + post.summary + tagContent;
        return searchContent.toLowerCase().includes(q.toLowerCase());
      });

      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) => post?.tags?.includes(currentTag)
        );
      }

      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) => post?.category?.includes(currentCategory)
        );
      }

      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse();
      }

      return newFilteredPosts;
    });

    setCurrentPage(1);
  }, [q, currentTag, currentCategory, currentOrder, data]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbersToShow = () => {
    const pages: number[] = [];
    const maxButtons = 5;

    // 페이지 그룹 기준으로 범위 계산
    const currentGroup = Math.floor((currentPage - 1) / maxButtons);
    const start = currentGroup * maxButtons + 1;
    const end = Math.min(start + maxButtons - 1, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };


  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
        )}
        {postsToDisplay.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationNav>
          <PageIndicator>
            Page {currentPage} of {totalPages}
          </PageIndicator>

          <ButtonsContainer>
            <PrevButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            <PageNumbersContainer>
              {getPageNumbersToShow().map((pageNumber) => (
                <PageNumberButton
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PageNumberButton>
              ))}
            </PageNumbersContainer>

            <NextButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </ButtonsContainer>
        </PaginationNav>
      )}
    </>
  );
};

export default PostList;

// Styled Components
const PaginationNav = styled.nav`
  margin: 2rem auto;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray12 : "rgb(243, 244, 246)"};
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: fit-content;
`;

const PageIndicator = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray10};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const PageNumbersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BaseButton = styled.button<{ disabled?: boolean }>`
  height: 2.5rem;
  padding: 0 1.25rem;
  border-radius: 0.5rem;
  color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray12 : "rgb(243, 244, 246)"};
  display: flex;
  align-items: center;
  transition: all 0.3s;
  font-weight: 500;
  opacity: ${({ disabled }) => (disabled ? "0.3" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
`;

const PrevButton = styled(BaseButton)`
  background: ${({ theme }) =>
    theme.scheme === "light"
      ? "linear-gradient(to right, rgb(229, 231, 235), rgb(209, 213, 219))"
      : "linear-gradient(to right, rgb(31, 41, 55), rgb(55, 65, 81))"};

  &:hover:not(:disabled) {
    background: linear-gradient(to right, rgb(37, 99, 235), rgb(79, 70, 229));
  }

  &::before {
    content: "< Prev";
    font-weight: 500;
  }

  &:hover:not(:disabled)::before {
    color: white;
  }
`;

const NextButton = styled(BaseButton)`
  background: ${({ theme }) =>
    theme.scheme === "light"
      ? "linear-gradient(to right, rgb(209, 213, 219), rgb(229, 231, 235))"
      : "linear-gradient(to right, rgb(55, 65, 81), rgb(31, 41, 55))"};

  &:hover:not(:disabled) {
    background: linear-gradient(to right, rgb(79, 70, 229), rgb(37, 99, 235));
  }

  &::before {
    content: "Next >";
    font-weight: 500;
  }

  &:hover:not(:disabled)::before {
    color: white;
  }
`;

const PageNumberButton = styled.button<{ isActive?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  transition: all 0.3s;
  font-weight: 500;

  ${({ isActive, theme }) =>
    isActive
      ? css`
        background-color: rgb(37, 99, 235);
        color: white;
        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
        transform: scale(1.1);
      `
      : css`
        color: ${theme.scheme === "light" ? theme.colors.gray12 : "white"};
        background-color: ${theme.scheme === "light"
          ? "rgb(229, 231, 235)"
          : theme.colors.gray6};

        &:hover {
          background-color: ${theme.scheme === "light"
            ? "white"
            : theme.colors.gray7};
          transform: scale(1.05);
        }
      `}
`;
