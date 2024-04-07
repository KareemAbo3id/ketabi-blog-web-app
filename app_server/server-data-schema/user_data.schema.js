import mongoose from "mongoose";

/**
 * ### The Main User Schema Object
 * @KareemAbo3id
 * @param {String} DATA_EMAIL_ADDRESS
 * @param {String} DATA_USERNAME
 * @param {String} DATA_PASSWORD
 * @param {String} DATA_FIRSTNAME
 * @param {String} DATA_LASTNAME
 * @param {String} DATA_ADDRESS.COUNTRY
 * @param {String} DATA_ADDRESS.CITY
 * @param {Boolean} FLAG_AGREEMENT_CONFIRMED
 * @param {Boolean} FLAG_EMAIL_VERFIED
 * @param {Boolean} FLAG_ACCOUNT_ACTIVATED
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
      maxLength: 30,
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
    TEMP_RESET_PASSWORD_TOKEN: {
      type: String,
    },
    //
    //
    TEMP_RESET_PASSWORD_TOKEN_EXPIRES: {
      type: Date,
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default Schema_UserData;
