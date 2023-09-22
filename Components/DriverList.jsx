import React, { useState, useEffect } from "react";

function DriverList() {
  const [view, setView] = useState("listing"); // 'listing', 'create', or 'edit'
  const [driverData, setDriverData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [validation, setValidation] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = (to) => setView(to);


  useEffect(() => {
    // Fetch driver data
    fetch(" http://localhost:500/drivers")
      .then((res) => res.json())
      .then((resp) => setDriverData(resp))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    // Update driver data when driverData state changes
    fetch("http://localhost:500/drivers")
      .then((res) => res.json())
      .then((resp) => setDriverData(resp))
      .catch((err) => console.log(err.message));
  }, [driverData]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhoneNumber = (phone) => {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePhoneNumber(phone)) {
      return;
    }

    const driverData = { id, name, email, phone, address };

    fetch(" http://localhost:500/drivers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(driverData),
    })
      .then((res) => {
        alert("Saved Successfully");
        navigate("listing");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePhoneNumber(phone)) {
      return;
    }

    const driverData = { id, name, email, phone, address };

    fetch(` http://localhost:500/drivers/${selectedDriver.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driverData),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Driver updated successfully.");
          navigate("listing");
        } else {
          alert("Something went wrong. Please try again later.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEditClick = (driver) => {
    setId(driver.id);
    setName(driver.name);
    setEmail(driver.email);
    setPhone(driver.phone);
    setAddress(driver.address);
    setSelectedDriver(driver);
    navigate("edit");
  };

  const handleRemoveClick = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(` http://localhost:500/drivers/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((resp) => {
          alert("Removed successfully.");
          setDriverData(driverData.filter((driver) => driver.id !== id));
        })
        .catch((err) => console.log(err.message));
    }
  };

  const filteredDriverData =
    driverData &&
    driverData.filter((item) => {
      return (
        item.id.toString().includes(search) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
      );
    });

  const renderListingView = () => (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Driver Listing</h2>
          <br />
          <input
            type="text"
            placeholder="search..."
            className="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="card-body">
          <div className="divbtn">
            <button
              onClick={() => navigate("create")}
              className="btn btn-success"
            >
              Add New(+)
            </button>
          </div>
          <br />
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
              {filteredDriverData &&
                filteredDriverData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleRemoveClick(item.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateEditView = () => (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={view === "create" ? handleCreateSubmit : handleEditSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>{view === "create" ? "Driver Add" : "Driver Update"}</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && <div className="error">{emailError}</div>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone number</label>
                      <input
                        required="tel"
                        maxLength={"10"}
                        minLength={0}
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {phoneError && <div className="error">{phoneError}</div>}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                      <button
                        onClick={() => navigate("listing")}
                        className="btn btn-danger"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {view === "listing" && renderListingView()}
      {view === "create" && renderCreateEditView()}
      {view === "edit" && renderCreateEditView()}
    </div>
  );
}

export default DriverList;
