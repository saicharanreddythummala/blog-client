import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './sideBar.scss';
import axios from 'axios';
import { getCategoriesApi } from '../../utils/api';
import { PostContext } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';

export default function SideBar({ className }) {
  const [categories, setCategories] = useState([]);

  const { getPostByCategory } = useContext(PostContext);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(getCategoriesApi);
        setCategories(data);
      } catch (err) {
        toast(err.response.data.error, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }

    getCategories();
  }, []);

  return (
    <>
      <div className={`${className} sideBar`}>
        <div className="border-top border-bottom">About me</div>
        <div className="about">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          consequuntur ea natus, dolores suscipit illo consequatur similique ad
          quos reprehenderit ullam officia repellendus repudiandae voluptatibus
          laboriosam nostrum omnis vel exercitationem.
        </div>
        <div className="categories">
          <div className="border-top border-bottom">Categories</div>
          <ul className="">
            {categories.map((c, i) => (
              <li
                key={c._id}
                onClick={() => {
                  getPostByCategory(c.name);
                }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
