// Carica le env da .env.local (presente solo sul VPS, gitignored).
// Lo standalone Next.js non legge .env files autonomamente: serve passare le var via PM2.
// Convenzione ecosistema Pigna Labs (cfr. ing-tracker). Porta 3013 (3000-3012 occupate sul VPS).
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.join(__dirname, ".env.local");
  const env = { NODE_ENV: "production", PORT: 3013 };
  if (!fs.existsSync(envPath)) return env;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[m[1]] = v;
  }
  return env;
}

module.exports = {
  apps: [
    {
      name: "choco-world",
      script: ".next/standalone/server.js",
      cwd: "/opt/choco-world",
      env: loadEnv(),
      instances: 1,
      autorestart: true,
      max_memory_restart: "256M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/opt/choco-world/logs/error.log",
      out_file: "/opt/choco-world/logs/out.log",
    },
  ],
};
