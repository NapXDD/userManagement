import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

const styles = {
  typography: {
    color: "blue",
    "&:hover": {
      color: "red", // Màu chữ khi hover
      textDecoration: "underline",
    },
  },
};

export default function PostCard(data) {
  const post = data.data;
  const currentUser = useSelector((state) => state.currentUser.data);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`edit/${post._id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2,
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`post/${post._id}`}>
              <Typography sx={styles.typography}>{post.title}</Typography>
            </Link>
            {post.authorID === currentUser._id ? (
              <Button onClick={handleNavigate}>
                <EditIcon />
              </Button>
            ) : (
              <></>
            )}
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {post.uploadDate}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Created by: {post.author}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
