import { businessLessons, businessPaths } from './lessons/business.js';
import { communicationLessons, communicationPaths } from './lessons/communication.js';
import { financeLessons, financePaths } from './lessons/finance.js';
import { historyLessons, historyPaths } from './lessons/history.js';
import { scienceLessons, sciencePaths } from './lessons/science.js';
import { technologyLessons, technologyPaths } from './lessons/technology.js';

export const topics = [
  {
    id: 'business',
    name: 'Business',
    blurb: 'Build, price, and lead when the plan is still unfinished.',
    tint: '#c084fc',
  },
  {
    id: 'finance',
    name: 'Finance',
    blurb: 'Make sense of money, risk, and the tradeoffs in a real month.',
    tint: '#34d399',
  },
  {
    id: 'technology',
    name: 'Technology',
    blurb: 'See how software is structured and how accounts stay yours.',
    tint: '#22d3ee',
  },
  {
    id: 'science',
    name: 'Science',
    blurb: 'Test claims, separate patterns from causes, and account for energy.',
    tint: '#60a5fa',
  },
  {
    id: 'history',
    name: 'History',
    blurb: 'Read events with their traces, and notice who is emphasizing what.',
    tint: '#fbbf24',
  },
  {
    id: 'communication',
    name: 'Communication',
    blurb: 'Speak, write, and listen so the other person can act.',
    tint: '#fb7185',
  },
];

const rawLessons = [
  ...businessLessons,
  ...financeLessons,
  ...technologyLessons,
  ...scienceLessons,
  ...historyLessons,
  ...communicationLessons,
];

function normalizeLesson(lesson) {
  return {
    ...lesson,
    questions: lesson.questions.map((question, questionIndex) => ({
      id: `${lesson.id}-q${questionIndex + 1}`,
      prompt: question.prompt,
      explain: question.explain,
      choices: question.choices.map((text, choiceIndex) => ({
        id: `${lesson.id}-q${questionIndex + 1}-c${choiceIndex + 1}`,
        text,
        correct: choiceIndex === question.correctIndex,
      })),
    })),
  };
}

export const paths = [
  ...businessPaths,
  ...financePaths,
  ...technologyPaths,
  ...sciencePaths,
  ...historyPaths,
  ...communicationPaths,
].map((path) => ({
  ...path,
  lessons: rawLessons.filter((lesson) => lesson.pathId === path.id).map((lesson) => lesson.id),
}));

export const lessonList = rawLessons.map(normalizeLesson);
export const lessonsById = Object.fromEntries(lessonList.map((lesson) => [lesson.id, lesson]));
export const pathsById = Object.fromEntries(paths.map((path) => [path.id, path]));
export const topicsById = Object.fromEntries(topics.map((topic) => [topic.id, topic]));

export function topicForLesson(lessonId) {
  const lesson = lessonsById[lessonId];
  if (!lesson) return null;
  const path = pathsById[lesson.pathId];
  return topicsById[path.topic];
}

export function pathMinutes(path) {
  return path.lessons.reduce((sum, id) => sum + (lessonsById[id]?.minutes || 0), 0);
}
