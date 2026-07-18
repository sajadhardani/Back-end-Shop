const {
  errorResponse,
  successResponse,
} = require("../../../helpers/responses");

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserActivation.findOne({ _id: userId });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (user.roles.includes("ADMIN")) {
      return errorResponse(res, 403, "you cannot ban an admin !!");
    }
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    await Ban.create({ phone: user.phone });

    return successResponse(res, 200, {
      user: deletedUser,
      message: "User banned successfully, use adn post removed ",
    });
  } catch (err) {
    next(err);
  }
};


exports.verify = async(req,res,next) =>{
    
}

exports.getMe = async(req,res,next) =>{
    
}