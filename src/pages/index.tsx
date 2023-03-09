import Image from 'next/image';
import { ICharacter } from '@/interfaces/character';
import * as Styled from '@/styles/index.styles';

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
          blurDataURL={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
          }
        />
      </Styled.WrapperImage>
    </Styled.Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/66`);
  const data = await res.json();
  return {
    props: { data },
  };
}
