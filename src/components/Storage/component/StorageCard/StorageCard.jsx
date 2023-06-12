import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  typography: {
    color: "blue",
    "&:hover": {
      color: "red", // Màu chữ khi hover
      textDecoration: "underline",
    },
  },
};

export default function StorageCard(data) {
  const post = data.data;
  const currentUser = useSelector((state) => state.currentUser.data);

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
            lmao
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
            Created by: lmao
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}