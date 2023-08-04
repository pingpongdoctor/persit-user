import { Schema, models, model } from "mongoose";
import {
  Workspace,
  Project,
  Client,
  Task,
  User,
  ProjectStatus,
  TaskStatus,
  Member,
  Note,
} from "./interface";

const workspaceSchema = new Schema<Workspace>(
  {
    name: { type: String, required: true },
    projects: { type: [Schema.Types.ObjectId], default: [] },
    slug: { type: String, required: true, unique: true },
    members: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    tasks: { type: [Schema.Types.ObjectId], default: [] },
    members: { type: [Schema.Types.ObjectId], default: [] },
    dueDate: { type: Date, default: Date.now },
    description: { type: String, default: "No description" },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.TO_DO,
    },
    workspaceId: { type: Schema.Types.ObjectId, required: true },
    priority: { type: String },
    blockers: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

const clientSchema = new Schema<Client>({
  name: { type: String, required: true },
  projectId: { type: [Schema.Types.ObjectId], default: [] },
});

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  comments: { type: [String], default: [] },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TO_DO,
  },
  dueDate: { type: Date },
  taskColumn: { type: String },
  projectId: { type: Schema.Types.ObjectId, required: true },
  assigneeId: { type: Schema.Types.ObjectId },
  reporterId: { type: Schema.Types.ObjectId },
  priority: { type: String, required: true },
});

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  auth0UserId: { type: String, required: true },
  Member: [{ type: String }],
});

const memberSchema = new Schema<Member>(
  {
    role: { type: String, required: true },
    assignedTasks: { type: [Schema.Types.ObjectId], required: true },
    tasksToReport: { type: [Schema.Types.ObjectId], required: true },
    workspaceId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    projectId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const noteSchema = new Schema<Note>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    projectId: { type: Schema.Types.ObjectId },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const WorkspaceModel =
  models.Workspaces || model("Workspaces", workspaceSchema);
export const ProjectModel = models.Projects || model("Projects", projectSchema);
export const ClientModel = models.Clients || model("Clients", clientSchema);
export const TaskModel = models.Tasks || model("Tasks", taskSchema);
export const UserModel = models.Users || model("Users", userSchema);
export const MemberModel = models.Members || model("Members", memberSchema);
export const NoteModel = models.Notes || model("Notes", noteSchema);
