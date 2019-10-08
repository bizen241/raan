import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseDiary: "exercise-diaries",
  ExerciseDraft: "exercise-drafts",
  ExerciseObjection: "exercise-objections",
  ExerciseReport: "exercise-reports",
  ExerciseSummary: "exercise-summaries",
  ExerciseVote: "exercise-votes",
  Group: "groups",
  GroupExercise: "group-exercises",
  GroupMember: "group-members",
  GroupPlaylist: "group-playlists",
  Playlist: "playlists",
  PlaylistBookmark: "playlist-bookmarks",
  PlaylistItem: "playlist-items",
  PlaylistObjection: "playlist-objections",
  PlaylistReport: "playlist-reports",
  PlaylistSummary: "playlist-summaries",
  Revision: "revisions",
  RevisionSummary: "revision-summaries",
  Submission: "submissions",
  SubmissionSummary: "submission-summaries",
  Synonym: "synonyms",
  SynonymReport: "synonym-reports",
  Tag: "tags",
  TagFollow: "tag-follows",
  TagSummary: "tag-summaries",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-configs",
  UserDiary: "user-diaries",
  UserFollow: "user-follows",
  UserObjection: "user-objections",
  UserReport: "user-reports",
  UserSession: "user-sessions",
  UserSummary: "user-summaries"
};
