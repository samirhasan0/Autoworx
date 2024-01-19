import List from "@/Components/Collaboration/List";
import UsersArea from "@/Components/Collaboration/UsersArea";
import Title from "@/Components/Title";
import React, { useState } from "react";

export default function Collaboration({ companies }: { companies: any[] }) {
  const [selectedUsersList, setSelectedUsersList] = useState<any[]>([]); // TODO: type this

  return (
    <div>
      <Title>Communication Hub - Collaboration</Title>

      <div className="mt-5 flex gap-5">
        <List
          companies={companies}
          setSelectedUsersList={setSelectedUsersList}
        />
        <UsersArea
          selectedUsersList={selectedUsersList}
          setSelectedUsersList={setSelectedUsersList}
        />
      </div>
    </div>
  );
}
