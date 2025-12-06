import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as types from "../utils/types.ts";

@Entity("results")
class Results {
  @PrimaryGeneratedColumn()
  resultId: string | undefined;

  @Column()
  sampleId: string;

  @Column()
  sampleStatus: number;

  @Column()
  analysisDate: string;

  @Column()
  resultDate: string;

  @Column()
  report: string;

  constructor(
    sampleId: string,
    sampleStatus: number,
    analysisDate: string,
    resultDate: string,
    report: string
  ) {
    this.sampleId = sampleId;
    this.sampleStatus = sampleStatus;
    this.analysisDate = analysisDate;
    this.resultDate = resultDate;
    this.report = report;
  }
}

export default Results;
