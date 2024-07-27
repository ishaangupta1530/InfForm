import React, { useRef, useState } from "react";
import { firestore } from "../firebase.config";
import { addDoc, collection } from "@firebase/firestore";
export default function Home() {
  const nameRef = useRef();
  const branchRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [latestRecord, setLatestRecord] = useState(null);

  const ref = collection(firestore, "IshaanComputerEngg");

  const handleSave = async (e) => {
    e.preventDefault();
    //defines a constant handleSave and assigns it an asynchronous arrow function. The async keyword indicates that the function will contain asynchronous operations, allowing the use of await within the function.
    // function takes a single parameter e, which is the event object representing the event that triggered this function (likely a form submission event)
    // Perform some asynchronous operation, such as saving data to a database
    //jispoint pe ye pata lage ki wo khatam ho jaaye tabhi mai aage badhu waha await lagana padega
    const data = {
      name: nameRef.current.value,
      branch: branchRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      timestamp: new Date().toLocaleString(),
    };
    try {
      await addDoc(ref, data);
      setSuccessMessage("Record has been saved successfully!!");
      setLatestRecord(data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const downloadReceipt = () => {
    if (!latestRecord) return;

    const receiptContent = `
      Name: ${latestRecord.name}\n
      Branch: ${latestRecord.branch}\n
      Email: ${latestRecord.email}\n
      Phone: ${latestRecord.phone}\n
      Timestamp: ${latestRecord.timestamp}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });//You can create a Blob using the Blob constructor, which takes an array of data 
    //Blobs are used to handle raw binary data in web applications.
//They are useful for creating, manipulating, and transmitting large binary data, such as files.
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'receipt.txt';
    link.click();
  };

  return (
    <div>
      <div className="form-title">Student Information Entry Form</div>
      <form onSubmit={handleSave}>
        <div>
          <label>Name:</label>
          <input type="text" ref={nameRef} required />
        </div>
        <div>
          <label>Branch:</label>
          <input type="text" ref={branchRef} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" ref={phoneRef} required />
        </div>
        <button type="submit">Save</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={downloadReceipt}>Download Receipt</button>
      {latestRecord && (
        <div>
          <h2>Latest Record:</h2>
          <p>Name: {latestRecord.name}</p>
          <p>Branch: {latestRecord.branch}</p>
          <p>Email: {latestRecord.email}</p>
          <p>Phone: {latestRecord.phone}</p>
          <p>Timestamp: {latestRecord.timestamp}</p>
        </div>
      )}
    </div>
  );
}

