import DotEnv from 'dotenv';

DotEnv.config({
  path:
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
});
