export const BUTTON_VARIANT = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SUCCESS: "success",
  DANGER: "danger",
  INFO: "info",
  WARNING: "warning",
} as const;

export type TButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const VARIANT_VALUES = {
  [BUTTON_VARIANT.DEFAULT]:
    "bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-700",
  [BUTTON_VARIANT.PRIMARY]:
    "bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-700",
  [BUTTON_VARIANT.SUCCESS]:
    "bg-green-700 text-white hover:bg-green-800 focus-visible:outline-green-700",
  [BUTTON_VARIANT.DANGER]:
    "bg-red-600 text-white hover:bg-red-800 focus-visible:outline-red-700",
  [BUTTON_VARIANT.INFO]:
    "bg-sky-400 text-white hover:bg-sky-500 focus-visible:outline-sky-500",
  [BUTTON_VARIANT.WARNING]:
    "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:outline-yellow-700",
};

export const BUTTON_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export type TButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

export const SIZE_VALUES = {
  [BUTTON_SIZE.SMALL]: "px-2 py-1 text-xs",
  [BUTTON_SIZE.MEDIUM]: "px-3 py-2 text-sm",
  [BUTTON_SIZE.LARGE]: "px-4 py-3 text-md",
};
