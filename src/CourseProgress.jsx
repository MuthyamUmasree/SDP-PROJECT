import React from "react";
import "./courseProgress.css";

const CourseProgress = ({ progress }) => {
  return (
    <div className="progress-wrapper">
      <div className="circular-progress" style={{ "--value": progress }}>
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default CourseProgress;
