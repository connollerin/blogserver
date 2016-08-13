import dotenv from '../.env';
dotenv.config({ silent: true });

export default {
  API_SECRET: process.env.API_SECRET,
};
