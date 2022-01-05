import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import ScheduleEditPage from "./pages/ScheduleEditPage";
import ToDoPage from "./pages/ToDoPage";
import StudyPlanListPage from "./pages/StudyPlanListPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import StudyPlanEditPage from "./pages/StudyPlanEditPage";
import SubjectEditPage from "./pages/SubjectEditPage";
import AdminPage from "./pages/Admin/AdminPage";
import { AuthProvider } from "./utils/context";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <div id="box" className="container position-relative vh-100 mx-sm-auto">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <PrivateRoute path="/home" component={HomePage} />
            <PrivateRoute path="/schedule/edit/:scheduleId" component={ScheduleEditPage} />
            <PrivateRoute path="/schedule/edit" component={ScheduleEditPage} />
            <PrivateRoute path="/schedule/:date" component={SchedulePage} />
            <PrivateRoute path="/todo/:date" component={ToDoPage} />
            <PrivateRoute path="/studyplan/submit/:subjectId" component={StudyPlanEditPage} />
            <PrivateRoute path="/studyplan/edit/:planId" component={StudyPlanEditPage} />
            <PrivateRoute path="/studyplan/:subjectId" component={StudyPlanPage} />
            <PrivateRoute path="/studyplan" component={StudyPlanListPage} />
            <PrivateRoute path="/subject/edit/:subjectId" component={SubjectEditPage} />
            <PrivateRoute path="/subject/edit" component={SubjectEditPage} />
            <PrivateRoute path="/admin/edit/:scheduleId" component={ScheduleEditPage} role="admin" />
            <PrivateRoute path="/admin/edit" component={ScheduleEditPage} role="admin" />
            <PrivateRoute path="/admin" component={AdminPage} role="admin" />

            <Route component={ErrorPage} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
