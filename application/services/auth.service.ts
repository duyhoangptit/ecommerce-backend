export default function authService(service) {
   const hashPassword = (password) => service.hashPassword(password);
   const generateKeyPair = () => service.generateKeyPair();
   const createTokenPair = (payload, publicKey, privateKey) =>
      service.createTokenPair(payload, publicKey, privateKey);

   return { hashPassword, createTokenPair, generateKeyPair };
}
