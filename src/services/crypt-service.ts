import crypto from "crypto";
import bcrypt from "bcryptjs";

/**
 * Some Info here
 * @param token
 */
async function generateTokenHash(token: string) {
  return crypto.createHash('sha512').update(token).digest("hex")
}

async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}


/**
 * Auth Services for now
 */
export {generateTokenHash, generatePasswordHash}
