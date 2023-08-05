import React from "react";
import {
  BUTTON_SIZE,
  SIZE_VALUES,
  type TButtonSize,
  BUTTON_VARIANT,
  VARIANT_VALUES,
  type TButtonVariant,
} from "./Button.types";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  variant?: TButtonVariant;
  size?: TButtonSize;
  className?: string;
}

const Button: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  onClick,
  variant = BUTTON_VARIANT.DEFAULT,
  size = BUTTON_SIZE.MEDIUM,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center rounded-md ${
        SIZE_VALUES[size]
      } font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-gray-500 ${
        VARIANT_VALUES[variant]
      } ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
