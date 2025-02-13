import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  text: string;
}

const Button = ({ loading, text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`relative flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg transition ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
