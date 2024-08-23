import React, { useState } from "react";
import Modal from "./Modal";
import "./StudentDashboard.css"; // Import the CSS file

export default function StudentDashboard() {
    const [open, setOpen] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track which student is being edited

    const handleClose = () => {
        setOpen(false);
        setEditIndex(null); // Reset editIndex when closing modal
    };

    const handleOpen = (index) => {
        if (index !== undefined) {
            setEditIndex(index);
        }
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (editIndex !== null) {
            // Update existing student
            setStudentList((prevList) =>
                prevList.map((student, index) =>
                    index === editIndex ? data : student
                )
            );
        } else {
            // Add new student
            setStudentList((prevList) => [...prevList, data]);
        }

        handleClose(); // Close the modal after submission
    };

    const handleEdit = (index) => {
        handleOpen(index); // Open modal and set editIndex
    };

    return (
        <div className="dashboard-container">
            <button type="button" className="btn btn-primary" onClick={() => handleOpen()}>
                Add Student
            </button>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student, index) => (
                        <tr key={index}>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                            <td>{student.gender}</td>
                            <td>{student.mobile}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={open}>
                <div className="modal-close-button">
                    <button className="btn btn-warning" onClick={handleClose}> X </button>
                </div>
                <h5 className="bold" class="modal-title">{editIndex !== null ? "Edit Student" : "Add Student"}</h5>
                <form onSubmit={handleSubmit}>
                    <dl class="modal-body">
                        <label style={{ fontWeight: "bold" }}><span style={{ color: "red" }}>*</span>Name : </label>&nbsp;
                        <input
                            type="text"
                            name="name"
                            defaultValue={editIndex !== null ? studentList[editIndex].name : ""}
                            required
                        /><br /><br />

                        <label style={{ fontWeight: "bold" }}><span style={{ color: "red" }}>*</span>Grade : </label>&nbsp;
                        <input
                            type="text"
                            name="grade"
                            defaultValue={editIndex !== null ? studentList[editIndex].grade : ""}
                            required
                        /><br /><br />

                        <label style={{ fontWeight: "bold" }}><span style={{ color: "red" }}>*</span>Gender : </label>&nbsp;
                        <select
                            style={{ width: "56%" }}
                            name="gender"
                            defaultValue={editIndex !== null ? studentList[editIndex].gender : "select"}
                            required
                        >
                            <option value="select">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select><br /><br />

                        <label style={{ fontWeight: "bold" }}><span style={{ color: "red" }}>*</span>Mobile : </label>&nbsp;
                        <input
                            type="text"
                            name="mobile"
                            pattern="\+91\d{10}"
                            defaultValue={editIndex !== null ? studentList[editIndex].mobile : ""}
                            required
                        /><br /><br />

                        <label style={{ fontWeight: "bold" }}>Address : </label>&nbsp;
                        <textarea
                            name="address"
                            rows="2"
                            cols="22"
                            defaultValue={editIndex !== null ? studentList[editIndex].address : ""}
                        ></textarea><br /><br />
                    </dl>
                    <button class="modal-footer" className="btn btn-danger" type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
                </form>
            </Modal>
        </div>
    );
}
