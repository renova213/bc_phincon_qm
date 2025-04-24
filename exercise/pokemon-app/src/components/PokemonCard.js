import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        /* Handle click to show details */
      }}
    >
      <div className="bg-gray-100 p-4 flex justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-32 w-32"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm">
          #{pokemon.number.toString().padStart(3, "0")}
        </p>
        <h3 className="font-bold text-lg capitalize">{pokemon.name}</h3>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}
