import { FC } from 'react';
import * as Styled from './Pagination.styles';
import { IPaginationProps } from './Pagination.types';

const Pagination: FC<IPaginationProps> = ({ page, onClickPrev, onClickNext, isPrev, isNext }) => {
  return (
    <Styled.Wrapper>
      <Styled.Btn variant="contained" onClick={onClickPrev} disabled={isPrev}>
        Prev
      </Styled.Btn>
      <Styled.Page>{page}</Styled.Page>
      <Styled.Btn variant="contained" onClick={onClickNext} disabled={isNext}>
        Next
      </Styled.Btn>
    </Styled.Wrapper>
  );
};

export default Pagination;
