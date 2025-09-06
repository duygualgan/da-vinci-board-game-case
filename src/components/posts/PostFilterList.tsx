import useSWR, { mutate } from "swr";
import PostCard from "./PostCard";
import type { Post, User } from "../../types";
import { fetcher } from "../../lib/fetcher";
import DataWrapper from "../DataWrapper";

interface Props {
  selectedUser: User | null;
  onEdit: (post: Post) => void;
}

const PostFilterList = ({ selectedUser, onEdit }: Props) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>("https://jsonplaceholder.typicode.com/posts", fetcher);

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
    ? posts?.filter((p) => p.userId === selectedUser.id)
    : posts;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      <DataWrapper isLoading={isLoading} error={error}>
        {filteredPosts
          ?.slice()
          .sort((a, b) => b.id - a.id)
          .map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
      </DataWrapper>
    </div>
  );
};

export default PostFilterList;
