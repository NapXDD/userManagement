import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./userProfileSetting.css";
import BasicDatePicker from "../../../utilities/component/datepicker/datepicker";
import { updateUserbyID } from "../../../utilities/apiClientPut";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../../Redux/features/setUser";
import { getUserbyID } from "../../../utilities/apiClientGet";

export default function UserProfileSetting() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const currentUser = useSelector((state) => state.currentUser.data);
  const user = useSelector((state) => state.user.data);
  const [errorBioState, setErrorBioState] = useState(false);
  const [bioHelper, setBioHelper] = useState("");
  const [didRender, setDidRender] = useState(false);
  const [newData, setNewData] = useState({
    username: "",
    bio: "",
    birthDay: "",
  });
  let regex = /^\d+$/;

  console.log(newData.bio);

  const [date, setDate] = useState(user.birthDay);
  const birthDay = newData.birthDay.split("-");

  const handleUpdateUser = async () => {
    if (errorBioState === false) {
      try {
        if (newData.birthDay === "NaN-NaN-NaN") {
          newData.birthDay = "";
        }
        const res = await updateUserbyID(userId, newData, token);
        if (res.status === 200) {
          const { data: res } = await getUserbyID(userId, token);
          dispatch(userData(res));
          toast.success("User profile updated", {
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDate = (e) => {
    setDate(
      `${e.$D <= 9 ? `0${e.$D}` : `${e.$D}`}-${
        e.$M < 9 ? `0${e.$M + 1}` : `${e.$M + 1}`
      }-${e.$y}`
    );
  };

  const handleCheckBio = () => {
    if (newData.bio === "") {
      setErrorBioState(false);
      setBioHelper("");
    } else if (!regex.test(newData.bio)) {
      setErrorBioState(true);
      setBioHelper("CCCD/CMND must be number");
    } else {
      setErrorBioState(false);
      setBioHelper("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser();
  };

  useEffect(() => {
    setNewData({
      ...newData,
      birthDay: date,
    });
  }, [date]);

  useEffect(() => {
    setNewData({
      ...newData,
      username: user.username,
      bio: user.bio,
      birthDay: user.birthDay,
    });
  }, [user]);

  useEffect(() => {
    if (didRender) {
      handleCheckBio();
    }
  }, [newData.bio]);

  useEffect(() => {
    setDidRender(true);
  }, []);

  return (
    <div className="profile-setting-container">
      <div className="title-describe">
        <p>Edit your profile here:</p>
      </div>
      <form className="profile-setting-form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          id="username"
          name="username"
          required
          value={newData.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="CMND/CCCD"
          id="bio"
          name="bio"
          value={newData.bio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errorBioState}
          helperText={bioHelper}
          disabled={currentUser.isAdmin === true ? false : true}
        />
        <BasicDatePicker
          description={"Date of birth"}
          onChange={handleChangeDate}
          defaultValue={`${birthDay[2]}-${birthDay[1]}-${birthDay[0]}`}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: 100,
            margin: 1,
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
