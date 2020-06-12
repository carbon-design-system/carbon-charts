export * from "./charts";

// Configs & interfaces
import * as configurations from "./configuration";
import * as interfaces from "./interfaces";

import * as colorPalettes from "./services/colorPalettes";
import { DEFAULT } from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = DEFAULT;

export { interfaces, configurations, defaultColors, colorPalettes };
