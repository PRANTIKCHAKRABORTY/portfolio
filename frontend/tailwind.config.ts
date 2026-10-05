import type { Config } from "tailwindcss";
const config: Config = {
  content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./data/**/*.{ts,tsx}"],
  theme:{extend:{colors:{accent:"#7c5cff",cyan:"#23d5ab"}}},
  plugins:[]
};
export default config;
