import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { AttemptResult, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContestEntity } from "./ContestEntity";
import { GroupMemberEntity } from "./GroupMemberEntity";

@Entity("contest-entries")
export class ContestEntryEntity extends BaseEntityClass<"ContestEntry"> {
  readonly type = "ContestEntry";

  @ManyToOne(() => ContestEntity, {
    onDelete: "CASCADE",
  })
  contest?: ContestEntity;
  @RelationId((contestEntry: ContestEntryEntity) => contestEntry.contest)
  contestId!: EntityId<"Contest">;

  @ManyToOne(() => GroupMemberEntity, {
    onDelete: "CASCADE",
  })
  participant?: GroupMemberEntity;
  @RelationId((contest: ContestEntryEntity) => contest.participant)
  participantId!: EntityId<"GroupMember">;

  @Column()
  typeCount!: number;

  @Column()
  time!: number;

  @Column()
  accuracy!: number;

  constructor(contest: ContestEntity, participant: GroupMemberEntity, result: AttemptResult) {
    super();

    this.contest = contest;
    this.participant = participant;

    if (result !== undefined) {
      this.typeCount = result.typeCount;
      this.time = result.time;
      this.accuracy = result.accuracy;
    }
  }
}
