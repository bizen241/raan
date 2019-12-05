import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Report extends BaseEntityObject {
  reporterId: UUID;
  targetType: ReportTarget;
  targetId: UUID;
  reason: ReportReason;
  description: string;
  state: ReportState;
  comment: string;
}

export type ReportTarget = "Exercise" | "Group" | "Playlist" | "Synonym" | "Tag" | "User";

export type ReportReason = "troll" | "copyright" | "sexual";

export type ReportState = "pending" | "accepted" | "rejected";