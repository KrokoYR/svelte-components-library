import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy-assets";
import sveltePreprocess from 'svelte-preprocess'

import analyze from 'rollup-plugin-analyzer'

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    analyze(),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
      preprocess: sveltePreprocess({ postcss: true }),
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    copy({
      assets: ["src/assets"],
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    ...hmr({
      // When false, the plugin will do nothing at all (useful for prod build).
      enabled: true, // Default: true

      // When false, only the dev server will run. The plugin will not mess with
      // your config, your bundle, or transform any code. Only reload the
      // browser when the bundle changes.
      hot: false, // Default: true

      // These two are used to map output filenames to URLs, because Rollup
      // knows about filenames but SystemJS knows about URLs.
      //
      // FS path to public directory
      // NOTE this is only used to compute URLs from FS paths... see mount
      // option bellow if you want to serve static content
      public: 'public', // Default: ''
      // Base URL
      baseUrl: '/', // Default: '/'

      // Change the host / port of the dev server
      port: 12345, // Default: 33440
      host: '0.0.0.0', // Default: 'localhost'
      // Prevent from falling back on a random port if the specified one is
      // already occupied
      randomPortFallback: false, // Default: true

      // Opens the dev server in a new browser tab if set.
      // If Chrome is available on macOS, an attempt will be made to
      // reuse an existing browser tab. Any installed browser may also be specified.
      // E.g., “default“, “chrome”, “firefox”, “brave”. Set “none” or `false` to disable.
      open: 'default', // Default: false

      // Page to navigate to when opening the browser.
      // Will not do anything if open=false.
      // Remember to start with a slash.
      openPage: '/different/page', // Default: baseUrl
      // The hostname & port where the browser tab will be open.
      openHost: 'localhost', // Default: HMR server host
      openPort: '33000', // Default: HMR server port

      // Define different paths that should be proxied, and where they should be proxied to.
      // See https://github.com/villadora/express-http-proxy for configuration options.
      //
      // Path Propagation:
      // { "/a": "http://localhost" }
      // - /a   => http://localhost
      // - /a/b => http://localhost/b
      //
      // { "/a": "http://localhost/x" }
      // - /a   => http://localhost/x
      // - /a/b => http://localhost/x/b
      proxy: {
        // Short form:
        '/api/01': 'https://pokeapi.co/api/v1',
        // With options:
        '/api/02': ['https://pokeapi.co/api/v2', { proxyReqPathResolver(req) { /* ... */ } }],
      },

      // Serve additional static content: the key is a FS path, the value is
      // the base URL. Static content will always be served _after_ files from
      // the bundle.
      mount: {
        public: '/',
        'relative/path/to/somewhere': '/base-url/',
      },

      // Write bundle files in RAM instead of FS and serve them through the dev
      // server. This is obviously more performant but there may be cross domain
      // issues. Also, for very big apps, this might consume too much memory.
      inMemory: true, // Default: false
      // If you sill want to write do disk when using inMemory.
      write: true, // Default: !inMemory

      // Prevent full reload on HMR errors. HMR updates will keep being applied
      // and, most probably, crash more & more. By changing this, you expose
      // yourself to a very broken HMR experience...
      reload: false,
      // Or fine grained (will be deep merged in the defaults bellow).
      // 'defer' means the reload will happen on the next HMR update.
      reload: {
        // When an HMR update bubbles up beyond an entry point without finding
        // an accept handler
        unaccepted: true,
        // Errors during module initialization (i.e. in your code)
        moduleError: 'defer',
        // HMR specific errors (i.e. errors that happens in HMR accept handlers)
        acceptError: true,
        // Other errors during application of hot update (i.e. most probably in
        // my code -- this plugin)
        error: true,
        // When connection to HMR server is lost, then resumes. This typically
        // means that you've restarted Rollup. HMR could theoretically resume
        // and work correctly, provided nothing has changed on the server (but
        // why restart Rollup if nothing has changed? hence defaults to reload).
        reconnect: true,
      },

      // By default, when an update is not accepted the root modules (i.e. those
      // that have no import parents) are automatically accepted. This means
      // that every module will be hot reloaded. You can turn this off to do
      // a full reload instead.
      //
      // Note: an update is "not accepted" when the whole module tree has been
      // traversed, starting from the changed module, up to the root module(s),
      // and no accept handlers have been found.
      autoAccept: false, // Default: true

      // Clear console after successful HMR updates (Parcel style)
      clearConsole: true, // Default: false

      // --- Advanced ---

      // Defaults to output.file. Must be under public dir.
      // Only used when output.file is set.
      loaderFile: 'public/bundle.js',
    }),
  ],
  watch: {
    clearScreen: false,
  },
};
