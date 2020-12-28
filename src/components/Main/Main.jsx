import React, { createContext, useEffect, useState } from "react";
import CardLess from "./CardLess/CardLess";
import CardMain from "./CardMain/CardMain";
import "./Main.css";
import SideMain from "./SideMain/SideMain";
import axios from "../../axios";
import Skeleton from "react-loading-skeleton";
import Pagination from "./pagination/Pagination";

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const skeletons = [1, 2];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchData();
  }, []);

  // Get Current Posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const postDate = (data) => {
    const date = new Date(data);
    return `${date.toLocaleString("en-us", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // function event
  const navigatePage = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
  return (
    <div className="main">
      {/* <div className="main__navigation">
                <ul className="main__navigation--items">
                    <li className="item is-active">Popular</li>
                    <li className="item">Terahir Baca</li>
                    <li className="item">Paling Sesuai</li>
                    <li className="item">Baru</li>
                </ul>
            </div> */}
      <div className="main__post">
        <div className="main__post--left">
          {loading
            ? skeletons.map((i) => (
                <CardMain
                  key={i}
                  title={<Skeleton height={20} />}
                  height={<Skeleton height={180} />}
                  date={<Skeleton width={100} />}
                  id={i}
                  loading={loading}
                />
              ))
            : currentPosts
                .slice(0, 2)
                .map((post) => (
                  <CardMain
                    key={post._id}
                    title={post.title}
                    slug={post.slug}
                    img={post.imageCover}
                    date={postDate(post.createdAt)}
                    id={post._id}
                    author={post.author.username}
                  />
                ))}
          {loading
            ? skeletons.map((i) => (
                <CardLess
                  key={i}
                  title={<Skeleton height={15} />}
                  height={<Skeleton height={90} />}
                  loading={loading}
                />
              ))
            : currentPosts
                .slice(2)
                .map((post) => (
                  <CardLess
                    slug={post.slug}
                    key={post._id}
                    img={post.imageCover}
                    title={post.title}
                    date={postDate(post.createdAt)}
                    id={post._id}
                    author={post.author.username}
                  />
                ))}
        </div>
        <div className="main__post--right">
          <SideMain />
        </div>
      </div>
      <div className="main__pagination">
        <Pagination
          currentPage={currentPage}
          postPerPage={postPerPage}
          totalPosts={posts.length}
          navigatePage={navigatePage}
        />
      </div>
      <div className="footer">
        <p>&copy; copyright 2020</p>
      </div>
    </div>
  );
}
