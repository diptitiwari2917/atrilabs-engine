#!/usr/bin/env node
import startDevServer from "./startDevServer";
import {
  Middlewares,
  PrepareConfig,
  extractParams,
  moduleFileExtensions,
} from "@atrilabs/commands-builder";
import { createEntry } from "./createEntry";
import path from "path";
import startNodeLibWatcher from "./startNodeLibWatcher";
import { createNodeEntry } from "./createNodeEntry";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

function main() {
  const params = extractParams();

  params.paths.appSrc = process.cwd();

  const prepareConfig = params.prepareConfig;
  const wrapPrepareConfig: PrepareConfig = (config) => {
    if (prepareConfig) {
      prepareConfig(config);
    }
    // TODO: insert the necessary logic for hot reload
    config.entry = createEntry;
    config.resolveLoader = {
      alias: {
        "atri-pages-client-loader": path.resolve(
          __dirname,
          "..",
          "src",
          "scripts",
          "dev",
          "loaders",
          "atri-pages-client-loader.js"
        ),
        "atri-app-loader": path.resolve(
          __dirname,
          "..",
          "src",
          "scripts",
          "dev",
          "loaders",
          "atri-app-loader.js"
        ),
      },
    };
    config.optimization = {
      ...config.optimization,
      runtimeChunk: "single",
    };
  };

  const middlewares = params.middlewares;
  const wrapMiddlewares: Middlewares = (app, compiler, config) => {
    // TODO: insert the necessary logic for hot reload
    if (middlewares) {
      middlewares(app, compiler, config);
    }
  };

  startDevServer({
    ...params,
    prepareConfig: wrapPrepareConfig,
    middlewares: wrapMiddlewares,
  });

  const serverPath = path.join(params.paths.outputDir, "server");
  const paths = { ...params.paths, outputDir: serverPath };
  startNodeLibWatcher({
    ...params,
    paths,
    outputFilename: "[name].bundle.js",
    moduleFileExtensions,
    entry: createNodeEntry,
  });
}

main();
