import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewManagers() 
{
    const [managers, setManagers] = useState([]);
    const [error, setError] = useState("");

    const displayManagers = async () => 
      {
        try 
        {
            const response = await axios.get(`${config.url}/admin/viewalleventmanagers`);
            setManagers(response.data);
        } 
        catch (err) 
        {
            setError("Failed to fetch event managers data ... " + err.message);
        } 
    };

    useEffect(() => {
      displayManagers();
    }, []);

    const deleteManager = async (mid) => 
        {
            try 
            {
                const response = await axios.delete(`${config.url}/admin/deletemanager?mid=${mid}`);
                toast.success(response.data);  // show success toast
                displayManagers();           // refresh managers list
            } 
            catch (err) 
            {
                console.log(err);
                setError("Unexpected Error Occurred... " + err.message);
                toast.error("Deletion failed: " + err.message); // show error toast
            }
        };

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
                <u>View All Event Managers</u>
            </h3>

            <ToastContainer position="top-center" autoClose={4000} />


            {error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    {error}
                </p>
            ) : managers.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
                    No Event Managers Data Found
                </p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Company Name</th>
                            <th>Company Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager.id}>
                                <td>{manager.id}</td>
                                <td>{manager.name}</td>
                                <td>{manager.gender}</td>
                                <td>{manager.dob}</td>
                                <td>{manager.email}</td>
                                <td>{manager.username}</td>
                                <td>{manager.mobileno}</td>
                                <td>{manager.company_name}</td>
                                <td>{manager.company_location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteManager(manager.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}