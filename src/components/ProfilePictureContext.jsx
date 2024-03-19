import React, { createContext, useContext, useState } from "react";

const ProfilePictureContext = createContext();

export const ProfilePictureProvider = ({ children }) => {
  const [profilePictureData, setProfilePictureData] = useState(null);
  return (
    <ProfilePictureContext.Provider
      value={{ profilePictureData, setProfilePictureData }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};

export const useProfilePicture = () => useContext(ProfilePictureContext);
