import db from "../models/index.js";
const userExistValidator = async (req, res, next) => {
    const { userId } = req.body;
    const existingUser = await db.User.findByPk(userId);
    if (!existingUser) {
        res.status(404).json({
            success: false,
            message: "user not found",
        });
        return;
    }
    next();
};
export default { userExistValidator };
