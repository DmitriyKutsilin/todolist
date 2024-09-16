module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*.test.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};

// module.exports = {
//     preset: 'jest-puppeteer',
//     testRegex: './*.test.js$',
//     setupFilesAfterEnv: ['jest-environment-puppeteer'],
//     testEnvironment: 'jest-environment-jsdom',
// };