export interface QuestionDetailsResponse {
  question: any;
  options: Array<string>;
}

export interface QuestionDetails {
  questions: Array<string>;
  options: Array<string>;
  answers: Array<Array<string>>;
}
