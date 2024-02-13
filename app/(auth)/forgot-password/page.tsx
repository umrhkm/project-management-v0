import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Card from "@/components/shared/Card";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <Card
      title="Lupa Kata Sandi Anda?"
      description="Tuliskan alamat email anda dan jika alamat email terdaftar pada sistem maka anda akan menerima email untuk mereset kata sandi anda"
      button={false}
      backButton
      backButtonHref="/login"
    >
      <ForgotPasswordForm />
    </Card>
  );
};

export default ForgotPasswordPage;
