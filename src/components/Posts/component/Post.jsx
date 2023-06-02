import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  //call api get post by id
  return (
    <>
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      >
        {id}
      </Box>
    </>
  );
}
