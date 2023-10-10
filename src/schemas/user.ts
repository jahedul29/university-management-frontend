import * as yup from "yup";

export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(6, "Password must be at least 6 character")
    .max(32, "Password can be 32 character at most")
    .required("Old password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 character")
    .max(32, "Password can be 32 character at most")
    .required("New password is required"),
});
