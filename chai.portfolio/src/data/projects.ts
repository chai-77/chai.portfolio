export type Project = {
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    title: "Chattt",
    category: "Backend Engineering",
    status: "Completed",
    description:
      "A real-time chat application backend built with Node.js and Express. Implements Socket.IO for event-driven messaging, MongoDB for data persistence, and JWT-based authentication with HTTP cookies and protected routes.",
    technologies: [
      "Node.js",
      "Express.js",
      "Socket.IO",
      "MongoDB",
      "JWT",
      "REST APIs",
    ],
    github: "https://github.com/chai-77/chattt",
  },
];