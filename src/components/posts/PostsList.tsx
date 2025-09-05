import useSWR, { mutate } from "swr";
import { useState } from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import type { Post } from "../../types";

type User = {
  id: number;
  name: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostsList = () => {
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR<Post[]>("https://jsonplaceholder.typicode.com/posts", fetcher);

  const { data: users } = useSWR<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    mutate(
      "https://jsonplaceholder.typicode.com/posts",
      (posts: Post[] = []) => posts.filter((p) => p.id !== id),
      false
    );
  };

  const filteredPosts = selectedUser
    ? posts?.filter((post) => post.userId === selectedUser.id)
    : posts;

  if (postsLoading) return <p className="text-center mt-10">Loading...</p>;
  if (postsError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading posts.</p>
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Posts</h1>

      <PostForm
        editingPost={editingPost}
        onFinish={() => setEditingPost(null)}
      />

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Filter User:</label>
        <select
          className="border rounded px-4 py-2"
          value={selectedUser?.id || ""}
          onChange={(e) => {
            const userId = Number(e.target.value);
            const user = users?.find((u) => u.id === userId) || null;
            setSelectedUser(user);
          }}
        >
          <option value="">All Users</option>
          {users?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredPosts
          ?.slice()
          .sort((a: Post, b: Post) => b.id - a.id)
          .map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={(p) => setEditingPost(p)}
              onDelete={handleDelete}
              userName={users?.find(u => u.id === post.userId)?.name}
            />
          ))}
      </div>
    </div>
  );
};

export default PostsList;
