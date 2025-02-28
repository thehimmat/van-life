import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [
		react()
	],
	build: {
		rollupOptions: {
			external: [
				'firebase/app',
				'firebase/firestore/lite',
				'firebase/firestore',
				'firebase/auth',
				'firebase/storage',
				'firebase/database',
				/^firebase\/.*/  // This will catch all firebase imports
			],
		},
	},
})