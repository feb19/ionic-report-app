export type QuestionType = "text" | "date" | "select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: SelectOption[];
}

export interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: Question[];
  status: "pending" | "answered";
  createdAt: Date;
  dueDate: Date;
}

export interface AnswerItem {
  questionId: string;
  questionText: string;
  questionType: QuestionType;
  answer: string;
}

export interface Answer {
  id: string;
  reportId: string;
  reportTitle: string;
  reportCategory: string;
  answeredAt: Date;
  answers: AnswerItem[];
}

export type ViewType = "dashboard" | "reports" | "answer" | "results" | "resultDetail";
