import { styled, Toolbar as MuiToolbar } from '@mui/material';

export const Toolbar = styled(MuiToolbar)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const WrapperBtn = styled('div')(() => ({
  display: 'flex',
  columnGap: 10,
}));

export const navButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 14,
  '&:hover': {
    color: 'secondary.main',
  },
  textDecoration: 'none',
  color: 'primary.contrastText',
  backgroundColor: 'secondary.main',
};
