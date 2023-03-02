import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import * as Styled from './characters.styles';

const Characters = ({ data }: { data: ICharactersResult }) => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router?.query?.page as string) || 1);

  const goToPrevPage = () => {
    setPage((prev) => prev - 1);
    router.push({
      pathname: router.pathname,
      query: { page: page - 1 },
    });
  };

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    router.push({
      pathname: router.pathname,
      query: { page: page + 1 },
    });
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        {data.results.map((character) => (
          <Box
            key={character.id}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3 }}
          >
            <Styled.Image sx={{ backgroundImage: `url(${character.image})` }} />

            <Typography component={Link} href={`/characters/${character.id}`}>
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
        page={page}
      />
    </Styled.Container>
  );
};

export async function getServerSideProps(context: { query: { page: string } }) {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }

  const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Characters;
