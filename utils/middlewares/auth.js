const { errorResponse } = require("../../helpers/responses");

const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return errorResponse(res, 401, "Token not provided!");
    }

    const tokenArry = token.split(" ");
    const tokenValue = tokenArry[1];
    console.log(tokenValue);
    console.log(tokenArry);

    if (tokenArry[0] !== "Bearer") {
      return errorResponse(res, 401, "write [Bearer] at the start of token");
    }

    const decoded = jwt.decode(tokenValue, process.env.JWT_SECRET);

    if (!decoded) {
      return errorResponse(res, 401, "Token is not valid");
    }
    console.log(decoded);

    const userId = decoded.userId

    const user = await User.findOne({_id: userId})

    if (!user){
        return
    }

    next();
  } catch (err) {
    next(err);
  }
};
