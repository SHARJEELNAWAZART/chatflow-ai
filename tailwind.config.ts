import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { brand: { 50:'#eff6ff',100:'#dbeafe',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8' }, violet: { 500:'#8b5cf6' } }, boxShadow: { glow:'0 16px 48px rgba(37,99,235,.16)' } } }, plugins: [] };
export default config;
