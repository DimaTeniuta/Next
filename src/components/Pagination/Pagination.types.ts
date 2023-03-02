export interface IPaginationProps {
  page: number;
  isNext: boolean;
  isPrev: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
}
