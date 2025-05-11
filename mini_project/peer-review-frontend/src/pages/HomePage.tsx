import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { fetchCourses } from "../store/slices/courseSlice";
import { fetchTryoutSections } from "../store/slices/tryoutSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading: coursesLoading } = useSelector(
    (state: RootState) => state.courses
  );
  const { tryoutSections, loading: tryoutsLoading } = useSelector(
    (state: RootState) => state.tryouts
  );

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchTryoutSections());
  }, [dispatch]);

  if (coursesLoading || tryoutsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/app-review"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
            App Reviews
          </h2>
          <p className="text-gray-600">
            Share your thoughts about our application and help us improve!
          </p>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses</h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {course.description}
                </p>
                {course.tag && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
                    {course.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tryout Sections
          </h2>
          <div className="space-y-4">
            {tryoutSections.map((section) => (
              <Link
                key={section.id}
                to={`/tryout-sections/${section.id}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {section.description}
                </p>
                {section.tag && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
                    {section.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
