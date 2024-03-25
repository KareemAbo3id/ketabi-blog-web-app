import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import f_get_db_structure from "../../server-helpers/get_db_structure.helper.js";
const { users_collection } = f_get_db_structure();

/**
 * ### The Main User Schema Object
 * @KareemAbo3id
 * @param {String} DATA_EMAIL_ADDRESS emailAddress
 * @param {String} DATA_USERNAME username
 * @param {String} DATA_PASSWORD password
 * @param {String} DATA_FIRSTNAME firstName
 * @param {String} DATA_LASTNAME lastName
 * @param {String} DATA_ADDRESS.COUNTRY country
 * @param {String} DATA_ADDRESS.CITY city
 * @param {Boolean} FLAG_AGREEMENT_CONFIRMED agreementConfirmed
 * @param {Boolean} FLAG_EMAIL_VERFIED emailVerfied
 * @param {Boolean} FLAG_ACCOUNT_ACTIVATED AccountActivated
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
      minLength: 8,
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
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Match user entered password to hashed password in database:
Schema_UserData.methods.m_compare_password = async function (p_typed_password) {
  return await bcrypt.compare(p_typed_password, this.DATA_PASSWORD);
};

// Encrypt password using bcrypt:
Schema_UserData.pre("save", async function (next) {
  if (!this.isModified("DATA_PASSWORD")) next();
  const v_saltEnc = await bcrypt.genSalt(10);
  this.DATA_PASSWORD = await bcrypt.hash(this.DATA_PASSWORD, v_saltEnc);
});

// define the user data model:
const Model_UserData = mongoose.model(users_collection, Schema_UserData);

export default Model_UserData;
