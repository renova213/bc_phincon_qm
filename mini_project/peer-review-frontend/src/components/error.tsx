type ErrorComponentProps = {
  message: string;
};

export default function ErrorComponent({
  message,
}: Readonly<ErrorComponentProps>) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
}
