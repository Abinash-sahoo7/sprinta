import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, SearchResults, Task, Team, User } from "../types";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      if (!session) throw new Error("No Session Found ");
      const { accessToken } = session.tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "ListTasks", "Tasks", "Users", "Teams"],
  endpoints: (builder) => ({
    // Get user information from the ( cognito-User-pool and user-details from the DB )
    getAuthUser: builder.query({
      queryFn: async (_, _queryApi, _extraoptions, fetchwithBQ) => {
        try {
          const user = await getCurrentUser();
          const session = await fetchAuthSession();
          if (!session) throw new Error("No Session Found ");

          const { userSub } = session; // cognitoId
          const { accessToken } = session.tokens ?? {};

          const userDetailsResponse = await fetchwithBQ(`users/${userSub}`);
          const userDetails = userDetailsResponse.data as User;

          return { data: { user, userSub, userDetails } };
        } catch (error: any) {
          return { error: error.message || "could not fetch the user Data " };
        }
      },
    }),
    // Get all projects from /projects (get)
    getProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    // Create a new project (post)
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    // Get all Tasks from /tasks/getAllTasks (get)
    getAllTasks: builder.query<Task[], void>({
      query: () => "/tasks/getAllTasks",
      providesTags: ["ListTasks"],
    }),
    // Get Task by Project Id
    getTasks: builder.query<Task[], number>({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    // get Task by User Id
    getTasksByUser: builder.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    // Create a new Task (Post)
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    // Update a Task (Put)
    updateTaskStatus: builder.mutation<
      Task,
      { taskId: number; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
    // Get all users from /users (get)
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    // Get all users from /users (get)
    getTeams: builder.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    // search
    search: builder.query<SearchResults, string>({
      query: (query) => `/search?searchQuery=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserQuery,
  useGetAuthUserQuery,
} = api;
