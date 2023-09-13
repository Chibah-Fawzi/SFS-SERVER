const bcrypt = require("bcrypt");

export function comparePassword(password: string, passwordb: string) {
  return bcrypt.compareSync(password, passwordb);
}
