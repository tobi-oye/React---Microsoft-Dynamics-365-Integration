const msal = require("@azure/msal-node");

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig = {
  auth: {
    clientId: "6362c627-f5c6-4294-94f7-cbda63b9d7e4",
    authority:
      "https://login.microsoftonline.com/f40eb0bd-8715-4c3a-9aa9-b8ab7326d29b",
    clientSecret: "VMezt~cbuler9NgIF-.~081ocUpR2fsACu",
    knownAuthorities: [
      "https://login.microsoftonline.com/f40eb0bd-8715-4c3a-9aa9-b8ab7326d29b",
    ],
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource>/.default'. For more, visit:
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow
 */
const tokenRequest = {
  scopes: ["https://microagemb.api.crm3.dynamics.com/.default"],
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
function getToken() {
  return cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
  getToken: getToken,
};
