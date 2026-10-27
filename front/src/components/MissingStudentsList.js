import React from "react";
import Icon from "./Icon";

function StudentStatus({ status }) {
  const statusInformation = {
    pending: {
      label: "Pendente",
      className: "pending",
    },

    absent: {
      label: "Ausente",
      className: "absent",
    },
  };

  const information =
    statusInformation[status] ||
    statusInformation.pending;

  return (
    <span
      className={`missing-student-status status-${information.className}`}
    >
      <span className="student-status-dot" />

      {information.label}
    </span>
  );
}

function MissingStudentsList({ students = [] }) {
  function handleCall(phone) {
    if (!phone) {
      return;
    }

    window.location.href = `tel:${phone}`;
  }

  const orderedStudents = [...students].sort(
    (studentA, studentB) => {
      const orderA =
        studentA.boardingPointOrder ??
        Number.MAX_SAFE_INTEGER;

      const orderB =
        studentB.boardingPointOrder ??
        Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return (
        studentA.boardingPoint || ""
      ).localeCompare(
        studentB.boardingPoint || "",
        "pt-BR"
      );
    }
  );

  return (
    <section
      className="missing-students"
      aria-labelledby="missing-students-title"
    >
      <div className="missing-students-header">
        <h2 id="missing-students-title">
          Alunos que ainda faltam
        </h2>

        <span>{orderedStudents.length}</span>
      </div>

      {orderedStudents.length === 0 ? (
        <div className="all-boarded-message">
          <Icon name="check" size={22} />

          <p>Todos os alunos embarcaram.</p>
        </div>
      ) : (
        <div className="missing-students-list">
          {orderedStudents.map((student) => (
            <article
              key={student.id}
              className="missing-student-row"
            >
              <strong className="missing-student-name">
                {student.name}
              </strong>

              <span className="missing-student-stop">
                {student.boardingPoint ||
                  "Ponto não informado"}
              </span>

              <StudentStatus
                status={student.status}
              />

              <button
                type="button"
                className="call-student-button"
                aria-label={`Ligar para ${student.name}`}
                onClick={() =>
                  handleCall(student.phone)
                }
              >
                <Icon name="phone" size={18} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MissingStudentsList;