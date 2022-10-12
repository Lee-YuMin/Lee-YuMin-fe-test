import crypto from "crypto-js";
const SAULT = "secret_key";

const STORAGE = {
  get: (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) {
      return data;
    }

    return JSON.parse(
      crypto.AES.decrypt(data, SAULT).toString(crypto.enc.Utf8)
    );
  },

  set: (key: string, value: any) => {
    const data = crypto.AES.encrypt(JSON.stringify(value), SAULT).toString();
    return localStorage.setItem(key, data);
  },
};

export default STORAGE;
