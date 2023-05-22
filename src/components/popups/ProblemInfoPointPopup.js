import React from "react";
import { Card } from "react-bootstrap";

const ProblemInfoPointPopup = ({ data }) => {
  return (
    <Card border="0">
      {data.img ? (
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_API_URL + data.img}
        />
      ) : (
        <></>
      )}

      <Card.Body style={{ padding: "8px" }}>
        <Card.Title style={{ fontSize: "15px" }}>
          {data.category_problem.name} № {data.id}
        </Card.Title>
        <Card.Text style={{ marginTop: "0px" }}>{data.description===null?data.description:"Опис відсутній."}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {data.createdAt === data.updatedAt ? (
          <>
            <small className="text-muted">
              {`Створено ${String(new Date(data.createdAt).getDate()).padStart(
                2,
                "0"
              )}/${String(new Date(data.createdAt).getMonth() + 1).padStart(
                2,
                "0"
              )}/${new Date(data.createdAt).getFullYear()} ${String(
                new Date(data.createdAt).getHours()
              ).padStart(2, "0")}:${String(
                new Date(data.createdAt).getMinutes()
              ).padStart(2, "0")}`}
            </small>
          </>
        ) : (
          <>
            <small className="text-muted">
              {`Створено ${String(new Date(data.updatedAt).getDate()).padStart(
                2,
                "0"
              )}/${String(new Date(data.updatedAt).getMonth() + 1).padStart(
                2,
                "0"
              )}/${new Date(data.updatedAt).getFullYear()} ${String(
                new Date(data.updatedAt).getHours()
              ).padStart(2, "0")}:${String(
                new Date(data.updatedAt).getMinutes()
              ).padStart(2, "0")}`}
            </small>
          </>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ProblemInfoPointPopup;
