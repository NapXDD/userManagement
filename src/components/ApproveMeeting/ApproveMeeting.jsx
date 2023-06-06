import { useEffect, useState } from "react";
import { Table } from "antd";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllMeeting } from "../../utilities/Meeting_API/apiClientGet_Meeting";

const ApproveMeeting = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("21-12-2023");
  const [meeting, setMeeting] = useState([]);
  const [newData, setNewData] = useState({
    id: "",
    approveStatus: true,
  });
  const [flag, setFlag] = useState(false);

  const token = localStorage.getItem("accessToken");

  console.log(meeting);

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

  const handleApprove = (id) => {
    setNewData({
      ...newData,
      id: id,
    });
    setFlag(!flag);
  };

  let columns = [
    {
      title: "Room number",
      dataIndex: "roomName",
      key: "roomName",
      sorter: (a, b) => a.roomName.length - b.roomName.length,
      sortOrder: sortedInfo.columnKey === "roomName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Requester",
      dataIndex: "requester",
      key: "requester",
      sorter: (a, b) => a.requester - b.requester,
      sortOrder: sortedInfo.columnKey === "requester" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Meeting time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => a.time.length - b.time.length,
      sortOrder: sortedInfo.columnKey === "time" ? sortedInfo.order : null,
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
        action: <Button>Approve</Button>,
      };
      const { data: res } = await getAllMeeting(token);
      res.forEach((item) => {
        if (item.approveStatus === false) {
          object = {
            ...object,
            key: item._id,
            roomName: item.roomName,
            requester: item.requesterName,
            time: item.dateTime,
            action: (
              <Button onClick={() => handleApprove(item._id)}>Approve</Button>
            ),
          };
          array.push(object);
        }
      });
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
      <Box sx={{ marginTop: 4 }}>
        <Table columns={columns} dataSource={meeting} onChange={handleChange} />
      </Box>
    </>
  );
};

export default ApproveMeeting;
