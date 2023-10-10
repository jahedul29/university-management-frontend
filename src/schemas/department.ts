import * as yup from "yup";

export const departmentSchema = yup.object({
  title: yup.string().required("Title is required"),
});
