import React, { useState } from 'react';

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [countryName, setCountryName] = useState('');
    const [Date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, content });
      
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create a New Blog Post</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Enter post title"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                        placeholder="Write your post content here"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="countryName" style={styles.label}>Country Name</label>
                    <input
                        type="text"
                        id="countryName"
                        value={countryName}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Enter Country name"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="Date" style={styles.label}>Date of visit</label>
                    <input
                        type="text"
                        id="Date"
                        value={Date}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Date of visit"
                    />
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minHeight: '150px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default NewPost;