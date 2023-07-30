export default function authService(service) {
   const hashPassword = (password) => service.hashPassword(password);
   const comparePassword = (password, hashPassword) =>
      service.comparePassword(password, hashPassword);
   const generateKeyPair = () => service.generateKeyPair();
   const createTokenPair = (payload, publicKey, privateKey) =>
      service.createTokenPair(payload, publicKey, privateKey);
   const verifyJWT = (token, keySecret) => service.verifyJWT(token, keySecret);

   return {
      hashPassword,
      comparePassword,
      createTokenPair,
      generateKeyPair,
      verifyJWT,
   };
}
