"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

const AuthProviders = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant={`outline`}
        className="flex justify-between items-center group px-5 py-5"
        onClick={() => onClick("google")}
      >
        <div className="flex items-center gap-2">
          <FcGoogle className="w-6 h-6" />
          Lanjutkan dengan Google
        </div>
        <ArrowRight
          className="text-secondary/25 group-hover:text-secondary"
          width={16}
          height={16}
        />
      </Button>
    </div>
  );
};

export default AuthProviders;
