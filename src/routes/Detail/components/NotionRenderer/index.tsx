import React from 'react';
import styled from '@emotion/styled';
import { ExtendedRecordMap } from 'notion-types';
import NotionRenderer from '../components/NotionRenderer'; // NotionRenderer 컴포넌트 경로 확인

interface PageDetailProps {
  recordMap: ExtendedRecordMap;
  components : any
}

const PageDetail: React.FC<PageDetailProps> = ({ recordMap, components }) => {
  return (
    <StyledWrapper>
      <NotionRenderer recordMap={recordMap} components={components} />
    </StyledWrapper>
  );
};

export default PageDetail;


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
