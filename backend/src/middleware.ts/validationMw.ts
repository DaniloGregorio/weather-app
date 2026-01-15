import { Request, Response, NextFunction } from "express";

export const PCValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postalCode } = req.body;
    if (!postalCode && postalCode == "") {
      return res.status(500).json({ error: "Postal Code ins't valid" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "error to fetch" });
  }
};
