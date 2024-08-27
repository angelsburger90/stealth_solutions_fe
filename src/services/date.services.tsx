import { format } from "date-fns";

const SIMPLE_DISPLAY_FORMAT_HUMAN = "MMMM dd, yyyy";

export const convertToSimpleDateFormat = (dateStr: string): string => {
  return format(dateStr, SIMPLE_DISPLAY_FORMAT_HUMAN);
};
