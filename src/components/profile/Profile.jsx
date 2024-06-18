import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
    const {  currentUser } = useContext(AuthContext);




  return <div>Profile</div>;
}

export default Profile;
