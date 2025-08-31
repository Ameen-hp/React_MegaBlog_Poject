import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFileUrl(featuredImage)
    : "/placeholder.png"; // fallback if no image

  return (
    <Link to={`/post/${$id}`}> {/* make sure $id is passed */}
      <div
        className="
          w-full bg-white rounded-xl p-4 shadow-md 
          transition-all duration-300 ease-in-out
          hover:shadow-lg hover:-translate-y-1
        "
      >
        <div className="w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg w-full h-auto max-h-96"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
