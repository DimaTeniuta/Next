import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { ICharacter, ICharactersResult } from '@/interfaces/character';
import * as Styled from './characters.styles';

const Characters = ({ data }: { data: ICharactersResult }) => {
  console.log(data);
  const [characters, setCharacters] = useState(data);

  const handleClick = (data: ICharacter) => {
    return () => console.log(data);
  };

  return (
    <Styled.Wrapper>
      {characters.results.map((character) => (
        <Box
          key={character.id}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3 }}
        >
          <Styled.Image
            sx={{ backgroundImage: `url(${character.image})` }}
            onClick={handleClick(character)}
          />

          <Typography component={Link} href={`/characters/${character.id}`}>
            {character.name}
          </Typography>
        </Box>
      ))}
    </Styled.Wrapper>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/character`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Characters;
