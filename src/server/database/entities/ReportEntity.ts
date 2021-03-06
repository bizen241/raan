import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { ReportReason, ReportState, ReportTargetType } from "../../../shared/api/entities/Report";
import { BaseEntityClass } from "./BaseEntityClass";
import { ReportSummaryEntity } from "./ReportSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("reports")
export class ReportEntity extends BaseEntityClass<"Report"> {
  readonly type = "Report";

  @OneToOne(() => ReportSummaryEntity, (reportSummary) => reportSummary.parent, {
    cascade: ["insert"],
  })
  summary?: ReportSummaryEntity;
  @RelationId((report: ReportEntity) => report.summary)
  summaryId!: EntityId<"ReportSummary">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  reporter?: UserEntity;
  @RelationId((report: ReportEntity) => report.reporter)
  reporterId!: EntityId<"User">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  defendant?: UserEntity;
  @RelationId((report: ReportEntity) => report.defendant)
  defendantId!: EntityId<"User">;

  @Column()
  targetType!: ReportTargetType;

  @Column("uuid")
  targetId!: string;

  @Column()
  reason!: ReportReason;

  @Column()
  description: string = "";

  @Column()
  state: ReportState = "pending";

  constructor(reporter: UserEntity, defendant: UserEntity, reason: ReportReason, description: string) {
    super();

    this.summary = new ReportSummaryEntity();
    this.reporter = reporter;
    this.defendant = defendant;
    this.reason = reason;
    this.description = description;
  }
}
