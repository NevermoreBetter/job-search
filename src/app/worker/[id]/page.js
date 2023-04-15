// "use client";
// import WorkerCard from "@/components/job/JobCard";
// import { AuthProvider } from "@/context/AuthContext";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import {
//   doc,
//   setDoc,
//   deleteField,
//   collection,
//   addDoc,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";

// const WorkerDetailPage = ({ params }) => {
//   const { id } = params;
//   const [workersData, setWorkersData] = useState([]);
//   const dbRef = collection(db, "workers");
//   const workerDetails = workersData.filter((worker) => worker.id == id);
//   const [recipientId, setRecipientId] = useState("");
//   const [message, setMessage] = useState("");
//   const { currentUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the current user's ID and email
//     const senderId = currentUser.uid;

//     // Check if the recipient's email exists in the database
//     const querySnapshot = await firestore
//       .collection("workers")
//       .where(
//         "id",
//         "==",
//         workerDetails.map((worker) => worker.id)
//       )
//       .get();

//     if (querySnapshot.empty) {
//       alert("Recipient not found");
//       return;
//     }

//     // Get the recipient's ID
//     const recipientId = querySnapshot.docs[0].id;

//     // Create a new message document in the messages collection
//     await firestore.collection("messages").add({
//       senderId,
//       recipientId,
//       message,
//       createdAt: new Date(),
//     });

//     // Notify the user that the message has been sent
//     alert("Message sent");
//   };
//   async function getWorkers() {
//     await getDocs(dbRef).then((response) => {
//       setWorkersData(
//         response.docs.map((data) => {
//           return { ...data.data(), id: data.id };
//         })
//       );
//     });
//   }
//   useEffect(() => {
//     getWorkers();
//   }, []);
//   return (
//     <>
//       {workerDetails.map((data) => {
//         return (
//           <div className="mb-8">
//             {data.Author}
//             <br />
//             {data.Salary}
//             <br />
//             {data.id}
//           </div>
//         );
//       })}
//       <form onSubmit={handleSubmit}>
//         <br />
//         <label>
//           Message:
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );
// };

// export default WorkerDetailPage;

import { AuthProvider } from "@/context/AuthContext";
import WorkerDetail from "@/components/worker/WorkerDetail";

const WorkerDetailPage = ({ params }) => {
  return (
    <AuthProvider>
      <div>
        <WorkerDetail params={params} />
      </div>
    </AuthProvider>
  );
};

export default WorkerDetailPage;
