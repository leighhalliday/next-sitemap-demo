import Link from "next/link";
import useSWR from "swr";
import { FC } from "react";

interface ICapsule {
  id: string;
  type: string;
  serial: string;
}

const fetcher = (): Promise<ICapsule[]> =>
  fetch("https://api.spacexdata.com/v4/capsules").then((response) =>
    response.json()
  );

const Capsules: FC = () => {
  const { data } = useSWR<ICapsule[]>("capsules", fetcher);

  return (
    <div>
      <h1>Capsules</h1>

      {data ? (
        <ul>
          {data.map((capsule) => (
            <li key={capsule.id}>
              <Link href={`/capsules/${capsule.id}`}>
                <a>
                  {capsule.type} {capsule.serial}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Capsules;
