#!/usr/bin/env node

import React from "react";
import { setup } from "goober";
import { render } from "ink";
import App from "./App";

setup(React.createElement);

render(<App />, {
  exitOnCtrlC: true,
});

process.stdin.on("end", () => process.exit(0));
process.stdin.on("close", () => process.exit(0));
