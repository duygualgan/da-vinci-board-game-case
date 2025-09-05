import { useNavigate } from "react-router-dom";
import type { Post } from "../../types";
import ActionButtons from "../ActionButtons";

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
   userName?: string;
}

const PostCard = ({
  post,
  onEdit,
  onDelete,
  showActions = true,
   userName,
}: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className="cursor-pointer rounded-xl shadow-md bg-white p-5 hover:shadow-xl transition duration-300 hover:-translate-y-1 relative"
    >
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">{post.title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.body}</p>
      <p className="text-sm text-gray-500 mt-1">Commenter: {userName || post.userId}</p>

      {showActions && (
        <ActionButtons item={post} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
};

export default PostCard;
