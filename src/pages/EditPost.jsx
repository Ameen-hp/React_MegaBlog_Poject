import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post);
                } else {
                    navigate('/');
                }
            }).catch(err => {
                console.error('Failed to fetch post:', err);
                navigate('/'); // Navigate home on error
            }).finally(() => {
                setLoading(false); // Set loading to false after fetch completes
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading...</h1>
            </div>
        );
    }

    return post ? (
        <div className='py-8 bg-gray-50 min-h-screen'>
            <Container className='animate-fade-in'>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;