import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentState,
  setCurrentCity,
  setCurrentAddress,
} from "../redux/user.slice.js";

function useGetCity() {

  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const result = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const locationData = result?.data?.address;

          const city =
            locationData?.city ||
            locationData?.town ||
            locationData?.state_district ||
            locationData?.county ||
            locationData?.village ||
            "Unknown Location";

          dispatch(setCurrentCity(city));

          dispatch(
            setCurrentState(locationData?.state)
          );

          dispatch(
            setCurrentAddress(result?.data?.display_name)
          );

          console.log(result?.data);

        } catch (error) {
          console.log(error);
        }

      },

      (error) => {
        console.log(error);
      },

      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }

    );

  }, [userData]);

}

export default useGetCity;