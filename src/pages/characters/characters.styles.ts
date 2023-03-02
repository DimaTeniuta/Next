import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
}));

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
  padding: '20px',
}));

export const Image = styled('div')(() => ({
  width: 200,
  height: 200,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));
