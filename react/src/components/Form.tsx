import React, { useState } from "react";
import { Form, Button, Col, Container, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


const MyForm: React.FC = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          gender,
          sleepTime,
          date: getCurrentDate(),
        }),
      });

      if (response.ok) {
        setShowToast(true); // Show the toast after successful submission
        setName("");
        setGender("");
        setSleepTime("");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Form</h2>
            <span style={{ color: "blue" }}>
              <Link to="/table">Go to Table Page</Link>
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGender" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSleepTime" className="mb-3">
              <Form.Label>Sleep time duration</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>

    <p className="mt-5">
      Fill the form with your preferred user name, gender, and sleep time duration
      Click on the "Go to Table Page" button to view the list of records
      You'll see a table with details of all users 
      Click on each user to see a Chart of their sleep times over the last 7 days
    </p>


          {/* Toast Notification */}
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            style={{ position: "absolute", top: 20, right: 20 }}
            bg="success"
          >
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>Form submitted successfully!</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm;

