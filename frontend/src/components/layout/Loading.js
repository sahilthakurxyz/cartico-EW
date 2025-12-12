import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <p>Please wait, your website is loading...</p>
      <p>
        Behind the scenes magic! We're gathering the information you need for a
        fantastic experience. This is a one-time wait of about 15-20 seconds on
        your first visit. Thanks for your patience! The loading time depends on
        your internet connection and browser. We appreciate your patience.
      </p>
    </div>
  );
};

export default Loading;
