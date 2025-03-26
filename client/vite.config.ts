import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	esbuild: {
		loader: 'tsx',
		include: /\.(tsx|ts|jsx|js)$/,
		exclude: /node_modules/,
	},
});