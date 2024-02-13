import { BsExclamationTriangle } from "react-icons/bs";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red/25 py-3 px-5 rounded-md flex items-center gap-x-2 text-sm text-red w-full">
      <BsExclamationTriangle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
