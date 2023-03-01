import { Box, Typography } from '@mui/material';
import { ICharactersResult } from '@/interfaces/character';
import * as Styled from '@/styles/characters.styles';

const Characters = ({ data }: { data: ICharactersResult }) => {
  console.log(data);

  return (
    <Styled.Wrapper>
      {data.results.map((character) => (
        <Box
          key={character.id}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 3 }}
        >
          <Styled.Image sx={{ backgroundImage: `url(${character.image})` }} />
          <Typography>{character.name}</Typography>
        </Box>
      ))}
    </Styled.Wrapper>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/character`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Characters;
