import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import Navbar from "./components/Navbar";
import UserDetailPage from "./pages/users/[id]";
import PostDetail from "./components/posts/PostDetail";

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
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
