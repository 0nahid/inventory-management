import { Schema } from "mongoose";
import PasswordValidator from "password-validator";
import validator from "validator";

const passwordSchema = new PasswordValidator()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  shippingAddress: string;
  image: string;
  status: string;
  confirmationToken: string;
  confirmationTokenExpires: Date | string;
  passWordChangedAt: Date;
  passWordResetToken: string;
  passWordResetExpires: Date;
  _doc: any;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password: string) => passwordSchema.validate(password),
        message: (props: any) => `${props.value} is not a valid password!`,
      },
    },

    role: {
      type: String,
      enum: {
        values: ["buyer", "store-manager", "admin"],
        message: "Role must be either buyer, store-manager or admin",
      },
      default: "buyer",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber: string) =>
          validator.isMobilePhone(phoneNumber),
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
    },
    shippingAddress: String,
    image: {
      type: String,
      validate: {
        validator: (image: string) => validator.isURL(image),
        message: (props: any) => `${props.value} is not a valid URL!`,
      },
      default:
        "https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "suspended"],
        message: "Status must be either active or inactive",
      },
      default: "inactive",
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passWordChangedAt: Date,
    passWordResetToken: String,
    passWordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

export default UserSchema;
