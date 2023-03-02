import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import * as Styled from './characters.styles';

const Characters = ({ data }: { data: ICharactersResult }) => {
  const [characters, setCharacters] = useState(data);
  const [page, setPage] = useState(1);
  console.log(characters);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => console.log(1111, data));
  }, []);

  const goToPrevPage = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}?page=${page - 1}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setPage((prev) => prev - 1);
      })
      .catch((err) => console.error(err.massage));
  };

  const goToNextPage = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}?page=${page + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setPage((prev) => prev + 1);
      })
      .catch((err) => console.error(err.massage));
  };

  return (
    <Styled.Container>
      <Styled.Wrapper>
        {characters.results.map((character) => (
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
        isNext={!characters.info.next}
        isPrev={!characters.info.prev}
        page={page}
      />
    </Styled.Container>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Characters;
