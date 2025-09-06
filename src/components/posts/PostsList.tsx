import useSWR, { mutate } from "swr";
import { useState } from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import type { Post, User } from "../../types";
import { fetcher } from "../../lib/fetcher";
import DataWrapper from "../DataWrapper";

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
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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

  const sortedPosts = filteredPosts
    ?.slice()
    .sort((a: Post, b: Post) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <DataWrapper isLoading={postsLoading} error={postsError}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Posts</h1>

        <PostForm
          editingPost={editingPost}
          onFinish={() => setEditingPost(null)}
        />

        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div>
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

          <div>
            <label className="block text-gray-700 mb-2">Sort by:</label>
            <select
              className="border rounded px-4 py-2"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {sortedPosts?.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={(p) => setEditingPost(p)}
              onDelete={handleDelete}
              userName={users?.find((u) => u.id === post.userId)?.name}
            />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
};

export default PostsList;
