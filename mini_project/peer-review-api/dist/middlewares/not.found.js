const notFoundMiddleware = (req, res, next) => {
    res.status(404).send({ error: "Not Found" });
};
export default notFoundMiddleware;
