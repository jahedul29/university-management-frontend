export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type ResponseErrorType = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IDepartment = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IAcademicFaculty = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IAcademicDepartment = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  academicFacultyId: string;
  academicFaculty: IAcademicFaculty;
  __v: number;
};

export type IAcademicSemester = {
  id: string;
  title: string;
  code: string;
  startMonth: string;
  endMonth: string;
  year: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
