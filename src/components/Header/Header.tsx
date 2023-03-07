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
                Main
              </Button>
              <Button component={Link} href="/characters" sx={Styled.navButtonStyles}>
                Characters
              </Button>
              <Button component={Link} href="/mobx" sx={Styled.navButtonStyles}>
                MobX
              </Button>
            </Styled.WrapperBtn>
          </Styled.Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
