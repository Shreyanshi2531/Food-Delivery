import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setShopOrders } from "../redux/owner.slice";

function useGetShopOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShopOrders = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/order/shop-orders`,
          {
            withCredentials: true,
          }
        );

        dispatch(setShopOrders(result.data.orders));
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopOrders();
  }, [dispatch]);
}

export default useGetShopOrders;