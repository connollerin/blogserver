import dotenv from 'dotenv';
dotenv.config({ silent: true });

export default {
  API_SECRET: process.env.API_SECRET,
};
