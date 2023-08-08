import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import { setCookie } from "cookies-next"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("SIGN IN REQUEST")
  if (req.method === "POST") {
    const errors: string[] = []
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid"
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid"
      }
    ];

    validationSchema.forEach(check => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ errorMessage: "Email or password is invalid" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errorMessage: "Email or password is invalid" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alg = "HS256"

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)


    // create a JWT
    const token = await new jose
      .SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });


    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city

    });


  }

  return res.status(404).json("Unknow endpoint");

}