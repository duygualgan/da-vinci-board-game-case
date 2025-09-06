import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

type Post = {
  id?: number;
  userId: number;
  title: string;
  body: string;
};

interface PostFormProps {
  editingPost?: Post | null;
  onFinish?: () => void;
}

function PostForm({ editingPost, onFinish }: PostFormProps) {
  const [formData, setFormData] = useState<Post>({
    userId: 1,
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setFormData(editingPost);
    }
  }, [editingPost]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleReset = () => {
    setFormData({ userId: 1, title: "", body: "" });
    toast.info("Form cleared");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPost
        ? `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`
        : "https://jsonplaceholder.typicode.com/posts";

      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const key = "https://jsonplaceholder.typicode.com/posts";

      if (editingPost) {
        mutate(
          key,
          (posts: Post[] = []) =>
            posts.map((p) =>
              p.id === editingPost.id ? { ...p, ...formData } : p
            ),
          false
        );
        toast.success("Post updated successfully!");
      } else {
        mutate(
          key,
          (posts: Post[] = []) => [{ ...formData, id: data.id }, ...posts],
          false
        );
        toast.success("Post created successfully!");
      }

      setFormData({ userId: 1, title: "", body: "" });
      onFinish?.();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const isFormEmpty =
    formData.userId === 1 &&
    formData.title.trim() === "" &&
    formData.body.trim() === "";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {editingPost ? "Edit Post" : "Create Post"}
      </h2>

      <input
        type="number"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID"
        required
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <textarea
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Body"
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
            ? editingPost
              ? "Updating..."
              : "Creating..."
            : editingPost
            ? "Update"
            : "Create"}
        </button>

        {!isFormEmpty && (
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

export default PostForm;
