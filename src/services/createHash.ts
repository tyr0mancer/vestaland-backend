import crypto from "crypto";
import bcrypt from "bcryptjs";


export async function generateTokenHash(token: string) {
  return crypto.createHash('sha512').update(token).digest("hex")
}

export async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
