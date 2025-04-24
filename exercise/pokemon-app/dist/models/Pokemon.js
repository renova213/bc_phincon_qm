export default class Pokemon {
    constructor(data) {
        var _a, _b;
        this.id = data.id;
        this.name = data.name;
        this.number = (_a = data.order) !== null && _a !== void 0 ? _a : data.id;
        this.types = data.types.map((type) => type.type.name);
        this.image =
            (_b = data.sprites.other["official-artwork"].front_default) !== null && _b !== void 0 ? _b : data.sprites.front_default;
        this.height = data.height / 10;
        this.weight = data.weight / 10;
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
        return this.formatStatName(name);
    }
    get primaryType() {
        return this.types[0];
    }
}
