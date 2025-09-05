import useSWR, { mutate } from "swr";
import PostCard from "./PostCard";

type Post = { id: number; userId: number; title: string; body: string; };
type User = { id: number; name: string; };

interface Props {
  selectedUser: User | null;
  onEdit: (post: Post) => void;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const PostFilterList = ({ selectedUser, onEdit }: Props) => {
  const { data: posts, error } = useSWR<Post[]>("https://jsonplaceholder.typicode.com/posts", fetcher);

  const handleDelete = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" });
    mutate(
      "https://jsonplaceholder.typicode.com/posts",
      (posts: Post[] = []) => posts.filter(p => p.id !== id),
      false
    );
  };

  const filteredPosts = selectedUser ? posts?.filter(p => p.userId === selectedUser.id) : posts;

  if (!posts) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {filteredPosts
        ?.slice()
        .sort((a, b) => b.id - a.id)
        .map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default PostFilterList;
