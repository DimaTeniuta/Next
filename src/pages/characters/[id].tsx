import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { ICharacter } from '@/interfaces/character';
import * as Styled from './characters.id.styles';

const Character = ({ data }: { data: ICharacter }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Styled.Container>
      <Styled.WrapperImage>
        <Image
          src={data.image}
          width={400}
          height={400}
          alt={'Image'}
          placeholder="blur"
          blurDataURL={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
          }
        />
        <Typography>{data.name}</Typography>
      </Styled.WrapperImage>

      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Styled.Container>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Character;
