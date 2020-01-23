import React from 'react';
import styled from 'styled-components';

import RedoIcon from '@atlaskit/icon/glyph/redo';
import UndoIcon from '@atlaskit/icon/glyph/undo';
import ImageBorderIcon from '@atlaskit/icon/glyph/image-border';
import EditorBackgroundColorIcon from '@atlaskit/icon/glyph/editor/background-color';
import MediaServicesLineThicknessIcon from '@atlaskit/icon/glyph/media-services/line-thickness';
import MediaServicesRectangleIcon from '@atlaskit/icon/glyph/media-services/rectangle';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';
import MediaServicesAnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';

import { triggeredAction } from './model';

const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: var(--sec-bg-color);
  padding: 0 22px;
`;

const ActionWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-color-hover);
  }
`;

export const Toolbar = () => {
  const triggerAction = action => _ => {
    triggeredAction(action);
  };

  return (
    <ToolbarWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'undo' })}>
        <UndoIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'redo' })}>
        <RedoIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'changeBgColor' })}>
        <EditorBackgroundColorIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'changeBorderColor' })}>
        <ImageBorderIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'draw', shape: 'line' })}>
        <MediaServicesLineThicknessIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'draw', shape: 'rect' })}>
        <MediaServicesRectangleIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'draw', shape: 'circle' })}>
        <MediaServicesPreselectedIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'draw' })}>
        <MediaServicesAnnotateIcon />
      </ActionWrapper>
      <ActionWrapper onClick={triggerAction({ type: 'import' })}>
        <AttachmentIcon />
      </ActionWrapper>
    </ToolbarWrapper>
  );
};
