const parse = require("parse-color");

const CONFIG_KEY = "hyperHonukai";
const DEFAULT_ALPHA = 0.9;

function makeTransparent(color, alpha = DEFAULT_ALPHA) {
  const { rgb } = parse(color);
  if (!rgb) return color;
  return `rgba(${rgb.join(", ")}, ${alpha})`;
}

const backgroundColor = "#151e31"; // dark blue
const darkBackgroundColor = "#0e1422"; // 30% darker
const foregroundColor = "#c6c8d2"; // light gray
const cursorColor = foregroundColor;
const borderColor = backgroundColor;
const accentColor = "#6ea3f5"; // lightBlue

const colors = {
  black: backgroundColor,
  red: "#e5663d", // red
  green: "#7cc54a", // green
  yellow: "#eadb38", // yellow
  blue: "#2e88fd", // blue
  magenta: "#f774c5", // pink
  cyan: "#42bee1", // cyan
  white: "#c7c7c7", // light gray
  lightBlack: "#676767", // medium gray
  lightRed: "#e89276", // red
  lightGreen: "#8fc36c", // green
  lightYellow: "#fefb67", // yellow
  lightBlue: accentColor, // blue
  lightMagenta: "#fc99cb", // pink
  lightCyan: "#88d6eb", // cyan
  colorCubes: "#fffefe", // white
  grayscale: foregroundColor,
};

module.exports.decorateConfig = (config) => {
  const { alpha } = config[CONFIG_KEY] || {};

  exports.onWindow = (browserWindow) => browserWindow.setVibrancy("dark");

  return Object.assign({}, config, {
    foregroundColor,
    backgroundColor: makeTransparent(backgroundColor, alpha),
    borderColor,
    cursorColor,
    colors,
    css: `
      ${config.css || ""}

      .hyper_main {
        background: ${makeTransparent(backgroundColor, alpha)};
        border: none !important;
      }

      .header_header {
        top: 0;
        right: 0;
        left: 0;
      }

      .splitpane_divider {
        background-color: rgba(171, 178, 191, 0.15) !important;
      }

      .tabs_borderShim {
        display: none;
      }

      .tab_tab {
        border: none;
        color: rgba(255, 255, 255, 0.2);
        background-color: ${darkBackgroundColor};
      }

      .tab_tab:hover {
        background-color: transparent;
      }

      .tab_tab.tab_active {
        color: #FFF;
        background-color: transparent;
      }

      .tab_tab.tab_active::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${accentColor};
      }

      .term_fit:not(.term_term):not(.term_wrapper):not(.term_active) {
        opacity: 0.4;
      }
    `,
  });
};
