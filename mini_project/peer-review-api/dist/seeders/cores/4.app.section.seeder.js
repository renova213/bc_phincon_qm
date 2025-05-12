export default {
    async up(queryInterface, _sequelize) {
        const products = [
            {
                id: "115743e4-b22b-4ffe-8417-689a6b3777c3",
                code: "ISMS-S01_API_SECURITY",
                title: "API Security",
                description: "API Security is a course that discusses the security of APIs. This course covers the security of APIs, including authentication and authorization, input validation, and error handling.",
                order: 1,
                data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 1}}',
                tag: "phincon",
                active: true,
                createdAt: "1/5/2025 11:32:55",
                updatedAt: "1/5/2025 11:32:55",
            },
            {
                id: "3e0c2ee4-3taa-44c8-b554-e4a5df02ff84",
                code: "ISMS-S21_SECURE_SYSTEM_DEVELOPMENT_LIFECYCLE",
                title: "Secure System Development Lifecycle",
                description: "Secure System Development Lifecycle is a course that discusses the development lifecycle of a secure system. This course covers the development lifecycle of a secure system, including the design, development, testing, and deployment of the system.",
                order: 1,
                data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 2}}',
                tag: "phincon",
                active: true,
                createdAt: "1/5/2025 11:32:55",
                updatedAt: "1/5/2025 11:32:55",
            },
            {
                id: "e1a15a9c-8t9a-4d45-8040-2d2e3871e059",
                code: "ISMS-S30_BUILD_SECURITY_SYSTEM_STANDARD",
                title: "Security System Standard",
                description: "Security System Standard is a course that discusses the standard of a security system. This course covers the standard of a security system, including the requirements for a secure system.",
                order: 1,
                data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 3}}',
                tag: "phincon",
                active: true,
                createdAt: "1/5/2025 11:32:55",
                updatedAt: "1/5/2025 11:32:55",
            },
        ];
        await queryInterface.bulkInsert("app_sections", products);
    },
    async down(queryInterface, _sequelize) {
        await queryInterface.bulkDelete("app_sections", {});
    },
};
