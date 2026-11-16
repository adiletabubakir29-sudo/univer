export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Education: undefined;
  Courses: undefined;
  Achievements: undefined;
  Certificates: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Statistics: undefined;
};

export type RootTabParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Projects: undefined;
  Settings: undefined;
};

export type Student = {
  id: string;
  fullName: string;
  studentId: string;
  university: string;
  faculty: string;
  specialty: string;
  course: number;
  group: string;
  gpa: number;
  email: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
};
