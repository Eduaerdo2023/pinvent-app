const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Password must be a t least 6 characters"],
      //maxLength: [23, "Please must be less than 23 characters"],
    },
    photo: {
      type: String,
      default:
        "https://images.pexels.com/photos/18906151/pexels-photo-18906151/free-photo-of-moda-persona-manos-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    phone: {
      type: String,
      default: "+52",
    },
    bio: {
      type: String,
      maxLength: [250, "Please must be less than 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving it

userSchema.pre("save", async function (next) {
  if(!this.isModified('password')) {
return next()
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
