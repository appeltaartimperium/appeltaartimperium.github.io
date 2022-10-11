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
async function loadTemplate(componentName, url) {
  try {
    let response = await fetch(url);
    let html = await response.text();
    if (response.ok) {
      //console.warn("load template",componentName, dom.querySelector("template"));
      document.head.insertAdjacentHTML("beforeend", html);
      console.warn("load template", componentName);
    }
  } catch (e) {
    console.log(e);
  }
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

  // import the component JS file
  let basefilename =
    "./" + parentDir + "/" + componentDir + "/" + componentFileName;

  // import the components HTML files with <template> into the document.head
  loadTemplate(componentFileName, "./components/" + basefilename + ".html");

  //! todo import js_module AFTER html is loaded
  setTimeout(() => {
    let js_module = basefilename + ".js";
    import(js_module)
      .then((module) => {
        console.log("loaded", js_module);
        //if export default defined in module file then:
        //module.default();
      })
      .catch((err) => {
        console.error("failed import", js_module, err);
      });
  }, 100);
}
