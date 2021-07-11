import { GetServerSideProps } from "next";
import { FC } from "react";

interface IProps {
  capsule: {
    id: string;
    serial: string;
    status: string;
    type: string;
    last_update: string;
  };
}

const Capsule: FC<IProps> = ({ capsule }) => {
  return (
    <div>
      <h1>
        {capsule.type} {capsule.serial}
      </h1>
      <h2>Status: {capsule.status}</h2>
      <p>{capsule.last_update}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };

  const response = await fetch(`https://api.spacexdata.com/v4/capsules/${id}`);
  const data = await response.json();

  return { props: { capsule: data } };
};

export default Capsule;
