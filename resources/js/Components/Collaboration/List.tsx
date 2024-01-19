import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function List({
  companies,
  setSelectedUsersList,
}: {
  companies: any[];
  setSelectedUsersList: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [selectedCompany, setSelectedCompany] = useState<any>(null); // TODO: type this

  return (
    <div className="w-[23%] h-[83vh] rounded-lg bg-white app-shadow p-3">
      {/* Header */}
      <h2 className="text-[#797979] text-[14px]">User List</h2>

      {/* Search */}
      <form>
        <input
          type="text"
          placeholder="Search here..."
          className="text-[#797979] text-[12px] border-none p-2 my-3 mr-2 rounded-md max-[1822px]:w-full"
        />
        <button
          type="submit"
          className="text-[12px] bg-[#797979] w-[62px] h-[26px] text-white rounded-md"
        >
          Filter
        </button>
      </form>

      {/* List */}
      <div className="flex flex-col gap-1 mt-2 overflow-y-auto h-[88%] max-[2127px]:h-[80%]">
        {companies.map((company) => {
          if (selectedCompany && selectedCompany.id === company.id) {
            return (
              <div key={company.id} className="bg-[#006D77] rounded-lg p-2">
                <button
                  className="flex items-center justify-center gap-1 w-full"
                  onClick={() => setSelectedCompany(null)}
                >
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-[50px] h-[50px] rounded-full max-[1400px]:w-[40px] max-[1400px]:h-[40px]"
                  />

                  <p className="font-bold text-[12px] text-white">
                    {company.name}
                  </p>
                </button>

                <div className="flex items-center gap-1 flex-col">
                  {company.users.map((user: any) => {
                    return (
                      <button
                        key={user.id}
                        className="flex items-center gap-2 rounded-md p-1 bg-[#F2F2F2] w-full"
                        onClick={() => {
                          // add this user to the list (if not already in it)
                          setSelectedUsersList((usersList) => {
                            if (usersList.find((u) => u.id === user.id)) {
                              return usersList;
                            }
                            return [...usersList, user];
                          });
                        }}
                      >
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-[50px] h-[50px] rounded-full max-[1400px]:w-[40px] max-[1400px]:h-[40px]"
                        />
                        <div className="flex flex-col">
                          <p className="font-bold text-[12px] text-[#797979]">
                            {user.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <button
              key={company.id}
              className="flex items-center gap-2 rounded-md p-2 bg-[#F2F2F2]"
              onClick={() => setSelectedCompany(company)}
            >
              <img
                src={company.image}
                alt={company.name}
                className="w-[50px] h-[50px] rounded-full max-[1400px]:w-[40px] max-[1400px]:h-[40px]"
              />

              <p className="font-bold text-[12px] text-[#797979]">
                {company.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
