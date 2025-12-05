import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as types from "../utils/types";

class Sample {
  sampleId: string | undefined;
  description: string;
  collectionDate: string;
  organizationId: string;
  localization: types.localization;

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