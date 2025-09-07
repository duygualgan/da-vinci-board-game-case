import { useNavigate } from "react-router-dom";
import type { Post } from "../../types";
import ActionButtons from "../ActionButtons";
import { useFavoritesStore } from "../../stores/useFavoritesStore";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

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

  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorited = useFavoritesStore((s) =>
    s.favorites.some((p) => p.id === post.id)
  );

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className="cursor-pointer rounded-xl shadow-md bg-white p-5 hover:shadow-xl transition duration-300 hover:-translate-y-1 relative"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(post);
        }}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-3 right-3 z-20 p-1 rounded-full hover:bg-gray-100 transition"
      >
        {isFavorited ? (
          <HeartSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500" />
        )}
      </button>

      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.body}</p>
      <p className="text-sm text-gray-500 mt-1">
        Commenter: {userName || post.userId}
      </p>
      <p className="text-sm text-gray-500 mt-1">Post Id: {post.id}</p>

      {showActions && (
        <ActionButtons item={post} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
};

export default PostCard;
