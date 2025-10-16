import CryptoJS from 'crypto-js'

export const encryptField = (text: string, userKey: string): string =>{
    return CryptoJS.AES.encrypt(text,userKey).toString()
}
//- Si querés ir más allá, podés agregar una función para desencriptar y verificar que el texto original se recupera correctamente:
export const decryptField = (cipherText: string, userKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, userKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
