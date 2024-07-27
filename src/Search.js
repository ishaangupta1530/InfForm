import React, { useState, useEffect } from 'react';
import { firestore } from './firebase.config';
import { collection, getDocs } from "firebase/firestore";
import './App.css'; // Ensure you have your styles applied

function Search() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch blogs from Firestore
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "IshaanComputerEngg"));
      const blogsData = querySnapshot.docs.map(doc => doc.data());
      setBlogs(blogsData);
      setFilteredBlogs([]); // Ensure filteredBlogs is empty initially
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = blogs.filter(blog =>
      blog.name.toLowerCase().includes(query) ||
      blog.branch.toLowerCase().includes(query) ||
      blog.email.toLowerCase().includes(query) ||
      blog.phone.toLowerCase().includes(query)
    );

    setFilteredBlogs(filtered);
  };

  return (
    <div className="Search">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search ..."
      />
      <button onClick={handleSearch}>Search</button>

      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => (
          <div key={index}>
            <h4>
              <span className="bold">Name:</span> {blog.name}
            </h4>
            <p>
              <span className="bold">Branch:</span> {blog.branch}
            </p>
            <p>
              <span className="bold">Email:</span> {blog.email}
            </p>
            <p>
              <span className="bold">Phone:</span> {blog.phone}
            </p>
          </div>
        ))
      ) : (
        <p>No results found.</p> // Display a message when no results are found
      )}
    </div>
  );
}

export default Search;
