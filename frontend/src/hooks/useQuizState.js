import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_PREFIX = 'quiz_state_';

export function useQuizState(quizId, timeLimit = 0) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef(null);
  const autoSubmitRef = useRef(null);

  const storageKey = `${STORAGE_PREFIX}${quizId}`;

  // Load state from localStorage on mount
  useEffect(() => {
    if (!quizId) return;
    
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.currentQuestion === 'number') setCurrentQuestion(parsed.currentQuestion);
        if (parsed.started) setStarted(parsed.started);
        if (parsed.isSubmitted) setIsSubmitted(parsed.isSubmitted);
        
        // Calculate remaining time based on start time
        if (parsed.startTime && parsed.started && !parsed.isSubmitted && timeLimit > 0) {
          const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
          const remaining = Math.max(0, (timeLimit * 60) - elapsed);
          setTimeRemaining(remaining);
        }
      } catch (e) {
        console.error('Error loading quiz state:', e);
      }
    }
  }, [quizId, storageKey, timeLimit]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!quizId || !started) return;
    
    const existingState = localStorage.getItem(storageKey);
    let startTime = Date.now();
    
    if (existingState) {
      try {
        const parsed = JSON.parse(existingState);
        if (parsed.startTime) startTime = parsed.startTime;
      } catch (e) {}
    }

    const state = {
      answers,
      currentQuestion,
      started,
      isSubmitted,
      startTime,
      lastUpdated: Date.now()
    };
    
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [quizId, answers, currentQuestion, started, isSubmitted, storageKey]);

  // Timer logic
  useEffect(() => {
    if (!started || isSubmitted || timeLimit <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, isSubmitted, timeLimit]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && started && !isSubmitted && autoSubmitRef.current) {
      autoSubmitRef.current();
    }
  }, [timeRemaining, started, isSubmitted]);

  const handleAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const startQuiz = useCallback(() => {
    setStarted(true);
    setTimeRemaining(timeLimit * 60);
    // Save start time
    const state = {
      answers: {},
      currentQuestion: 0,
      started: true,
      isSubmitted: false,
      startTime: Date.now(),
      lastUpdated: Date.now()
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [timeLimit, storageKey]);

  const submitQuiz = useCallback(() => {
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setCurrentQuestion(0);
    setStarted(false);
    setTimeRemaining(timeLimit * 60);
    setIsSubmitted(false);
    localStorage.removeItem(storageKey);
  }, [timeLimit, storageKey]);

  const setAutoSubmitCallback = useCallback((callback) => {
    autoSubmitRef.current = callback;
  }, []);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    answers,
    currentQuestion,
    started,
    timeRemaining,
    isSubmitted,
    handleAnswer,
    setCurrentQuestion,
    startQuiz,
    submitQuiz,
    resetQuiz,
    setAutoSubmitCallback,
    formatTime
  };
}

export default useQuizState;
