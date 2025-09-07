import useSWR, { mutate } from "swr";
import UserCard from "./UserCard";
import { useState } from "react";
import type { User } from "../../types";
import { fetcher } from "../../lib/fetcher";
import DataWrapper from "../DataWrapper";
import GenericForm from "../GenericForm";

const UsersList = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });
    mutate(
      "https://jsonplaceholder.typicode.com/users",
      (users: User[] = []) => users.filter((u) => u.id !== id),
      false
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>
      <DataWrapper isLoading={isLoading} error={error}>
        <GenericForm
          initialData={{ name: "", email: "", phone: "" }}
          fields={[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone" },
          ]}
          apiUrl="https://jsonplaceholder.typicode.com/users"
          editingItem={editingUser}
          onFinish={() => setEditingUser(null)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {data?.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => setEditingUser(u)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
};

export default UsersList;
