import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import characterStore from '@/store/character';
import { BLUR_IMAGE } from '@/constants/blurImage';
import * as Styled from '../../styles/csr.id.styles';

const CsrId = observer(() => {
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
          blurDataURL={BLUR_IMAGE}
        />
        <Typography>{characterStore.character.name}</Typography>
      </Styled.WrapperImage>

      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </Styled.Container>
  );
});

export default CsrId;
