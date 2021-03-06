import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { DateString, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("playlist_diaries")
export class PlaylistDiaryEntryEntity extends BaseEntityClass<"PlaylistDiaryEntry"> {
  readonly type = "PlaylistDiaryEntry";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE",
  })
  playlist?: PlaylistEntity;
  @RelationId((playlistDiaryEntry: PlaylistDiaryEntryEntity) => playlistDiaryEntry.playlist)
  playlistId!: EntityId<"Playlist">;

  @Column("date")
  date: DateString;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(playlist: PlaylistEntity, date: DateString) {
    super();

    this.playlist = playlist;
    this.date = date;
  }
}
