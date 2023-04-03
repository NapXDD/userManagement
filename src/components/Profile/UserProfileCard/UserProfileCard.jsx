import {
  updateUserAvatarByID,
} from "../../../utilities/apiClientPut";
import { avatarURL } from "../../../utilities/avatarURL";
import { toast } from "react-toastify";
import "./userProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserbyID } from "../../../utilities/apiClientGet";
import { userData } from "../../../Redux/features/setUser";
import { currentUserData } from "../../../Redux/features/setCurrentUser";

export default function UserProfileCard() {
  const token = localStorage.getItem("accessToken");
  const currentUserId = localStorage.getItem("userId");
  const user = useSelector(state => state.user.data)
  const dispatch = useDispatch()
  
  const handleMouseEnter = () => {
    const changeElement = document.querySelector(".change-paragraph");
    if (changeElement !== null) {
      changeElement.classList.remove("hide");
    }
  };

  const handleMouseLeave = () => {
    const changeElement = document.querySelector(".change-paragraph");
    if (changeElement !== null) {
      changeElement.classList.add("hide");
    }
  };

  const handleChangeAva = async (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0], e.target.files[0].name);

    const image = {
      image: uploadData.get("image"),
    };

    try {
      const res = await updateUserAvatarByID(currentUserId, image, token)
        if (res.status === 200) {
          const {data: res} = await getUserbyID(currentUserId, token)
          dispatch(userData(res))
          dispatch(currentUserData(res))
          toast.success("Change avatar success", {
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
      console.error(err);
    }
  };

  return (
    <div className="user-profile-card-container">
      <div className="user-profile-card-content">
        <div
          className="user-profile-avatar"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={`${avatarURL}/${user.avatar}`} alt="user avatar" />
          {currentUserId === user._id ? (
            <div className="change-paragraph hide">
              <label htmlFor="file-upload" className="custom-file-upload">
                <p>Change avatar</p>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => handleChangeAva(e)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="user-profile-bio">
          <div className="user-profile-name">
            <h5>{user.username}</h5>
          </div>
          <div className="user-profile-email">
            <p>Email: {user.email}</p>
          </div>
          <div className="user-profile-bio">
            <p>Des: {user.bio}</p>
          </div>
          <div className="user-profile-date">
            <p>Date of birth: {user.birthDay}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
