import React from 'react';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';

const Container = styled(Box)`
  margin: auto;
  width: fit-content;
  display: flex;
  gap: 16px;
`;

interface ComponentProps {
  handleRecordClick: () => void;
  handleCaptureClick: () => void;
  isRecording: boolean;
}

const Controls: React.FC<ComponentProps> = ({ handleRecordClick, handleCaptureClick, isRecording }) => {
  return (
    <Container>
      <Button variant='contained' onClick={handleRecordClick}>
        {isRecording ? 'Recording' : 'Record'}
      </Button>
      <Button variant='outlined' color='error' onClick={handleCaptureClick}>
        Capture
      </Button>
    </Container>
  );
};

export default Controls;
