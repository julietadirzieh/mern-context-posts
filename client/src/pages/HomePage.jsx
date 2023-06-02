import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
export function HomePage() {
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
    <div className="bg-stone-800 min-h-screen text-center w-full mx-auto pb-24">
      <header className="flex justify-between items-center px-12 md:px-20 py-12">
        <h1 className="text-xl md:text-2xl font-bold text-gray-300">
          Posts Counter: {posts?.length}
        </h1>
        <Link
          to="/new"
          className="bg-white hover:bg-stone-300 text-black p-3 rounded-md"
        >
          Create New Post
        </Link>
      </header>
      {renderPost()}
    </div>
  );
}
