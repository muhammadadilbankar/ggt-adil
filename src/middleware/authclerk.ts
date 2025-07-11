const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authenticateClerk = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: "https://enough-escargot-25.clerk.accounts.dev/.well-known/jwks.json",
  }),
  algorithms: ['ES256'], // ✅ Allow ES256
  issuer: 'https://enough-escargot-25.clerk.accounts.dev', // ✅ Your Clerk URL
  credentialsRequired: true,
  requestProperty: 'auth',
});

module.exports = authenticateClerk;
