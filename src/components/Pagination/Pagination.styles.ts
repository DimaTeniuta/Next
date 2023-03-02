import { Button, styled } from '@mui/material';

export const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: 20,
}));

export const Page = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Btn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
