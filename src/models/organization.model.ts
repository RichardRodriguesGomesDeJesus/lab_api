import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as types from "../utils/types";

@Entity()
class Organization {
  @PrimaryGeneratedColumn()
  organizationId: string | undefined;

  @Column()
  name: string;

  @Column()
  localization: types.localization;

  @Column()
  cnpj: string;

  constructor(
    name: string,
    localization: types.localization | null,
    latitude: number,
    longitude: number,
    cnpj: string
  ) {
    this.name = name;

    if (
      localization &&
      typeof localization.latitude === "number" &&
      typeof localization.longitude === "number"
    ) {
      this.localization = {
        latitude: (localization as types.localization).latitude,
        longitude: (localization as types.localization).longitude,
      };
    } else {
      this.localization = {
        latitude: latitude,
        longitude: longitude,
      };
    }
    this.cnpj = cnpj;
  }
}

export default Organization;
