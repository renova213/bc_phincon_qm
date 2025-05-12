import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout";
import Home from "./pages/home/home";
import CourseDetail from "./pages/course/course.detail";
import AppReview from "./pages/app/app.review";
import TryoutSectionDetail from "./pages/tryout_section/tryout.section.detail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route
            path="/tryout-section/:tryoutId"
            element={<TryoutSectionDetail />}
          />
          <Route path="/app-review" element={<AppReview />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: "1rem", color: "white" }}
      />
    </Router>
  );
}

export default App;
