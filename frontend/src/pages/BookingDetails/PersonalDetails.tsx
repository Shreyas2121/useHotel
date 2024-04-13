import React from "react";
import { Form } from "react-bootstrap";

const PersonalDetails = ({ name, email }) => {
  return (
    <div id="personal-details">
      <Form.Group id="name-group" className="mb-3">
        <Form.Label id="name-label">Name</Form.Label>
        <Form.Control id="name-id" type="text" value={name} required />
      </Form.Group>

      <Form.Group id="email-group" className="mb-3" controlId="formBasicEmail">
        <Form.Label id="email-label" htmlFor="email" required>
          E-mail
        </Form.Label>
        <Form.Control
          value={email}
          type="email"
          id="email"
          name="visitor_email"
          required={true}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
      </Form.Group>
    </div>
  );
};

export default PersonalDetails;
