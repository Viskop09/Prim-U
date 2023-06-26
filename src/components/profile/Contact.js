import React, { useState } from "react";
import "./Contact.css"

// Components
import Navbar from "../../common/Navbar";
import UserService from '../../services/user-service';

// Functions/methods
import { auth } from "../../firebase/firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../../common/Spinner";

export default function Contact() {
  const [changeEmail, setChangeEmail] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [updatePhone, setUpdatePhone] = useState("");

  const user = auth.currentUser;
  const navigate = useNavigate();

  async function onFormSubmit(e) {
    e.preventDefault();

    setButtonDisabled(true);
    setLoading(true);
    try {
      await updateEmail(user, changeEmail);
      await updateProfile(user, { displayName: updateName });
      await UserService.updateUser(auth.currentUser);
      //await updatePhoneNumber(user, updatePhone );
      navigate("/account");
      alert('Updated Successfully');
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
    setButtonDisabled(false);
    setLoading(false);
  }

  return (
    <div className="real-bg-dark" id="contact-page-background">
      <Navbar></Navbar>
      <div className="container mt-5 p-3">
        <img
          className="mx-auto d-block mb-5"
          src="https://prim-u.store/wp-content/uploads/2023/02/Prim-U-01-1.svg"
          width="100"
          height="80"
          alt=""
        />
        <div className="card p-5 mx-5">
          <form onSubmit={onFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Name"
                required
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                //value={updatePhone}
                //onChange={(e) => setUpdatePhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
                value={changeEmail}
                onChange={(e) => setChangeEmail(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-dark mt-3"
                id="updateButton"
                disabled={buttonDisabled}
              >
                {loading ? (
                  <Spinner extraClass="change-size" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}