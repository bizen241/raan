import { Column, Entity, JoinColumn, OneToOne, RelationId, Unique } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_accounts")
@Unique(["provider", "accountId"])
export class UserAccountEntity extends BaseEntityClass {
  type: "UserAccount" = "UserAccount";

  @OneToOne(() => UserEntity, user => user.account, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((account: UserAccountEntity) => account.user)
  userId!: string;

  @Column()
  provider: AuthProviderName;

  @Column()
  accountId: string;

  @Column({
    unique: true
  })
  email: string;

  constructor(user: UserEntity, provider: AuthProviderName, accountId: string, email: string) {
    super();

    this.user = user;
    this.provider = provider;
    this.accountId = accountId;
    this.email = email;
  }
}
