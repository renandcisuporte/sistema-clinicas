const { version } = require('node:os')

module.exports = {
  apps: [
    {
      version: '2.0.1',
      name: 'dclinica-app',
      script: './server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        HOSTNAME: '0.0.0.0',
        NODE_ENV: 'production',
        PORT: 3004,
      },
      error_file: './.logs/pm2-error.log',
      out_file: './.logs/pm2-out.log',
      log_file: './.logs/pm2-combined.log',
      time: true,
    },
  ],
}
