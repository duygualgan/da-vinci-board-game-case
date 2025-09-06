import { useState } from "react";
import type { Comment } from "../types";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: Comment) => void;
}

const CommentModal = ({ isOpen, onClose, onSubmit }: CommentModalProps) => {
  const [form, setForm] = useState({ name: "", email: "", body: "" });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      body: form.body,
    };
    onSubmit(newComment);
    setForm({ name: "", email: "", body: "" });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Write your comment..."
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
