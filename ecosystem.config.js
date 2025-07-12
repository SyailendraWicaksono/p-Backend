module.exports = {
    apps: [
      {
        name: 'express-server',           // nama app di pm2
        script: 'dist/index.js',          // file js hasil build typescript
        instances: 1,                     // atau 'max' untuk cluster mode
        exec_mode: 'fork',                // atau 'cluster' (untuk multi-core)
        watch: false,                     // true kalau ingin watch perubahan (tidak direkomendasi di production)
        env: {
          NODE_ENV: 'production',
          PORT: 3000                      // sesuaikan dengan .env atau port yang kamu pakai
        }
      }
    ]
  };
  