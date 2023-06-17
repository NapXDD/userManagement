import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const doc = data.data;
  const handleDelete = data.handleDelete;
  const currentUser = useSelector((state) => state.currentUser.data);

  const handleDeleteDoc = () => {
    handleDelete(doc._id);
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
              {doc.description}
            </Typography>
            {currentUser.isAdmin === true ? (
              <Button onClick={handleDeleteDoc}>
                <DeleteIcon />
              </Button>
            ) : (
              <></>
            )}
          </Box>
          <Typography
            variant="subtitle1"
            color="blue"
            component="div"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <a href={doc.filePath}>{doc.docName}</a>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
