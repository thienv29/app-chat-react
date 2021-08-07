import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./Firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function Chats() {
  const history = useHistory();
  const User = useAuth();
  console.log(User);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!User) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "Project-ID": "02e13d90-aabd-40b3-bf8d-dc4313863069",
          "User-Name": User.email,
          "User-Secret": User.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        let formdata = new FormData();
        formdata.append("username", User.email);
        formdata.append("first_name", User.displayName);
        formdata.append("last_name", '');
        formdata.append("secret", User.uid);
        getFile(User.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "a40ca847-5708-4793-9100-bb141e2542f8",
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
  }, [User, history]);
  if (!User || loading) {
    return "...loading";
  }
  return (
    <div className="chats-page ">
      <div className="nav-bar">
        <div className="logo-tab">App chat VQT</div>
        <div className="logout-tab" onClick={handleLogout}>
          Log out
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="02e13d90-aabd-40b3-bf8d-dc4313863069"
        userName={User.email}
        userSecret={User.uid}
      />
    </div>
  );
}
