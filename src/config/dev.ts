export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  disableAuth: false
};
