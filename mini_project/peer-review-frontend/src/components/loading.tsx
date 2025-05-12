export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-b-2 border-blue-500">
        <output className="sr-only">Loading...</output>
      </div>
    </div>
  );
}
