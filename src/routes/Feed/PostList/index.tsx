import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";
import { TPost } from "src/types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  q: string;
};

const POSTS_PER_PAGE = 5;

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

      // keyword
      newFilteredPosts = newFilteredPosts.filter((post: TPost) => {
        const tagContent = post.tags ? post.tags.join(" ") : "";
        const searchContent = post.title + post.summary + tagContent;
        return searchContent.toLowerCase().includes(q.toLowerCase());
      });

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) => post && post.tags && post.tags.includes(currentTag)
        );
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) =>
            post && post.category && post.category.includes(currentCategory)
        );
      }

      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse();
      }

      return newFilteredPosts;
    });

    setCurrentPage(1); // Reset to first page when filters change
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts, data]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        <nav className="flex justify-center items-center mt-4 bg-gray-900 text-gray-100 rounded-lg py-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            <FaChevronLeft className="inline-block mr-2" />
            Prev
          </button>

          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`mx-1 px-3 py-1 rounded-full ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 bg-gray-100 hover:bg-blue-200"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            Next
            <FaChevronRight className="inline-block ml-2" />
          </button>
        </nav>
      )}
    </>
  );
};

export default PostList;
