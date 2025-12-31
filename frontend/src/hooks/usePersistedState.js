import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for persisting state to localStorage
 * @param {string} key - Unique key for localStorage
 * @param {any} defaultValue - Default value if no stored value exists
 * @returns {[any, Function, Function]} - [value, setValue, clearValue]
 */
export function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [key, value]);

  const clearValue = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return [value, setValue, clearValue];
}

/**
 * Hook for managing HLD Day page state with persistence
 * @param {number} weekNum - Week number
 * @param {number} dayNum - Day number
 */
export function useHLDDayState(weekNum, dayNum) {
  const storageKey = `hld-week${weekNum}-day${dayNum}`;
  
  const [activeTab, setActiveTab] = usePersistedState(`${storageKey}-tab`, 'article');
  const [sidebarCollapsed, setSidebarCollapsed] = usePersistedState(`${storageKey}-sidebar`, false);
  const [selectedAnswers, setSelectedAnswers] = usePersistedState(`${storageKey}-answers`, {});
  const [showResults, setShowResults] = usePersistedState(`${storageKey}-results`, false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = usePersistedState(`${storageKey}-question`, 0);
  
  // Mobile menu should not persist (always closed on page load)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resetQuiz = useCallback(() => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
  }, [setSelectedAnswers, setShowResults, setCurrentQuestionIndex]);

  const resetAll = useCallback(() => {
    localStorage.removeItem(`${storageKey}-tab`);
    localStorage.removeItem(`${storageKey}-sidebar`);
    localStorage.removeItem(`${storageKey}-answers`);
    localStorage.removeItem(`${storageKey}-results`);
    localStorage.removeItem(`${storageKey}-question`);
    setActiveTab('article');
    setSidebarCollapsed(false);
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
  }, [storageKey, setActiveTab, setSidebarCollapsed, setSelectedAnswers, setShowResults, setCurrentQuestionIndex]);

  return {
    activeTab, setActiveTab,
    sidebarCollapsed, setSidebarCollapsed,
    mobileMenuOpen, setMobileMenuOpen,
    selectedAnswers, setSelectedAnswers,
    showResults, setShowResults,
    currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz,
    resetAll
  };
}

/**
 * Hook for managing HLD Course page state with persistence
 */
export function useHLDCourseState() {
  const [expandedWeek, setExpandedWeek] = usePersistedState('hld-course-expanded-week', 1);
  
  return { expandedWeek, setExpandedWeek };
}

export default usePersistedState;
