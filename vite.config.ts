import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoutePattern = /^\/projects\/(yes-wheelchair|all-wheelchair|marathon-racing|wheelsense|easeai)\/?$/;

function rewriteProjectRoute(url = ''): string {
  const [pathname, search = ''] = url.split('?');
  const match = pathname.match(projectRoutePattern);
  if (!match) return url;

  const query = new URLSearchParams(search);
  query.set('project', match[1]);
  return `/projects.html?${query.toString()}`;
}

export default defineConfig({
  plugins: [
    {
      name: 'wheelsense-project-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          req.url = rewriteProjectRoute(req.url);
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          req.url = rewriteProjectRoute(req.url);
          next();
        });
      },
    },
  ],
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
