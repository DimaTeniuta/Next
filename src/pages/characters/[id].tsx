import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { ICharacter } from '@/interfaces/character';

const Character = ({ data }: { data: ICharacter }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
      <div>{data.name}</div>
    </>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Character;
