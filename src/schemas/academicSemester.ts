import * as yup from "yup";

export const academicSemesterSchema = yup.object({
  title: yup.string().required("Title is required"),
  startMonth: yup.string().required("Start Month is required"),
  endMonth: yup.string().required("End month is required"),
  year: yup.string().required("year is required"),
});
