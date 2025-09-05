import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import PostCard from "../components/posts/PostCard"; // 📌 PostCard import et

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
  const navigate = useNavigate();

  return (
    <div>
      {/* 🔹 Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Hoş Geldiniz
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Kullanıcı postlarını keşfet, yeni içerikler ekle ve düzenle.
        </p>
        <button
          onClick={() => navigate("/posts")}
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Postları Gör
        </button>
      </section>

      {/* 🔹 Son Postlar */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Son Paylaşımlar
        </h2>

        {isLoading && (
          <p className="text-center text-gray-500">Yükleniyor...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Postlar yüklenirken hata oluştu.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.slice(0, 8).map((post) => (
            <PostCard
              key={post.id}
              post={post}
             showActions={false}
            />
          ))}
        </div>

        {/* Daha Fazla Butonu */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/posts")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Daha Fazla →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
