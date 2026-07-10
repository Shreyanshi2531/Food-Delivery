import React from "react";

function StatCard({
  title,
  value,
  icon,
  bgColor,
  textColor,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        ${bgColor}
        rounded-3xl
        p-6
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
        border
        border-white/40
      `}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className={`text-sm font-medium ${textColor}`}>
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-white/70
          flex
          items-center
          justify-center
          text-2xl
          shadow-sm
          "
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;