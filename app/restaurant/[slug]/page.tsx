import NavBar from "../../components/NavBar";
import Description from "./components/Description";
import Header from "./components/Header";
import Images from "./components/Images";
import Raing from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Review";
import Title from "./components/Title";

export default function RestaurantDetails() {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar />
        <Title />
        <Raing />
        <Description />
        <Images />
        <Reviews />
      </div>
      <ReservationCard />
      {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */} {/* RESERVATION
      CARD PORTION */}
    </>

  )
}

