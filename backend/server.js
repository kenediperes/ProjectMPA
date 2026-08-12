// backend/server.js
const dotenv = require('dotenv');
const { sequelize } = require('./src/models'); // Import koneksi DB dari models/index

// 1. Load environment variables
dotenv.config();

// 2. Import aplikasi Express (sudah terdaftar semua routes & middleware di sini)
const app = require('./src/app');

// 3. Konfigurasi Port
const PORT = process.env.PORT || 5000;

// 4. Fungsi untuk memulai server
const startServer = async () => {
  try {
    // Cek koneksi ke database sebelum server berjalan
    await sequelize.authenticate();
    console.log('[DATABASE] Connection has been established successfully.');

    // Sinkronisasi model ke database (HANYA untuk development)
    // Di production, gunakan migrasi (migrations/) daripada sync force: true
    if (process.env.NODE_ENV === 'development') {
      // await sequelize.sync({ alter: true }); // Hati-hati di production
      console.log('[DATABASE] Models synchronized (development mode).');
    }

    // 5. Jalankan server
    const server = app.listen(PORT, () => {
      console.log(`[SERVER] ERP System running on http://localhost:${PORT}`);
      console.log(`[ENV] Mode: ${process.env.NODE_ENV}`);
    });

    // 6. Graceful Shutdown (Penanganan mati server secara aman)
    const gracefulShutdown = (signal) => {
      console.log(`[SERVER] Received ${signal}. Closing server gracefully...`);
      server.close(async () => {
        console.log('[SERVER] HTTP server closed.');
        try {
          await sequelize.close();
          console.log('[DATABASE] Database connection closed.');
          process.exit(0);
        } catch (err) {
          console.error('[ERROR] Failed to close database:', err);
          process.exit(1);
        }
      });
    };

    // Listen untuk sinyal termination (Ctrl+C, kill)
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('[ERROR] Failed to start server:', error);
    process.exit(1);
  }
};

// 7. Jalankan startServer
startServer();