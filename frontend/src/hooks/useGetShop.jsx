import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice.js'
import { setMyShopData } from '../redux/owner.slice.js'

function useGetShop() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-shop`, {withCredentials:true})
                dispatch(setMyShopData(result.data));
            } catch (error) {
                console.error("Error fetching shop:", error);
                dispatch(setMyShopData(null));
            }
        }
        fetchShop()
    }, [dispatch])
}

export default useGetShop;