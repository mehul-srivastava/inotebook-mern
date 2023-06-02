import React, { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";

const Profile = () => {
  const { userToken } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const buttonRef = useRef();

  const [user, setUser] = useState({
    name: "fetching...",
    email: "fetching...",
    addedAt: "fetching...",
  });

  const BASE_URI = import.meta.env.VITE_SERVER_API_BASE_URL;

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser({
        name: user.name,
        email: user.email,
        addedAt: user.date,
      });
    } else {
      setTimeout(() => fetchUser(), 3000);
    }
  }, []);

  const fetchUser = async () => {
    const response = await fetch(`${BASE_URI}/api/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": userToken,
      },
    });
    const data = await response.json();

    if (data.success) {
      const fetchedUser = data.user;
      setUser({
        name: fetchedUser.name,
        email: fetchedUser.email,
        addedAt: fetchedUser.date,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return;
  };

  const getFullDate = (date) => {
    if (date === "fetching...") return "fetching...";

    let dateParts = new Date(date).toString();
    dateParts = dateParts.split(" ");
    return `${dateParts[2]} ${dateParts[1]} ${dateParts[3]}, ${
      dateParts[4]
    } ${dateParts.slice(6).join(" ")}`;
  };

  const deleteUser = () => {
    localStorage.removeItem("user");
    buttonRef.current.style.display = "none";
  };
  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-lg-8">
          <h1 className="w-100">My Profile</h1>
          <div className={`card mb-4 ${darkMode && "bg-black text-white"}`}>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p
                    className={`${darkMode ? "text-white" : "text-muted"} mb-0`}
                  >
                    {user.name}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p
                    className={`${darkMode ? "text-white" : "text-muted"} mb-0`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Joined On</p>
                </div>
                <div className="col-sm-9">
                  <p
                    className={`${darkMode ? "text-white" : "text-muted"} mb-0`}
                  >
                    {user.addedAt && getFullDate(user.addedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {localStorage.getItem("user") && (
            <button
              className="btn btn-outline-danger btn-sm"
              ref={buttonRef}
              onClick={deleteUser}
            >
              Delete Profile From Local Storage
            </button>
          )}
          <br />
          <br />
          NOTE: After clicking on delete from local storage, try refreshing the
          browser to see the amount of time fetch API takes to retrieve data.
          Then, refresh again to see the amount of time local storage takes to
          recieve the data.
        </div>
      </div>
    </>
  );
};

export default Profile;
