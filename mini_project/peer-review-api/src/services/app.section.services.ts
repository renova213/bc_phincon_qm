import db from "../models/index.js";
import AppSectionModel from "../models/app.section.model.js";

class AppSectionServices {
  static async getAllAppSections(): Promise<AppSectionModel[]> {
    try {
      const AppSections = await db.AppSection.findAll();
      return AppSections;
    } catch (error) {
      console.log(error);
      throw Error("Failed to get all App sections");
    }
  }

  static async getAppSectiontById(
    id: string
  ): Promise<AppSectionModel | null> {
    try {
      const AppSection = await db.AppSection.findByPk(id);
      return AppSection;
    } catch {
      throw Error("Failed to get AppSection by id");
    }
  }
}

export default AppSectionServices;
