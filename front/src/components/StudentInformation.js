import React from "react";
import Icon from "./Icon";

function StudentInformation({ student }) {
  return (
    <section className="student-information">
      <span className="student-avatar">
        <Icon name="profile" size={38} />
      </span>

      <div className="student-details">
        <h2>{student.name}</h2>

      </div>
    </section>
  );
}

export default StudentInformation;