"use client";

import { newVerification } from "@/lib/actions/auth.actions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import FormError from "../shared/FormError";
import FormSuccess from "../shared/FormSuccess";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token tidak ditemukan!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Terjadi suatu masalah!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center w-full justify-center flex-col gap-8">
      {!success && !error && (
        <ClipLoader aria-label="Loading Spinner" color="#838383" />
      )}

      <FormError message={error} />
      <FormSuccess message={success} />
    </div>
  );
};

export default NewVerificationForm;
