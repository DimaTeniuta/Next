import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { ICharacter, ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import characterStore from '@/store/character';
import pageStore from '@/store/page';
import * as Styled from './mobx.styles';

const Mobx = observer(({ data }: { data: ICharactersResult }) => {
  const router = useRouter();

  useEffect(() => {
    if (parseInt(router?.query?.page as string) !== pageStore.page) {
      pageStore.setPage(parseInt(router?.query?.page as string));
    }
  }, [router?.query?.page]);

  const goToPrevPage = () => {
    pageStore.decreasePage();
    router.push({
      pathname: router.pathname,
      query: { page: pageStore.page },
    });
  };

  const goToNextPage = () => {
    pageStore.increasePage();
    router.push({
      pathname: router.pathname,
      query: { page: pageStore.page },
    });
  };

  const handleClick = (character: ICharacter) => {
    return () => {
      characterStore.setCharacter(character);
      router.push(`/mobx/${character.id}`);
    };
  };

  return (
    <Styled.Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>With MobX</Box>
      <Styled.Wrapper>
        {data.results.map((character) => (
          <Box
            key={character.id}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3 }}
          >
            <Image
              src={character.image}
              width={200}
              height={200}
              alt={'Image'}
              placeholder="blur"
              blurDataURL={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mN0cAipZyACMI4qpK9CAI/7DUlmLGLbAAAAAElFTkSuQmCC'
              }
            />

            <Typography onClick={handleClick(character)} sx={{ ':hover': { cursor: 'pointer' } }}>
              {character.name}
            </Typography>
          </Box>
        ))}
      </Styled.Wrapper>

      <Pagination
        onClickNext={goToNextPage}
        onClickPrev={goToPrevPage}
        isNext={!data.info.next}
        isPrev={!data.info.prev}
        page={pageStore.page}
      />
    </Styled.Container>
  );
});

export async function getServerSideProps(context: { query: { page: string } }) {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/?page=${page}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Mobx;
