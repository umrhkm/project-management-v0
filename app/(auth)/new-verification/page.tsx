import NewVerificationForm from "@/components/auth/NewVerificationForm";
import Card from "@/components/shared/Card";
import React, { Suspense } from "react";
import { Loading } from "../loading";

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
      <Suspense fallback={<Loading />}>
        <NewVerificationForm />
      </Suspense>
    </Card>
  );
};

export default NewVerificationPage;
