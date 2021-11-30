const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'ahmed_smae',
        mongodb_password: 'iloveUAE',
        mongodb_cluster: 'cluster0',
        mongodb_database: 'blogs_dev'
      }
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'ahmed_smae',
      mongodb_password: 'iloveUAE',
      mongodb_cluster: 'cluster0',
      mongodb_database: 'blogs_prod'
    }
  };
};
