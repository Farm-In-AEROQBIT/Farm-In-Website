import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerComponent= () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/test')  // Spring Boot API 엔드포인트 호출
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>API Response:</h1>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>
    );  
};

export default ServerComponent;
