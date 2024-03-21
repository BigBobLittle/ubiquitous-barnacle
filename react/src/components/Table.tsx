import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface IUser {
  name: string;
  gender: string;
  sleepTime: string;
  date: Date;
  count?: number;
}


export interface IUserAggregate {
  name: string;
  gender: string;
  count: number;
  dates: Date[];
  sleepTimes: number[];
}

const MyTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const aggregateData = (data: IUser[]): IUserAggregate[] => {
  const aggregatedData: Record<string, IUserAggregate> = {};

  data.forEach((user: IUser) => {
    const key = `${user.name}-${user.gender}`;

    if (aggregatedData[key]) {
      aggregatedData[key].count++;
      if (user.sleepTime && typeof user.sleepTime === "string") {
        aggregatedData[key].sleepTimes.push(parseFloat(user.sleepTime));
      }
      if (user.date ) {
        aggregatedData[key].dates.push(user.date);
      }
    } else {
      aggregatedData[key] = {
        name: user.name,
        gender: user.gender,
        count: 1,
        dates: user.date ? [user.date] : [],
        sleepTimes:
          user.sleepTime && typeof user.sleepTime === "string"
            ? [parseFloat(user.sleepTime)]
            : [],
      };
    }
  });

  return Object.values(aggregatedData);
};

  const handleRowClick = (rowData: IUserAggregate) => {
    navigate("/charts", {
      state: { rowData },
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12} style={{ marginTop: "20px" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h2>List of Records</h2>
              <span style={{ color: "blue" }}>
                <Link to="/">Back to form</Link>
              </span>
            </div>

            {data.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Number of Entries</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregateData(data).map((row: IUserAggregate, index: number) => (
                    <tr key={index} onClick={() => handleRowClick(row)}>
                      <td>{row.name}</td>
                      <td>{row.gender}</td>
                      <td>{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No data found</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyTable;
