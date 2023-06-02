import React from "react";
import toast from "react-hot-toast";
import { usePosts } from "../../context/postContext";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p>Do you want to delete?</p>
        <div className="flex justify-between">
          <button
            onClick={() => {
              deletePost(id);
              toast.dismiss(t.id);
            }}
            className="bg-red-500 hover:bg-red-400 px-3 py-2 text-white rounded-md mx-2"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-md mx-2"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer items-center"
      onClick={() => navigate(`/posts/${post?._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post?.title}</h3>
          <button
            onClick={(e) => {
              e?.stopPropagation();
              handleDelete(post?._id);
            }}
            className="bg-red-600 text-sm px-2 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
        <p className="text-left">{post?.description}</p>
        {post?.image && (
          <img
            src={post?.image?.url}
            alt="post"
            className="mx-auto mt-3 rounded-md h-44 w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
