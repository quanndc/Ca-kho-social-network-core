import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  folderName: string;

  @Column("text")
  photoUrl: string;
}
