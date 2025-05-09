import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';

const OnePostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/get-post/${id}`, { withCredentials: true })
            .then(res => {
                if (res.data.status === 'success') {
                    setPost(res.data.post);
                } else {
                    setError('Post not found');
                }
             
            })
            .catch(err => {
                console.error("Error fetching post:", err);
                setError('Failed to load post');
                
            });
    }, [id]);

   

    if (error) {
        return <div className="container my-5 text-danger">{error}</div>;
    }

    if (!post) {
        return <div className="container my-5">Post not found</div>;
    }

    return (
        <div className="container my-5">
            <h2>{post.title}</h2>
            <p><strong>Country:</strong> {post.country_name}</p>
            <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
            <p>{post.content}</p>

            <div>
            <CommentSection postId={post.id} currentUser={currentUser} />

            </div>
        
        </div>
    );
};

export default OnePostPage;