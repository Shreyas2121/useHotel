import { PhotoSlider } from "../PhotoSlider/PhotoSlider";

import { Hall, Status } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import personicon from "../../../public/icons8-user-groups-50.png";
import tick from "../../../public/icons8-tick-box-26.png";

interface Props {
  hallData: Hall;
  bookingDate: Date;
}

const Hallcards = ({ hallData, bookingDate }: Props) => {
  const hallPrice = hallData.price;

  const bookingDetails = {
    bookingDate,
    hallPrice,
    hallType: hallData.category,
    type: "hall",
  };

  return (
    <MDBContainer className="shadow-4-strong room-container">
      <MDBRow>
        <MDBCol size="md" className="card-column-one">
          <PhotoSlider images={Object.values(hallData.images)} />
        </MDBCol>

        <MDBCol md="6">
          <h3>{hallData.category}</h3>

          <p>
            <img src={personicon} className="max-occupancy" />
            {hallData.max_guests} (Max Occupancy)
          </p>

          <p>{hallData.desc}</p>

          <div className="display-flex">
            <span className="amenities-span">Amenities: </span>

            {hallData?.amenities.map((room) => (
              <p className="room-para">
                <img src={tick} className="tick-img" /> {room}
              </p>
            ))}
          </div>
        </MDBCol>

        <MDBCol size="md" className="card-column-three">
          <div>
            <p className="per-night">Per day for a hall</p>
            <p className="room-price">₹ {hallPrice}/-</p>
          </div>

          <div>
            <p className="total-price">
              Total: ₹{hallPrice}
              /-
            </p>
          </div>

          <div>
            <p>
              <Link
                to="/bookings"
                state={bookingDetails}
                className="link-style"
                id="booknow"
              >
                Select Hall
              </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Hallcards;
