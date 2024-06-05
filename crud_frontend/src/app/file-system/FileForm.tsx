"use client";
import React, {useState} from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';

const FileForm = () =>{
    const [fileName, setFileName] = useState('');
    const [fileDescription, setFileDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    // const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const file_id = Date.now()
        try{
            await axios.post('http://localhost:8000/files/add', { id: file_id, name: fileName, description: fileDescription });
            console.log("Your file ID to use: ", file_id)
            // router.push('/');
        } catch (err) {
            setError('Failed to submit the file');
        } finally {
            setLoading(false);
        }
        
    }

    return(
        <form action="" method="post" onSubmit={handleSubmit}>
            <div style={{marginBottom: 5}}>
                <label htmlFor='name'>Name: </label>
                <input id='name' value={fileName} onChange={(e) => setFileName(e.target.value)} type="text"/>
            </div>
            <div style={{marginBottom: 5}}>
                <label htmlFor='desc'>Description: </label>
                <input id='desc' value={fileDescription} onChange={(e) => setFileDescription(e.target.value)} type="text"/>
            </div>
            <div>
                <button style={{ padding: "5px" }} type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit File'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default FileForm;