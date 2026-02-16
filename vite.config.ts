import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        story: resolve(__dirname, 'story.html'),
        projects: resolve(__dirname, 'projects.html'),
        team: resolve(__dirname, 'team.html'),
        member: resolve(__dirname, 'member.html'),
        contact: resolve(__dirname, 'contact.html'),
        awards: resolve(__dirname, 'awards.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
