"use client";

import { LoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import FormError from "../shared/FormError";
import FormSuccess from "../shared/FormSuccess";
import { login } from "@/lib/actions/auth.actions";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email sudah digunakan pada akun lain!"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    if (urlError !== "") {
      router.push("/login");
    }

    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled={isPending} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center w-full">
                  <FormLabel>Kata Sandi</FormLabel>
                  <Button
                    asChild
                    variant={`link`}
                    size={`sm`}
                    className="text-secondary hover:text-gold px-0"
                  >
                    <Link href={`/forgot-password`} className="">
                      Forgot Password
                    </Link>
                  </Button>
                </div>
                <FormControl>
                  <Input {...field} type="password" disabled={isPending} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="bg-gold w-full text-center text-sm hover:bg-gold-500 tracking-wider"
          disabled={isPending}
        >
          LANJUTKAN
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
