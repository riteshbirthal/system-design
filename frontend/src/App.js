import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import SystemDesignCourse from './pages/systemdesign/SystemDesignCourse';
import SystemDesignDay from './pages/systemdesign/SystemDesignDay';
import Week1Day1 from './pages/hld/week1/Day1';
import Week1Day2 from './pages/hld/week1/Day2';
import Week1Day3 from './pages/hld/week1/Day3';
import Week1Day4 from './pages/hld/week1/Day4';
import Week1Day5 from './pages/hld/week1/Day5';
import Week1Day6 from './pages/hld/week1/Day6';
import Week1Day7 from './pages/hld/week1/Day7';
import Week2Day1 from './pages/hld/week2/Day1';
import Week2Day2 from './pages/hld/week2/Day2';
import Week2Day3 from './pages/hld/week2/Day3';
import Week2Day4 from './pages/hld/week2/Day4';
import Week2Day5 from './pages/hld/week2/Day5';
import Week2Day6 from './pages/hld/week2/Day6';
import Week2Day7 from './pages/hld/week2/Day7';
import Week3Day1 from './pages/hld/week3/Day1';
import Week3Day2 from './pages/hld/week3/Day2';
import Week3Day3 from './pages/hld/week3/Day3';
import Week3Day4 from './pages/hld/week3/Day4';
import Week3Day5 from './pages/hld/week3/Day5';
import Week3Day6 from './pages/hld/week3/Day6';
import Week3Day7 from './pages/hld/week3/Day7';
import Week4Day1 from './pages/hld/week4/Day1';
import Week4Day2 from './pages/hld/week4/Day2';
import Week4Day3 from './pages/hld/week4/Day3';
import Week4Day4 from './pages/hld/week4/Day4';
import Week4Day5 from './pages/hld/week4/Day5';
import Week4Day6 from './pages/hld/week4/Day6';
import Week4Day7 from './pages/hld/week4/Day7';
import Week5Day1 from './pages/hld/week5/Day1';
import Week5Day2 from './pages/hld/week5/Day2';
import Week5Day3 from './pages/hld/week5/Day3';
import Week5Day4 from './pages/hld/week5/Day4';
import Week5Day5 from './pages/hld/week5/Day5';
import Week6Day1 from './pages/hld/week6/Day1';
import Week6Day2 from './pages/hld/week6/Day2';
import Week6Day3 from './pages/hld/week6/Day3';
import Week6Day4 from './pages/hld/week6/Day4';
import Week6Day5 from './pages/hld/week6/Day5';
import Week7Day1 from './pages/hld/week7/Day1';
import Week7Day2 from './pages/hld/week7/Day2';
import Week7Day3 from './pages/hld/week7/Day3';
import Week7Day4 from './pages/hld/week7/Day4';
import Week7Day5 from './pages/hld/week7/Day5';
import Week8Day1 from './pages/hld/week8/Day1';
import Week8Day2 from './pages/hld/week8/Day2';
import Week8Day3 from './pages/hld/week8/Day3';
import Week8Day4 from './pages/hld/week8/Day4';
import Week8Day5 from './pages/hld/week8/Day5';
import Week9Day1 from './pages/hld/week9/Day1';
import Week9Day2 from './pages/hld/week9/Day2';
import Week9Day3 from './pages/hld/week9/Day3';
import Week9Day4 from './pages/hld/week9/Day4';
import Week9Day5 from './pages/hld/week9/Day5';
import Week10Day1 from './pages/hld/week10/Day1';
import Week10Day2 from './pages/hld/week10/Day2';
import Week10Day3 from './pages/hld/week10/Day3';
import Week10Day4 from './pages/hld/week10/Day4';
import Week10Day5 from './pages/hld/week10/Day5';
import Week11Day1 from './pages/hld/week11/Day1';
import Week11Day2 from './pages/hld/week11/Day2';
import Week11Day3 from './pages/hld/week11/Day3';
import Week11Day4 from './pages/hld/week11/Day4';
import Week11Day5 from './pages/hld/week11/Day5';
import Week12Day1 from './pages/hld/week12/Day1';
import Week12Day2 from './pages/hld/week12/Day2';
import Week12Day3 from './pages/hld/week12/Day3';
import Week12Day4 from './pages/hld/week12/Day4';
import Week12Day5 from './pages/hld/week12/Day5';
import Week13Day1 from './pages/hld/week13/Day1';
import Week13Day2 from './pages/hld/week13/Day2';
import Week13Day3 from './pages/hld/week13/Day3';
import Week13Day4 from './pages/hld/week13/Day4';
import Week13Day5 from './pages/hld/week13/Day5';
import Week14Day1 from './pages/hld/week14/Day1';
import Week14Day2 from './pages/hld/week14/Day2';
import Week14Day3 from './pages/hld/week14/Day3';
import Week14Day4 from './pages/hld/week14/Day4';
import Week14Day5 from './pages/hld/week14/Day5';
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
            {/* Week 1 Static Pages */}
            <Route path="/hld/week/1/day/1" element={<Week1Day1 />} />
            <Route path="/hld/week/1/day/2" element={<Week1Day2 />} />
            <Route path="/hld/week/1/day/3" element={<Week1Day3 />} />
            <Route path="/hld/week/1/day/4" element={<Week1Day4 />} />
            <Route path="/hld/week/1/day/5" element={<Week1Day5 />} />
            <Route path="/hld/week/1/day/6" element={<Week1Day6 />} />
            <Route path="/hld/week/1/day/7" element={<Week1Day7 />} />
            {/* Week 2 Static Pages */}
            <Route path="/hld/week/2/day/1" element={<Week2Day1 />} />
            <Route path="/hld/week/2/day/2" element={<Week2Day2 />} />
            <Route path="/hld/week/2/day/3" element={<Week2Day3 />} />
            <Route path="/hld/week/2/day/4" element={<Week2Day4 />} />
            <Route path="/hld/week/2/day/5" element={<Week2Day5 />} />
            <Route path="/hld/week/2/day/6" element={<Week2Day6 />} />
            <Route path="/hld/week/2/day/7" element={<Week2Day7 />} />
            {/* Week 3 Static Pages */}
            <Route path="/hld/week/3/day/1" element={<Week3Day1 />} />
            <Route path="/hld/week/3/day/2" element={<Week3Day2 />} />
            <Route path="/hld/week/3/day/3" element={<Week3Day3 />} />
            <Route path="/hld/week/3/day/4" element={<Week3Day4 />} />
            <Route path="/hld/week/3/day/5" element={<Week3Day5 />} />
            <Route path="/hld/week/3/day/6" element={<Week3Day6 />} />
            <Route path="/hld/week/3/day/7" element={<Week3Day7 />} />
            {/* Week 4 Static Pages */}
            <Route path="/hld/week/4/day/1" element={<Week4Day1 />} />
            <Route path="/hld/week/4/day/2" element={<Week4Day2 />} />
            <Route path="/hld/week/4/day/3" element={<Week4Day3 />} />
            <Route path="/hld/week/4/day/4" element={<Week4Day4 />} />
            <Route path="/hld/week/4/day/5" element={<Week4Day5 />} />
            <Route path="/hld/week/4/day/6" element={<Week4Day6 />} />
            <Route path="/hld/week/4/day/7" element={<Week4Day7 />} />
            {/* Week 5 Static Pages */}
            <Route path="/hld/week/5/day/1" element={<Week5Day1 />} />
            <Route path="/hld/week/5/day/2" element={<Week5Day2 />} />
            <Route path="/hld/week/5/day/3" element={<Week5Day3 />} />
            <Route path="/hld/week/5/day/4" element={<Week5Day4 />} />
            <Route path="/hld/week/5/day/5" element={<Week5Day5 />} />
            {/* Week 6 Static Pages */}
            <Route path="/hld/week/6/day/1" element={<Week6Day1 />} />
            <Route path="/hld/week/6/day/2" element={<Week6Day2 />} />
            <Route path="/hld/week/6/day/3" element={<Week6Day3 />} />
            <Route path="/hld/week/6/day/4" element={<Week6Day4 />} />
            <Route path="/hld/week/6/day/5" element={<Week6Day5 />} />
            {/* Week 7 Static Pages */}
            <Route path="/hld/week/7/day/1" element={<Week7Day1 />} />
            <Route path="/hld/week/7/day/2" element={<Week7Day2 />} />
            <Route path="/hld/week/7/day/3" element={<Week7Day3 />} />
            <Route path="/hld/week/7/day/4" element={<Week7Day4 />} />
            <Route path="/hld/week/7/day/5" element={<Week7Day5 />} />
            {/* Week 8 Static Pages */}
            <Route path="/hld/week/8/day/1" element={<Week8Day1 />} />
            <Route path="/hld/week/8/day/2" element={<Week8Day2 />} />
            <Route path="/hld/week/8/day/3" element={<Week8Day3 />} />
            <Route path="/hld/week/8/day/4" element={<Week8Day4 />} />
            <Route path="/hld/week/8/day/5" element={<Week8Day5 />} />
            {/* Week 9 Static Pages */}
            <Route path="/hld/week/9/day/1" element={<Week9Day1 />} />
            <Route path="/hld/week/9/day/2" element={<Week9Day2 />} />
            <Route path="/hld/week/9/day/3" element={<Week9Day3 />} />
            <Route path="/hld/week/9/day/4" element={<Week9Day4 />} />
            <Route path="/hld/week/9/day/5" element={<Week9Day5 />} />
            {/* Week 10 Static Pages */}
            <Route path="/hld/week/10/day/1" element={<Week10Day1 />} />
            <Route path="/hld/week/10/day/2" element={<Week10Day2 />} />
            <Route path="/hld/week/10/day/3" element={<Week10Day3 />} />
            <Route path="/hld/week/10/day/4" element={<Week10Day4 />} />
            <Route path="/hld/week/10/day/5" element={<Week10Day5 />} />
            {/* Week 11 Static Pages */}
            <Route path="/hld/week/11/day/1" element={<Week11Day1 />} />
            <Route path="/hld/week/11/day/2" element={<Week11Day2 />} />
            <Route path="/hld/week/11/day/3" element={<Week11Day3 />} />
            <Route path="/hld/week/11/day/4" element={<Week11Day4 />} />
            <Route path="/hld/week/11/day/5" element={<Week11Day5 />} />
            {/* Week 12 Static Pages */}
            <Route path="/hld/week/12/day/1" element={<Week12Day1 />} />
            <Route path="/hld/week/12/day/2" element={<Week12Day2 />} />
            <Route path="/hld/week/12/day/3" element={<Week12Day3 />} />
            <Route path="/hld/week/12/day/4" element={<Week12Day4 />} />
            <Route path="/hld/week/12/day/5" element={<Week12Day5 />} />
            {/* Week 13 Static Pages */}
            <Route path="/hld/week/13/day/1" element={<Week13Day1 />} />
            <Route path="/hld/week/13/day/2" element={<Week13Day2 />} />
            <Route path="/hld/week/13/day/3" element={<Week13Day3 />} />
            <Route path="/hld/week/13/day/4" element={<Week13Day4 />} />
            <Route path="/hld/week/13/day/5" element={<Week13Day5 />} />
            {/* Week 14 Static Pages */}
            <Route path="/hld/week/14/day/1" element={<Week14Day1 />} />
            <Route path="/hld/week/14/day/2" element={<Week14Day2 />} />
            <Route path="/hld/week/14/day/3" element={<Week14Day3 />} />
            <Route path="/hld/week/14/day/4" element={<Week14Day4 />} />
            <Route path="/hld/week/14/day/5" element={<Week14Day5 />} />
            {/* Dynamic route for other weeks */}
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
            <Route path="/systemdesign" element={<SystemDesignCourse />} />
            <Route path="/systemdesign/topic/:topicId" element={<SystemDesignDay />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
