let App
let initialized = false;
export async function initialize(version) {
  if (initialized)
    return;
  initialized = true;
  App = await import(`./app.mjs?v=${version()}`).then(
    async m => { await m.initialize(version); return m });
}

export const checkerUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGX' +
  'RFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS' +
  '54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3' +
  'prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9Ik' +
  'Fkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0Mi' +
  'AgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5Lz' +
  'AyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG' +
  '1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0Um' +
  'VmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bW' +
  'xuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SU' +
  'Q9InhtcC5kaWQ6RTc5MkU2MDQ2MDM2MTFFQUJCRDhCQThBQ0QyRjNDNjkiIHhtcE1NOkluc3' +
  'RhbmNlSUQ9InhtcC5paWQ6RTc5MkU2MDM2MDM2MTFFQUJCRDhCQThBQ0QyRjNDNjkiIHhtcD' +
  'pDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE' +
  '1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcD' +
  'pjNDEyN2I1MS02MDM1LTExZWEtYWE2OS1hMjJjNDc3ZTZjZTUiIHN0UmVmOmRvY3VtZW50SU' +
  'Q9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNDEyN2I1MS02MDM1LTExZWEtYWE2OS1hMjJjND' +
  'c3ZTZjZTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ID' +
  'w/eHBhY2tldCBlbmQ9InIiPz4Jp6ghAAAABlBMVEX////MzMw46qqDAAAAF0lEQVR42mJghA' +
  'IGGBgggQG2HiYAEGAARRAAgR90vRgAAAAASUVORK5CYII=';

export const classes = {
  kChildArea: "child_area",
  kHidden: "hidden"
};

export const selectors = {
  kChildArea: `.${classes.kChildArea}`,
  kHidden: `.${classes.kHidden}`
};

const descriptions = {
  "background":
    "The background color of the node.",
  "border-radius":
    "The border radius of the node. This determines how much rounding to " +
    "apply to the corners.",
  "border":
    "The border thickness style and color. Note that this refers to the " +
    "unselected element's border",
  "horizontal-padding":
    "The padding around the label of the node",
  "vertical-padding":
    "The padding around the label of the node"
}

const theme = {
  "background" : {
    default: {
      node: "rgb(195, 231, 240)",
      scroller: "rgb(195, 231, 240)"
    }
  },
  "border-radius" : {
    default: {
      node: "10px",
      scroller: "10px"
    }
  },
  "border" : {
    default: {
      node: "0px solid black",
      scroller: "0px solid black"
    }
  },
  "horizontal-padding" : {
    default: {
      node: "10px",
      scroller: "10px"
    }
  },
  "vertical-padding" : {
    default: {
      node: "10px",
      scroller: "5px"
    }
  }
};

export function toTheme(type, base) { return `--theme-${type}-${base}`; }
export function toSelf(base) { return `--self-${base}`; }
export function toChild(base) { return `--child-${base}`; }
export function toEffective(base) { return `--effective-${base}`; }
export function toDescription(base) { return descriptions[base]; }

export function themeVariables() {
  let result = ":host {\n";
  for (let name in theme) {
    for (let type in theme[name].default) {
      result += `${toTheme(type, name)}: ${theme[name].default[type]};\n`;
    }
  }
  result += "}\n";
  return result;
}

export function getCustomStylesForType(type) {
  let result = [];
  for(let name in theme) {
    if (type in theme[name].default)
      result.push(name);
  }
  return result;
}

export function getAllCustomStyles() {
  let result = [];
  for(let name in theme)
    result.push(name);
  return result;
}

export function customVariablesInitialization(type) {
  let result = ":host {\n";
  const styles = getCustomStylesForType(type);
  // Self inits.
  for (let i = 0; i < styles.length; ++i)
    result += `${toSelf(styles[i])}: initial;\n`;
  // Effective inits.
  for (let i = 0; i < styles.length; ++i)
    result += `${toEffective(styles[i])}: var(${toSelf(styles[i])}, var(${toChild(styles[i])}, var(${toTheme(type, styles[i])})));\n`;
  result += "}\n";
  return result;
}

class Hunk {
  constructor(properties) {
    this.properties_ = properties;
  }

  applyTo(node) {
    App.undoStack.willChangeStyleHunk(node, Object.keys(this.properties_));
    for (let property in this.properties_)
      node.style.setProperty(property, this.properties_[property]);
    App.undoStack.didChangeStyle();
  }
}

export function selfStyleFrom(node) {
  const properties = getCustomStylesForType(node.node_type);
  const dictionary = {};
  for (let i = 0; i < properties.length; ++i) {
    const base = properties[i];
    dictionary[toSelf(base)] = node.getSelfCustomStyle(base);
  }
  return new Hunk(dictionary);
}
