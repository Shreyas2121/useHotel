import React from "react";
import { Form } from "react-bootstrap";

const BookingDetails = ({
  checkIn = null,
  checkOut = null,
  no = 0,
  type,
  date = null,
}) => {
  return (
    <div id="details">
      <div>
        <Form.Group>
          <Form.Label>
            {no === 0 ? (
              <div>
                <p className="bold">Booked Date : {date.toDateString()}</p>
              </div>
            ) : (
              <div>
                <p className="bold">Check In : {checkIn.toDateString()}</p>
                <p className="bold">Check Out : {checkOut.toDateString()}</p>
              </div>
            )}
          </Form.Label>
        </Form.Group>
      </div>

      <div>
        {checkIn && checkOut && (
          <Form.Group>
            <Form.Label htmlFor="adult" id="room-qnty">
              <p className="bold">Number of rooms :</p> {no}
            </Form.Label>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label htmlFor="adult" id="room-type">
            <p className="bold">Type : </p>
            {type}
          </Form.Label>
        </Form.Group>
      </div>
    </div>
  );
};

export default BookingDetails;
