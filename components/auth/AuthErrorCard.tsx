import React from "react";
import Card from "../shared/Card";

const AuthErrorCard = () => {
  return (
    <Card
      title="Oops! Terjadi suatu kesalahan!"
      description="Mohon untuk kembali melakukan login"
      button
      buttonLabel="KEMABLI"
      buttonLink
      buttonHref="/login"
    />
  );
};

export default AuthErrorCard;
