import { Link } from "react-router-dom";

interface CourseCardProps {
  route: string;
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
}

export default function CourseCard(props: Readonly<CourseCardProps>) {
  return (
    <Link
      to={`/${props.route}`}
      className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
    >
      <img
        src={props.imageUrl ?? "src/assets/images/course_placeholder.jpg"}
        alt={props.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
        <p className="text-gray-400 mb-4">{props.description ?? ""}</p>
      </div>
    </Link>
  );
}
