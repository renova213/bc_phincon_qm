import db from "../models/index.js";
class TryoutSectionServices {
    static async getAllTryoutSections() {
        try {
            const tryoutSections = await db.TryoutSection.findAll();
            return tryoutSections;
        }
        catch (error) {
            console.log(error);
            throw Error("Failed to get all tryout sections");
        }
    }
    static async getTryouSectiontById(id) {
        try {
            const tryoutSection = await db.Course.findByPk(id);
            return tryoutSection;
        }
        catch {
            throw Error("Failed to get tryoutSection by id");
        }
    }
}
export default TryoutSectionServices;
