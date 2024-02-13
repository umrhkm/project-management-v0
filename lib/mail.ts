import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verifikasi alamat email anda",
    html: `<p>Tekan <a href="${confirmLink}">disini</a> untuk memverifikasi alamat email anda</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset kata sandi anda",
    html: `<p>Tekan <a href="${resetLink}">disini</a> untuk memverifikasi alamat email anda</p>`,
  });
};
