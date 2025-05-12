import { useCoursesStore } from "../../../store/courses.store";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import ErrorComponent from "../../../components/error";
import CourseCard from "../../../components/course.card";

export default function ListOfCourses() {
  const { courses, courseLoading, courseError, fetchCourses } =
    useCoursesStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (courseLoading) {
    return <Loading />;
  }

  if (courseError) {
    return <ErrorComponent message="failed to fetch courses" />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            route={`course/${course.id}`}
            id={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.image}
          />
        ))}
      </div>
    </>
  );
}
