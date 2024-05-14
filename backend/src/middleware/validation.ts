import { body, validationResult, CustomValidator } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateAddress: CustomValidator = (value, { req }) => {
    if (typeof value !== "object") {
      throw new Error("Address must be an object");
    }
    if (!value.city || typeof value.city !== "string") {
      throw new Error("City must be a string");
    }
    if (!value.country || typeof value.country !== "string") {
      throw new Error("Country must be a string");
    }

    if (!value.postCode || typeof value.country !== "number") {
        throw new Error("postCode must be number");
    }
    
    return true; 
}
  
  export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("address").custom(validateAddress), 
    handleValidationErrors,
  ];
