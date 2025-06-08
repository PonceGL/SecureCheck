export const getUserId = (): string => {
  let userId = localStorage.getItem("securecheck_user_id");
  if (!userId) {
    userId =
      "user_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    localStorage.setItem("securecheck_user_id", userId);
  }
  return userId;
};
