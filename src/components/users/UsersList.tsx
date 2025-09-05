import useSWR, { mutate } from "swr";
import UserCard from "./UserCard";
import UserForm from "./UserForm";
import { useState } from "react";
import type { User } from "../../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading users.</p>
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>

      {/* Form */}
      <UserForm
        editingUser={editingUser}
        onFinish={() => setEditingUser(null)}
      />

      {/* List */}
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
    </div>
  );
};

export default UsersList;
