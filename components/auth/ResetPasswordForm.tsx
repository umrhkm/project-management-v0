"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPassword, resetPassword } from "@/lib/actions/auth.actions";
import { ForgotPasswordSchema, ResetPasswordSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "../shared/FormError";
import FormSuccess from "../shared/FormSuccess";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {success === "" && (
            <Button
              type="submit"
              className="bg-gold w-full text-center text-sm hover:bg-gold-500 tracking-wider"
              disabled={isPending}
            >
              RESET KATA SANDI
            </Button>
          )}
        </form>
      </Form>
      <Button
        type="submit"
        variant={`link`}
        className="w-full text-center text-sm tracking-wider"
      >
        <Link href={`/login`} className="flex justify-center items-center gap-1 text-secondary hover:text-black">
          <ArrowLeft className="w-4 h-4"/>
          Kembali ke halaman login
        </Link>
      </Button>
    </>
  );
};

export default ResetPasswordForm;
