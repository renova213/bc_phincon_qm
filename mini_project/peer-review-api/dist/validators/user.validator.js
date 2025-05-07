import UserModel from "../models/user.model.js";
export const userExistValidator = async (req, res, next) => {
    const { username } = req.body;
    const existingUser = await UserModel.findOne({ where: { username } });
    if (existingUser) {
        res.status(400).json({
            status: "error",
            message: "user with this username already exist",
        });
        return;
    }
    next();
};
