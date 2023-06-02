import { HomePage, PostForm, NotFoundPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <PostProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </PostProvider>
  );
}

export default App;
