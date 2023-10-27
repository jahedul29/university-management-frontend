import { IAcademicFaculty, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ACADEMIC_FACULTY_URL = "/academic-faculties";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ACADEMIC_FACULTY_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),
    getAcademicFacultyById: build.query({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "GET",
      }),
    }),
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_FACULTY_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    updateAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    deleteAcademicFaculty: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const {
  useAcademicFacultiesQuery,
  useGetAcademicFacultyByIdQuery,
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
} = academicFacultyApi;
