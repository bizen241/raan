import { getManager } from "typeorm";
import { v4 as uuid } from "uuid";
import { dateToDateString, ExerciseContent, GroupMemberPermission, Permission } from "../../../shared/api/entities";
import {
  AppDiaryEntryEntity,
  ContestEntity,
  ExerciseCommentEntity,
  ExerciseCommentSummaryEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  GroupEntity,
  GroupMemberEntity,
  GroupSecretEntity,
  GroupSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntryEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity,
} from "../../database/entities";
import { getTags } from "../../services/tags";

export const insertAppDiaryEntry = async (
  params: {
    date?: Date;
  } = {}
) => {
  const manager = getManager();

  const appDiaryEntry = new AppDiaryEntryEntity(dateToDateString(params.date || new Date()));
  await manager.save(appDiaryEntry);

  return {
    appDiaryEntry,
  };
};

export const insertContest = async (
  params: {
    contestGroup?: GroupEntity;
    contestExercise?: ExerciseEntity;
    contestTitle?: string;
  } = {}
) => {
  const manager = getManager();

  const contestGroup = params.contestGroup || (await insertGroup()).group;
  const contestExercise = params.contestExercise || (await insertExercise()).exercise;
  const contestTitle = params.contestTitle || "";
  const contestStartAt = new Date();
  const contestFinishAt = new Date(Date.now() + 1000 * 60 * 60);

  const contest = new ContestEntity(contestGroup, contestExercise, contestTitle, contestStartAt, contestFinishAt);
  await manager.save(contest);

  return {
    contest,
  };
};

export const insertExercise = async (
  params: {
    exerciseAuthor?: UserEntity;
    exerciseIsPrivate?: boolean;
    exerciseIsMerged?: boolean;
    exerciseTitle?: string;
    exerciseTags?: string[];
  } = {}
) => {
  const manager = getManager();

  const exerciseAuthor =
    params.exerciseAuthor ||
    (
      await insertUser({
        userPermission: "Write",
      })
    ).user;

  const exerciseContent: ExerciseContent = {
    lang: "en",
    title: params.exerciseTitle || "",
    tags: params.exerciseTags || [],
    description: "",
    questions: [],
    references: [],
    isRandom: true,
  };

  const isMerged = params.exerciseIsMerged !== undefined ? params.exerciseIsMerged : true;
  const isPrivate = params.exerciseIsPrivate !== undefined ? params.exerciseIsPrivate : false;

  const exerciseSummary = new ExerciseSummaryEntity(exerciseContent);
  exerciseSummary.maxTypeCount = 0;
  exerciseSummary.minTypeCount = 0;
  exerciseSummary.tags = await getTags(exerciseSummary, exerciseContent, manager);

  const exerciseDraft = new ExerciseDraftEntity(exerciseContent);
  exerciseDraft.isMerged = isMerged;

  const exercise = new ExerciseEntity(exerciseSummary, exerciseAuthor, exerciseDraft);
  exercise.isDraft = !isMerged;
  exercise.isPrivate = isPrivate;
  await manager.save(exercise);

  const revisionSummary = new RevisionSummaryEntity();
  const revision = new RevisionEntity(revisionSummary, exercise, exerciseContent, "", "", isPrivate);
  await manager.save(revision);

  exercise.latest = revision;

  await manager.save(exercise);

  return {
    exercise,
    exerciseSummary,
  };
};

export const insertExerciseComment = async (
  params: {
    exerciseCommentTarget?: ExerciseEntity;
    exerciseCommentAuthor?: UserEntity;
  } = {}
) => {
  const manager = getManager();

  const exerciseCommentTarget = params.exerciseCommentTarget || (await insertExercise()).exercise;
  const exerciseCommentAuthor = params.exerciseCommentAuthor || (await insertUser()).user;
  const exerciseCommentBody = "";

  const exerciseComment = new ExerciseCommentEntity(exerciseCommentTarget, exerciseCommentAuthor, exerciseCommentBody);
  exerciseComment.summary = new ExerciseCommentSummaryEntity();
  await manager.save(exerciseComment);

  return {
    exerciseComment,
    exerciseCommentTarget,
    exerciseCommentAuthor,
  };
};

export const insertGroup = async (
  params: {
    groupOwner?: UserEntity;
    groupOwnerPermission?: Permission;
    groupName?: string;
    groupSecretValue?: string;
  } = {}
) => {
  const manager = getManager();

  const groupSecretValue = params.groupSecretValue || uuid();
  const groupOwnerPermission = params.groupOwnerPermission || "Read";
  const groupOwner =
    params.groupOwner ||
    (
      await insertUser({
        userPermission: groupOwnerPermission,
      })
    ).user;
  const groupName = params.groupName || "";

  const groupSummary = new GroupSummaryEntity();
  const groupSecret = new GroupSecretEntity(groupSecretValue, new Date());
  const group = new GroupEntity(groupOwner, groupSummary, groupSecret, groupName);
  await manager.save(group);

  return {
    group,
  };
};

export const insertGroupMember = async (
  params: {
    groupMemberGroup?: GroupEntity;
    groupMemberUser?: UserEntity;
    groupMemberPermission?: GroupMemberPermission;
  } = {}
) => {
  const manager = getManager();

  const groupMemberGroup = params.groupMemberGroup || (await insertGroup()).group;
  const groupMemberUser = params.groupMemberUser || (await insertUser()).user;
  const groupMemberPermission = params.groupMemberPermission || "read";

  const groupMember = new GroupMemberEntity(groupMemberGroup, groupMemberUser);
  groupMember.permission = groupMemberPermission;
  await manager.save(groupMember);

  return {
    group: groupMemberGroup,
    user: groupMemberUser,
    groupMember,
  };
};

export const insertSession = async (
  params: {
    sessionUser?: UserEntity;
  } = {}
) => {
  const manager = getManager();

  const sessionUser = params.sessionUser || (await insertUser()).user;

  const session = new UserSessionEntity(sessionUser, uuid());
  session.data = {
    cookie: {
      path: "/",
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    },
    passport: {
      user: sessionUser.id,
    },
  };

  await manager.save(session);

  return {
    session,
  };
};

export const insertUser = async (
  params: {
    userPermission?: Permission;
  } = {}
) => {
  const manager = getManager();

  const userPermission = params.userPermission || "Write";

  const account = new UserAccountEntity("github", uuid(), uuid());
  const config = new UserConfigEntity();
  const summary = new UserSummaryEntity();
  const user = await manager.save(new UserEntity(account, config, summary, userPermission, userPermission));

  return {
    account,
    config,
    user,
  };
};

export const insertUserDiaryEntry = async (
  params: {
    user?: UserEntity;
    date?: Date;
  } = {}
) => {
  const manager = getManager();

  const user =
    params.user ||
    (
      await insertUser({
        userPermission: "Write",
      })
    ).user;

  const userDiaryEntry = new UserDiaryEntryEntity(user, dateToDateString(params.date || new Date()));
  await manager.save(userDiaryEntry);

  return {
    userDiaryEntry,
  };
};
