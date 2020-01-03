import { AuthProviderName } from "../../auth";
import {
  Contest,
  ContestEntry,
  EntityObject,
  EntityType,
  EntityTypeToEntity,
  Exercise,
  ExerciseComment,
  ExerciseCommentSummary,
  ExerciseCommentVote,
  ExerciseDiaryEntry,
  ExerciseDraft,
  ExerciseSummary,
  ExerciseVote,
  Group,
  GroupApplication,
  GroupExercise,
  GroupInvitation,
  GroupMember,
  GroupSecret,
  GroupSummary,
  Objection,
  ObjectionComment,
  ObjectionSummary,
  ObjectionTargetType,
  Permission,
  Playlist,
  PlaylistBookmark,
  PlaylistDiaryEntry,
  PlaylistItem,
  PlaylistSummary,
  Report,
  ReportComment,
  ReportSummary,
  ReportTargetType,
  Revision,
  RevisionSummary,
  Submission,
  SubmissionSummary,
  Suggestion,
  SuggestionComment,
  SuggestionCommentSummary,
  SuggestionCommentVote,
  SuggestionSummary,
  Synonym,
  Tag,
  TagDiaryEntry,
  TagFollow,
  TagSummary,
  User,
  UserAccount,
  UserConfig,
  UserDiaryEntry,
  UserFollow,
  UserMessage,
  UserSession,
  UserSummary
} from "../entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "./params";

export type SearchQuery<E extends EntityObject> = { [P in keyof Params<E>]?: string };

export const parseQuery = <T extends EntityType>(entityType: T, query: SearchQuery<EntityTypeToEntity[T]>) =>
  parsers[entityType](query) as Params<EntityTypeToEntity[T]>;

const bool = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  return value === "true" ? true : false;
};

const base = <E extends EntityObject>(query: SearchQuery<E>) => ({
  searchLimit: Number(query.searchLimit) || defaultSearchLimit,
  searchOffset: Number(query.searchOffset) || defaultSearchOffset,
  searchOrder: query.searchOrder as "ASC" | "DESC"
});

type Parser<E extends EntityObject> = (query: SearchQuery<E>) => Params<E>;

const parseContest: Parser<Contest> = query => {
  const { groupId } = query;

  return {
    ...base(query),
    groupId
  };
};

const parseContestEntry: Parser<ContestEntry> = query => {
  const { contestId } = query;

  return {
    ...base(query),
    contestId
  };
};

const parseExercise: Parser<Exercise> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseExerciseComment: Parser<ExerciseComment> = query => {
  const { targetId } = query;

  return {
    ...base(query),
    targetId
  };
};

const parseExerciseCommentSummary: Parser<ExerciseCommentSummary> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseExerciseCommentVote: Parser<ExerciseCommentVote> = query => {
  return {
    ...base(query)
  };
};

const parseExerciseDiaryEntry: Parser<ExerciseDiaryEntry> = query => {
  const { exerciseId } = query;

  return {
    ...base(query),
    exerciseId
  };
};

const parseExerciseDraft: Parser<ExerciseDraft> = query => {
  const { exerciseId } = query;

  return {
    ...base(query),
    exerciseId
  };
};

const parseExerciseSummary: Parser<ExerciseSummary> = query => {
  const { authorId, lang, title, tags, description, isEditing, searchSort } = query;

  return {
    ...base(query),
    authorId,
    lang,
    title,
    tags,
    description,
    isEditing: bool(isEditing),
    searchSort: searchSort as ExerciseSummary["searchSort"]
  };
};

const parseExerciseVote: Parser<ExerciseVote> = query => {
  const { targetId, voterId, isUp } = query;

  return {
    ...base(query),
    targetId,
    voterId,
    isUp: bool(isUp)
  };
};

const parseGroup: Parser<Group> = query => {
  return {
    ...base(query)
  };
};

const parseGroupApplication: Parser<GroupApplication> = query => {
  return {
    ...base(query)
  };
};

const parseGroupExercise: Parser<GroupExercise> = query => {
  const { groupId, exerciseId } = query;

  return {
    ...base(query),
    groupId,
    exerciseId
  };
};

const parseGroupInvitation: Parser<GroupInvitation> = query => {
  const { groupId, targetId, ownerId } = query;

  return {
    ...base(query),
    groupId,
    targetId,
    ownerId
  };
};

const parseGroupMember: Parser<GroupMember> = query => {
  const { groupId, userId } = query;

  return {
    ...base(query),
    groupId,
    userId
  };
};

const parseGroupSecret: Parser<GroupSecret> = query => {
  const { groupId, value } = query;

  return {
    ...base(query),
    groupId,
    value
  };
};

const parseGroupSummary: Parser<GroupSummary> = query => {
  const { ownerId } = query;

  return {
    ...base(query),
    ownerId
  };
};

const parseObjection: Parser<Objection> = query => {
  return {
    ...base(query)
  };
};

const parseObjectionComment: Parser<ObjectionComment> = query => {
  const { targetId, authorId } = query;

  return {
    ...base(query),
    targetId,
    authorId
  };
};

const parseObjectionSummary: Parser<ObjectionSummary> = query => {
  const { objectorId, targetType, targetId } = query;

  return {
    ...base(query),
    objectorId,
    targetType: targetType as ObjectionTargetType,
    targetId
  };
};

const parsePlaylist: Parser<Playlist> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistBookmark: Parser<PlaylistBookmark> = query => {
  return {
    ...base(query)
  };
};

const parsePlaylistDiaryEntry: Parser<PlaylistDiaryEntry> = query => {
  const { playlistId } = query;

  return {
    ...base(query),
    playlistId
  };
};

const parsePlaylistItem: Parser<PlaylistItem> = query => {
  const { authorId, playlistId, exerciseId } = query;

  return {
    ...base(query),
    authorId,
    playlistId,
    exerciseId
  };
};

const parsePlaylistSummary: Parser<PlaylistSummary> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseReport: Parser<Report> = query => {
  return {
    ...base(query)
  };
};

const parseReportComment: Parser<ReportComment> = query => {
  return {
    ...base(query)
  };
};

const parseReportSummary: Parser<ReportSummary> = query => {
  const { reporterId, targetType, targetId } = query;

  return {
    ...base(query),
    reporterId,
    targetType: targetType as ReportTargetType,
    targetId
  };
};

const parseRevision: Parser<Revision> = query => {
  return {
    ...base(query)
  };
};

const parseRevisionSummary: Parser<RevisionSummary> = query => {
  const { exerciseId, searchSort } = query;

  return {
    ...base(query),
    exerciseId,
    searchSort: searchSort as RevisionSummary["searchSort"]
  };
};

const parseSubmission: Parser<Submission> = query => {
  return {
    ...base(query)
  };
};

const parseSubmissionSummary: Parser<SubmissionSummary> = query => {
  const { submitterId, exerciseId } = query;

  return {
    ...base(query),
    submitterId,
    exerciseId
  };
};

const parseSuggestion: Parser<Suggestion> = query => {
  return {
    ...base(query)
  };
};

const parseSuggestionComment: Parser<SuggestionComment> = query => {
  const { targetId } = query;

  return {
    ...base(query),
    targetId
  };
};

const parseSuggestionCommentSummary: Parser<SuggestionCommentSummary> = query => {
  const { authorId } = query;

  return {
    ...base(query),
    authorId
  };
};

const parseSuggestionCommentVote: Parser<SuggestionCommentVote> = query => {
  return {
    ...base(query)
  };
};

const parseSuggestionSummary: Parser<SuggestionSummary> = query => {
  const { authorId, exerciseId, exerciseAuthorId } = query;

  return {
    ...base(query),
    authorId,
    exerciseId,
    exerciseAuthorId
  };
};

const parseSynonym: Parser<Synonym> = query => {
  return {
    ...base(query)
  };
};

const parseTag: Parser<Tag> = query => {
  const { name } = query;

  return {
    ...base(query),
    name
  };
};

const parseTagDiaryEntry: Parser<TagDiaryEntry> = query => {
  const { tagId } = query;

  return {
    ...base(query),
    tagId
  };
};

const parseTagFollow: Parser<TagFollow> = query => {
  const { followerId, targetId } = query;

  return {
    ...base(query),
    followerId,
    targetId
  };
};

const parseTagSummary: Parser<TagSummary> = query => {
  return {
    ...base(query)
  };
};

const parseUser: Parser<User> = query => {
  const { name, permission } = query;

  return {
    ...base(query),
    name,
    permission: permission as Permission
  };
};

const parseUserAccount: Parser<UserAccount> = query => {
  const { userId, provider, accountId } = query;

  return {
    ...base(query),
    userId,
    provider: provider as AuthProviderName,
    accountId
  };
};

const parseUserConfig: Parser<UserConfig> = query => {
  return {
    ...base(query)
  };
};

const parseUserDiaryEntry: Parser<UserDiaryEntry> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parseUserFollow: Parser<UserFollow> = query => {
  const { followerId, targetId } = query;

  return {
    ...base(query),
    followerId,
    targetId
  };
};

const parseUserMessage: Parser<UserMessage> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parseUserSession: Parser<UserSession> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parseUserSummary: Parser<UserSummary> = query => {
  const { userId } = query;

  return {
    ...base(query),
    userId
  };
};

const parsers: { [T in EntityType]: Parser<EntityTypeToEntity[T]> } = {
  Contest: parseContest,
  ContestEntry: parseContestEntry,
  Exercise: parseExercise,
  ExerciseComment: parseExerciseComment,
  ExerciseCommentSummary: parseExerciseCommentSummary,
  ExerciseCommentVote: parseExerciseCommentVote,
  ExerciseDiaryEntry: parseExerciseDiaryEntry,
  ExerciseDraft: parseExerciseDraft,
  ExerciseSummary: parseExerciseSummary,
  ExerciseVote: parseExerciseVote,
  Group: parseGroup,
  GroupApplication: parseGroupApplication,
  GroupExercise: parseGroupExercise,
  GroupInvitation: parseGroupInvitation,
  GroupMember: parseGroupMember,
  GroupSecret: parseGroupSecret,
  GroupSummary: parseGroupSummary,
  Objection: parseObjection,
  ObjectionComment: parseObjectionComment,
  ObjectionSummary: parseObjectionSummary,
  Playlist: parsePlaylist,
  PlaylistBookmark: parsePlaylistBookmark,
  PlaylistDiaryEntry: parsePlaylistDiaryEntry,
  PlaylistItem: parsePlaylistItem,
  PlaylistSummary: parsePlaylistSummary,
  Report: parseReport,
  ReportComment: parseReportComment,
  ReportSummary: parseReportSummary,
  Revision: parseRevision,
  RevisionSummary: parseRevisionSummary,
  Submission: parseSubmission,
  SubmissionSummary: parseSubmissionSummary,
  Suggestion: parseSuggestion,
  SuggestionComment: parseSuggestionComment,
  SuggestionCommentSummary: parseSuggestionCommentSummary,
  SuggestionCommentVote: parseSuggestionCommentVote,
  SuggestionSummary: parseSuggestionSummary,
  Synonym: parseSynonym,
  Tag: parseTag,
  TagDiaryEntry: parseTagDiaryEntry,
  TagFollow: parseTagFollow,
  TagSummary: parseTagSummary,
  User: parseUser,
  UserAccount: parseUserAccount,
  UserConfig: parseUserConfig,
  UserDiaryEntry: parseUserDiaryEntry,
  UserFollow: parseUserFollow,
  UserMessage: parseUserMessage,
  UserSession: parseUserSession,
  UserSummary: parseUserSummary
};
