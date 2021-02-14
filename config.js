require(`dotenv`).config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || `development`,

    API_PORT: process.env.API_PORT || 3000,
    FRONT_PORT: process.env.FRONT_PORT || 8080,

    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_TYPE: process.env.DB_TYPE,

    TEST_DB_NAME: process.env.TEST_DB_NAME,
    TEST_DB_USER: process.env.TEST_DB_USER,
    TEST_DB_PASSWORD: process.env.TEST_DB_PASSWORD,
    TEST_DB_HOST: process.env.TEST_DB_HOST,
    TEST_DB_PORT: process.env.TEST_DB_PORT,
};
