import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import SchedulerForm from './pages/SchedulerPage';
import Confirmation from './components/Confirmation';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/search' element={<Search />} />
          {/* Add PrivateRoute wrapper for protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          {/* Add OnlyAdminPrivateRoute wrapper for admin-only routes */}
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
            <Route path='/schedule-interview' element={<SchedulerForm/>} />
            <Route path='/confirmation' element={<Confirmation/>} />
          </Route>
          <Route path='/projects' element={<Projects />} />
          <Route path='/post/:postSlug' element={<PostPage />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
