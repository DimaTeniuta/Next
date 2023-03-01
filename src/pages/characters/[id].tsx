import { ICharacter } from '@/interfaces/character';

const Character = ({ data }: { data: ICharacter }) => {
  return <div>{data.name}</div>;
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.BASE_URL}/character/${params.id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Character;
