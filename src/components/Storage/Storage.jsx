import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import StorageCard from "./component/StorageCard/StorageCard";
import { getCurrentYMD } from "../../utilities/DateTime/getDate";
import {
  addDocDOC,
  addDocDOCX,
  addDocPDF,
} from "../../utilities/Docs_API/apiClientPost_Docs";
import { getAllDocs } from "../../utilities/Docs_API/apiClientGet_Docs";

export default function Storage() {
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [docs, setDocs] = useState([]);
  const [tail, setTail] = useState("");
  const [flag, setFlag] = useState(false);
  const token = localStorage.getItem("accessToken");

  const reversed = [...docs].reverse();
  const currentUser = useSelector((state) => state.currentUser.data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (e) => {
    let filePath = e.target.value.split("\\");
    let fileName = filePath.pop();
    let tail = fileName.split(".").pop();
    if (tail === "pdf" || tail === "doc" || tail === "docx") {
      setTail(tail);
      setFileName(fileName);
      setSelectedFile(e.target.files[0]);
    } else {
      toast.error("Please provide file with PDF, DOC or DOCX type only", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleUploadFile = () => {
    if (fileName === "" || description === "") {
      toast.error("Please fill both the input", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const uploadData = new FormData();

      uploadData.append("file", selectedFile, selectedFile.name);
      // const fileData = uploadData.get("file");
      const newData = {
        docName: fileName,
        description: description,
        submitDate: getCurrentYMD(),
        uploadBy: currentUser.username,
        uploaderID: currentUser._id,
        file: uploadData.get("file"),
      };

      handleCreateDoc_CallAPI(newData, token);
      setFileName("");
      setDescription("");
      handleClose();
    }
  };

  const handleCreateDoc_CallAPI = async (req, token) => {
    let res;
    try {
      switch (tail) {
        case "pdf": {
          res = await addDocPDF(token, req);
        }
        case "doc": {
          res = await addDocDOC(token, req);
        }
        case "docx": {
          res = await addDocDOCX(token, req);
        }
        default: {
          console.log("lmao");
        }
      }
      if (res.status === 200) {
        toast.success("Doc created", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFlag(!flag);
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
      const { data: res } = await getAllDocs(token);
      setDocs(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllPosts_CallAPI();
  }, [flag]);

  return (
    <>
      <Box
        component="div"
        sx={{ margin: 3, display: "flex", justifyContent: "flex-end" }}
      >
        {currentUser.isAdmin === true ? (
          <Button variant="contained" onClick={handleClickOpen}>
            Add new docs
          </Button>
        ) : (
          <></>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new file</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a document on this website, please enter the description
              for the file and upload the file here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description for the file"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box sx={{ display: "flex" }}>
              <label htmlFor="upload-file">
                <input
                  style={{ display: "none" }}
                  id="upload-file"
                  name="upload-file"
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
                <Button variant="contained" component="span">
                  Upload button
                </Button>
              </label>
              <Typography>{fileName}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUploadFile}>Add file</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {reversed.map((doc) => {
        return <StorageCard key={doc._id} data={doc} />;
      })}
    </>
  );
}
