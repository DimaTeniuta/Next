import Image from 'next/image';
import { ICharacter } from '@/interfaces/character';
import * as Styled from '@/styles/index.styles';
import { BLUR_IMAGE } from '@/constants/blurImage';

export default function Home({ data }: { data: ICharacter }) {
  return (
    <Styled.Container>
      <Styled.WrapperImage elevation={8}>
        <Image
          src={data.image}
          width={400}
          height={400}
          alt={'Image'}
          placeholder="blur"
          blurDataURL={BLUR_IMAGE}
        />
      </Styled.WrapperImage>
    </Styled.Container>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/66`);
  const data = await res.json();
  return {
    props: { data },
  };
}
