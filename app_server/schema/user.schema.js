import mongoose from "mongoose";

/**
 * ### User Data Schema object extends mongoose.Schema
 *
 * @property {String} DATA_EMAIL_ADDRESS
 * @property {String} DATA_USERNAME
 * @property {String} DATA_PASSWORD
 * @property {String} DATA_FIRSTNAME
 * @property {String} DATA_LASTNAME
 * @property {String} DATA_ADDRESS.COUNTRY
 * @property {String} DATA_ADDRESS.CITY
 * @property {Boolean} FLAG_AGREEMENT_CONFIRMED
 * @property {Boolean} FLAG_EMAIL_VERFIED
 * @property {Boolean} FLAG_ACCOUNT_ACTIVATED
 */
const Schema_UserData = mongoose.Schema(
  {
    //
    //
    DATA_EMAIL_ADDRESS: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      unique: true,
    },
    //
    //
    DATA_USERNAME: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      unique: true,
    },
    //
    //
    DATA_PASSWORD: {
      type: String,
      required: true,
    },
    //
    //
    DATA_FIRSTNAME: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    //
    //
    DATA_LASTNAME: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    //
    //
    DATA_ADDRESS: [
      {
        //
        //
        COUNTRY: {
          type: String,
          trim: true,
          maxLength: 255,
        },
        //
        //
        CITY: {
          type: String,
          trim: true,
          maxLength: 255,
        },
      },
    ],
    //
    //
    FLAG_AGREEMENT_CONFIRMED: {
      type: Boolean,
      required: true,
    },
    //
    //
    FLAG_EMAIL_VERFIED: {
      type: Boolean,
      required: true,
      default: false,
    },
    //
    //
    FLAG_ACCOUNT_ACTIVATED: {
      type: Boolean,
      required: true,
      default: true,
    },
    //
    //
    DATA_DEACTIVATION_REASON: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    //
    //
    TEMP_RESET_PASSWORD_TOKEN: {
      type: String,
    },
    //
    //
    TEMP_RESET_PASSWORD_TOKEN_EXPIRES: {
      type: Date,
    },
  },
  //
  //
  { timestamps: true },
  //
  //
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default Schema_UserData;
