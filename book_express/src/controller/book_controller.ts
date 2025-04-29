import { Request, Response } from "express";
import bookDataSource from "../dist/datasource/books_data_source.js";

const getBooks = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: "0000",
    data: {
      books: bookDataSource,
    },
  });
};

export default getBooks;
