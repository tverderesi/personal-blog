export type Language = {
  language: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  levelName: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export const languages = [
  {
    language: "Portuguese",
    level: 6,
    levelName: "C2",
  },
  {
    language: "English",
    level: 5,
    levelName: "C1",
  },
  {
    language: "French",
    level: 3,
    levelName: "B1",
  },
  {
    language: "Spanish",
    level: 2,
    levelName: "A2",
  },
] satisfies Language[];