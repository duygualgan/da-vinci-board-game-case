import useSWR, { mutate } from "swr";
import { useEffect, useMemo, useState } from "react";
import PostCard from "../posts/PostCard";
import type { Post, User } from "../../types";
import { fetcher } from "../../lib/fetcher";
import DataWrapper from "../DataWrapper";
import GenericForm from "../GenericForm";
import Pagination from "../Pagination";
import { scrollToTop } from "../../utils/scroll";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 12;

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

  const sortedPosts = useMemo(
    () =>
      filteredPosts
        ?.slice()
        .sort((a: Post, b: Post) =>
          sortOrder === "newest" ? b.id - a.id : a.id - b.id
        ),
    [filteredPosts, sortOrder]
  );

  const totalPages = sortedPosts
    ? Math.max(1, Math.ceil(sortedPosts.length / postsPerPage))
    : 1;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(
    () =>
      sortedPosts?.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      ) ?? [],
    [sortedPosts, currentPage, postsPerPage]
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="container mx-auto px-4 py-10 overflow-x-hidden">
      <DataWrapper isLoading={postsLoading} error={postsError}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Posts</h1>

        <GenericForm
          initialData={{ userId: 1, title: "", body: "" }}
          fields={[
            { name: "userId", label: "User ID", type: "number" },
            { name: "title", label: "Title" },
            { name: "body", label: "Body", type: "textarea" },
          ]}
          apiUrl="https://jsonplaceholder.typicode.com/posts"
          editingItem={editingPost}
          onFinish={() => setEditingPost(null)}
        />

        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="w-full sm:w-auto">
            <label className="block text-gray-700 mb-2">Filter User:</label>
            <select
              className="border rounded px-4 py-2 w-full"
              value={selectedUser?.id ?? ""}
              onChange={(e) => {
                const userId = Number(e.target.value);
                const user = users?.find((u) => u.id === userId) || null;
                setSelectedUser(user);
                setCurrentPage(1);
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

          <div className="w-full sm:w-auto">
            <label className="block text-gray-700 mb-2">Sort by:</label>
            <select
              className="border rounded px-4 py-2 w-full"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as "newest" | "oldest");
                setCurrentPage(1);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {paginatedPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={(p) => setEditingPost(p)}
              onDelete={handleDelete}
              userName={users?.find((u) => u.id === post.userId)?.name}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisible={4}
          />
        )}
      </DataWrapper>
    </div>
  );
};

export default PostsList;
