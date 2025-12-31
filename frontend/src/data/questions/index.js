// Questions Index - Centralized export for all question banks
// Maps weeks to their respective question sets

import { loadBalancingQuestions } from './loadBalancingQuestions';
import { messageQueuesQuestions } from './messageQueuesQuestions';
import { apiGatewayQuestions } from './apiGatewayQuestions';
import { cdnCacheQuestions } from './cdnCacheQuestions';

// Week to questions mapping
export const weekQuestions = {
  11: loadBalancingQuestions,
  12: messageQueuesQuestions,
  13: apiGatewayQuestions,
  14: cdnCacheQuestions,
};

// Get questions for a specific week and day
export const getQuestionsForDay = (week, day) => {
  const questions = weekQuestions[week];
  if (!questions) return [];
  return questions.filter(q => q.day === day);
};

// Get all questions for a week
export const getQuestionsForWeek = (week) => {
  return weekQuestions[week] || [];
};

// Get random questions for a day
export const getRandomQuestionsForDay = (week, day, count = 5) => {
  const dayQuestions = getQuestionsForDay(week, day);
  if (dayQuestions.length === 0) return [];
  
  // Shuffle and take count
  const shuffled = [...dayQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Get random questions from week (mixed days)
export const getRandomQuestionsForWeek = (week, count = 5) => {
  const weekQs = getQuestionsForWeek(week);
  if (weekQs.length === 0) return [];
  
  const shuffled = [...weekQs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, weekQs.length));
};

export {
  loadBalancingQuestions,
  messageQueuesQuestions,
  apiGatewayQuestions,
  cdnCacheQuestions,
};

export default weekQuestions;
