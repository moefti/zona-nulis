import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootContext } from "../../App";
import axios from "../../axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../../components/Modal/Modal";

export default function CreateBlog() {
  const history = useHistory();
  const { Consumer } = rootContext;
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const onChangeLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlerSubmit = (dispatch) => {
    history.push("/");
    setOpen(false);
    return dispatch({
      type: "LOGOUT",
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("post", data.post);
    formData.append("imageCover", data.imageCover[0]);
    try {
      const res = await axios({
        url: "/posts",
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        history.push("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="wrapper-editor">
      {
        <Consumer>
          {({ dispatch }) => {
            return (
              <Modal
                open={open}
                onClose={handleClose}
                onSubmit={() => handlerSubmit(dispatch)}
              />
            );
          }}
        </Consumer>
      }
      <div className="header-dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard-util">
          <Link to="/">⬅ kembali</Link>
          <p className="is-active" onClick={onChangeLogout}>
            Keluar
          </p>
        </div>
      </div>
      <form className="editor" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Judul Postingan</label>
        <input type="text" name="title" id="title" ref={register} />
        <label htmlFor="ImageCover">Sampul Gambar </label>
        <input
          type="file"
          id="ImageCover"
          name="imageCover"
          accept="image/*"
          ref={register}
        />

        <label htmlFor="post">Konten Blog</label>
        <input
          type="hidden"
          name="post"
          id="post"
          value={data}
          ref={register}
        />
        <CKEditor
          ref={register}
          editor={ClassicEditor}
          data={data}
          name="content"
          config={{
            ckfinder: {
              uploadUrl:
                "/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
            },
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "blockQuote",
              "link",
              "numberedList",
              "bulletedList",
              "imageUpload",
              "mediaEmbed",
              "insertTable",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={(event, editor) => {
            const text = editor.getData();
            setData(text);
          }}
        />

        <button type="submit">Posting Article</button>
      </form>
    </div>
  );
}
