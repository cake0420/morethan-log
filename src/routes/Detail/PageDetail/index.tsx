import React from 'react';
import styled from '@emotion/styled';
import { ExtendedRecordMap } from 'notion-types';
import NotionRenderer from '../components/NotionRenderer'; // NotionRenderer 컴포넌트 경로 확인

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
  };
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
    /* 스타일 정의 */
`;