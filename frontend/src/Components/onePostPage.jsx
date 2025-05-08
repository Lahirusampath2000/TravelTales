import React, { use, useState } from 'react';

const OnePostPage = () => {

    const {id} = useParams();
    const [post, setPost]=useState(null)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/get-post/${id}`, { withCredentials: true })   //fetch post data by id
            .then(res => {
                if (res.data.status === 'success') {
                    setPost(res.data.post);
                } else {
                    console.error("Error fetching post:", res.data.error);
                }
            })
            .catch(err => {
                console.error("Error fetching post:", err);
            });
    }, [id]);


    return (
        <div className="container my-5">
            <h2>{post.title}</h2>
            <p><strong>Country:</strong> {post.country_name}</p>
            <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
            <p>{post.content}</p>   
        </div>
    );
};

export default OnePostPage;