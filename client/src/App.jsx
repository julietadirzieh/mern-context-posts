import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <PostProvider>
      <MainRouter />
      <Toaster />
    </PostProvider>
  );
}

export default App;
