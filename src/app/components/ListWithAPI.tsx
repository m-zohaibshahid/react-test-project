// /app/components/ListWithAPI.tsx
'use client';
import '../Styling/style.css'

import React, { useState, useEffect } from 'react';
export type ListAPIType = {
    userId: number
    id: number
    title: string
    body: string
  };

const ListWithAPI = () => {
  const [data, setData] = useState<ListAPIType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const result = await response.json();
      setData((prevData) => [...prevData, ...result]);
      setLoading(false);
    };

    fetchData();

    // Cleanup function for async call
    return () => {
      setLoading(false);
    };
  }, [page]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10,maxWidth:'400px',margin:'auto' }}>
        <h1>List of Posts</h1>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <div >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button style={{marginLeft:'20px'}} onClick={loadMoreData}>Load More</button>
        )}
      </div>
      <div className=""style={{ position: 'sticky', bottom: 0,backgroundColor: '#fff', zIndex: 10}}>
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default ListWithAPI;
