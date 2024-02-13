import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Alamat email harus diisi" }),
  password: z.string().min(1, { message: "Kata sandi harus diisi" }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username harus lebih dari 3 karakter" }),
  email: z.string().email({ message: "Alamat email harus diisi" }),
  password: z
    .string()
    .min(6, { message: "Kata sandi harus lebih dari 6 karakter" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Alamat email harus diisi" }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Kata sandi harus lebih dari 6 karakter" }),
});

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama proyek harus lebih dari 3 karakter" }),
  description: z
    .string()
    .min(3, { message: "Deskripsi proyek harus lebih dari 3 karakter" })
    .max(400, "Deskripsi proyek harus kurang dari 3 karakter"),
  thumbnail: z.string(),
  createdAt: z.date(),
  deadlineAt: z.date(),
});
