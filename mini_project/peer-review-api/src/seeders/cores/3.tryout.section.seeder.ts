import { QueryInterface, Sequelize } from "sequelize";

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    const products = [
      {
        id: "115743e4-b42b-4ffe-8417-689a6b3777c3",
        code: "ISMS-S01_API_SECURITY",
        title: "API Security",
        description: null,
        order: 1,
        data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 1}}',
        tag: "phincon",
        active: true,
        createdAt: "1/5/2025 11:32:55",
        updatedAt: "1/5/2025 11:32:55",
      },
      {
        id: "3e0c2ee4-31aa-44c8-b554-e4a5df02ff84",
        code: "ISMS-S21_SECURE_SYSTEM_DEVELOPMENT_LIFECYCLE",
        title: "Secure System Development Lifecycle",
        description: null,
        order: 1,
        data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 2}}',
        tag: "phincon",
        active: true,
        createdAt: "1/5/2025 11:32:55",
        updatedAt: "1/5/2025 11:32:55",
      },
      {
        id: "e1a15a9c-829a-4d45-8040-2d2e3871e059",
        code: "ISMS-S30_BUILD_SECURITY_SYSTEM_STANDARD",
        title: "Security System Standard",
        description: null,
        order: 1,
        data: '{"icon": "🔐", "type": "LMS", "telegram": {"shortId": 3}}',
        tag: "phincon",
        active: true,
        createdAt: "1/5/2025 11:32:55",
        updatedAt: "1/5/2025 11:32:55",
      },
    ];

    await queryInterface.bulkInsert("tryout_sections", products);
  },

  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkDelete("tryout_sections", {});
  },
};
