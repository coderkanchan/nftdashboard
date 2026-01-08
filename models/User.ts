// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", userSchema);




// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },

//     password: {
//       type: String,
//       default: "", // google users ke liye empty
//     },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

//     isBlocked: {
//       type: Boolean,
//       default: false,
//     },

//     provider: {
//       type: String,
//       enum: ["credentials", "google"],
//       default: "credentials",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", userSchema);




// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: String,
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },

//     password: {
//       type: String,
//       default: "",
//     },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

//     isBlocked: {
//       type: Boolean,
//       default: false,
//     },

//     provider: {
//       type: String,
//       enum: ["credentials", "google"],
//       default: "credentials",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User ||
//   mongoose.model("User", userSchema);




import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
