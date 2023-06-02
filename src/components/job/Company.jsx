"use client";
import React, { useState } from "react";
import useGetJobs from "@/hooks/fetchJobs";
import useGetCompany from "@/hooks/useFetchCompany";
import Link from "next/link";
import Image from "next/image";
const Company = ({ params }) => {
  const { id } = params;
  const { jobsData, isLoading } = useGetJobs();
  const { companyData } = useGetCompany();
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const displayJobs = jobsData.filter((job) => {
    return job.Company.includes(id);
  });
  console.log(displayJobs);

  const displayCompanyPromise = new Promise((resolve, reject) => {
    const displayCompany = companyData.find((data) => {
      return data.Name.includes(id);
    });

    if (displayCompany) {
      resolve(displayCompany);
    } else {
      reject("Company not found");
    }
  });

  displayCompanyPromise
    .then((data) => {
      console.log(data);
      setCompanyName(data.Name);
      setCompanyDescription(data.Description);
    })
    .then(() => {
      console.log(companyName, companyDescription);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="container mt-[5rem]">
      <div className="mb-8">
        Про компанію {companyName} :
        <br />
        {companyDescription}
      </div>

      {displayJobs.map((data) => {
        return (
          <div
            className="mb-8 shadow-2xl p-4 rounded-md border-2 w-[100%] "
            key={data.id}
          >
            <div className="flex items-center justify-between">
              <Link href={`/jobs/${data.id}`}>
                <h2 className="text-teal-500 break-words mb-2">{data.Name}</h2>
              </Link>

              <p className="text-sm">
                {new Date(data.Date.seconds * 1000).toLocaleString("uk-UA", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            {data.Salary.map((salary) => {
              return `${salary}$`;
            }).join("-")}
            <br />
            <div className="flex gap-4 text-sm mt-3 font-bold">
              <div className="bg-gray-200 rounded-md p-2 text-gray-500">
                {data.Experience}
              </div>
              <div className="bg-gray-200 rounded-md p-2  text-orange-500">
                {data.Type}
              </div>
              <div className="bg-gray-200 rounded-md p-2  text-pink-500">
                {data.City.join(", ")}
              </div>
            </div>
            <br />
            <div className="break-words">{data.Description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Company;
