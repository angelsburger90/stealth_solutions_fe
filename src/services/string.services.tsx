const EMAIL_PATTERN = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const isEmailFormat = (email: string): boolean => {
  if (!email) return false;
  if (EMAIL_PATTERN.test(email)) {
    return true;
  }
  return false;
};
