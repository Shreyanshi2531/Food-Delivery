import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import {
  setShops,
  setShopLoading,
} from "../redux/shop.slice";

function useGetShops() {

  const dispatch = useDispatch();

  const { current_city } = useSelector(
    (state) => state.user
  );

  useEffect(() => {

    if (!current_city) return;

    const fetchShops = async () => {

      try {

        dispatch(setShopLoading(true));

        const result = await axios.get(
          `${serverUrl}/api/shop/get-shops/${current_city}`
        );

        dispatch(setShops(result.data));

      } catch (error) {

        console.log(error);

      } finally {

        dispatch(setShopLoading(false));

      }

    };

    fetchShops();

  }, [current_city]);

}

export default useGetShops;