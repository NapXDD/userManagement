import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import PostCard from "./component/PostCard/PostCard";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { addPost } from "../../utilities/Posts_API/apiClientPost_Posts";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAllPosts } from "../../utilities/Posts_API/apiClientGet_Posts";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("accessToken");

  const reversed = [...posts].reverse();

  let newPost = {
    title: "",
    content: "",
    author: "",
    uploadDate: "",
    authorID: "",
  };
  const currentUser = useSelector((state) => state.currentUser.data);

  const currentDate = new Date();

  // Lấy ngày, tháng, năm hiện tại
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
  const year = currentDate.getFullYear();

  // Định dạng chuỗi "dd/mm/YYYY"
  let formattedDate = () => {
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    return `${day}/${month}/${year}`;
  };

  const handleCreatePost = () => {
    newPost = {
      ...newPost,
      title: title,
      content: content,
      author: currentUser.username,
      uploadDate: formattedDate(),
      authorID: currentUser._id,
    };

    handleCreatePost_CallAPI(newPost, token);

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost_CallAPI = async (req, token) => {
    try {
      const res = await addPost(req, token);
      if (res.status === 200) {
        toast.success("Post created", {
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

  const handleGetAllPosts_CallAPI = async () => {
    try {
      const { data: res } = await getAllPosts(token);
      setPosts(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllPosts_CallAPI();
  }, []);

  return (
    <>
      <Box
        component="div"
        sx={{ margin: 3, display: "flex", justifyContent: "flex-end" }}
      >
        {currentUser.isAdmin === true ? (
          <Button variant="contained" onClick={handleClickOpen}>
            Create posts
          </Button>
        ) : (
          <></>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a notification to this website, please enter the title
              and content of the post here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="postTitle"
              label="Post Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="postContent"
              label="Post Content"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreatePost}>Create Post</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {reversed.map((post) => {
        return <PostCard key={post._id} data={post} />;
      })}
    </>
  );
}
