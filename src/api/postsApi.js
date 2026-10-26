const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}