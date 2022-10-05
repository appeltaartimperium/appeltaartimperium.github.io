// ./components/rt.js

// ================================================================
export const html = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);

// ================================================================
export function defineComponent(url, classDefinition) {}
// ================================================================
export function dispatch({ name, root = document }) {
  root.dispatchEvent(new CustomEvent(name, { detail }));
}
// ================================================================
export function loadComponent(url, filename = false) {
  // get BaseClass from PARENT directory name
  // get component name from directory name
  let [parentDir, componentFileName] = url.split("/").slice(-3);
  let componentDir = componentFileName;

  // user overrules file name (without .js)
  componentFileName = filename || componentFileName;

  {
    // devComponent string
    let devComponent = "dev-" + componentFileName;

    // get filename from localStorage
    let storageFileName = localStorage.getItem(devComponent);

    // override componentFileName
    if (storageFileName) {
      componentFileName = storageFileName;
      console.warn(componentDir, "localStorage override: " + componentFileName);
    } else if (location.href.includes(devComponent)) {
      let paramFileName = new URLSearchParams(location.search).get(
        devComponent
      );
      componentFileName = paramFileName || devComponent;
      console.warn(componentDir, "URL override: " + componentFileName);
    }
  }

  // import the component
  let uri =
    "./" + parentDir + "/" + componentDir + "/" + componentFileName + ".js";
  import(uri)
    .then((module) => {
      console.log("loaded", uri, module);
      module.default();
    })
    .catch((err) => {
      console.error("failed import", uri);
    });
}
