import { body, validationResult } from "express-validator";

const withValidation = (validate) => {
  return [
    validate,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        const errorMessage = errors.array().map((error) => error.msg);
        throw new Error(errorMessage);
      }
      next();
    },
  ];
};

export const bookvalidator = withValidation([
  body("standard").notEmpty().withMessage("Standard is required"),
  body("title").notEmpty().withMessage("Title is required"),
]);

export const getsinglebookvalidator = withValidation([
  body("standard").notEmpty().withMessage("Standard is required"),
  body("book").notEmpty().withMessage("Book is required"),
]);
