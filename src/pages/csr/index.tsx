import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { Search } from '@mui/icons-material';
import { ICharacter, ICharactersResult } from '@/interfaces/character';
import Pagination from '@/components/Pagination';
import characterStore from '@/store/character';
import pageStore from '@/store/page';
import { BLUR_IMAGE } from '@/constants/blurImage';
import { Spinner } from '@/components/Spinner';
import * as Styled from '../../styles/csr.styles';

const Csr = observer(() => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const [data, setData] = useState<ICharactersResult>({} as ICharactersResult);

  useEffect(() => {
    if (parseInt(router?.query?.page as string) !== pageStore.page) {
      pageStore.setPage(parseInt(router?.query?.page as string) || 1);
    }
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/?page=${pageStore.page}`);
      const data = await res.json();
      setData(data);
    };
    getData();
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
      router.push(`/csr/${character.id}`);
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value);
  };

  return (
    <Styled.Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>CSR</Box>

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
        {data.results ? (
          data.results
            .filter((character) => character.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((character) => (
              <Styled.WrapperImage
                elevation={3}
                key={character.id}
                onClick={handleClick(character)}
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
            ))
        ) : (
          <Spinner />
        )}
      </Styled.Wrapper>

      <Pagination
        onClickNext={goToNextPage}
        onClickPrev={goToPrevPage}
        isNext={!data.info?.next}
        isPrev={!data.info?.prev}
        page={pageStore.page}
      />
    </Styled.Container>
  );
});

export default Csr;
