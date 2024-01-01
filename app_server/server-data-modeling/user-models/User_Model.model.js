import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const db_Schema_UserSchema = mongoose.Schema(
    {
        v_data_firstName: {
            type: String,
            required: true,
            maxLength: 50,
        },
        v_data_lastName: {
            type: String,
            required: true,
            maxLength: 50,
        },
        v_data_emailAddress: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        v_data_username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true,
        },
        v_data_password: {
            type: String,
            required: true,
            minLength: 8,
        },
        v_data_isAgreementConfirmed: {
            type: Boolean,
            default: false,
            required: true,
        },
        v_data_isEmailVerfied: {
            type: Boolean,
            default: false,
        },
        v_data_isAccountActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Match user entered password to hashed password in database:
db_Schema_UserSchema.methods.m_compareSubmittedPasswordWithDbPassword = async function (
    p_submittedPassword
) {
    return await bcrypt.compare(p_submittedPassword, this.v_data_password);
};

// Encrypt password using bcrypt:
db_Schema_UserSchema.pre("save", async function (next) {
    if (!this.isModified("v_data_password")) next();
    const v_saltEnc = await bcrypt.genSalt(10);
    this.v_data_password = await bcrypt.hash(this.v_data_password, v_saltEnc);
});

const db_model_UserModel = mongoose.model("users_col", db_Schema_UserSchema);

export default db_model_UserModel;
