import { IAcademicSemester, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ACADEMIC_SEMESTER_URL = "/academic-semesters";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicSemesters: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ACADEMIC_SEMESTER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicSemester[], meta: IMeta) => {
        return {
          academicSemesters: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicSemester],
    }),
    getAcademicSemesterById: build.query({
      query: (id) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${id}`,
        method: "GET",
      }),
    }),
    addAcademicSemester: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_SEMESTER_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
    updateAcademicSemester: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
    deleteAcademicSemester: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
  }),
});

export const {
  useAcademicSemestersQuery,
  useGetAcademicSemesterByIdQuery,
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
  useDeleteAcademicSemesterMutation,
} = academicSemesterApi;
