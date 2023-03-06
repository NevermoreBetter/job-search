import { nanoid } from "nanoid";
import React from "react";

const WorkerPosts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={nanoid}>{post.title}</li>
      ))}
    </ul>
  );
};

export default WorkerPosts;
