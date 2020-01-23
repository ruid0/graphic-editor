import React from 'react';
import styled from 'styled-components';

import { Toolbar, Canvas } from './components';

const VisualEditorWrapper = styled.div``;

export const VisualEditor = () => {
  return (
    <VisualEditorWrapper>
      <Toolbar />
      <Canvas />
    </VisualEditorWrapper>
  );
};
