import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getPostbyID } from "../../../utilities/Posts_API/apiClientGet_Posts";
import { useState } from "react";
import { useEffect } from "react";
import { updatePostByID } from "../../../utilities/Posts_API/apiClientPut_Posts";

const styles = {
  typography: {
    color: "blue",
    "&:hover": {
      color: "red", // Màu chữ khi hover
      textDecoration: "underline",
    },
  },
};

export default function Post() {
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

  useEffect(() => {
    handleGetPostByID_CallAPI(id, token);
  }, [id]);

  return (
    <>
      <Card sx={{ minWidth: 275, marginTop: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Link to={`/dashboard/profile/${post.authorID}`}>
              <Typography sx={styles.typography}>{post.author}</Typography>
            </Link>
          </Typography>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2">{post.content}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
