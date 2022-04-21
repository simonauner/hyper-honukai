const parse = require("parse-color");

const CONFIG_KEY = "hyperHonukai";
const DEFAULT_ALPHA = 0.95;

function makeTransparent(color, alpha = DEFAULT_ALPHA) {
  const { rgb } = parse(color);
  if (!rgb) return color;
  return `rgba(${rgb.join(", ")}, ${alpha})`;
}

const backgroundColor = "#151e31"; // dark blue
const foregroundColor = "#c6c8d2"; // light gray
const cursorColor = foregroundColor;
const borderColor = backgroundColor;

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
  lightBlue: "#6ea3f5", // blue
  lightMagenta: "#fc99cb", // pink
  lightCyan: "#88d6eb", // cyan
  colorCubes: "#fffefe", // white
  grayscale: foregroundColor,
};

module.exports.decorateConfig = (config) => {
  const { alpha } = config[CONFIG_KEY] || {};

  return Object.assign({}, config, {
    vibrancy: "ultra-dark",
    foregroundColor,
    backgroundColor: makeTransparent(backgroundColor, alpha),
    borderColor,
    cursorColor,
    colors,
    termCSS: `
      ${config.termCSS || ""}
      .cursor-node {
        mix-blend-mode: difference;
        border-left-width: 2px;
      }
    `,
    css: `
      ${config.css || ""}

      .header_header {
        top: 0;
        right: 0;
        left: 0;
      }
      .tabs_list {
        background-color: #21252b !important;
        border-bottom-color: #181a1f !important;
      }
      .splitpane_divider {
        background-color: rgba(171, 178, 191, 0.15) !important;
      }
      .tab_tab {
        font-weight: 500;
        color: rgba(157, 165, 180, 0.6);
        border-width: 0 0 0 1px;
        border-image: linear-gradient(#21252b, #181a1f 1em) 0 0 0 1 stretch;
        border-style: solid;
      }
      .tab_tab:first-of-type {
        border-width: 0;
      }
      .tab_tab:hover {
        color: rgba(157, 165, 180, 0.6);
        transition: none;
      }
      .tab_tab::after {
        content: "";
        position: absolute;
        pointer-events: none;
        top: 0;
        bottom: -1px;
        left: 0;
        width: 2px;
        height: inherit;
        background: #528bff;
        opacity: 0;
        transition: opacity .16s;
        z-index: 1;
      }
      .tabs_title,
      .tab_tab.tab_active {
        font-weight: 500;
        color: #d7dae0;
      }
      .tab_tab.tab_active {
        background-color: ${backgroundColor};
      }
      .tab_tab.tab_active,
      .tab_tab.tab_active + .tab_tab {
        border-image: linear-gradient(transparent, transparent) 0 0 0 1 stretch;
      }
      .tab_tab.tab_active::before {
        content: "";
        z-index: 1;
        position: absolute;
        top: 0;
        left: -1px;
        bottom: -1px;
        right: 0;
        height: inherit;
        background-image: linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.06);
        border: 1px solid #181a1f;
        border-bottom-color: ${backgroundColor};
        border-top: 0;
      }
      .tab_tab.tab_active:last-of-type::before {
        border-right-width: 0;
      }
      .tab_tab.tab_active::after {
        opacity: 1;
        transition-duration: .32s;
      }
      .tab_icon {
        display: block;
        background: rgba(157, 165, 180, 0.6);
        -webkit-mask-image: url('${__dirname}/close.svg');
        mask-image: url('${__dirname}/close.svg');
        -webkit-mask-size: 7px;
        mask-size: 7px;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position-y: center;
        mask-position-y: center;
        -webkit-mask-position-x: 8px;
        mask-position-x: 8px;
        width: 26px;
        height: 100%;
        top: 0;
        right: 0;
        transform: scale(0);
        transition: transform .08s;
        opacity: 1;
        border-radius: 0;
        z-index: 2;
      }
      .tab_icon:hover {
        background: rgba(157, 165, 180, 0.6);
        opacity: .7;
      }
      .tab_tab.tab_active .tab_icon {
        background: #d7dae0;
      }
      .tab_tab.tab_active .tab_icon:hover {
        background: #d7dae0;
      }
      .tab_tab:hover .tab_icon {
        transform: scale(1);
        transition-duration: .16s;
      }
      .tab_icon svg {
        display: none;
      }
      .tab_icon::after {
        display: none;
      }
    `,
  });
};
