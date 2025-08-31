import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const { id } = useParams(); // instead of slug
appwriteService.getPost(id);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
     // use id instead of slug
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (id) {
            appwriteService.getPost(id).then((data) => {
                if (data) setPost(data);
                else navigate("/"); // fallback if post not found
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    const deletePost = async () => {
        if (!post) return;
        const deleted = await appwriteService.deletePost(post.$id);
        if (deleted) {
            if (post.featuredImage) await appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading post...</h1>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-6 relative border border-gray-200 rounded-xl shadow-lg p-2 overflow-hidden animate-fade-in">
                    {post.featuredImage && (
  <img
    src={appwriteService.getFileUrl(post.featuredImage)} // full image URL
    alt={post.title}
    className="rounded-xl w-full h-[500px] object-contain"
  />
)}


                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="!rounded-full transition-all duration-300 transform hover:scale-105">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                className="!rounded-full transition-all duration-300 transform hover:scale-105"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">{post.title}</h1>
                </div>

                <div className="prose max-w-none prose-indigo prose-lg mx-auto">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}
