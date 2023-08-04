import React from "react";
const BUTTON_VARIANT = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SUCCESS: "success",
  DANGER: "danger",
  INFO: "info",
  WARNING: "warning",
} as const;

type TButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

const VARIANT_VALUES = {
  [BUTTON_VARIANT.DEFAULT]:
    "bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-700",
  [BUTTON_VARIANT.PRIMARY]:
    "bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-700",
  [BUTTON_VARIANT.SUCCESS]: "bg-green-700 text-white hover:bg-green-800 focus-visible:outline-green-700",
  [BUTTON_VARIANT.DANGER]:
    "bg-red-600 text-white hover:bg-red-800 focus-visible:outline-red-700",
  [BUTTON_VARIANT.INFO]: "bg-sky-400 text-white hover:bg-sky-500 focus-visible:outline-sky-500",
  [BUTTON_VARIANT.WARNING]: "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:outline-yellow-700",
};

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  variant?: TButtonVariant;
  className?: string;
}

const Button: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  onClick,
  variant = BUTTON_VARIANT.DEFAULT,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-500 ${VARIANT_VALUES[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
