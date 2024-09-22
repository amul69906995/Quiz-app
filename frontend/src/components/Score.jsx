import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    scoreCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    loading: {
        textAlign: 'center',
        color: '#555',
    },
    submitButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

const Score = () => {
    const [allScore, setAllScore] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const fetchScore = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quiz/all-score`, { withCredentials: true });
            setAllScore(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScore();
    }, []);
const handleNavigate=()=>{
    navigate('/protected/home')
}
    if (loading) return <h1 style={styles.loading}>Loading...</h1>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Score Summary</h1>
            {allScore.length > 0 ? (
                <>
                    {allScore.map((score) => (
                        <div key={score._id} style={styles.scoreCard}>
                            <p><strong>Owner ID:</strong> {score.owner}</p>
                            <p><strong>Attempted Questions:</strong> {score.attemptedQuestion}</p>
                            <p><strong>Correct Questions:</strong> {score.correctQuestion}</p>
                            <p><strong>Unattempted Questions:</strong> {score.unattemptedQuestion}</p>
                        </div>
                    ))}
                    <button style={styles.submitButton} onClick={handleNavigate}>Start new Quiz</button>
                </>
            ) : (
                <p>No scores available.</p>
            )}
        </div>
    );
};

export default Score;

