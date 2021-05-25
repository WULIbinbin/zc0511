import { Request } from "../index";

export function GetQuestion() {
  return Request({
    url: `/question.json`,
  });
}
