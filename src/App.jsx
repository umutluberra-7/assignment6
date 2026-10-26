import { useEffect, useReducer } from "react";
import { fetchPosts } from "./api/postsApi";
import { postsReducer, initialState } from "./reducer/postsReducer";
import PostList from "./components/PostList";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loading, error } = state;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name === "AbortError") return;
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    }

    loadPosts();

    return () => controller.abort();
  }, []);

  return (
    <div>
      <h1>Post Dashboard</h1>

      {loading && <p>Loading posts...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}

      {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}

export default App;