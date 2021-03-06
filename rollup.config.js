import commonjs from "@rollup/plugin-commonjs";
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json";
import ts from "rollup-plugin-ts";
import { builtinModules } from "module";
import pkg from "./package.json";

module.exports = {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    { file: pkg.module, format: "esm", sourcemap: true },
  ],
  external: [
    ...builtinModules,
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ],
  watch: {
    include: "lib/**",
  },
  plugins: [
    clear({
      targets: ["dist"],
      watch: false,
    }),
    json(), // Compile TypeScript files
    ts(),
    commonjs(),
  ],
};
