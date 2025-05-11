import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import TryoutSectionDetailPage from "./pages/TryoutSectionDetailPage";
import AppReviewPage from "./pages/AppReviewPage";
import ReviewListPage from "./pages/ReviewListPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link
                    to="/"
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-indigo-600"
                  >
                    Home
                  </Link>
                  <Link
                    to="/reviews"
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-indigo-600 ml-4"
                  >
                    All Reviews
                  </Link>
                  <Link
                    to="/app-review"
                    className="flex items-center px-2 py-2 text-gray-700 hover:text-indigo-600 ml-4"
                  >
                    App Review
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route
                path="/tryout-sections/:tryoutSectionId"
                element={<TryoutSectionDetailPage />}
              />
              <Route path="/app-review" element={<AppReviewPage />} />
              <Route path="/reviews" element={<ReviewListPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
