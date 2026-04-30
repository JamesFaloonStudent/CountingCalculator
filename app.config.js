const { expo } = require("./app.json");

/**
 * Creates host-aware Expo web config so static exports work on both subpath and root hosts.
 * Set EXPO_PUBLIC_WEB_BASE_URL=/CountingCalculator for GitHub Pages project deployments.
 * Leave EXPO_PUBLIC_WEB_BASE_URL unset for root-path hosts like Vercel.
 * @param {import("@expo/config").ConfigContext} _context
 * @returns {import("@expo/config").ExpoConfig}
 */
module.exports = function createExpoConfig(_context) {
  const webBaseUrl = process.env.EXPO_PUBLIC_WEB_BASE_URL;
  const experiments = {
    ...expo.experiments,
  };

  if (webBaseUrl && webBaseUrl !== "/") {
    experiments.baseUrl = webBaseUrl;
  } else {
    delete experiments.baseUrl;
  }

  return {
    ...expo,
    experiments,
  };
};
