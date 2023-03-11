import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import errorImage from '../../../public/error.jpg';
import notFoundImage from '../../../public/404.jpg';
import * as Styled from './Error.styles';

export const Error = ({ isError = true }: { isError?: boolean }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Styled.Container>
      <Styled.WrapperImage elevation={3}>
        <Image
          src={isError ? errorImage : notFoundImage}
          width={400}
          height={400}
          alt={'Image'}
          placeholder="blur"
          blurDataURL={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
          }
        />
      </Styled.WrapperImage>

      <Button variant="contained" onClick={handleGoBack}>
        Go Home
      </Button>
    </Styled.Container>
  );
};
