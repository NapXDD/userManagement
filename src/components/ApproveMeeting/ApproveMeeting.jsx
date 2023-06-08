import { useEffect, useState } from "react";
import { Table } from "antd";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllMeeting } from "../../utilities/Meeting_API/apiClientGet_Meeting";
import { updateMeetingbyID } from "../../utilities/Meeting_API/apiClientPut_Meeting";
import { toast } from "react-toastify";
import { deleteMeeting } from "../../utilities/Meeting_API/apiClientDelete_Meeting";

const ApproveMeeting = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [newData, setNewData] = useState({
    id: "",
    approveStatus: true,
  });
  const [flag, setFlag] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (pagination, filter, sorter) => {
    console.log("Various parameters", pagination, filter, sorter);
    setSortedInfo(sorter);
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const res = await deleteMeeting(id, token);
      if (res.status === 200) {
        toast.success("Meeting deleted", {
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

  // call api for update approve to true
  const handleApproveMeeting = async () => {
    let payload = {
      approveStatus: true,
    };
    try {
      const res = await updateMeetingbyID(newData.id, payload, token);
      if (res.status === 200) {
        handleClose();
        setFlag(!flag);
        toast.success("Meeting Approved", {
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

  const handleOpenApprove = (id) => {
    setNewData({
      ...newData,
      id: id,
    });
    handleClickOpen();
  };

  let columns = [
    {
      title: "Room number",
      dataIndex: "roomName",
      key: "roomName",
      ellipsis: true,
    },
    {
      title: "Requester",
      dataIndex: "requester",
      key: "requester",
      ellipsis: true,
    },
    {
      title: "Meeting time",
      dataIndex: "time",
      key: "time",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
    },
  ];

  const handleGetAllMeeting_CallAPI = async () => {
    try {
      let array = [];
      let object = {
        key: "",
        roomName: "",
        requester: "",
        time: "",
        action: [<Button>Approve</Button>, <Button>Delete</Button>],
      };
      const { data: res } = await getAllMeeting(token);
      res.forEach((item) => {
        if (item.approveStatus === false) {
          let dateTime = item.dateTime.split("T");
          let date = dateTime[0].split("-").join("/");
          let time = dateTime[1].split(".")[0].split(":");
          let hour = time[0];
          let minute = time[1];
          dateTime = `${date} ${hour}:${minute}`;
          object = {
            ...object,
            key: item._id,
            roomName: item.roomName,
            requester: item.requesterName,
            time: dateTime,
            action: (
              <>
                <Button onClick={() => handleOpenApprove(item._id)}>
                  Approve
                </Button>
                <Button onClick={() => handleDeleteMeeting(item._id, token)}>
                  Delete
                </Button>
              </>
            ),
          };
          array.push(object);
        }
      });
      array.reverse();
      setMeeting(array);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllMeeting_CallAPI();
  }, [flag]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Approve Meeting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this meeting ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApproveMeeting}>Approve Meeting</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ marginTop: 4 }}>
        <Table columns={columns} dataSource={meeting} onChange={handleChange} />
      </Box>
    </>
  );
};

export default ApproveMeeting;
