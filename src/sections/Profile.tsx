import React, { useEffect, useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  picture: string;
}

const Profile = () => {
  const [isProfile, setIsProfile] = useState<UserDetails | null>(null);
  useEffect(() => {
    const userDetailsstore: any = localStorage.getItem("user");
    const userDetails = JSON.parse(userDetailsstore);
    setIsProfile(userDetails);
  }, []);

  return (
    <div>
      {isProfile ? (
        <div>
          <p>Name: {isProfile.name}</p>
          <p>Email: {isProfile.email}</p>
          <img src={isProfile.picture} alt="Profile" />
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
