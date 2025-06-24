import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, SearchResults, Task, Team, User } from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "ListTasks", "Tasks", "Users", "Teams"],
  endpoints: (builder) => ({
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
} = api;
