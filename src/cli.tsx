#!/usr/bin/env node

import React from "react";
import { setup } from "goober";
import { render } from "ink";
import App from "./App";

setup(React.createElement);

render(<App />);
