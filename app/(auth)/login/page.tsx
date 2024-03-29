import AuthProviders from "@/components/auth/AuthProviders";
import LoginForm from "@/components/auth/LoginForm";
import Card from "@/components/shared/Card";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div>
      <Card
        title="Masuk ke Akun Anda"
        description="Untuk dapat mengakses fitur-fitur pada situs"
        buttonLabel="LANJUTKAN"
        button={false}
        footer
        footerLabel="Belum memiliki akun?"
        footerButtonLabel="Daftar Akun"
        footerHref="/register"
      >
        <Suspense fallback={<p>Loading...</p>}>
          <AuthProviders />
        </Suspense>

        <div className="w-full flex items-center gap-3">
          <div className="bg-secondary/25 h-0.5 w-full rounded-full" />
          <span className="text-secondary">atau</span>
          <div className="bg-secondary/25 h-0.5 w-full rounded-full" />
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <LoginForm />
        </Suspense>
      </Card>
    </div>
  );
};

export default RegisterPage;
