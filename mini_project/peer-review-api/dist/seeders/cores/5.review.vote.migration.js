import { v4 as uuidv4 } from "uuid";
export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert("review_votes", [
            {
                id: uuidv4(),
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                reviewId: "73473fc8-0b05-47cb-8a58-23a97bfcaf51",
                type: "upvote",
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                reviewId: "73473fc8-0b05-47cb-8a58-23a97bfcaf52",
                type: "downvote",
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                userId: "734d1344-bd80-4a91-a4b5-db3861a6b580",
                reviewId: "c9b1e2a4-2e68-4e1f-947b-cdf8a7ea1d0e",
                type: "downvote",
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete("review_votes", {});
    },
};
