import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import Navbar from "../components/Navbar";
import MenuItem from "../components/MenuItem";
import { serverUrl } from "../App";

function RestaurantPage() {
  const { shopId } = useParams();
  const location = useLocation();
  const selectedItemId = location.state?.itemId;
  console.log("Selected Item ID:", selectedItemId);

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [reviews, setReviews] = useState([]);

  const sectionRefs = useRef({});
  const itemRefs = useRef({});

  // Fetch Restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/shop/shop/${shopId}`);

        setShop(res.data);
        const reviewRes = await axios.get(
          `${serverUrl}/api/review/shop/${shopId}`,
        );

        setReviews(reviewRes.data.reviews);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [shopId]);

  useEffect(() => {
    if (!shop || !selectedItemId) return;

    setTimeout(() => {
      itemRefs.current[selectedItemId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setHighlightedItem(selectedItemId);

      setTimeout(() => {
        setHighlightedItem(null);
      }, 2000);
    }, 300);
  }, [shop, selectedItemId]);

  // Search Items
  const filteredItems = shop
    ? shop.items.filter((item) => {
        const query = search.toLowerCase().trim();

        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.foodType.toLowerCase().includes(query)
        );
      })
    : [];

  // Group By Category
  const groupedItems = {};

  filteredItems.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }

    groupedItems[item.category].push(item);
  });

  // Active Category Observer
  useEffect(() => {
    if (!shop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -45% 0px",
      },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [shop, search]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#E76F51" size={45} />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="h-screen flex items-center justify-center">
        Restaurant not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-24 bg-[#fff9f6] min-h-screen pb-20">
        <div className="w-[90%] mx-auto">
          {/* Restaurant Header */}

          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-[220px] object-cover"
            />

            <div className="p-8">
              <h1 className="text-4xl font-bold text-[#1D2939]">{shop.name}</h1>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-500">
                <span>⭐ {shop.averageRating || "New"}</span>

                <span className="text-gray-500">
                  ({shop.totalReviews || 0} Reviews)
                </span>

                <span>•</span>

                <span>25-35 mins</span>

                <span>•</span>

                <span>{shop.items.length} Items</span>
              </div>

              <p className="mt-3 text-gray-600">{shop.address}</p>

              <p className="text-[#E76F51] mt-2 font-medium">
                {shop.city}, {shop.state}
              </p>
            </div>
          </div>

          {/* Search */}

          <div className="flex justify-center mt-10">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search within menu..."
              className="
              w-full
              lg:w-[520px]
              px-6
              py-4
              rounded-2xl
              bg-white
              border
              border-gray-300
              outline-none
              focus:border-[#E76F51]
              focus:ring-2
              focus:ring-[#E76F51]/20
              transition
              "
            />
          </div>

          {/* Content */}

          <div className="flex gap-14 mt-12">
            {/* Sidebar */}

            <div
              className="
              hidden
              lg:block
              w-64
              sticky
              top-28
              self-start
              "
            >
              <h2 className="font-bold text-2xl mb-6">Categories</h2>

              {Object.entries(groupedItems).map(([category, items]) => (
                <button
                  key={category}
                  onClick={() => {
                    sectionRefs.current[category]?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-xl mb-2 transition ${
                    activeCategory === category
                      ? "bg-[#E76F51] text-white"
                      : "hover:bg-[#fff1ec]"
                  }`}
                >
                  <span>{category}</span>

                  <span>{items.length}</span>
                </button>
              ))}
            </div>

            {/* Menu */}

            <div className="flex-1">
              {Object.keys(groupedItems).length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No matching food items found.
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, items]) => (
                  <section
                    key={category}
                    id={category}
                    ref={(el) => (sectionRefs.current[category] = el)}
                    className="mb-14 scroll-mt-28"
                  >
                    <h2 className="text-3xl font-bold mb-6">{category}</h2>

                    {items.map((item) => (
                      <div
                        key={item._id}
                        ref={(el) => (itemRefs.current[item._id] = el)}
                        className={`
    rounded-2xl
    transition-all
    duration-100
    ${
      highlightedItem === item._id
        ? "bg-[#FFF2EC] ring-1 ring-[#f78c71] shadow-md p-1"
        : ""
    }
  `}
                      >
                        <MenuItem item={item} shopId={shop._id} />
                      </div>
                    ))}
                  </section>
                ))
              )}
            </div>
          </div>

          {/* Reviews */}

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

            {reviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm">
                No reviews yet.
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-3xl shadow-sm p-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {review.user?.fullName}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-yellow-500 font-bold">
                        ⭐ {review.rating}/5
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600">{review.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantPage;
