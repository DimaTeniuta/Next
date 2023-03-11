import { AppBar, Container, Button } from '@mui/material';
import Link from 'next/link';
import * as Styled from './Header.styles';

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Styled.Toolbar>
            <Styled.WrapperBtn>
              <Button component={Link} href="/" sx={Styled.navButtonStyles}>
                Rick and Morty
              </Button>
              <Button component={Link} href="/ssr" sx={Styled.navButtonStyles}>
                SSR
              </Button>
              <Button component={Link} href="/csr" sx={Styled.navButtonStyles}>
                CSR
              </Button>
            </Styled.WrapperBtn>
          </Styled.Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
