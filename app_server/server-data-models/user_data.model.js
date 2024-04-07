import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import f_get_db_structure from "../server-helpers/get_db_structure.helper.js";
import Schema_UserData from "../server-data-schema/user_data.schema.js";
const { users_collection } = f_get_db_structure();

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

// un-bcrypt the decrypted password:
Schema_UserData.methods.m_unbcrypt_password = function () {
  return bcrypt.hashSync(this.DATA_PASSWORD, 10);
};

// get user credentials without password:
Schema_UserData.methods.m_get_user_credentials_without_password = function () {
  const v_userCredentials = this.toObject();
  delete v_userCredentials.DATA_PASSWORD;
  return v_userCredentials;
};

// define the user data model:
const Model_UserData = mongoose.model(users_collection, Schema_UserData);

export default Model_UserData;
