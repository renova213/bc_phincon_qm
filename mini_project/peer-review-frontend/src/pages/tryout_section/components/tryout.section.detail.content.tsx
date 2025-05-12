import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTryoutSectionsStore } from "../../../store/tryout.section.detail";
import Loading from "../../../components/loading";
import ErrorComponent from "../../../components/error";
import PlaceholderCourseImage from "../../../assets/images/course_placeholder.jpg";

export default function TryoutSectionContent() {
  const { tryoutId } = useParams<{ tryoutId: string }>();
  const {
    tryoutSection,
    tryoutSectionloading,
    tryoutSectionError,
    fetchTryoutSectionDetail,
  } = useTryoutSectionsStore();

  useEffect(() => {
    if (tryoutId) {
      fetchTryoutSectionDetail(tryoutId);
    }
  }, [fetchTryoutSectionDetail]);

  if (tryoutSectionloading) {
    return <Loading />;
  }

  if (tryoutSectionError) {
    return <ErrorComponent message="failed to fetch detail tryout section" />;
  }

  return (
    <>
      <div className="relative">
        <img
          src={tryoutSection?.image ?? PlaceholderCourseImage}
          alt={tryoutSection?.title ?? ""}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
          <h1 className="text-4xl font-bold mb-2">
            {tryoutSection?.title ?? ""}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Code: {tryoutSection?.code ?? ""}
            </span>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          {tryoutSection?.description ?? ""}
        </p>
      </div>
    </>
  );
}
