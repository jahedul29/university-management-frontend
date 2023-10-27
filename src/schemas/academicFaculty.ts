import * as yup from "yup";

export const academicFacultySchema = yup.object({
  title: yup.string().required("Title is required"),
});
