# Assignment 6 – Post Dashboard

A React (Vite) app that fetches posts from JSONPlaceholder, manages async state with `useReducer`, and filters posts by title.

## Running

npm install
npm run dev

## File Organization

- `src/api/postsApi.js` – `fetchPosts()`: data fetching only (no React, no JSX). Throws an error if the response is not OK.
- `src/reducer/postsReducer.js` – Pure reducer handling `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`. Always returns a new state object.
- `src/App.jsx` – Owns the async state (`useReducer`) and the filter state (`useState`). Fetches posts in `useEffect` on mount, with `AbortController` cleanup. Renders loading, error, and empty states, and derives the filtered list during render.
- `src/components/PostList.jsx` – Pure render component; maps posts to `Post` with `key={post.id}`.
- `src/components/Post.jsx` – Presentational component showing `title` and `body`.
- `src/components/FilterForm.jsx` – Controlled input for filtering by title; the value lives in `App`.

## Challenges
- **fetch does not fail on HTTP errors:** I expected `fetch` to throw on a 404, but it only throws on network failures. I tested this by temporarily changing the URL to `/postsXYZ` and added a `response.ok` check in `postsApi.js` so the error state is shown instead of an empty list.
- **Async logic inside useEffect:** An `async` function cannot be passed directly to `useEffect` because it returns a Promise instead of a cleanup function. I defined `loadPosts` inside the effect and called it there.
- **Cleanup and StrictMode:** In development, StrictMode runs the effect twice, so the first request is cancelled by the `AbortController` cleanup. I had to ignore `AbortError` so a cancelled request is not shown as an error to the user.
- **Derived state:** At first it seemed natural to keep the filtered posts in state, but that would duplicate data and could get out of sync. I compute `filteredPosts` during render from `posts` and `filter` instead.
- **Environment setup:** The `code` command did not work on my Mac and I first opened only the `src` folder in VS Code, so I could not find the README. Opening the whole project folder fixed it.