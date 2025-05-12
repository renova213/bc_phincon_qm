import db from "../models/index.js";
class AppSectionServices {
    static async getAllAppSections() {
        try {
            const AppSections = await db.AppSection.findAll();
            return AppSections;
        }
        catch (error) {
            console.log(error);
            throw Error("Failed to get all App sections");
        }
    }
    static async getAppSectiontById(id) {
        try {
            const AppSection = await db.AppSection.findByPk(id);
            return AppSection;
        }
        catch {
            throw Error("Failed to get AppSection by id");
        }
    }
}
export default AppSectionServices;
