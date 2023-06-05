import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPostbyID } from "../../../../utilities/Posts_API/apiClientGet_Posts";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { updatePostByID } from "../../../../utilities/Posts_API/apiClientPut_Posts";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    uploadDate: "",
    authorID: "",
  });
  const token = localStorage.getItem("accessToken");

  //call api get post by id
  const handleGetPostByID_CallAPI = async (id, token) => {
    try {
      const res = await getPostbyID(id, token);
      if (res.status === 200) {
        setPost(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdatePostByID_CallAPI = async (postid, post, token) => {
    try {
      const res = await updatePostByID(postid, post, token);
      if (res.status === 200) {
        toast.success("Post updated", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (e) {
      toast.error(e, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdatePostByID_CallAPI(id, post, token);
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    handleGetPostByID_CallAPI(id, token);
  }, [id]);

  return (
    <>
      <div className="profile-setting-container">
        <div className="title-describe">
          <p>Edit your post here:</p>
        </div>
        <form
          className="profile-setting-form"
          style={{ width: "100%", padding: "20px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            id="title"
            name="title"
            required
            value={post.title}
            onChange={handleChange}
            fullWidth
            control="true"
          />
          <TextField
            label="Content"
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            fullWidth
            margin="normal"
            control="true"
            multiline
            rows={2}
            maxRows={10}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: 100,
              margin: 1,
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
