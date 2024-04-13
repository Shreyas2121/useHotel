import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { isMobile, isTablet } from "react-device-detect";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./Loader";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Rooms = lazy(() => import("./pages/BookRoom"));
const Halls = lazy(() => import("./pages/BookHall"));
const BookingFormMain = lazy(() => import("./pages/BookingDetails/Main"));
const AddReview = lazy(() => import("./pages/Reviews/AddReview"));
const Checkbooking = lazy(() => import("./pages/Checkbooking"));
const ConfirmDetails = lazy(() => import("./pages/success/ConfirmDetails"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/register/Login"));

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavBar />
      <ToastContainer />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="halls" element={<Halls />} />
          <Route path="bookings" element={<BookingFormMain />} />
          <Route path="checkbooking" element={<Checkbooking />} />
          <Route path="success" element={<ConfirmDetails />} />
          <Route path="addreview" element={<AddReview />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
