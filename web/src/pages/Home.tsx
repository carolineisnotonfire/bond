import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}
export const Home: React.FC<Props> = () => {
  const {data, loading} = useUsersQuery({fetchPolicy: 'network-only'});

  if (!data){
    return <div>
      loading...
    </div>
  }
  return (
    <div> 
      <div>Usuários: </div>
      <ul>
        {data.users.map(x => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          )
        })}
      </ul>
  </div>
  )

};
