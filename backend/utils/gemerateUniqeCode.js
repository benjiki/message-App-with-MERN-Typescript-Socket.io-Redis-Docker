import { customAlphabet } from "nanoid";
import user from "../models/Users.js";

const generateCode = customAlphabet("123456789", 6);

const generateUniqueConnectCode = async () => {
  let code, exists;

  do {
    code = generateCode();
  } while (exists);

  return code;
};

export default generateUniqueConnectCode;
