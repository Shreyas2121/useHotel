import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Reviews.css";

import RatingCard from "react-star-ratings";
import { postReview } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const AddReview = () => {
  const navigate = useNavigate();

  const {
    user: { _id },
    token,
  } = useAuth();

  if (!_id) return <Navigate to="/login" />;

  const reviewMut = useMutation({
    mutationFn: postReview,
  });

  const location = useLocation();
  const { bookingId } = location.state;

  const [rating, setRating] = useState<number>(0);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submitReview = async (e: any) => {
    e.preventDefault();

    const review = reviewRef.current?.value;

    const data = {
      bookingId,
      reviewBy: _id,
      rating,
      comment: review,
    };

    reviewMut.mutate(
      { data, token },
      {
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },

        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/checkbooking");
        },
      }
    );
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="review-form">
        <Form onSubmit={submitReview}>
          <h2 className="Form-Title">How Was Your Experience?</h2>
          <br />
          <br />
          <Form.Group
            id="rating"
            style={{
              display: "flex",
            }}
          >
            <Form.Label
              style={{
                marginRight: "10px",
              }}
            >
              Rating :{" "}
            </Form.Label>

            <RatingCard
              rating={rating}
              starRatedColor="orange"
              starHoverColor="orange"
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
              starDimension="25px"
              starSpacing="3px"
              name="rating"
            />
          </Form.Group>
          <br />
          <Form.Group id="review">
            <Form.Label>Review : </Form.Label>

            <Form.Control as="textarea" rows={3} ref={reviewRef} required />
          </Form.Group>
          <br />
          <Button className="w-100" type="submit" ref={buttonRef}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddReview;
