import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import characterStore from '@/store/character';
import * as Styled from './mobx.id.styles';

const MobxId = observer(() => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Styled.Container>
      <Image
        src={characterStore.character.image}
        width={200}
        height={200}
        alt={'Image'}
        placeholder="blur"
        blurDataURL={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
        }
      />
      <div>{characterStore.character.name}</div>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Styled.Container>
  );
});

export default MobxId;
