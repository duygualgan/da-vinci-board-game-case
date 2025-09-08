import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import { scrollToTop } from "../utils/scroll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <NavLink
            to="/"
            onClick={() => scrollToTop()}
            className="text-xl font-bold text-indigo-600"
          >
            Da Vinci
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              onClick={() => scrollToTop()}
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-indigo-600" : "text-gray-700"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => scrollToTop()}
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-indigo-600" : "text-gray-700"}`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/posts"
              onClick={() => scrollToTop()}
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-indigo-600" : "text-gray-700"}`
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={() => scrollToTop()}
              className={({ isActive }) =>
                `relative font-medium ${
                  isActive ? "text-indigo-600" : "text-gray-700"
                }`
              }
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95">
          <div className="px-4 py-3 space-y-2">
            <NavLink
              onClick={() => {
                scrollToTop();
                setOpen(false);
              }}
              to="/"
              className="block font-medium text-gray-700"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => {
                scrollToTop();
                setOpen(false);
              }}
              to="/users"
              className="block font-medium text-gray-700"
            >
              Users
            </NavLink>
            <NavLink
              onClick={() => {
                scrollToTop();
                setOpen(false);
              }}
              to="/posts"
              className="block font-medium text-gray-700"
            >
              Posts
            </NavLink>
            <NavLink
              onClick={() => {
                scrollToTop();
                setOpen(false);
              }}
              to="/favorites"
              className="flex items-center gap-2 font-medium text-gray-700"
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
