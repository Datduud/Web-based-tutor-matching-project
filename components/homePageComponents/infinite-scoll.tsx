import React from "react";
import "./infinite-scoll.css";

const academicSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Literature",
  "History",
  "Geography",
  "Economics",
  "Psychology",
];

const InfiniteScroll = () => {
  return (
    <>
      <div className="relative logos mx-5 md:mx-24">
        <div
          className="absolute left-0 h-full w-1 z-10"
          style={{
            backgroundImage: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="absolute right-0 h-full w-1 z-10"
          style={{
            backgroundImage: "linear-gradient(to right, transparent, white)",
          }}
        />
        {Array.from({ length: 2 }).map((_, slideIndex) => (
          <div className="logos-slide" key={slideIndex}>
            {academicSubjects.map((subject, subjectIndex) => (
              <span
                key={subjectIndex}
                className={`overflow-hidden text-2xl px-5 font-semibold uppercase ${
                  subjectIndex % 2 === 0 ? "text-green-600" : "text-[#12544f]"
                }`}
              >
                {subject}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default InfiniteScroll;
