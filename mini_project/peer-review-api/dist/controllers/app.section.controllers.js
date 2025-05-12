import AppSectionServices from "../services/app.section.services.js";
class AppSectionController {
    static async getAllAppSections(req, res) {
        try {
            const AppSections = await AppSectionServices.getAllAppSections();
            res.status(200).json({
                success: true,
                data: AppSections,
            });
            return;
        }
        catch {
            res.status(500).json({
                success: false,
                message: "Failed to fetch App sections",
            });
            return;
        }
    }
    static async getAppSectionById(req, res) {
        try {
            const { appId } = req.params;
            const AppSection = await AppSectionServices.getAppSectiontById(appId);
            if (!AppSection) {
                res.status(404).json({
                    success: false,
                    message: `App section with given id not found`,
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: AppSection,
            });
            return;
        }
        catch (error) {
            console.error("Error fetching course:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch course",
            });
            return;
        }
    }
}
export default AppSectionController;
