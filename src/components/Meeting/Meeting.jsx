import { useEffect, useState } from "react";
import { Table } from "antd";
import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import BasicTimePicker from "../../utilities/component/datepicker/timepicker";
import BasicDatePicker from "../../utilities/component/datepicker/datepicker";
import { addMeeting } from "../../utilities/Meeting_API/apiClientPost_Meeting";
import { toast } from "react-toastify";
import { getAllMeeting } from "../../utilities/Meeting_API/apiClientGet_Meeting";
import { deleteMeeting } from "../../utilities/Meeting_API/apiClientDelete_Meeting";
import dayjs from "dayjs";
import { getCurrentYMD } from "../../utilities/DateTime/getDate";

const Meeting = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [date, setDate] = useState(getCurrentYMD());
  const [time, setTime] = useState("03:30:30");
  const [meeting, setMeeting] = useState([]);
  const [newData, setNewData] = useState({
    roomName: "Room111",
    time: `${date}T${time}`,
    requesterName: `${currentUser.username}`,
    requesterID: `${currentUser._id}`,
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

  const handleCreateMeeting = async () => {
    try {
      const res = await addMeeting(newData, token);
      if (res.status === 200) {
        toast.success("Meeting created, waiting for approve", {
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
    setOpen(false);
  };

  const handleChangeDate = (e) => {
    setDate(
      `${e.$D <= 9 ? `0${e.$D}` : `${e.$D}`}-${
        e.$M < 9 ? `0${e.$M + 1}` : `${e.$M + 1}`
      }-${e.$y}`
    );
  };

  const handleChangeTime = (e) => {
    let time = `${e.$d}`.split(" ");
    setTime(time[4]);
  };

  const handleChangeValue = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
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

  let columns;

  if (currentUser.isAdmin === true) {
    columns = [
      {
        title: "Room number",
        dataIndex: "roomName",
        key: "roomName",
        ellipsis: true,
      },
      {
        title: "Requester",
        dataIndex: "requester",
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
  } else {
    columns = [
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
    ];
  }

  const handleGetAllMeeting_CallAPI = async () => {
    try {
      let array = [];
      let object = {
        key: "",
        roomName: "",
        requester: "",
        time: "",
        action: <Button>Delete</Button>,
      };
      const { data: res } = await getAllMeeting(token);
      res.forEach((item) => {
        if (item.approveStatus === true) {
          let dateTime = item.dateTime.split("T");
          let date = dateTime[0].split("-").reverse().join("/");
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
              <Button onClick={() => handleDeleteMeeting(item._id, token)}>
                Delete
              </Button>
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

  useEffect(() => {
    setNewData({
      ...newData,
      roomName: newData.roomName,
      time: `${date}T${time}`,
      requesterName: `${currentUser.username}`,
      requesterID: `${currentUser._id}`,
    });
  }, [date, time]);

  return (
    <>
      <Box sx={{ marginTop: 3 }}>
        <Box
          sx={{ display: "flex", width: "100%", flexDirection: "row-reverse" }}
        >
          <Button
            sx={{ marginBottom: 3 }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Create Meeting
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Meeting</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To request a meeting on this website, please enter the room number
              and time below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="postTitle"
              name="roomName"
              label="Room name"
              fullWidth
              select
              value={newData.roomName}
              onChange={handleChangeValue}
            >
              <MenuItem value={"Room111"}>Room111</MenuItem>
              <MenuItem value={"Room112"}>Room112</MenuItem>
            </TextField>
            <BasicDatePicker
              description={"Date of Meeting"}
              onChange={handleChangeDate}
              disablePast={true}
              defaultValue={dayjs(date)}
            />
            <BasicTimePicker
              defaultValue={`${getCurrentYMD()}T${time}`}
              onChange={handleChangeTime}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateMeeting}>Create Meeting</Button>
          </DialogActions>
        </Dialog>
        <Table columns={columns} dataSource={meeting} onChange={handleChange} />
      </Box>
    </>
  );
};

export default Meeting;
