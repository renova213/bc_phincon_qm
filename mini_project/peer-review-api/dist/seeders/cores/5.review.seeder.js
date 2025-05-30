export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert("reviews", [
            {
                id: "73473fc8-0b05-47cb-8a58-23a97bfcaf51",
                userId: "734d1344-bd80-4a91-a4b5-db3861a6b580",
                referenceId: "",
                courseId: "115743e4-b42b-4ffe-8418-689a6b3777c3",
                type: "COURSE",
                rating: 4.5,
                content: "Great course, helped me understand the fundamentals clearly.",
                image: null,
                data: JSON.stringify({ platform: "web" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "73473fc8-0b05-47cb-8a58-23a97bfcaf52",
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                referenceId: "",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "c9b1e2a4-2e68-4e1f-947b-cdf8a7ea1d0e",
                userId: "734d1344-bd80-4a91-a4b5-db3861a6b580",
                referenceId: "73473fc8-0b05-47cb-8a58-23a97bfcaf52",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "Yup, agree. The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "9f4a7aef-0f7e-4a82-85e7-447e040f3ad0",
                userId: "e5f6a7b8-c9d0-1234-5678-90abcdef1234",
                referenceId: "73473fc8-0b05-47cb-8a58-23a97bfcaf52",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "4b3f8a71-ec42-4f63-9e7d-43e40e8a91e5",
                userId: "d4e5f6a7-b8c9-0123-4567-890abcdef123",
                referenceId: "9f4a7aef-0f7e-4a82-85e7-447e040f3ad0",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "a1c7f7bb-9479-4df3-81e6-4319e5f7c8c1",
                userId: "c3d4e5f6-a7b8-9012-3456-7890abcdef12",
                referenceId: "4b3f8a71-ec42-4f63-9e7d-43e40e8a91e5",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "f00a7a6c-510e-49d6-bf1a-29598211b5b5",
                userId: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
                referenceId: "a1c7f7bb-9479-4df3-81e6-4319e5f7c8c1",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "12e6b007-052a-4f91-b693-dc3fd0f1c3c9",
                userId: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
                referenceId: "f00a7a6c-510e-49d6-bf1a-29598211b5b5",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "e0d937b4-9bfa-423a-8e0c-dacc88925486",
                userId: "c9b1e2a4-2e68-4e1f-947b-cdf8a7ea1d11",
                referenceId: "12e6b007-052a-4f91-b693-dc3fd0f1c3c9",
                courseId: "3e0c2ee4-31aa-44c8-b555-e4a5df02ff84",
                type: "COURSE",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "e24c506f-84f0-4f78-9f31-3d0aa63f9bd1",
                userId: "734d1344-bd80-4a91-a4b5-db3861a6b580",
                referenceId: "",
                tryoutId: "3e0c2ee4-31aa-44c8-b554-e4a5df02ff84",
                type: "TRYOUT_SECTION",
                rating: 4.5,
                content: "Great course, helped me understand the fundamentals clearly.",
                image: null,
                data: JSON.stringify({ platform: "web" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "7f3c9e2b-0b9b-42d4-b79f-5b9c31326ce7",
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                referenceId: "e24c506f-84f0-4f78-9f31-3d0aa63f9bd1",
                tryoutId: "115743e4-b42b-4ffe-8417-689a6b3777c3",
                type: "TRYOUT_SECTION",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "7f3c9e1b-0b9b-42d4-b79f-5b9c31326ce7",
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                referenceId: "",
                appSectionId: "e1a15a9c-8t9a-4d45-8040-2d2e3871e059",
                type: "APP",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "7f3c9d1b-0b9b-42d4-b79f-5b9c31326ce7",
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                referenceId: "7f3c9e1b-0b9b-42d4-b79f-5b9c31326ce7",
                appSectionId: "e1a15a9c-8t9a-4d45-8040-2d2e3871e059",
                type: "APP",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "7s3c9d1b-0b9b-42d4-b79f-5b9c31326ce7",
                userId: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
                referenceId: "",
                appSectionId: "e1a15a9c-8t9a-4d45-8040-2d2e3871e059",
                type: "APP",
                rating: 4.0,
                content: "The tryout was challenging but fair. Good preparation for the exam.",
                image: null,
                data: JSON.stringify({ completedIn: "45 minutes" }),
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete("reviews", {});
    },
};
