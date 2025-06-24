export enum Status {
  toDo = "To Do",
  workInProgress = "Work In Progress",
  Complete = "Complete",
  underReview = "Under Review",
}

export enum Priority {
  Urgent = "Urgent",
  Backlog = "Backlog",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  userid?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Team {
  id?: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

export interface Comment {
  id: number;
  text: string;
  taskId: number;
  userId: number;
  user: {
    username: string;
    profilePictureUrl: string;
    userId: number;
  };
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  uploadedById: number;
  taskId: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId?: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks: Task[];
  projects: Project[];
  users: User[];
}
