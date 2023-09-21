import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DriverListing() {
  const [driverdata, setDriverData] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredDriverData =
    driverdata &&
    driverdata.filter((item) => {
      return (
        item.id.toString().includes(search) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
      );
    });

  useEffect(() => {
    fetch("http://localhost:8000/driver")
      .then((res) => res.json())
      .then((resp) => setDriverData(resp))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Driver Listing</h2>
          <br />
          <input type="text" placeholder="search..." className="search" onChange={(e) => setSearch(e.target.value)}/>
          </div>
            <div className="card-body">
                <div className="divbtn">
                    <Link to="/driver/create" className="btn btn-success">Add New(+)</Link>
                </div><br />
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone.no</td>
                        <td>Address</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredDriverData && filteredDriverData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                <a onClick={() => {navigate(`/driver/edit/${item.id}`);}}className="btn btn-success">Update</a>
                                <a onClick={() => {if (window.confirm("Do you want to remove?")) {
                                    fetch(`http://localhost:8000/driver/${item.id}`, {
                                    method: "DELETE",
                                    }).then((res) => res.json())
                                      .then((resp) => {
                                      alert("Removed successfully.");
                                      window.location.reload();
                                    }).catch((err) => console.log(err.message));
                                    }
                                    }}className="btn btn-danger">Remove</a>
                            </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverListing;
