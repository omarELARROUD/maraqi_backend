import * as CryptoJS from 'crypto-js';
  
  export const encryptData = (data) => {
    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(data, 'secret').toString();
    // console.log(ciphertext);
    return ciphertext;
  };

  export const decryptData = (data) => {
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(data, 'secret');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(originalText);
    return originalText;
  };