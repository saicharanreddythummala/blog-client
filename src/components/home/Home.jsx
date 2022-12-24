import React from 'react';
import Posts from '../posts/Posts';
import SideBar from '../sideBar/SideBar';
import './home.scss';
import Meta from '../../utils/Meta'

export default function Home() {
  return (
    <>
    <Meta title={'Home'}/>
      <div className="home d-flex flex-column justify-content-center">
       <h1>I am a Blog built with React</h1>
      </div>
      <div className="h_main d-flex">
        <div className="col-9">
          <Posts />
        </div>
        <div className="s_div col-3 pe-3">
          <SideBar />
        </div>
      </div>
    </>
  );
}
