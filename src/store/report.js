import { observable } from "mobx";

const report = observable({
  batch: {
    school: [],
    college: [],
  },
  get schoolBatch() {
    return this.batch.school;
  },
  get collegeBatch() {
    return this.batch.college;
  },
  setBatch(batch) {
    this.batch = batch;
  },
});

export default report;
