import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [tab , setTab] =useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl)
    {
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* SlideBar */}
      <DashSidebar/>

      </div>
      {/* Profile */}
      {
        tab === 'profile' && <DashProfile/>
      }

      {/* Posts */}

      {
        tab === 'posts' && <DashPosts/>
      }

      {/* Users */}
      {
        tab=== 'users' && <DashUsers/>
      }

      {/* Comments */}
      {
        tab=== 'comments' && <DashComments/>
      }
      {/* Dashborad Component */}
      {
        tab=== 'dash' && <DashboardComp/>
      }
    </div>
  )
}