import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import characterStore from '@/store/character';
import * as Styled from './mobx.id.styles';

const MobxId = observer(() => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Styled.Container>
      <Styled.WrapperImage elevation={3}>
        <Image
          src={characterStore.character.image}
          width={400}
          height={400}
          alt={'Image'}
          placeholder="blur"
          blurDataURL={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
          }
        />
        <Typography>{characterStore.character.name}</Typography>
      </Styled.WrapperImage>

      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Styled.Container>
  );
});

export default MobxId;
