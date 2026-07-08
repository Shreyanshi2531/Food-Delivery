import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import MenuItem from "../components/MenuItem";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function RestaurantPage() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/shop/shop/${shopId}`);
        setShop(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [shopId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      }, [shop, search]);
      {
        threshold: 0.35,
      },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [groupedItems]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#E76F51" size={45} />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="h-screen flex justify-center items-center">
        Restaurant not found
      </div>
    );
  }

  const filteredItems = shop.items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div className="pt-24 bg-[#fff9f6] min-h-screen pb-20">
        <div className="w-[92%] lg:w-[85%] mx-auto">
          {/* COVER */}

          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-[180px] rounded-3xl object-cover"
          />

          {/* HEADER */}

          <div className="bg-white rounded-3xl shadow-sm mt-5 p-6">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {shop.name}
                </h1>

                <p className="text-gray-500 mt-3">{shop.address}</p>

                <p className="text-[#E76F51] font-medium mt-2">
                  {shop.city}, {shop.state}
                </p>
              </div>

              <div
                className="
                bg-[#fff7f3]
                rounded-2xl
                px-6
                py-5
                min-w-[220px]
                h-fit
                "
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-green-600">⭐ 4.5</span>

                  <span className="text-gray-500">25-35 mins</span>
                </div>

                <div className="border-t my-4"></div>

                <p className="text-gray-600 text-sm">
                  {shop.items.length} Items Available
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <div className="flex justify-center mt-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search within menu..."
              className="
              w-full
              lg:w-[450px]
              px-5
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              outline-none
              focus:ring-2
              focus:ring-[#E76F51]/20
              focus:border-[#E76F51]
              transition
              "
            />
          </div>

          {/* MENU */}

          <div className="flex gap-12 mt-12">
            {/* LEFT SIDEBAR */}

            <div
              className="
              hidden
              lg:block
              w-60
              sticky
              top-28
              self-start
              "
            >
              <h2 className="text-xl font-bold mb-5">Categories</h2>

              {Object.entries(groupedItems).map(([category, items]) => (
                <button
                  key={category}
                  onClick={() => {
  setActiveCategory(category);

  sectionRefs.current[category]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}}
                  className={`
w-full
text-left
flex
justify-between
items-center
px-4
py-3
rounded-xl
mb-2
transition-all
duration-200
${
  activeCategory === category
    ? "bg-[#E76F51] text-white shadow-md"
    : "hover:bg-[#fff3ee] hover:text-[#E76F51]"
}
`}
                >
                  <span className="font-medium">{category}</span>

                  <span className="text-gray-400 text-sm">{items.length}</span>
                </button>
              ))}
            </div>

            {/* RIGHT */}

            <div className="flex-1">
              {Object.entries(groupedItems).map(([category, items]) => (
                <section
  id={category}
  ref={(el) => (sectionRefs.current[category] = el)}
                  key={category}
                  className="mb-16 scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold text-[#E76F51] mb-4">
                    {category}
                  </h2>

                  {items.map((item) => (
                    <MenuItem key={item._id} item={item} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
