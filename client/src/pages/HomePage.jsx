import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { authContext } from "../context/authContext";
import { useContext } from "react";
export function HomePage() {
  const { logout } = useContext(authContext);
  const { posts } = usePosts();

  const renderPost = () => {
    if (posts?.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl">There are no posts</h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-12 md:px-20">
        {posts?.map((post) => (
          <PostCard key={post?._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <>
      <header className="bg-stone-800 text-center py-6">
        <button
          type="button"
          onClick={logout}
          className="bg-gray-600 hover:bg-gray-600 text-white p-3 rounded-md mx-auto md:mr-20"
        >
          Logout
        </button>
      </header>
      <div className="bg-stone-800 min-h-screen text-center w-full mx-auto pb-12">
        <header className="flex w-full justify-between items-center px-12 md:px-20 py-12">
          <h1 className="text-xl md:text-2xl font-bold text-gray-300">
            Posts Counter: {posts?.length}
          </h1>
          <Link
            to="/new"
            className="bg-white hover:bg-stone-300 text-black p-3 rounded-md text-xs md:text-base"
          >
            Create New Post
          </Link>
        </header>
        {renderPost()}
      </div>
    </>
  );
}
