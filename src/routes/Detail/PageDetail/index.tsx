import React from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null
  return (
    <StyledWrapper>
      <NotionRenderer
        recordMap={data.recordMap}
        components={{}} // 👈 components prop 추가
      />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
    margin: 0 auto;
    max-width: 56rem;
`