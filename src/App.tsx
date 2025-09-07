import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import Navbar from "./components/Navbar";
import UserDetailPage from "./pages/users/[id]";
import PostDetail from "./components/posts/PostDetail";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
