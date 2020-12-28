import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
// import { useParams } from "react-router-dom";
import axios from "../../axios";
import "./Blog.css";
import Parser from "html-react-parser";

const postDate = (data) => {
  const date = new Date(data);
  return ` ${date.getDate()} ${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getFullYear()}`;
};

export default function Blog(props) {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const { id } = props.location.state;
  console.log(props.location);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/posts/${id}`);

        if (res.data.status === "success") {
          return (
            setPost(res.data.data.post), setAuthor(res.data.data.post.author)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [id, setPost, setAuthor]);

  return (
    <div className="blog" key={post._id}>
      <Header />
      <div className="banner" initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <img
          src={`https://zona-nulis-api.herokuapp.com/img/posts/imageCover/${post.imageCover}`}
          alt="img"
        />
        <div className="thumbnail">
          <div className="thumbnail__container">
            <div className="thumbnail__breadcrumb">
              {/* <span className="thumbnail__span">
                Home/Resha Hidayat/lifestyle/
              </span>
              Membangun Lifestyle mu dengan baik */}
            </div>
            <div className="thumbnail__title">
              <h1>{post.title}</h1>
            </div>
            <div className="thumbnail__detail">
              <div className="thumbnail__detail--img">
                <img src="/users/emile.png" alt="user" />
              </div>
              <div className="thumbnail__detail--user">
                <p>{author.username}</p>
              </div>
              <div className="thumbnail__detail--text">
                <ul className="list__blog">
                  <li className="blog__item">
                    {post.createdAt ? postDate(post.createdAt) : ""}
                  </li>
                  {/* <li className="blog__item">5 Komentar</li>
                  <li className="blog__item">20 Suka</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, animi
          sequi iure reprehenderit suscipit ipsam aliquam, eos debitis
          praesentium, minima vel dolor! Ullam, itaque explicabo sequi, pariatur
          tenetur, recusandae totam velit ratione earum rem enim. Quidem libero
          blanditiis quae, quos dignissimos necessitatibus vitae veniam facere
          neque temporibus! Vitae suscipit eveniet adipisci, alias sapiente
          nostrum numquam repudiandae molestiae sint nesciunt. Molestias ad,
          sint veritatis id quibusdam odit animi. Quo obcaecati voluptatum
          eligendi, libero corrupti dolorum veniam ducimus praesentium delectus
          fugiat dignissimos cupiditate quos pariatur unde possimus, magnam odio
          eius. Nisi et quis eaque quae, facere aspernatur incidunt dolore
          assumenda in perferendis?
        </p>
        <p className="p-img">
          <img src="/img-posts/lampu.jpg" alt="img" />
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, animi
          sequi iure reprehenderit suscipit ipsam aliquam, eos debitis
          praesentium, minima vel dolor! Ullam, itaque explicabo sequi, pariatur
          tenetur, recusandae totam velit ratione earum rem enim. Quidem libero
          blanditiis quae, quos dignissimos necessitatibus vitae veniam facere
          neque temporibus! Vitae suscipit eveniet adipisci, alias sapiente
          nostrum numquam repudiandae molestiae sint nesciunt. Molestias ad,
          sint veritatis id quibusdam odit animi. Quo obcaecati voluptatum
          eligendi, libero corrupti dolorum veniam ducimus praesentium delectus
          fugiat dignissimos cupiditate quos pariatur unde possimus, magnam odio
          eius. Nisi et quis eaque quae, facere aspernatur incidunt dolore
          assumenda in perferendis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, animi
          sequi iure reprehenderit suscipit ipsam aliquam, eos debitis
          praesentium, minima vel dolor! Ullam, itaque explicabo sequi, pariatur
          tenetur, recusandae totam velit ratione earum rem enim. Quidem libero
          blanditiis quae, quos dignissimos necessitatibus vitae veniam facere
          neque temporibus! Vitae suscipit eveniet adipisci, alias sapiente
          nostrum numquam repudiandae molestiae sint nesciunt. Molestias ad,
          sint veritatis id quibusdam odit animi. Quo obcaecati voluptatum
          eligendi, libero corrupti dolorum veniam ducimus praesentium delectus
          fugiat dignissimos cupiditate quos pariatur unde possimus, magnam odio
          eius. Nisi et quis eaque quae, facere aspernatur incidunt dolore
          assumenda in perferendis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis et
          incidunt tempore ipsam ab voluptatibus ut veritatis reprehenderit
          optio sapiente harum officia fugiat quia accusantium temporibus atque
          esse, maiores quidem cum alias. Veniam, fugiat consequatur cupiditate
          consectetur sed earum commodi nemo voluptate provident! Laudantium
          dicta error sequi, veritatis aut ipsum aspernatur inventore eaque
          dolorum enim in illum quod tenetur fugit illo nam eveniet alias facere
          obcaecati id iusto, est fugiat voluptatum! Ad ratione in aliquid quo
          harum aspernatur, eaque perferendis.
        </p> */}
        {post.post ? Parser(post.post) : ""}
      </div>
    </div>
  );
}
