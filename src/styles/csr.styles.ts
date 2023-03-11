import { Paper, styled } from '@mui/material';

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

export const WrapperImage = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 30,
  ':hover': { cursor: 'pointer' },
}));
