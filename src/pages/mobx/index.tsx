import { Box, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { Search } from '@mui/icons-material';
import { ICharacter, ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import characterStore from '@/store/character';
import pageStore from '@/store/page';
import * as Styled from '../../styles/mobx.styles';

const Mobx = observer(({ data }: { data: ICharactersResult }) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (parseInt(router?.query?.page as string) !== pageStore.page) {
      pageStore.setPage(parseInt(router?.query?.page as string) || 1);
    }
  }, [router?.query?.page]);

  const goToPrevPage = () => {
    pageStore.decreasePage();
    router.push(
      {
        pathname: router.pathname,
        query: { page: pageStore.page },
      },
      undefined,
      { scroll: false }
    );
  };

  const goToNextPage = () => {
    pageStore.increasePage();
    router.push(
      {
        pathname: router.pathname,
        query: { page: pageStore.page },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleClick = (character: ICharacter) => {
    return () => {
      characterStore.setCharacter(character);
      router.push(`/mobx/${character.id}`);
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value);
  };

  return (
    <Styled.Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>With MobX</Box>

      <TextField
        color="secondary"
        placeholder={'Search...'}
        InputProps={{ startAdornment: <Search /> }}
        size="small"
        inputProps={{ sx: { px: '10px' } }}
        onChange={handleSearch}
        value={searchValue}
      />

      <Styled.Wrapper>
        {data.results
          .filter((character) => character.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((character) => (
            <Paper
              elevation={3}
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
            </Paper>
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
