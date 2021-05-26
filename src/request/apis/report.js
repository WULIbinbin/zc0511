import { Request } from "../index";

export function GetQuestion() {
  return Request({
    url: `/question.json`,
  });
}

export function SubQuestion(data={}) {
  return Request({
    url: `/student/saveHolland`,
    method:'POST',
    data
  });
}