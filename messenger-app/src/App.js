import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Messenger from './components/Messenger';
import Settings from './components/Settings';
import Profile from './components/Profile';
import SearchPeople from './components/SearchPeople';
import FAQ from './components/FAQ';
import ReportProblem from './components/ReportProblem';
import Poppins from './components/Poppins';
import Posts from './components/Posts';
import AddPost from './components/AddPosts';
import AddPostButton from './components/AddPostButton';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPeople />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/poppins" element={<Poppins />} />
          <Route path="/posts" element={<Posts posts={posts} addPost={addPost} />} />
          <Route path="/add-post" element={<AddPost addPost={addPost} />} />
        </Routes>
        <AddPostButton />
      </div>
    </Router>
  );
}

export default App;
