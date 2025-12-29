import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HLDCourse from './pages/HLDCourse';
import HLDDay from './pages/HLDDay';
import LLDCourse from './pages/LLDCourse';
import HLDPractice from './pages/HLDPractice';
import LLDPractice from './pages/LLDPractice';
import Course from './pages/Course';
import CourseDay from './pages/CourseDay';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import Content from './pages/Content';
import ContentDetail from './pages/ContentDetail';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import Quizzes from './pages/Quizzes';
import QuizDetail from './pages/QuizDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hld" element={<HLDCourse />} />
            <Route path="/hld/week/:week/day/:day" element={<HLDDay />} />
            <Route path="/lld" element={<LLDCourse />} />
            <Route path="/hld-practice" element={<HLDPractice />} />
            <Route path="/lld-practice" element={<LLDPractice />} />
            <Route path="/course" element={<Course />} />
            <Route path="/course/week/:week/day/:day" element={<CourseDay />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/content" element={<Content />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/assignments/:id" element={<AssignmentDetail />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:id" element={<QuizDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
