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

export const loginvalidator = withValidation([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Kindly is Proper Email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Length of Password should be more than 3 character"),
]);

export const regitervalidator = withValidation([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Length of Name should be more than 3 character"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Kindly is Proper Email"),
  body("mobile")
    .notEmpty()
    .withMessage("Mobile is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile No Should of 10 Character"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Length of Password should be more than 3 character"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .isLength({ min: 3 })
    .withMessage("Length of Confirm Password should be more than 3 character"),
]);
