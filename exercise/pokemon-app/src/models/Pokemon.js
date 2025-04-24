export default class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.number = data.order || data.id;
    this.types = data.types.map((type) => type.type.name);
    this.image =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;
    this.height = data.height / 10; // Convert to meters
    this.weight = data.weight / 10; // Convert to kg
    this.stats = data.stats.map((stat) => ({
      name: this.formatStatName(stat.stat.name),
      value: stat.base_stat,
      effort: stat.effort,
    }));
    this.abilities = data.abilities.map((ability) => ({
      name: this.formatAbilityName(ability.ability.name),
      isHidden: ability.is_hidden,
    }));
  }

  formatStatName(name) {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  formatAbilityName(name) {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  get primaryType() {
    return this.types[0];
  }
}
