/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  // disabilita la PWA in dev (service worker solo in produzione)
  disable: process.env.NODE_ENV !== 'production',
});

module.exports = withPWA({
  reactStrictMode: false,
  // Build standalone per il deploy PM2 sul VPS (convenzione ecosistema Pigna Labs).
  output: 'standalone',
});
