import { defineComponent as r, createElementBlock as s, openBlock as u, createElementVNode as i } from "vue";
function a(n) {
  return n.install = function(e) {
    e.component(n.name, n);
  }, n;
}
const c = /* @__PURE__ */ r({
  name: "MyButton",
  __name: "button",
  setup(n) {
    return (e, t) => (u(), s("div", null, [...t[0] || (t[0] = [
      i("button", null, "阿牛", -1)
    ])]));
  }
}), m = a(c), f = [
  m
], _ = "0.0.0-dev.1", o = Symbol("INSTALLED_KEY");
function E(n = []) {
  return {
    version: _,
    install: (t) => {
      t[o] || (t[o] = !0, n.forEach((l) => t.use(l)));
    }
  };
}
const B = E([...f]);
export {
  m as MyButton,
  B as default,
  a as withInstall
};
