import { defineComponent as o, createElementBlock as l, openBlock as u, createElementVNode as r } from "vue";
function a(n) {
  return n.install = function(t) {
    t.component(n.name, n);
  }, n;
}
const s = /* @__PURE__ */ o({
  name: "MyButton",
  __name: "button",
  setup(n) {
    return (t, e) => (u(), l("div", null, [...e[0] || (e[0] = [
      r("button", null, "阿牛", -1)
    ])]));
  }
}), c = a(s), i = [
  c
];
function f(n) {
  i.forEach((t) => {
    n._context.components[t.name] || n.component(t.name, t);
  });
}
export {
  c as MyButton,
  f as default,
  f as install,
  a as withInstall
};
