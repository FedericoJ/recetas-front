var User = require("../models/User")
const bcrypt = require("bcryptjs");

exports.GetUser = async (userID) => {
  try {
    const user = await User.findById(userID).select("id");
    if (!user) {
      return { error: true, message: "No se Encontro el Usuario", code: 400 };
    }
    return { response: user, error: false };
  } catch (err) {
    return { error: true, message: "Ha Ocurrido un Error", code: 500 };
  }
};

exports.Authenticate = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return { error: true, message: "Ha Ocurrido un Error", code: 500 };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        error: true,
        message: "Email o Contraseña Incorrecta",
        code: 500,
      };
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    return { payload: payload, error: false };
  } catch (err) {
    return { error: true, message: "Ha Ocurrido un Error", code: 500 };
  }
};

exports.ChangePassword = async (UserId, oldPassword, newPassword) => {
  try {
    let user = await User.findOne({ _id: UserId });

    if (!user) {
      return { error: true, message: "Ha Ocurrido un Error", code: 400 };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return {
        error: true,
        message: "Las Contraseñas son incorrectas",
        code: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);

    var newUserPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate(
      { _id: UserId },
      {
        password: newUserPassword,
      }
    );

    return { response: "OK", error: false };
  } catch (err) {
    return { error: true, message: "Ha Ocurrido un Error", code: 500 };
  }
};
