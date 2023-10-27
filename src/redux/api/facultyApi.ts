import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FACULTY_URL = "/faculties";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    faculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${FACULTY_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),
    getFacultyById: build.query({
      query: (id) => ({
        url: `${FACULTY_URL}/${id}`,
        method: "GET",
      }),
    }),
    addFaculty: build.mutation({
      query: (data) => ({
        url: `/users/create-faculty`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    updateFaculty: build.mutation({
      query: (data) => ({
        url: `${FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
  }),
});

export const {
  useFacultiesQuery,
  useGetFacultyByIdQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = academicFacultyApi;
