import React from "react";
import { useParams, Link } from "react-router-dom";

// Sample posts data
const posts = [
  {
    slug: "img-0001-chaos",
    title: "How to Tame Your IMG_0001 Chaos",
    content: (
      <>
        <p>If your photos are named IMG_0001, IMG_0002… this guide is for you.</p>
        <p>Step 1: Identify the folders with your mess.</p>
        <p>Step 2: Upload your photos to Wheremypix for automatic cleanup.</p>
        <p>Step 3: Enjoy organized, searchable memories.</p>
        <Link to="/blog" className="text-blue-500 hover:underline mt-4 block">
          ← Back to Blog
        </Link>
      </>
    ),
  },
  {
    slug: "rename-photos-ai",
    title: "Rename Photos Automatically with AI",
    content: (
      <>
        <p>Stop confusing file names! Our AI generates clear, meaningful names automatically.</p>
        <p>Step 1: Upload your messy folder.</p>
        <p>Step 2: Let AI rename your images.</p>
        <p>Step 3: Enjoy organized and searchable photos.</p>
        <Link to="/blog" className="text-blue-500 hover:underline mt-4 block">
          ← Back to Blog
        </Link>
      </>
    ),
  },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div className="p-8">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-base text-gray-800">{post.content}</div>
    </div>
  );
};

export default BlogPost;
