import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import type { Comment, Post } from "../../types";
import { useState } from "react";
import CommentModal from "../../components/CommentModal";
import { fetcher } from "../../lib/fetcher";
import DataWrapper from "../DataWrapper";



const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  const { data: post, error: postError, isLoading: postLoading } = useSWR<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher
  );

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useSWR<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    fetcher
  );


  const handleAddComment = (newComment: Comment) => {
    setLocalComments((prev) => [newComment, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <DataWrapper isLoading={postLoading || commentsLoading} error={postError || commentsError}>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800">{post?.title}</h1>
          <p className="mt-4 text-gray-700">{post?.body}</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Comment
            </button>
          </div>

          <div className="space-y-4">
            {[...(localComments || []), ...(comments || [])]?.map((c) => (
              <div
                key={c.id}
                className="bg-gray-50 border rounded-lg p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                <p className="text-xs text-gray-500">{c.email}</p>
                <p className="mt-2 text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </DataWrapper>

      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
};

export default PostDetail;
