import { CheckCircle2 } from "lucide-react";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/25 py-3 px-5 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 w-full">
      <CheckCircle2 className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
