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

        <p>{student.course}</p>

        <span className="presence-confirmed">
          <Icon name="checkCircle" size={14} />
          Presença confirmada
        </span>
      </div>
    </section>
  );
}

export default StudentInformation;