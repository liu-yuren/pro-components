'use strict';

const shared = require('@vue/shared');

function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return "";
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date = new Date(time);
  if (typeof time === "object") {
    date = time;
  }
  if (typeof time === "string") {
    if (/^\d+$/.test(time)) {
      time = Number.parseInt(time);
    } else if (time.length === 28 && /\.000\+0000/.test(time)) {
      time = +new Date(time.slice(0, 19).replace(/T/g, " ").replace(/-/g, "/")) + 8 * 3600 * 1e3;
    } else if (/^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(time)) {
      time = time.replace(/-/g, "/");
    }
  }
  if (typeof time === "number") {
    if (time.toString().length === 10) {
      time = time * 1e3;
    }
  }
  date = new Date(time);
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  return format.replace(/\{([ymdhisa])+\}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"][value];
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return `${value || 0}`;
  });
}

function withInstall(main, extra) {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
}
function withInstallFunction(fn, name) {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
}
function withInstallDirective(directive, name) {
  directive.install = (app) => {
    app.directive(name, directive);
  };
  return directive;
}
function withNoopInstall(component) {
  component.install = shared.NOOP;
  return component;
}

exports.NOOP = shared.NOOP;
exports.toRawType = shared.toRawType;
exports.parseTime = parseTime;
exports.withInstall = withInstall;
exports.withInstallDirective = withInstallDirective;
exports.withInstallFunction = withInstallFunction;
exports.withNoopInstall = withNoopInstall;
