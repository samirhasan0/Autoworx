import List from "@/Components/Internal/List";
import UsersArea from "@/Components/Internal/UsersArea";
import Title from "@/Components/Title";
import { useState } from "react";

export default function Internal({ users }: { users: any[] }) {
  const [usersList, setUsersList] = useState<any[]>([]); // TODO: type this

  return (
    <div>
      <Title>Communication Hub - Internal</Title>

      <div className="mt-5 flex gap-5">
        <List users={users} setUsersList={setUsersList} />
        <UsersArea
          users={users}
          usersList={usersList}
          setUsersList={setUsersList}
        />
      </div>
    </div>
  );
}
