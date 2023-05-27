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
      {companyName}
      <br />
      {companyDescription}
      <br />
      {displayJobs.map((data) => {
        return (
          <div className="shadow-xl p-2 rounded-md border-8" key={data.id}>
            <Link href={`/jobs/${data.id}`}>
              <h2 className="text-teal-500 break-words mb-2">{data.Name}</h2>
            </Link>
            {data.Salary.map((salary) => {
              return `${salary}$`;
            }).join("-")}
            <br />
            <div className="flex gap-4 text-sm">
              <div> {data.Experience}</div>
              <div>{data.Type}</div>
              <div>{data.City.join(", ")}</div>
            </div>
            <br />
            <div className="break-words">{data.Description}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Company;
