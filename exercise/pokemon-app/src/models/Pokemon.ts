export default class Pokemon {
  id: number;
  name: string;
  number: number;
  types: string[];
  image: string;
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
    effort: number;
  }[];
  abilities: {
    name: string;
    isHidden: boolean;
  }[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.order ?? data.id;
    this.types = data.types.map((type: any) => type.type.name);
    this.image =
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default;
    this.height = data.height / 10;
    this.weight = data.weight / 10;
    this.stats = data.stats.map((stat: any) => ({
      name: this.formatStatName(stat.stat.name),
      value: stat.base_stat,
      effort: stat.effort,
    }));
    this.abilities = data.abilities.map((ability: any) => ({
      name: this.formatAbilityName(ability.ability.name),
      isHidden: ability.is_hidden,
    }));
  }

  private formatStatName(name: string): string {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private formatAbilityName(name: string): string {
    return this.formatStatName(name);
  }

  get primaryType(): string {
    return this.types[0];
  }
}
