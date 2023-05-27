import React from "react";
import Company from "@/components/job/Company";
const CompanyPage = ({ params }) => {
  return (
    <div>
      <Company params={params} />
    </div>
  );
};

export default CompanyPage;
