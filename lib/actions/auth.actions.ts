"use server";
import * as z from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../validators";
import bcrypt from "bcryptjs";
import { db } from "../database/db";
import { getUserByEmail } from "../data-access/user";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "../tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "../mail";
import { getVerificationTokenByToken } from "../data-access/verivication-token";
import { getPasswordResetTokenByToken } from "../data-access/password-reset-token";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Alamat email atau kata sandi tidak valid!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Kredensial tidak valid!" };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if (passwordsMatch === false) return { error: "Kredensial tidak valid!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Periksa alamat email anda untuk verifikasi" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Kredensial tidak valid!" };
        default:
          return { error: "Terjadi masalah!" };
      }
    }

    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Alamat email atau kata sandi tidak valid!" };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Alamat email sudah digunakan!" };
  }

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Periksa alamat email anda untuk verifikasi",
  };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token tidak tersedia!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token sudah kadaluarsa!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Alamat email tidak tersedia!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Alamat email berhasil diverifikasi!" };
};

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Alamat email tidak valid!" };
  }

  const { email } = validatedFields.data;

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email berhasil dikirim" };
};

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Token tidak ditemukan!" };
  }

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Kata sandi tidak valid" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token tidak valid!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token sudah kadaluarsa!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Alamat email tidak ditemukan!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Kata sandi berhasil diperbarui!" };
};

export const logout = async () => {
  await signOut();
};
