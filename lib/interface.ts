import { Document, Types } from "mongoose";

export interface Workspace extends Document {
  name: string;
  projects?: Types.ObjectId[]; // Array of project ids
  slug: string;
  members?: Types.ObjectId[]; // Array of member ids
}

export interface Project extends Document {
  name: string;
  tasks?: string[]; // Array of task ids;
  client?: string; // Client id
  members?: string[]; // Array of member ids
  dueDate: Date;
  description: string;
  status?: ProjectStatus;
  workspaceId: Types.ObjectId;
  priority?: string;
  blockers?: string[];
}

export interface Client extends Document {
  name: string;
  projectId?: Types.ObjectId;
}

export interface Task extends Document {
  title: string;
  description?: string;
  comments: string[];
  status: TaskStatus;
  dueDate: Date;
  taskColumn: string;
  projectId: Types.ObjectId;
  assigneeId?: Types.ObjectId;
  reporterId?: Types.ObjectId;
  priority: string;
}

export interface User extends Document {
  email: string;
  name: string;
  auth0UserId: string;
  Member?: string[]; // Array of member ids
}

export enum ProjectStatus {
  TO_DO = "TO_DO",
  WORK_IN_PROGRESS = "WORK_IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface Member extends Document {
  role: string;
  assignedTasks: Types.ObjectId[]; // Array of task ids
  tasksToReport: Types.ObjectId[]; // Array of task ids
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  projectId?: Types.ObjectId;
}

export interface Note extends Document {
  userId: Types.ObjectId;
  projectId?: Types.ObjectId;
  title: string;
  description: string;
}
