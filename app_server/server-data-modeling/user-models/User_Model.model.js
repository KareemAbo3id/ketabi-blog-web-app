import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User_Schema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 50,
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 50,
        },
        emailAddress: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        agreementConfirmation: {
            type: Boolean,
            default: false,
            required: true,
        },
        isEmailVerfied: {
            type: Boolean,
            default: false,
        },
        isAccountActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Match user entered password to hashed password in database:
User_Schema.methods.compareSubmittedPasswordWithDB = async function (submittedPassword) {
    return await bcrypt.compare(submittedPassword, this.password);
};

// Encrypt password using bcrypt:
User_Schema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const saltEnc = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltEnc);
});

const User_Model = mongoose.model("users_col", User_Schema);

export default User_Model;
