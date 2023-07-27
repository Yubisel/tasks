export const FILTER_OPTIONS = {
  ALL: "All",
  COMPLETED: "Completed",
  PENDING: "Pending",
} as const;

export type TFilterOption =
  (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS];
