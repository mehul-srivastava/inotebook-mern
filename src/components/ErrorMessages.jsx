import React from "react";

const ErrorMessages = (props) => {
  return (
    <div className="mt-3">
      {props.errorMessage.length !== 0
        ? props.errorMessage.map((item, index) => (
            <span key={index} className="d-block mt-1 text-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="error-icon"
              >
                <title>alert-circle-outline</title>
                <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
              </svg>{" "}
              {item.msg}
            </span>
          ))
        : null}
    </div>
  );
};

export default ErrorMessages;
