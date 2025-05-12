import { useTryoutSectionsStore } from "../../../store/tryout.sections.store";
import { useEffect } from "react";
import Loading from "../../../components/loading";
import ErrorComponent from "../../../components/error";
import CourseCard from "../../../components/course.card";

export default function ListOfTryoutSections() {
  const {
    tryoutSections,
    tryoutSectionloading,
    tryoutSectionError,
    fetchTryoutSections,
  } = useTryoutSectionsStore();

  useEffect(() => {
    fetchTryoutSections();
  }, [fetchTryoutSections]);

  if (tryoutSectionloading) {
    return <Loading />;
  }

  if (tryoutSectionError) {
    return <ErrorComponent message="failed to fetch courses" />;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Tryout Sections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tryoutSections.map((tryout) => (
          <CourseCard
            key={tryout.id}
            route={`tryout-section/${tryout.id}`}
            id={tryout.id}
            title={tryout.title}
            description={tryout.description}
            imageUrl={tryout.image}
          />
        ))}
      </div>
    </>
  );
}
