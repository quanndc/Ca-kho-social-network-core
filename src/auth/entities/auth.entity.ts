import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
export class Auth {
 @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text',{unique: true})
  uid: string;



}
