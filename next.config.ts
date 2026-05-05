import type { NextConfig } from "next";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const withPWA = require("next-pwa");

const pwa = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default pwa(nextConfig);
