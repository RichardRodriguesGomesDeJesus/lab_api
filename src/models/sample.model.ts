import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as types from "../utils/types.ts";

@Entity("sample")
class Sample {
  @PrimaryGeneratedColumn()
  sampleId: string | undefined;
  @Column()
  description: string;
  @Column()
  collectionDate: string;
  @Column()
  organizationId: string;
  @Column({ type: "jsonb" })
  localization: any;

  constructor(
    description: string,
    collectionDate: string,
    organizationId: string,
    localization: types.localization
  ) {
    this.description = description;
    this.collectionDate = collectionDate;
    this.organizationId = organizationId;
    this.localization = localization;
  }
}

export default Sample;
