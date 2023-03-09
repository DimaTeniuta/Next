import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
  height: '90vh',
}));

export const WrapperImage = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
}));
