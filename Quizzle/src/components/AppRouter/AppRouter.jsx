import { Routes, Route } from 'react-router-dom';
import RegisterForm from "../../views/Register/Register"
import Dashboard from '../Dashboard/Dashboard';
import UserProfile from '../../views/UserProfile/UserProfile';
import Settings from '../../views/Settings/Settings';
import Login from '../../views/Login/Login'
import PublicView from '../../views/PublicView/PublicView';
import SingleQuizView from '../../views/SingleQuizView/SingleQuizView';
import CreateQuiz from '../../views/CreateQuiz/CreateQuiz';
import About from '../../views/About/About';
import Contact from '../../views/Contact/Contact';
import AdminPanel from '../../views/AdminPanel/AdminPanel';
import QuizManagement from '../../views/AdminPanel/QuizManagement/QuizManagement';
import Students from '../../views/EducatorPanel/Students/Students';
import EducatorPanel from '../../views/EducatorPanel/EducatorPanel';
import QuizManage from '../../views/EducatorPanel/QuizManage/QuizManage';
import AssignedQuizzes from '../../views/AssignedQuizzes/AssignedQuizzes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PublicView />} />
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/singleQuizView/:id" element={<SingleQuizView />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/quiz-management" element={<QuizManagement />} />
      <Route path="/students" element={<Students />} />
      <Route path="/educator" element={<EducatorPanel />} />
      <Route path="/quiz-manage" element={<QuizManage />} />
      <Route path="/assigned-quizzes" element={<AssignedQuizzes />} />
    </Routes>
  )
}

export default AppRouter
