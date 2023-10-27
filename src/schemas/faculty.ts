import * as yup from "yup";

export const facultySchema = yup.object().shape({
  password: yup.string().min(6).max(32).required(),
  faculty: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string().required("Middle name is required"),
      lastName: yup.string().required("Last name is required"),
    }),
    email: yup.string().email().required("Email is required"),
    designation: yup.string().required("Designation is required"),
    dateOfBirth: yup.string().required("Birth Date is required"),
    academicDepartment: yup
      .string()
      .required("Academic department is required"),
    academicFaculty: yup.string().required("Academic faculty is required"),
  }),
});
