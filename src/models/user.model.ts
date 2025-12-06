import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";

@Entity("user")
class User {
  @PrimaryGeneratedColumn()
  id: string | undefined;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  userType: number;

  @Column()
  registerDate: string;

  @Column()
  active: number;

  constructor(
    username: string,
    password: string,
    userType: number,
    registerDate: string,
    active: number
  ) {
    this.username = username;
    this.password = password;
    this.userType = userType;
    this.registerDate = registerDate;
    this.active = active;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

export default User;
