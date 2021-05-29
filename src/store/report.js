import { observable } from "mobx";

const report = observable({
  batch: {
    school: [],
    college: [],
  },
  get schoolBatch() {
    return this.setKeyEmpty(this.batch.school);
  },
  get collegeBatch() {
    return this.setKeyEmpty(this.batch.college);
  },
  setKeyEmpty(data = [], keyname = "-") {
    return [...data].map(item=>{
      return {
        ...item,
        schoolName:item.schoolName||keyname,
        code:item.code||keyname
      }
    })
  },
  setBatch(batch) {
    this.batch = batch;
  },
});

export default report;
