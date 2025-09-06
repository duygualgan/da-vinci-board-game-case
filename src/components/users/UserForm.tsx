/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

type User = {
  id?: number;
  name: string;
  email: string;
  phone: string;
};

interface UserFormProps {
  editingUser?: User | null;
  onFinish?: () => void;
}

function UserForm({ editingUser, onFinish }: UserFormProps) {
  const initialFormData: User = { name: "", email: "", phone: "" };

  const [formData, setFormData] = useState<User>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingUser
        ? `https://jsonplaceholder.typicode.com/users/${editingUser.id}`
        : "https://jsonplaceholder.typicode.com/users";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      const key = "https://jsonplaceholder.typicode.com/users";

      if (editingUser) {
        mutate(
          key,
          (users: User[] = []) =>
            users.map((u) =>
              u.id === editingUser.id ? { ...u, ...formData } : u
            ),
          false
        );
        toast.success("User updated successfully! ");
      } else {
        mutate(
          key,
          (users: User[] = []) => [...users, { ...formData, id: data.id }],
          false
        );
        toast.success("User created successfully! ");
      }

      setFormData(initialFormData);
      onFinish?.();
    } catch (err) {
      toast.error("Something went wrong! ");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    toast.info("Form cleared");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {editingUser ? "Edit User" : "Create User"}
      </h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex-1"
        >
          {loading
            ? editingUser
              ? "Updating..."
              : "Creating..."
            : editingUser
            ? "Update"
            : "Create"}
        </button>

        {(formData.name || formData.email || formData.phone) && (
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition flex-1"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
