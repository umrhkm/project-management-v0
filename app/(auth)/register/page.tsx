import AuthProviders from "@/components/auth/AuthProviders";
import RegisterForm from "@/components/auth/RegisterForm";
import Card from "@/components/shared/Card";

const RegisterPage = () => {
  return (
    <div>
      <Card
        title="Buat Akun Anda"
        description="Untuk dapat mengakses fitur-fitur pada situs"
        buttonLabel="LANJUTKAN"
        button={false}
        footer
        footerLabel="Sudah memiliki akun?"
        footerButtonLabel="Masuk"
        footerHref="/login"
      >
        <AuthProviders />

        <div className="w-full flex items-center gap-3">
          <div className="bg-secondary/25 h-0.5 w-full rounded-full" />
          <span className="text-secondary">atau</span>
          <div className="bg-secondary/25 h-0.5 w-full rounded-full" />
        </div>

        <RegisterForm />
      </Card>
    </div>
  );
};

export default RegisterPage;
