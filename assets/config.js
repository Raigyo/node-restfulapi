require("dotenv").config();

const env = process.env.NODE_ENV || "production";

const configs = {
  base: {
    env,
    errors: {
        wrongID: "Wrong id",
        wrongMaxValue: "Wrong max value",
        nameAlreadyTaken: "Name already taken",
        noNameValue: "No name value",
        sameName: "Same name"
    }
  },
  development: {
    rootAPI: process.env.API_HOST_DEV,
    port: process.env.API_PORT_DEV,
    db: {
        host: process.env.DB_HOST_DEV,
        port: process.env.DB_PORT_DEV,
        database: process.env.DB_NAME_DEV,
        user: process.env.DB_USER_DEV,
        password: process.env.DB_PASSWORD_DEV
    }
  },
  production: {
    rootAPI: process.env.API_HOST_PROD,
    port: process.env.API_PORT_PROD,
    db: {
        host: process.env.DB_HOST_PROD,
        port: process.env.DB_PORT_PROD,
        database: process.env.DB_NAME_PROD,
        user: process.env.DB_USER_PROD,
        password: process.env.DB_PASSWORD_PROD
    }
  }
}

const config = Object.assign(configs.base, configs[env]);

module.exports= config;