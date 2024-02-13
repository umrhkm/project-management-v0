import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Card from "@/components/shared/Card";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <Card
      title="Reset kata sandi anda"
      description="Tuliskan kata sandi baru untuk mereset kata sandi anda"
      button={false}
    >
      <ResetPasswordForm />
    </Card>
  );
};

export default ResetPasswordPage;
