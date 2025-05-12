import ListOfCourses from "./components/list.of.courses";
import ListOfTryoutSections from "./components/list.of.tryout.sections";

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <ListOfCourses />
      </section>
      <section>
        <ListOfTryoutSections />
      </section>
    </div>
  );
}
