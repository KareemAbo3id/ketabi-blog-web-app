import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MON_SCHEMA_USER = mongoose.Schema(
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
MON_SCHEMA_USER.methods.M_IS_PASSWORD_MATCH_WITH = async function (p_submitted_password) {
    return await bcrypt.compare(p_submitted_password, this.v_data_password);
};

// Encrypt password using bcrypt:
MON_SCHEMA_USER.pre("save", async function (next) {
    if (!this.isModified("v_data_password")) next();
    const v_saltEnc = await bcrypt.genSalt(10);
    this.v_data_password = await bcrypt.hash(this.v_data_password, v_saltEnc);
});

const MON_MODEL_USER = mongoose.model("users_col", MON_SCHEMA_USER);

export default MON_MODEL_USER;
