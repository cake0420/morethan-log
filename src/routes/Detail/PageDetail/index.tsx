import React from 'react';
import styled from '@emotion/styled';
import { ExtendedRecordMap, CodeBlock } from 'notion-types';
import NotionRenderer from '../components/NotionRenderer'; // NotionRenderer 컴포넌트 경로 확인
import { FC, ComponentType } from 'react';
import { BlockProps } from '../components/NotionRenderer/index';

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
    Block?: FC<BlockProps>; // global.d.ts에서 확장한 타입 사용
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

`;