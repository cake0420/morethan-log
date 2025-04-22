import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import { TPost } from "src/types"

type Props = {
  q: string
}

const POSTS_PER_PAGE = 5

const PostList: React.FC<Props> = ({ q }: Props) => {
  const router = useRouter()
  const data: TPost[] = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>(data)
  const [currentPage, setCurrentPage] = useState(1)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data
      // keyword
      newFilteredPosts = newFilteredPosts.filter((post: TPost) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post: TPost) =>
            post && post.category && post.category.includes(currentCategory)
        )
      }
      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
    setCurrentPage(1) // Reset to first page when filters change
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts, data])

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const postsToDisplay = filteredPosts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

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
        <div className="flex justify-center mt-4">
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-500 !text-white !important"
                    : "bg-gray-200 !dark:bg-gray-700 !text-gray-700 !dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-100 !dark:bg-gray-800 !text-gray-500 cursor-not-allowed"
                : "bg-gray-200 !dark:bg-gray-700 !text-gray-700 !dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-100 !dark:bg-gray-800 !text-gray-500 cursor-not-allowed"
                : "bg-gray-200 !dark:bg-gray-700 !text-gray-700 !dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 !dark:bg-gray-800 !text-gray-500 cursor-not-allowed"
                : "bg-gray-200 !dark:bg-gray-700 !text-gray-700 !dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 !dark:bg-gray-800 !text-gray-500 cursor-not-allowed"
                : "bg-gray-200 !dark:bg-gray-700 !text-gray-700 !dark:text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      )}
    </>
  )
}

export default PostList
