import IndonesianBadwords from "indonesian-badwords";
const ReviewBadwordsValidator = async (req, res, next) => {
    if (IndonesianBadwords.flag(req.body.content) === true) {
        res.status(400).json({
            status: "error",
            message: "badwords detected",
        });
        return;
    }
    next();
};
export default ReviewBadwordsValidator;
