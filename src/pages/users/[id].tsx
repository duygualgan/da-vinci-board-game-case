import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import type { Post, User } from "../../types";


export default function UserDetailPage() {
  const { id } = useParams();
  const userId = Number(id);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useFetch<User>(userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useFetch<Post[]>(userId ? `https://jsonplaceholder.typicode.com/users/${userId}/posts` : null);

  if (userLoading || postsLoading) return <p className="text-center mt-10">Loading...</p>;
  if (userError || postsError) return <p className="text-center mt-10 text-red-500">Error loading data</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* User Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-700 mt-2">{user.email}</p>
        <p className="text-gray-700">{user.phone}</p>
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          {user.website}
        </a>
      </div>

      {/* Posts List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Posts by {user.name}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-gray-800 mb-2">{post.title}</h4>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
