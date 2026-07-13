import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  shopName,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHover(0);
      setReview("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">
      <div className="bg-white rounded-3xl w-[92%] max-w-md p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-center">
          Rate {shopName}
        </h2>

        <p className="text-center text-gray-500 mt-2">
          We'd love to hear your experience.
        </p>

        {/* Stars */}

        <div className="flex justify-center gap-3 mt-8">

          {[1, 2, 3, 4, 5].map((star) => (

            <FaStar
              key={star}
              size={34}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`
                cursor-pointer
                transition
                ${
                  star <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              `}
            />

          ))}

        </div>

        {/* Review */}

        <textarea
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience..."
          className="
            w-full
            mt-8
            border
            rounded-2xl
            p-4
            outline-none
            resize-none
            focus:border-[#E76F51]
          "
        />

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            disabled={rating === 0}
            onClick={() =>
              onSubmit({
                rating,
                review,
              })
            }
            className="
              px-6
              py-2.5
              rounded-xl
              bg-[#E76F51]
              text-white
              disabled:opacity-50
            "
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReviewModal;