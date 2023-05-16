import React from "react";

const JobEdit = () => {
  async function handleUpdateJob() {
    try {
      const fieldsToEdit = doc(dbRef, ID);
      await updateDoc(fieldsToEdit, {
        Name: name,
        Description: description,
        Type: typeName,
        Experience: experience,
        City: cityName,
        Salary: salary,
      });
      handleClick();
    } catch (error) {
      console.log(error);
    }
  }
  return <div>JobEdit</div>;
};

export default JobEdit;
