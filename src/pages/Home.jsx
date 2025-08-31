import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).catch(err => {
            console.error('Failed to fetch posts:', err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading posts...</h1>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-20 min-h-screen bg-gray-50 text-center flex items-center justify-center">
                <Container>
                    <div className="p-2 w-full">
                        <h1 className="text-4xl font-extrabold text-gray-700 mb-4">
                            Welcome to the blog.
                        </h1>
                        <p className="text-lg text-gray-500 mb-6">
                            Start exploring posts or create your own.
                        </p>
                        <Link to="/login"
                            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-full transition-all duration-300 hover:bg-indigo-600 hover:scale-105"
                        >
                            Log In to Read Posts
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-10 bg-gray-50 min-h-screen'>
            <Container>
                <div className='flex flex-wrap -mx-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;