import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        id: "73473fc8-0b05-47cb-8a58-23a97bfcaf53",
        fullname: "Sigit Sasongko",
        username: "FastTiger-N4c3W",
        email: "sigit.center31@gmail.com",
        phoneNumber: "+6286403152165",
        password:
          "$2b$10$ULAkbSgwEoNKhCdwyymq3O8ui6MGp0a7eGhWrwuWKLaBd2nbkcsU.",
        active: true,
        data: "{}",
        createdAt: "4/5/2025 15:20:10",
        updatedAt: "4/5/2025 15:47:38",
      },
      {
        id: "734d1344-bd80-4a91-a4b5-db3861a6b580",
        fullname: "Sigit Sasongko",
        username: "sargeant",
        email: "siko.spade31@gmail.com",
        phoneNumber: "+6285725363777",
        password:
          "$2b$10$wTHh1i2PeOAiYZZ0Uzg9/ObHqj7cSWJPSBBE08plrBILaSEo2Ctri",
        active: true,
        data: '{"telegram": {"id": "703181169", "exam": {"currentExamId": "6d8f33d8-fa85-4447-9532-f6d3a2aea36a", "currentQuestionIndex": 6}, "lastState": "start", "currentExamId": null, "currentQuestionIndex": null}}',
        createdAt: "1/5/2025 11:32:54",
        updatedAt: "3/5/2025 14:48:55",
      },
      {
        id: "9d1a5ebf-61be-4656-8e72-8691386c871f",
        fullname: "System Administrator",
        username: "sysadmin",
        email: "sysadmin@phindojo.id",
        phoneNumber: "+6281234567890",
        password:
          "$2b$10$hDNHnq80yyfxQuY66tPMHu7liT4WrxDY7iP8NLN1l9vEDDTIZbc/6",
        active: true,
        data: '{"platforms": ["[\\"phindojo\\"]"]}',
        createdAt: "1/5/2025 11:32:54",
        updatedAt: "1/5/2025 11:32:54",
      },
      {
        id: "c9b1e2a4-2e68-4e1f-947b-cdf8a7ea1d0e",
        fullname: "Sigit Sasongko",
        username: "FastTiger-4n0m",
        email: "sigit.center32@gmail.com",
        phoneNumber: "+6286403152165",
        password:
          "$2b$10$ULAkbSgwEoNKhCdwyymq3O8ui6MGp0a7eGhWrwuWKLaBd2nbkcsU.",
        active: true,
        data: "{}",
        createdAt: "4/5/2025 15:20:10",
        updatedAt: "4/5/2025 15:47:38",
      },
      {
        id: "c9b1e2a4-2e68-4e1f-947b-cdf8a7ea1d11",
        fullname: "Sigit Sasongko",
        username: "sargeant2",
        email: "siko.spade32@gmail.com",
        phoneNumber: "+6285725363777",
        password:
          "$2b$10$wTHh1i2PeOAiYZZ0Uzg9/ObHqj7cSWJPSBBE08plrBILaSEo2Ctri",
        active: true,
        data: '{"telegram": {"id": "703181169", "exam": {"currentExamId": "6d8f33d8-fa85-4447-9532-f6d3a2aea36a", "currentQuestionIndex": 6}, "lastState": "start", "currentExamId": null, "currentQuestionIndex": null}}',
        createdAt: "1/5/2025 11:32:54",
        updatedAt: "3/5/2025 14:48:55",
      },
      {
        id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
        fullname: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        phoneNumber: "+6281234567891",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"preferences": {"theme": "dark"}}',
        createdAt: "1/5/2025 12:00:00",
        updatedAt: "1/5/2025 12:00:00",
      },
      {
        id: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
        fullname: "Jane Smith",
        username: "janesmith",
        email: "janesmith@example.com",
        phoneNumber: "+6281234567892",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"notifications": {"email": true}}',
        createdAt: "1/5/2025 12:10:00",
        updatedAt: "1/5/2025 12:10:00",
      },
      {
        id: "c3d4e5f6-a7b8-9012-3456-7890abcdef12",
        fullname: "Alice Johnson",
        username: "alicejohnson",
        email: "alicejohnson@example.com",
        phoneNumber: "+6281234567893",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"settings": {"language": "en"}}',
        createdAt: "1/5/2025 12:20:00",
        updatedAt: "1/5/2025 12:20:00",
      },
      {
        id: "d4e5f6a7-b8c9-0123-4567-890abcdef123",
        fullname: "Bob Brown",
        username: "bobbrown",
        email: "bobbrown@example.com",
        phoneNumber: "+6281234567894",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"preferences": {"notifications": "sms"}}',
        createdAt: "1/5/2025 12:30:00",
        updatedAt: "1/5/2025 12:30:00",
      },
      {
        id: "e5f6a7b8-c9d0-1234-5678-90abcdef1234",
        fullname: "Charlie Green",
        username: "charliegreen",
        email: "charliegreen@example.com",
        phoneNumber: "+6281234567895",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"preferences": {"timezone": "UTC+7"}}',
        createdAt: "1/5/2025 12:40:00",
        updatedAt: "1/5/2025 12:40:00",
      },
      {
        id: "e5f6a7b8-c9d0-1234-5678-90abcdef4321",
        fullname: "Rizco Renova",
        username: "rizco213",
        email: "rizcorenova@example.com",
        phoneNumber: "+6281234567895",
        password:
          "$2b$10$abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabc",
        active: true,
        data: '{"preferences": {"timezone": "UTC+7"}}',
        createdAt: "1/5/2025 12:40:00",
        updatedAt: "1/5/2025 12:40:00",
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("users", {});
  },
};
