const { errorResponse, successResponse } = require("../../helpers/responses");
const { sendSms } = require("../../services/otp");
const {
  sentOtpValidator,
  OtpVerifyValidator,
} = require("../../validators/auth");
const Ban = require("../Ban/ban-model");
const redis = require("./../../redis");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = require("./../user/user.model");

// start helper functions

function getOtpRedisPattern(phone) {
  return `otp:${phone}`;
}

async function getOtpDetail(phone) {
  const otp = await redis.get(getOtpRedisPattern(phone));
  if (!otp) {
    return {
      expired: true,
      remainingTime: 0,
    };
  }

  const remainingTime = await redis.ttl(getOtpRedisPattern(phone)); // second
  const minute = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60; //"01:20"
  const formattedTime = `${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return {
    expired: false,
    remainingTime: formattedTime,
  };
}

const generateOtp = async (phone, length = 5, expiredTime = 1) => {
  const digist = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digist[Math.random() * digist.length];
  }

  //   Temporary otp
  otp = "1111";

  const hashedOtp = await bcrypt.hash(otp, 12);

  await redis.set(getOtpRedisPattern(phone), hashedOtp, "EX", expiredTime * 60);

  return otp;
};
// finish helper function

exports.verify = async(req,res,next) =>{
    
}

exports.getMe = async(req,res,next) =>{
    
}