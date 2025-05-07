// import UserModel from "../models/user.model.js";

// class UserService {
//   static async getAll(): Promise<any> {
//     return await UserModel.findAll({
//       attributes: ["id", "fullname"],
//       include: [
//         {
//           model: UserModel.dataValues.Role,
//           attributes: ["id", "title"],
//           as: "roles",
//           through: { attributes: [], model: db.UserRole },
//         },
//       ],
//     });
//   }

//   static async getById(id: string): Promise<any> {
//     return await db.User.findByPk(id, {
//       attributes: ["id", "fullname"],
//     });
//   }

//   static async create(userData: any): Promise<any> {
//     return await db.User.create(userData);
//   }

//   static async update(id: string, updateData: any): Promise<any> {
//     await db.User.update(updateData, { where: { id } });
//     return await db.User.findByPk(id); // Return the updated user
//   }

//   static async delete(id: string): Promise<void> {
//     await db.User.destroy({
//       where: {
//         id,
//       },
//     });
//   }
// }

// export default UserService;
