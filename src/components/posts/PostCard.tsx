import { useNavigate } from "react-router-dom";
import type { Post } from "../../types";
import ActionButtons from "../ActionButtons";
import { useFavoritesStore } from "../../stores/useFavoritesStore";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { scrollToTop } from "../../utils/scroll";

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
      onClick={() => {
        scrollToTop();
        navigate(`/posts/${post.id}`)}
    }
      className="cursor-pointer rounded-xl shadow-md bg-white p-5 hover:shadow-xl transition duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 pr-2">
          {post.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(post);
          }}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          className="p-1 rounded-full hover:bg-gray-100 transition flex-shrink-0"
        >
          {isFavorited ? (
            <HeartSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>

      <div className="flex-grow">
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.body}</p>
        <p className="text-sm text-gray-500 mt-1">
          Commenter: {userName || post.userId}
        </p>
        <p className="text-sm text-gray-500 mt-1">Post Id: {post.id}</p>
      </div>

      {showActions && (
        <div className="mt-3">
          <ActionButtons item={post} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
