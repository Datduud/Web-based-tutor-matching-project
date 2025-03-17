"use client";
import { Subject, User } from "@prisma/client";
import { useEffect, useState } from "react";
import DisplayFilter from "./display-filter";
import DisplayTutor from "./display-tutor";
import axios from "axios";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import teacherGroup from "@/public/teacher-group.jpg";

interface DisplayFindTutorProps {
  allSubjects: Subject[];
}

const DisplayFindTutor = ({ allSubjects }: DisplayFindTutorProps) => {
  const [validSubjects, setValidSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [matchedTutors, setMatchedTutors] = useState<User[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 1000);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const subjectIds = validSubjects.map((subject) => subject.id);
      const url = qs.stringifyUrl({
        url: "/api/tutors",
        query: {
          pageNumber: pageNumber.toString(),
          ...(subjectIds.length > 0 && { subjectIds: subjectIds.join(",") }),
          ...(debouncedSearch.length > 0 && { name: `${debouncedSearch}` }),
        },
      });
      const tutors = await axios.get(url);
      setMatchedTutors(tutors.data.tutors);
      setMaxPage(Math.ceil(tutors.data.total / itemsPerPage));
      setLoading(false);
    };
    fetchData();
  }, [validSubjects, pageNumber, maxPage, debouncedSearch]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${teacherGroup.src})` }}
        className="bg-cover bg-no-repeat bg-center bg-blend-multiply bg-fixed bg-neutral-400 h-[400px]"
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="text-white m-auto text-center">
            <h1 className="text-5xl lg:text-8xl">
              <div className="mx-auto relative w-fit uppercase block after:block font-semibold after:content-[''] after:absolute after:h-[5px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-500 after:origin-center">
                Find your tutor
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div className="display-find-tutor-container">
        <div className="title-container flex justify-between px-10 my-10">
          <h2 className="text-2xl font-semibold">Filter options</h2>
          <h2 className="text-2xl font-semibold hidden md:block">
            Available Tutors
          </h2>
        </div>
        <div className="flex flex-col md:flex-row px-10 mt-5">
          <div className="basis-1/4">
            <DisplayFilter
              subjects={allSubjects}
              validSubjects={validSubjects}
              setPage={setPageNumber}
              setValidSubjects={setValidSubjects}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="basis-3/4 ml-0 md:ml-24">
            <DisplayTutor tutors={matchedTutors} loading={loading} />
            <div className="w-full flex justify-center items-center mt-5">
              <Button
                className="mr-3"
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                }}
                disabled={pageNumber <= 1}
              >
                Prev
              </Button>
              <span>{pageNumber}</span>
              <Button
                className="ml-3"
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
                disabled={pageNumber >= maxPage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayFindTutor;
