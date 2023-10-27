import { IAcademicDepartment, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ACADEMIC_DEPARTMENT_URL = "/academic-departments";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicDepartments: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
        return {
          academicDepartments: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicDepartment],
    }),
    getAcademicDepartmentById: build.query({
      query: (id) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
    }),
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
    updateAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
    deleteAcademicDepartment: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAcademicDepartmentsQuery,
  useGetAcademicDepartmentByIdQuery,
  useAddAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
} = academicDepartmentApi;
