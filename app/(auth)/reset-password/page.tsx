import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Card from "@/components/shared/Card";
import React, { Suspense } from "react";
import { Loading } from "../loading";

const ResetPasswordPage = () => {
  return (
    <Card
      title="Reset kata sandi anda"
      description="Tuliskan kata sandi baru untuk mereset kata sandi anda"
      button={false}
    >
      <Suspense fallback={<Loading />}>
        <ResetPasswordForm />
      </Suspense>
    </Card>
  );
};

export default ResetPasswordPage;
