import React from "react";
import { Avatar } from "@mui/material";

const UserAvatar = ({ src, size = 40 }) => {
  return (
    <Avatar
      alt="User Avatar"
      src={src}
      sx={{ width: size, height: size, borderRadius: "50%" }}
    />
  );
};

export default UserAvatar;
