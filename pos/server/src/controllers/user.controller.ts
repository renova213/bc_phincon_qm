// import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
// import UserService from "../services/user.service.js";

// class UserController {
//   async getAll(req: Request, res: Response): Promise<void> {
//     try {
//       const users = await UserService.getAll();
//       res.json({
//         status: "success",
//         message: "Users fetched successfully",
//         data: users,
//       });
//     } catch (error: any) {
//       res.json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }

//   async getById(req: Request, res: Response): Promise<void> {
//     try {
//       const user = await UserService.getById(req.params.id);
//       if (!user) {
//         res.json({
//           message: "User not found",
//           status: "error",
//         });
//         return;
//       }
//       res.json({
//         status: "success",
//         message: "User fetched successfully",
//         data: user,
//       });
//     } catch (error: any) {
//       res.json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }

//   async create(req: Request, res: Response): Promise<void> {
//     try {
//       const user = await UserService.create({ ...req.body, id: uuidv4() });
//       res.json({
//         status: "success",
//         message: "User created successfully",
//         data: user,
//       });
//     } catch (error: any) {
//       res.json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }

//   async update(req: Request, res: Response): Promise<void> {
//     try {
//       const user = await UserService.update(req.params.id, req.body);
//       res.json({
//         status: "success",
//         message: "User updated successfully",
//         data: user,
//       });
//     } catch (error: any) {
//       res.json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }

//   async delete(req: Request, res: Response): Promise<void> {
//     try {
//       await UserService.delete(req.params.id);
//       res.json({
//         status: "success",
//         message: "User deleted successfully",
//         data: req.params.id,
//       });
//     } catch (error: any) {
//       res.json({
//         status: "error",
//         message: error.message,
//       });
//     }
//   }
// }

// export default new UserController();
