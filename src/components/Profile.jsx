import React, { useContext, useEffect, useRef } from "react";

import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";

const Profile = () => {
  const { user, fetchUser, setUser } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const buttonRef = useRef();

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

  const getFullDate = (date) => {
    if (date === "fetching...") return "fetching...";

    date = new Date(date).toString().split(" ");
    return `${date[2]} ${date[1]} ${date[3]}, ${date[4]} ${date
      .slice(6)
      .join(" ")}`;
  };

  const deleteFromLocalStorage = () => {
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
              <ProfileSection heading="Full Name" text={user.name} />
              <hr />
              <ProfileSection heading="Email" text={user.email} />
              <hr />
              <ProfileSection
                heading="Joined On"
                text={user.addedAt && getFullDate(user.addedAt)}
              />
            </div>
          </div>
          {localStorage.getItem("user") && (
            <button
              className="btn btn-outline-danger btn-sm"
              ref={buttonRef}
              onClick={deleteFromLocalStorage}
            >
              Delete Profile From Local Storage
            </button>
          )}
          <LocalStorageDescription />
        </div>
      </div>
    </>
  );
};

const ProfileSection = (props) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="row">
      <div className="col-sm-3">
        <p className="mb-0">{props.heading}</p>
      </div>
      <div className="col-sm-9">
        <p className={`${darkMode ? "text-white" : "text-muted"} mb-0`}>
          {props.text}
        </p>
      </div>
    </div>
  );
};

const LocalStorageDescription = () => {
  return (
    <p className="mt-4">
      NOTE: After clicking on delete from local storage, try refreshing the
      browser to see the amount of time fetch API takes to retrieve data. Then,
      refresh again to see the amount of time local storage takes to recieve the
      data.
    </p>
  );
};

export default Profile;
