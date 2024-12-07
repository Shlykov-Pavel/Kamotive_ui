import we from "react";
var N = { exports: {} }, A = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oe;
function cr() {
  if (Oe) return A;
  Oe = 1;
  var P = we, R = Symbol.for("react.element"), j = Symbol.for("react.fragment"), b = Object.prototype.hasOwnProperty, W = P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, $ = { key: !0, ref: !0, __self: !0, __source: !0 };
  function x(_, c, O) {
    var p, h = {}, E = null, Y = null;
    O !== void 0 && (E = "" + O), c.key !== void 0 && (E = "" + c.key), c.ref !== void 0 && (Y = c.ref);
    for (p in c) b.call(c, p) && !$.hasOwnProperty(p) && (h[p] = c[p]);
    if (_ && _.defaultProps) for (p in c = _.defaultProps, c) h[p] === void 0 && (h[p] = c[p]);
    return { $$typeof: R, type: _, key: E, ref: Y, props: h, _owner: W.current };
  }
  return A.Fragment = j, A.jsx = x, A.jsxs = x, A;
}
var I = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function vr() {
  return Se || (Se = 1, process.env.NODE_ENV !== "production" && function() {
    var P = we, R = Symbol.for("react.element"), j = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), _ = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), Q = Symbol.iterator, Pe = "@@iterator";
    function je(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Q && e[Q] || e[Pe];
      return typeof r == "function" ? r : null;
    }
    var S = P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function l(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        xe("error", e, t);
      }
    }
    function xe(e, r, t) {
      {
        var n = S.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var ke = !1, De = !1, Fe = !1, Ae = !1, Ie = !1, ee;
    ee = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === b || e === $ || Ie || e === W || e === O || e === p || Ae || e === Y || ke || De || Fe || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === h || e.$$typeof === x || e.$$typeof === _ || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ee || e.getModuleId !== void 0));
    }
    function $e(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function re(e) {
      return e.displayName || "Context";
    }
    function y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && l("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case b:
          return "Fragment";
        case j:
          return "Portal";
        case $:
          return "Profiler";
        case W:
          return "StrictMode";
        case O:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var r = e;
            return re(r) + ".Consumer";
          case x:
            var t = e;
            return re(t._context) + ".Provider";
          case c:
            return $e(e, e.render, "ForwardRef");
          case h:
            var n = e.displayName || null;
            return n !== null ? n : y(e.type) || "Memo";
          case E: {
            var o = e, u = o._payload, i = o._init;
            try {
              return y(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var m = Object.assign, k = 0, te, ne, ae, ie, oe, ue, se;
    function fe() {
    }
    fe.__reactDisabledLog = !0;
    function Ye() {
      {
        if (k === 0) {
          te = console.log, ne = console.info, ae = console.warn, ie = console.error, oe = console.group, ue = console.groupCollapsed, se = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: fe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        k++;
      }
    }
    function Le() {
      {
        if (k--, k === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: m({}, e, {
              value: te
            }),
            info: m({}, e, {
              value: ne
            }),
            warn: m({}, e, {
              value: ae
            }),
            error: m({}, e, {
              value: ie
            }),
            group: m({}, e, {
              value: oe
            }),
            groupCollapsed: m({}, e, {
              value: ue
            }),
            groupEnd: m({}, e, {
              value: se
            })
          });
        }
        k < 0 && l("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = S.ReactCurrentDispatcher, q;
    function L(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + e;
      }
    }
    var B = !1, V;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Ve();
    }
    function le(e, r) {
      if (!e || B)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = J.current, J.current = null, Ye();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (d) {
              n = d;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (d) {
              n = d;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (d) {
            n = d;
          }
          e();
        }
      } catch (d) {
        if (d && n && typeof d.stack == "string") {
          for (var a = d.stack.split(`
`), v = n.stack.split(`
`), s = a.length - 1, f = v.length - 1; s >= 1 && f >= 0 && a[s] !== v[f]; )
            f--;
          for (; s >= 1 && f >= 0; s--, f--)
            if (a[s] !== v[f]) {
              if (s !== 1 || f !== 1)
                do
                  if (s--, f--, f < 0 || a[s] !== v[f]) {
                    var g = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, g), g;
                  }
                while (s >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        B = !1, J.current = u, Le(), Error.prepareStackTrace = o;
      }
      var w = e ? e.displayName || e.name : "", T = w ? L(w) : "";
      return typeof e == "function" && V.set(e, T), T;
    }
    function Me(e, r, t) {
      return le(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Ue(e));
      if (typeof e == "string")
        return L(e);
      switch (e) {
        case O:
          return L("Suspense");
        case p:
          return L("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return Me(e.render);
          case h:
            return M(e.type, r, t);
          case E: {
            var n = e, o = n._payload, u = n._init;
            try {
              return M(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var D = Object.prototype.hasOwnProperty, ce = {}, ve = S.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        ve.setExtraStackFrame(t);
      } else
        ve.setExtraStackFrame(null);
    }
    function Ne(e, r, t, n, o) {
      {
        var u = Function.call.bind(D);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (U(o), l("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), U(null)), a instanceof Error && !(a.message in ce) && (ce[a.message] = !0, U(o), l("Failed %s type: %s", t, a.message), U(null));
          }
      }
    }
    var Je = Array.isArray;
    function K(e) {
      return Je(e);
    }
    function qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Be(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function pe(e) {
      if (Be(e))
        return l("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qe(e)), de(e);
    }
    var F = S.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, ye, G;
    G = {};
    function Ge(e) {
      if (D.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ze(e) {
      if (D.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Xe(e, r) {
      if (typeof e.ref == "string" && F.current && r && F.current.stateNode !== r) {
        var t = y(F.current.type);
        G[t] || (l('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y(F.current.type), e.ref), G[t] = !0);
      }
    }
    function He(e, r) {
      {
        var t = function() {
          ge || (ge = !0, l("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          ye || (ye = !0, l("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Qe = function(e, r, t, n, o, u, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: R,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function er(e, r, t, n, o) {
      {
        var u, i = {}, a = null, v = null;
        t !== void 0 && (pe(t), a = "" + t), ze(r) && (pe(r.key), a = "" + r.key), Ge(r) && (v = r.ref, Xe(r, o));
        for (u in r)
          D.call(r, u) && !Ke.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            i[u] === void 0 && (i[u] = s[u]);
        }
        if (a || v) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && He(i, f), v && Ze(i, f);
        }
        return Qe(e, a, v, o, n, F.current, i);
      }
    }
    var z = S.ReactCurrentOwner, he = S.ReactDebugCurrentFrame;
    function C(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    var X;
    X = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === R;
    }
    function be() {
      {
        if (z.current) {
          var e = y(z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function rr(e) {
      return "";
    }
    var Re = {};
    function tr(e) {
      {
        var r = be();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function _e(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = tr(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== z.current && (n = " It was passed a child from " + y(e._owner.type) + "."), C(e), l('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), C(null);
      }
    }
    function Ee(e, r) {
      {
        if (typeof e != "object")
          return;
        if (K(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && _e(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = je(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              H(i.value) && _e(i.value, r);
        }
      }
    }
    function nr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === h))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = y(r);
          Ne(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !X) {
          X = !0;
          var o = y(r);
          l("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && l("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            C(e), l("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), C(null);
            break;
          }
        }
        e.ref !== null && (C(e), l("Invalid attribute `ref` supplied to `React.Fragment`."), C(null));
      }
    }
    var me = {};
    function Te(e, r, t, n, o, u) {
      {
        var i = We(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = rr();
          v ? a += v : a += be();
          var s;
          e === null ? s = "null" : K(e) ? s = "array" : e !== void 0 && e.$$typeof === R ? (s = "<" + (y(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, l("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var f = er(e, r, t, o, u);
        if (f == null)
          return f;
        if (i) {
          var g = r.children;
          if (g !== void 0)
            if (n)
              if (K(g)) {
                for (var w = 0; w < g.length; w++)
                  Ee(g[w], e);
                Object.freeze && Object.freeze(g);
              } else
                l("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ee(g, e);
        }
        if (D.call(r, "key")) {
          var T = y(e), d = Object.keys(r).filter(function(lr) {
            return lr !== "key";
          }), Z = d.length > 0 ? "{key: someKey, " + d.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!me[T + Z]) {
            var fr = d.length > 0 ? "{" + d.join(": ..., ") + ": ...}" : "{}";
            l(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, T, fr, T), me[T + Z] = !0;
          }
        }
        return e === b ? ar(f) : nr(f), f;
      }
    }
    function ir(e, r, t) {
      return Te(e, r, t, !0);
    }
    function or(e, r, t) {
      return Te(e, r, t, !1);
    }
    var ur = or, sr = ir;
    I.Fragment = b, I.jsx = ur, I.jsxs = sr;
  }()), I;
}
var Ce;
function dr() {
  return Ce || (Ce = 1, process.env.NODE_ENV === "production" ? N.exports = cr() : N.exports = vr()), N.exports;
}
var pr = dr();
const gr = "_input_k98d0_1", yr = {
  input: gr
}, br = ({ value: P, onChange: R, placeholder: j }) => /* @__PURE__ */ pr.jsx(
  "input",
  {
    className: yr.input,
    value: P,
    onChange: (b) => R(b.target.value),
    placeholder: j
  }
);
export {
  br as Input
};
