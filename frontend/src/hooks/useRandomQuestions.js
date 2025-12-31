import { useState, useEffect, useCallback } from 'react';
import { getQuestionsForDay, getQuestionsForWeek, getRandomQuestionsForDay, getRandomQuestionsForWeek } from '../data/questions';

/**
 * Hook for getting random questions that refresh on each render/call
 * @param {number} week - Week number (11-14)
 * @param {number} day - Day number (1-5), optional
 * @param {number} count - Number of questions to return (default: 5)
 * @param {boolean} autoRefresh - Whether to auto-refresh on mount (default: true)
 * @returns {Object} - { questions, refreshQuestions, allQuestions, loading }
 */
export const useRandomQuestions = (week, day = null, count = 5, autoRefresh = true) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all available questions for reference
  const allQuestions = day 
    ? getQuestionsForDay(week, day)
    : getQuestionsForWeek(week);

  // Function to refresh/randomize questions
  const refreshQuestions = useCallback(() => {
    setLoading(true);
    
    // Use setTimeout to ensure re-render triggers new random set
    setTimeout(() => {
      const newQuestions = day
        ? getRandomQuestionsForDay(week, day, count)
        : getRandomQuestionsForWeek(week, count);
      
      setQuestions(newQuestions);
      setLoading(false);
    }, 0);
  }, [week, day, count]);

  // Auto-refresh on mount or when dependencies change
  useEffect(() => {
    if (autoRefresh) {
      refreshQuestions();
    }
  }, [refreshQuestions, autoRefresh]);

  return {
    questions,
    refreshQuestions,
    allQuestions,
    totalAvailable: allQuestions.length,
    loading
  };
};

/**
 * Hook for quiz state management with random questions
 * @param {number} week - Week number
 * @param {number} day - Day number
 * @param {number} questionCount - Number of questions for quiz
 */
export const useQuizState = (week, day, questionCount = 5) => {
  const { questions, refreshQuestions, totalAvailable } = useRandomQuestions(week, day, questionCount);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  // Calculate score
  const calculateScore = () => {
    if (!questions.length) return 0;
    return questions.filter(q => selectedAnswers[q.id] === q.correct).length;
  };

  // Reset quiz with new random questions
  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    refreshQuestions();
  };

  // Submit quiz
  const submitQuiz = () => {
    setShowResults(true);
  };

  // Navigation
  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return {
    // Questions
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: questions.length,
    totalAvailable,
    
    // Answers
    selectedAnswers,
    handleAnswerSelect,
    
    // Results
    showResults,
    score: calculateScore(),
    scorePercentage: questions.length ? Math.round((calculateScore() / questions.length) * 100) : 0,
    
    // Actions
    submitQuiz,
    resetQuiz,
    refreshQuestions,
    
    // Navigation
    goToQuestion,
    nextQuestion,
    prevQuestion,
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
  };
};

export default useRandomQuestions;
