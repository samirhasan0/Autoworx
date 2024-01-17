import React from "react";
import MessageBox from "./MessageBox";

export default function UsersArea({
  users,
  usersList,
  setUsersList,
}: {
  users: any[];
  usersList: any[];
  setUsersList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  return (
    <div className="w-full flex flex-wrap gap-4">
      {usersList.map((user) => {
        return (
          <MessageBox key={user.id} user={user} setUsersList={setUsersList} />
        );
      })}
    </div>
  );
}
