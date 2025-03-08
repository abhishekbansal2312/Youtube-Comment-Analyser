import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "px-6 py-3 rounded-md text-white font-semibold";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-600 hover:bg-gray-700";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
