import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: 2 }}>
          <Link to={`post/${post._id}`}>
            <Typography sx={styles.typography}>{post.title}</Typography>
          </Link>
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
