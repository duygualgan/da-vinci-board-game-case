import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import type { Post } from "../types";
import PostCard from "../components/posts/PostCard";
import { scrollToTop } from "../utils/scroll";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useFavoritesStore((s) => s.favorites);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  const sorted = useMemo(
    () => [...favorites].sort((a, b) => (b.id || 0) - (a.id || 0)),
    [favorites]
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Favorilerim</h1>
        <div>
          {favorites.length > 0 ? (
            <button
              onClick={clearFavorites}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear All
            </button>
          ) : (
            <button
              onClick={() => {
                scrollToTop();
                navigate("/posts")}}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              See Posts
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-600">
            Henüz favori eklemediniz. Postlar sayfasına gidip kalbe
            tıklayabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sorted.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              showActions={false}
              userName={undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
