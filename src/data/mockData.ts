import { Student, Project } from "../types";

export const student: Student = {
  id: "1",
  fullName: "Әділет Абубакир",
  studentId: "ALT-2026-001",
  university: "ALT University",
  faculty: "Ақпараттық технологиялар",
  specialty: "Ақпараттық жүйелер",
  course: 2,
  group: "IT-24-01",
  gpa: 3.75,
  email: "student@example.com",
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Banking App",
    description: "Заманауи мобильді банк қосымшасы.",
    category: "Mobile Development",
    status: "Аяқталды",
    technologies: ["React Native", "Expo", "TypeScript"],
  },
  {
    id: "2",
    title: "Student Portfolio",
    description: "Студенттің жеке цифрлық портфолиосы.",
    category: "Mobile Development",
    status: "Жасалуда",
    technologies: ["React Native", "TypeScript"],
  },
  {
    id: "3",
    title: "University Website",
    description: "Университетке арналған веб-платформа.",
    category: "Web Development",
    status: "Жоспарда",
    technologies: ["React", "CSS"],
  },
];

export const courses = [
  { id: "1", title: "Бағдарламалау негіздері", teacher: "Оқытушы 1", grade: "A", progress: 90 },
  { id: "2", title: "Деректер қоры", teacher: "Оқытушы 2", grade: "A-", progress: 85 },
  { id: "3", title: "Web технологиялар", teacher: "Оқытушы 3", grade: "B+", progress: 75 },
  { id: "4", title: "Математика", teacher: "Оқытушы 4", grade: "B", progress: 70 },
];

export const achievements = [
  { id: "1", title: "Үздік жоба", detail: "Жобалық байқау", icon: "trophy" },
  { id: "2", title: "Белсенді студент", detail: "Университет іс-шарасы", icon: "star" },
  { id: "3", title: "Programming", detail: "Практикалық жетістік", icon: "code-slash" },
];

export const certificates = [
  { id: "1", title: "React Native Basics", organization: "Online Course", year: "2026" },
  { id: "2", title: "Programming Fundamentals", organization: "Online Course", year: "2025" },
];

export const assignments = [
  { id: "1", title: "React Native жобасы", subject: "Мобильді бағдарламалау", deadline: "20 қараша", status: "Орындалуда" },
  { id: "2", title: "SQL тапсырмасы", subject: "Деректер қоры", deadline: "22 қараша", status: "Жаңа" },
  { id: "3", title: "Web практикалық жұмыс", subject: "Web технологиялар", deadline: "25 қараша", status: "Орындалды" },
];

export const schedule = [
  { id: "1", time: "09:00 – 10:30", title: "Бағдарламалау", room: "Аудитория 301" },
  { id: "2", time: "10:45 – 12:15", title: "Деректер қоры", room: "Аудитория 205" },
  { id: "3", time: "13:00 – 14:30", title: "Web технологиялар", room: "Зертхана 2" },
];
