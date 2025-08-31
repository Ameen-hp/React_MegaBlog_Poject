import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    }).catch(err => {
      console.error('Failed to fetch posts:', err);
    });
  }, []);

  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        {posts.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-3xl font-bold text-gray-700">No posts available.</h1>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-2">
           {posts.map((post) => (
  <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
   <PostCard {...post} />
 {/* $id is included in post object */}
  </div>
))}

          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;