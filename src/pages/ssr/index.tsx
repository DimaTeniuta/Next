import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Search } from '@mui/icons-material';
import { ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import { BLUR_IMAGE } from '@/constants/blurImage';
import * as Styled from '../../styles/ssr.styles';

const Characters = ({ data }: { data: ICharactersResult }) => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router?.query?.page as string) || 1);
  const [searchValue, setSearchValue] = useState('');

  const goToPrevPage = () => {
    setPage((prev) => prev - 1);
    router.push(
      {
        pathname: router.pathname,
        query: { page: page - 1 },
      },
      undefined,
      { scroll: false }
    );
  };

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    router.push(
      {
        pathname: router.pathname,
        query: { page: page + 1 },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value);
  };

  const handleClick = (id: number) => {
    return () => router.push(`/ssr/${id}`);
  };

  return (
    <Styled.Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>SSR</Box>

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
            <Styled.WrapperImage
              elevation={3}
              key={character.id}
              onClick={handleClick(character.id)}
            >
              <Image
                src={character.image}
                width={200}
                height={200}
                alt={'Image'}
                placeholder="blur"
                blurDataURL={BLUR_IMAGE}
              />

              <Typography>{character.name}</Typography>
            </Styled.WrapperImage>
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/?page=${page}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Characters;
