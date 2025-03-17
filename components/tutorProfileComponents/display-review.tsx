"use client";
import { Review } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface DisplayReviewProps {
  review: any[];
}

const DisplayReview = ({ review }: DisplayReviewProps) => {
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="star-rating flex gap-3 mt-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`h-4 w-4 ${
            index + 1 <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
  return (
    <>
      {review.length === 0 ? (
        <>
        <div className="mt-7">No reviews yet</div>
        </>
      ) : (
        <>
          {review
            .filter((reviewItem) => reviewItem.rating > 3)
            .map((reviewItem) => (
              <div
                className="flex flex-col mt-5 border-2 shadow-md rounded-md p-3"
                key={reviewItem.id}
              >
                <div className="ml-3 my-3">
                  <div className="flex flex-row">
                    <div className="mr-5">
                      <Image
                        src={reviewItem.sender.imageUrl}
                        alt="user image"
                        className="rounded-full object-cover"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">
                        {reviewItem.sender.name}
                      </p>
                      <StarRating rating={reviewItem.rating} />
                    </div>
                  </div>
                  <p className="mt-3">{reviewItem.description}</p>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default DisplayReview;
