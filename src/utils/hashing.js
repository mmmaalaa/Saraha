import bcrypt from "bcrypt";
export const hashPassword = (password, salt = +process.env.SALT_ROUNDS) => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
