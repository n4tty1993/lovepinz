"use client";

import { REVIEWS } from "../ReviewSection/ReviewSection.constants";

const AVERAGE_RATING = 4.5;

function StarIcon({ filled }: { filled: "full" | "half" | "empty" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {filled === "half" ? (
        <>
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#halfStar)"
          />
        </>
      ) : (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled === "full" ? "#F59E0B" : "#D1D5DB"}
        />
      )}
    </svg>
  );
}

export function ReviewsBadge() {
  const fullStars = Math.floor(AVERAGE_RATING);
  const hasHalf = AVERAGE_RATING % 1 >= 0.5;

  const scrollToReviews = () => {
    const el = document.getElementById("reviews");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToReviews}
      className="flex items-center gap-1.5 mt-2 cursor-pointer"
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            filled={
              i < fullStars
                ? "full"
                : i === fullStars && hasHalf
                  ? "half"
                  : "empty"
            }
          />
        ))}
      </div>
      <span className="text-sm font-medium text-[#2C1A0E]">
        {REVIEWS.length.toLocaleString()} Reviews
      </span>
    </button>
  );
}
