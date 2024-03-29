import NewVerificationForm from "@/components/auth/NewVerificationForm";
import Card from "@/components/shared/Card";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Card
      title="Konfirmasi verifikasi anda"
      description="Email anda berhasil diverifikasi, silahkan kembali melakukan login"
      button
      buttonHref="/login"
      buttonLabel="LOGIN"
      buttonLink
    >
      <Suspense fallback={<p>Loading...</p>}>
        <NewVerificationForm />
      </Suspense>
    </Card>
  );
};

export default NewVerificationPage;
