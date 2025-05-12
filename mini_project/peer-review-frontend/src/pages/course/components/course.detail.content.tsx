import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCourseDetailStore } from "../../../store/course.detail.store";
import Loading from "../../../components/loading";
import ErrorComponent from "../../../components/error";
import PlaceholderCourseImage from "../../../assets/images/course_placeholder.jpg";

export default function CourseDetailContent() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, courseLoading, courseError, fetchCourseDetail } =
    useCourseDetailStore();

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    }
  }, [fetchCourseDetail]);

  if (courseLoading) {
    return <Loading />;
  }

  if (courseError) {
    return <ErrorComponent message="failed to fetch detail course" />;
  }

  return (
    <>
      <div className="relative">
        <img
          src={course?.image ?? PlaceholderCourseImage}
          alt={course?.title ?? ""}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
          <h1 className="text-4xl font-bold mb-2">{course?.title ?? ""}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Code: {course?.code ?? ""}</span>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">{course?.description ?? ""}</p>
      </div>
    </>
  );
}
