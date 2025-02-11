parcelRequire = (function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
    o = "function" == typeof require && require;
  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[n][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[n] = new u.Module(n));
      e[n][0].call(l.exports, p, l, l.exports, this);
    }
    return r[n].exports;
    function p(e) {
      return u(p.resolve(e));
    }
  }
  (u.isParcelRequire = !0),
    (u.Module = function (e) {
      (this.id = e), (this.bundle = u), (this.exports = {});
    }),
    (u.modules = e),
    (u.cache = r),
    (u.parent = i),
    (u.register = function (r, n) {
      e[r] = [
        function (e, r) {
          r.exports = n;
        },
        {},
      ];
    });
  for (var f = 0; f < n.length; f++) u(n[f]);
  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = c)
      : "function" == typeof define && define.amd
      ? define(function () {
          return c;
        })
      : t && (this[t] = c);
  }
  return u;
})(
  {
    i8Cz: [
      function (require, module, exports) {
        var global = arguments[3];
        var e = arguments[3],
          t =
            "undefined" != typeof window
              ? window
              : "undefined" != typeof WorkerGlobalScope &&
                self instanceof WorkerGlobalScope
              ? self
              : {},
          n = (function () {
            var e = /\blang(?:uage)?-([\w-]+)\b/i,
              n = 0,
              a = (t.Prism = {
                manual: t.Prism && t.Prism.manual,
                disableWorkerMessageHandler:
                  t.Prism && t.Prism.disableWorkerMessageHandler,
                util: {
                  encode: function (e) {
                    return e instanceof i
                      ? new i(e.type, a.util.encode(e.content), e.alias)
                      : "Array" === a.util.type(e)
                      ? e.map(a.util.encode)
                      : e
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/\u00a0/g, " ");
                  },
                  type: function (e) {
                    return Object.prototype.toString
                      .call(e)
                      .match(/\[object (\w+)\]/)[1];
                  },
                  objId: function (e) {
                    return (
                      e.__id ||
                        Object.defineProperty(e, "__id", { value: ++n }),
                      e.__id
                    );
                  },
                  clone: function (e, t) {
                    var n = a.util.type(e);
                    switch (((t = t || {}), n)) {
                      case "Object":
                        if (t[a.util.objId(e)]) return t[a.util.objId(e)];
                        var i = {};
                        for (var r in ((t[a.util.objId(e)] = i), e))
                          e.hasOwnProperty(r) && (i[r] = a.util.clone(e[r], t));
                        return i;
                      case "Array":
                        if (t[a.util.objId(e)]) return t[a.util.objId(e)];
                        i = [];
                        return (
                          (t[a.util.objId(e)] = i),
                          e.forEach(function (e, n) {
                            i[n] = a.util.clone(e, t);
                          }),
                          i
                        );
                    }
                    return e;
                  },
                },
                languages: {
                  extend: function (e, t) {
                    var n = a.util.clone(a.languages[e]);
                    for (var i in t) n[i] = t[i];
                    return n;
                  },
                  insertBefore: function (e, t, n, i) {
                    var r = (i = i || a.languages)[e];
                    if (2 == arguments.length) {
                      for (var o in (n = arguments[1]))
                        n.hasOwnProperty(o) && (r[o] = n[o]);
                      return r;
                    }
                    var s = {};
                    for (var l in r)
                      if (r.hasOwnProperty(l)) {
                        if (l == t)
                          for (var o in n) n.hasOwnProperty(o) && (s[o] = n[o]);
                        s[l] = r[l];
                      }
                    return (
                      a.languages.DFS(a.languages, function (t, n) {
                        n === i[e] && t != e && (this[t] = s);
                      }),
                      (i[e] = s)
                    );
                  },
                  DFS: function (e, t, n, i) {
                    for (var r in ((i = i || {}), e))
                      e.hasOwnProperty(r) &&
                        (t.call(e, r, e[r], n || r),
                        "Object" !== a.util.type(e[r]) || i[a.util.objId(e[r])]
                          ? "Array" !== a.util.type(e[r]) ||
                            i[a.util.objId(e[r])] ||
                            ((i[a.util.objId(e[r])] = !0),
                            a.languages.DFS(e[r], t, r, i))
                          : ((i[a.util.objId(e[r])] = !0),
                            a.languages.DFS(e[r], t, null, i)));
                  },
                },
                plugins: {},
                highlightAll: function (e, t) {
                  a.highlightAllUnder(document, e, t);
                },
                highlightAllUnder: function (e, t, n) {
                  var i = {
                    callback: n,
                    selector:
                      'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                  };
                  a.hooks.run("before-highlightall", i);
                  for (
                    var r,
                      o = i.elements || e.querySelectorAll(i.selector),
                      s = 0;
                    (r = o[s++]);

                  )
                    a.highlightElement(r, !0 === t, i.callback);
                },
                highlightElement: function (n, i, r) {
                  for (var o, s, l = n; l && !e.test(l.className); )
                    l = l.parentNode;
                  l &&
                    ((o = (l.className.match(e) || [, ""])[1].toLowerCase()),
                    (s = a.languages[o])),
                    (n.className =
                      n.className.replace(e, "").replace(/\s+/g, " ") +
                      " language-" +
                      o),
                    n.parentNode &&
                      ((l = n.parentNode),
                      /pre/i.test(l.nodeName) &&
                        (l.className =
                          l.className.replace(e, "").replace(/\s+/g, " ") +
                          " language-" +
                          o));
                  var d = {
                    element: n,
                    language: o,
                    grammar: s,
                    code: n.textContent,
                  };
                  if (
                    (a.hooks.run("before-sanity-check", d),
                    !d.code || !d.grammar)
                  )
                    return (
                      d.code &&
                        (a.hooks.run("before-highlight", d),
                        (d.element.textContent = d.code),
                        a.hooks.run("after-highlight", d)),
                      void a.hooks.run("complete", d)
                    );
                  if ((a.hooks.run("before-highlight", d), i && t.Worker)) {
                    var c = new Worker(a.filename);
                    (c.onmessage = function (e) {
                      (d.highlightedCode = e.data),
                        a.hooks.run("before-insert", d),
                        (d.element.innerHTML = d.highlightedCode),
                        r && r.call(d.element),
                        a.hooks.run("after-highlight", d),
                        a.hooks.run("complete", d);
                    }),
                      c.postMessage(
                        JSON.stringify({
                          language: d.language,
                          code: d.code,
                          immediateClose: !0,
                        })
                      );
                  } else
                    (d.highlightedCode = a.highlight(
                      d.code,
                      d.grammar,
                      d.language
                    )),
                      a.hooks.run("before-insert", d),
                      (d.element.innerHTML = d.highlightedCode),
                      r && r.call(n),
                      a.hooks.run("after-highlight", d),
                      a.hooks.run("complete", d);
                },
                highlight: function (e, t, n) {
                  var r = { code: e, grammar: t, language: n };
                  return (
                    a.hooks.run("before-tokenize", r),
                    (r.tokens = a.tokenize(r.code, r.grammar)),
                    a.hooks.run("after-tokenize", r),
                    i.stringify(a.util.encode(r.tokens), r.language)
                  );
                },
                matchGrammar: function (e, t, n, i, r, o, s) {
                  var l = a.Token;
                  for (var d in n)
                    if (n.hasOwnProperty(d) && n[d]) {
                      if (d == s) return;
                      var c = n[d];
                      c = "Array" === a.util.type(c) ? c : [c];
                      for (var p = 0; p < c.length; ++p) {
                        var u = c[p],
                          g = u.inside,
                          m = !!u.lookbehind,
                          b = !!u.greedy,
                          f = 0,
                          E = u.alias;
                        if (b && !u.pattern.global) {
                          var h = u.pattern.toString().match(/[imuy]*$/)[0];
                          u.pattern = RegExp(u.pattern.source, h + "g");
                        }
                        u = u.pattern || u;
                        for (
                          var S = i, y = r;
                          S < t.length;
                          y += t[S].length, ++S
                        ) {
                          var _ = t[S];
                          if (t.length > e.length) return;
                          if (!(_ instanceof l)) {
                            if (b && S != t.length - 1) {
                              if (((u.lastIndex = y), !(N = u.exec(e)))) break;
                              for (
                                var A = N.index + (m ? N[1].length : 0),
                                  T = N.index + N[0].length,
                                  I = S,
                                  R = y,
                                  v = t.length;
                                v > I &&
                                (T > R || (!t[I].type && !t[I - 1].greedy));
                                ++I
                              )
                                A >= (R += t[I].length) && (++S, (y = R));
                              if (t[S] instanceof l) continue;
                              (w = I - S), (_ = e.slice(y, R)), (N.index -= y);
                            } else {
                              u.lastIndex = 0;
                              var N = u.exec(_),
                                w = 1;
                            }
                            if (N) {
                              m && (f = N[1] ? N[1].length : 0);
                              T =
                                (A = N.index + f) + (N = N[0].slice(f)).length;
                              var C = _.slice(0, A),
                                k = _.slice(T),
                                L = [S, w];
                              C && (++S, (y += C.length), L.push(C));
                              var O = new l(
                                d,
                                g ? a.tokenize(N, g) : N,
                                E,
                                N,
                                b
                              );
                              if (
                                (L.push(O),
                                k && L.push(k),
                                Array.prototype.splice.apply(t, L),
                                1 != w && a.matchGrammar(e, t, n, S, y, !0, d),
                                o)
                              )
                                break;
                            } else if (o) break;
                          }
                        }
                      }
                    }
                },
                tokenize: function (e, t) {
                  var n = [e],
                    i = t.rest;
                  if (i) {
                    for (var r in i) t[r] = i[r];
                    delete t.rest;
                  }
                  return a.matchGrammar(e, n, t, 0, 0, !1), n;
                },
                hooks: {
                  all: {},
                  add: function (e, t) {
                    var n = a.hooks.all;
                    (n[e] = n[e] || []), n[e].push(t);
                  },
                  run: function (e, t) {
                    var n = a.hooks.all[e];
                    if (n && n.length) for (var i, r = 0; (i = n[r++]); ) i(t);
                  },
                },
              }),
              i = (a.Token = function (e, t, n, a, i) {
                (this.type = e),
                  (this.content = t),
                  (this.alias = n),
                  (this.length = 0 | (a || "").length),
                  (this.greedy = !!i);
              });
            if (
              ((i.stringify = function (e, t, n) {
                if ("string" == typeof e) return e;
                if ("Array" === a.util.type(e))
                  return e
                    .map(function (n) {
                      return i.stringify(n, t, e);
                    })
                    .join("");
                var r = {
                  type: e.type,
                  content: i.stringify(e.content, t, n),
                  tag: "span",
                  classes: ["token", e.type],
                  attributes: {},
                  language: t,
                  parent: n,
                };
                if (e.alias) {
                  var o =
                    "Array" === a.util.type(e.alias) ? e.alias : [e.alias];
                  Array.prototype.push.apply(r.classes, o);
                }
                a.hooks.run("wrap", r);
                var s = Object.keys(r.attributes)
                  .map(function (e) {
                    return (
                      e +
                      '="' +
                      (r.attributes[e] || "").replace(/"/g, "&quot;") +
                      '"'
                    );
                  })
                  .join(" ");
                return (
                  "<" +
                  r.tag +
                  ' class="' +
                  r.classes.join(" ") +
                  '"' +
                  (s ? " " + s : "") +
                  ">" +
                  r.content +
                  "</" +
                  r.tag +
                  ">"
                );
              }),
              !t.document)
            )
              return t.addEventListener
                ? (a.disableWorkerMessageHandler ||
                    t.addEventListener(
                      "message",
                      function (e) {
                        var n = JSON.parse(e.data),
                          i = n.language,
                          r = n.code,
                          o = n.immediateClose;
                        t.postMessage(a.highlight(r, a.languages[i], i)),
                          o && t.close();
                      },
                      !1
                    ),
                  t.Prism)
                : t.Prism;
            var r =
              document.currentScript ||
              [].slice.call(document.getElementsByTagName("script")).pop();
            return (
              r &&
                ((a.filename = r.src),
                a.manual ||
                  r.hasAttribute("data-manual") ||
                  ("loading" !== document.readyState
                    ? window.requestAnimationFrame
                      ? window.requestAnimationFrame(a.highlightAll)
                      : window.setTimeout(a.highlightAll, 16)
                    : document.addEventListener(
                        "DOMContentLoaded",
                        a.highlightAll
                      ))),
              t.Prism
            );
          })();
        "undefined" != typeof module && module.exports && (module.exports = n),
          void 0 !== e && (e.Prism = n),
          (n.languages.markup = {
            comment: /<!--[\s\S]*?-->/,
            prolog: /<\?[\s\S]+?\?>/,
            doctype: /<!DOCTYPE[\s\S]+?>/i,
            cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
            tag: {
              pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
              greedy: !0,
              inside: {
                tag: {
                  pattern: /^<\/?[^\s>\/]+/i,
                  inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
                },
                "attr-value": {
                  pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                  inside: {
                    punctuation: [
                      /^=/,
                      { pattern: /(^|[^\\])["']/, lookbehind: !0 },
                    ],
                  },
                },
                punctuation: /\/?>/,
                "attr-name": {
                  pattern: /[^\s>\/]+/,
                  inside: { namespace: /^[^\s>\/:]+:/ },
                },
              },
            },
            entity: /&#?[\da-z]{1,8};/i,
          }),
          (n.languages.markup.tag.inside["attr-value"].inside.entity =
            n.languages.markup.entity),
          n.hooks.add("wrap", function (e) {
            "entity" === e.type &&
              (e.attributes.title = e.content.replace(/&amp;/, "&"));
          }),
          (n.languages.xml = n.languages.markup),
          (n.languages.html = n.languages.markup),
          (n.languages.mathml = n.languages.markup),
          (n.languages.svg = n.languages.markup),
          (n.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
              pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
              inside: { rule: /@[\w-]+/ },
            },
            url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
            selector: /[^{}\s][^{};]*?(?=\s*\{)/,
            string: {
              pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /\B!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:]/,
          }),
          (n.languages.css.atrule.inside.rest = n.languages.css),
          n.languages.markup &&
            (n.languages.insertBefore("markup", "tag", {
              style: {
                pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                lookbehind: !0,
                inside: n.languages.css,
                alias: "language-css",
                greedy: !0,
              },
            }),
            n.languages.insertBefore(
              "inside",
              "attr-value",
              {
                "style-attr": {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    "attr-name": {
                      pattern: /^\s*style/i,
                      inside: n.languages.markup.tag.inside,
                    },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": { pattern: /.+/i, inside: n.languages.css },
                  },
                  alias: "language-css",
                },
              },
              n.languages.markup.tag
            )),
          (n.languages.clike = {
            comment: [
              { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
              { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
            ],
            string: {
              pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
            "class-name": {
              pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
              lookbehind: !0,
              inside: { punctuation: /[.\\]/ },
            },
            keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
            boolean: /\b(?:true|false)\b/,
            function: /[a-z0-9_]+(?=\()/i,
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.javascript = n.languages.extend("clike", {
            keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
            number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
            operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
          })),
          n.languages.insertBefore("javascript", "keyword", {
            regex: {
              pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
              lookbehind: !0,
              greedy: !0,
            },
            "function-variable": {
              pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
              alias: "function",
            },
            constant: /\b[A-Z][A-Z\d_]*\b/,
          }),
          n.languages.insertBefore("javascript", "string", {
            "template-string": {
              pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
              greedy: !0,
              inside: {
                interpolation: {
                  pattern: /\${[^}]+}/,
                  inside: {
                    "interpolation-punctuation": {
                      pattern: /^\${|}$/,
                      alias: "punctuation",
                    },
                    rest: null,
                  },
                },
                string: /[\s\S]+/,
              },
            },
          }),
          (n.languages.javascript[
            "template-string"
          ].inside.interpolation.inside.rest = n.languages.javascript),
          n.languages.markup &&
            n.languages.insertBefore("markup", "tag", {
              script: {
                pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                lookbehind: !0,
                inside: n.languages.javascript,
                alias: "language-javascript",
                greedy: !0,
              },
            }),
          (n.languages.js = n.languages.javascript),
          (n.languages.abap = {
            comment: /^\*.*/m,
            string: /(`|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
            "string-template": {
              pattern: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/,
              lookbehind: !0,
              alias: "string",
            },
            "eol-comment": {
              pattern: /(^|\s)".*/m,
              lookbehind: !0,
              alias: "comment",
            },
            keyword: {
              pattern: /(\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|SELECTOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i,
              lookbehind: !0,
            },
            number: /\b\d+\b/,
            operator: {
              pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/,
              lookbehind: !0,
            },
            "string-operator": {
              pattern: /(\s)&&?(?=\s)/,
              lookbehind: !0,
              alias: "keyword",
            },
            "token-operator": [
              {
                pattern: /(\w)(?:->?|=>|[~|{}])(?=\w)/,
                lookbehind: !0,
                alias: "punctuation",
              },
              { pattern: /[|{}]/, alias: "punctuation" },
            ],
            punctuation: /[,.:()]/,
          }),
          (n.languages.actionscript = n.languages.extend("javascript", {
            keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
            operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/,
          })),
          (n.languages.actionscript["class-name"].alias = "function"),
          n.languages.markup &&
            n.languages.insertBefore("actionscript", "string", {
              xml: {
                pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
                lookbehind: !0,
                inside: { rest: n.languages.markup },
              },
            }),
          (n.languages.ada = {
            comment: /--.*/,
            string: /"(?:""|[^"\r\f\n])*"/i,
            number: [
              {
                pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i,
              },
              {
                pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i,
              },
            ],
            "attr-name": /\b'\w+/i,
            keyword: /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|new|return|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
            boolean: /\b(?:true|false)\b/i,
            operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
            punctuation: /\.\.?|[,;():]/,
            char: /'.'/,
            variable: /\b[a-z](?:[_a-z\d])*\b/i,
          }),
          (n.languages.apacheconf = {
            comment: /#.*/,
            "directive-inline": {
              pattern: /^(\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
              lookbehind: !0,
              alias: "property",
            },
            "directive-block": {
              pattern: /<\/?\b(?:AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/i,
              inside: {
                "directive-block": {
                  pattern: /^<\/?\w+/,
                  inside: { punctuation: /^<\/?/ },
                  alias: "tag",
                },
                "directive-block-parameter": {
                  pattern: /.*[^>]/,
                  inside: {
                    punctuation: /:/,
                    string: {
                      pattern: /("|').*\1/,
                      inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
                    },
                  },
                  alias: "attr-value",
                },
                punctuation: />/,
              },
              alias: "tag",
            },
            "directive-flags": { pattern: /\[(?:\w,?)+\]/, alias: "keyword" },
            string: {
              pattern: /("|').*\1/,
              inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
            },
            variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
            regex: /\^?.*\$|\^.*\$?/,
          }),
          (n.languages.apl = {
            comment: /(?:⍝|#[! ]).*$/m,
            string: { pattern: /'(?:[^'\r\n]|'')*'/, greedy: !0 },
            number: /¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i,
            statement: /:[A-Z][a-z][A-Za-z]*\b/,
            "system-function": { pattern: /⎕[A-Z]+/i, alias: "function" },
            constant: /[⍬⌾#⎕⍞]/,
            function: /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,
            "monadic-operator": { pattern: /[\\\/⌿⍀¨⍨⌶&∥]/, alias: "operator" },
            "dyadic-operator": { pattern: /[.⍣⍠⍤∘⌸@⌺]/, alias: "operator" },
            assignment: { pattern: /←/, alias: "keyword" },
            punctuation: /[\[;\]()◇⋄]/,
            dfn: { pattern: /[{}⍺⍵⍶⍹∇⍫:]/, alias: "builtin" },
          }),
          (n.languages.applescript = {
            comment: [/\(\*(?:\(\*[\s\S]*?\*\)|[\s\S])*?\*\)/, /--.+/, /#.+/],
            string: /"(?:\\.|[^"\\\r\n])*"/,
            number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?\b/i,
            operator: [
              /[&=≠≤≥*+\-\/÷^]|[<>]=?/,
              /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/,
            ],
            keyword: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
            class: {
              pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
              alias: "builtin",
            },
            punctuation: /[{}():,¬«»《》]/,
          }),
          (n.languages.c = n.languages.extend("clike", {
            keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
            operator: /-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,
            number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
          })),
          n.languages.insertBefore("c", "string", {
            macro: {
              pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
              lookbehind: !0,
              alias: "property",
              inside: {
                string: {
                  pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
                  lookbehind: !0,
                },
                directive: {
                  pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                  lookbehind: !0,
                  alias: "keyword",
                },
              },
            },
            constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
          }),
          delete n.languages.c["class-name"],
          delete n.languages.c.boolean,
          (n.languages.arff = {
            comment: /%.*/,
            string: { pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            keyword: /@(?:attribute|data|end|relation)\b/i,
            number: /\b\d+(?:\.\d+)?\b/,
            punctuation: /[{},]/,
          }),
          (function (e) {
            var t = {
              pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\]\\]|\\.)*\]|[^\]\\]|\\.)*\]/m,
              lookbehind: !0,
              inside: {
                quoted: {
                  pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/,
                  inside: { punctuation: /^[$`]|[$`]$/ },
                },
                interpreted: {
                  pattern: /'(?:[^'\\]|\\.)*'/,
                  inside: { punctuation: /^'|'$/ },
                },
                string: /"(?:[^"\\]|\\.)*"/,
                variable: /\w+(?==)/,
                punctuation: /^\[|\]$|,/,
                operator: /=/,
                "attr-value": /(?!^\s+$).+/,
              },
            };
            (e.languages.asciidoc = {
              "comment-block": {
                pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m,
                alias: "comment",
              },
              table: {
                pattern: /^\|={3,}(?:(?:\r?\n|\r).*)*?(?:\r?\n|\r)\|={3,}$/m,
                inside: {
                  specifiers: {
                    pattern: /(?!\|)(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*])?(?:[<^>](?:\.[<^>])?|\.[<^>])?[a-z]*)(?=\|)/,
                    alias: "attr-value",
                  },
                  punctuation: { pattern: /(^|[^\\])[|!]=*/, lookbehind: !0 },
                },
              },
              "passthrough-block": {
                pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
                inside: { punctuation: /^\++|\++$/ },
              },
              "literal-block": {
                pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
                inside: { punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/ },
              },
              "other-block": {
                pattern: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
                inside: { punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/ },
              },
              "list-punctuation": {
                pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
                lookbehind: !0,
                alias: "punctuation",
              },
              "list-label": {
                pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im,
                lookbehind: !0,
                alias: "symbol",
              },
              "indented-block": {
                pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/,
                lookbehind: !0,
              },
              comment: /^\/\/.*/m,
              title: {
                pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} +.+|^\.(?![\s.]).*/m,
                alias: "important",
                inside: { punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/ },
              },
              "attribute-entry": {
                pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m,
                alias: "tag",
              },
              attributes: t,
              hr: { pattern: /^'{3,}$/m, alias: "punctuation" },
              "page-break": { pattern: /^<{3,}$/m, alias: "punctuation" },
              admonition: {
                pattern: /^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m,
                alias: "keyword",
              },
              callout: [
                {
                  pattern: /(^[ \t]*)<?\d*>/m,
                  lookbehind: !0,
                  alias: "symbol",
                },
                { pattern: /<\d+>/, alias: "symbol" },
              ],
              macro: {
                pattern: /\b[a-z\d][a-z\d-]*::?(?:(?:\S+)??\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
                inside: {
                  function: /^[a-z\d-]+(?=:)/,
                  punctuation: /^::?/,
                  attributes: {
                    pattern: /(?:\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
                    inside: t.inside,
                  },
                },
              },
              inline: {
                pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"]|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?: ['`]|.)+?(?:(?:\r?\n|\r)(?: ['`]|.)+?)*['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"]|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
                lookbehind: !0,
                inside: {
                  attributes: t,
                  url: {
                    pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
                    inside: { punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/ },
                  },
                  "attribute-ref": {
                    pattern: /^\{.+\}$/,
                    inside: {
                      variable: {
                        pattern: /(^\{)[a-z\d,+_-]+/,
                        lookbehind: !0,
                      },
                      operator: /^[=?!#%@$]|!(?=[:}])/,
                      punctuation: /^\{|\}$|::?/,
                    },
                  },
                  italic: {
                    pattern: /^(['_])[\s\S]+\1$/,
                    inside: { punctuation: /^(?:''?|__?)|(?:''?|__?)$/ },
                  },
                  bold: {
                    pattern: /^\*[\s\S]+\*$/,
                    inside: { punctuation: /^\*\*?|\*\*?$/ },
                  },
                  punctuation: /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/,
                },
              },
              replacement: { pattern: /\((?:C|TM|R)\)/, alias: "builtin" },
              entity: /&#?[\da-z]{1,8};/i,
              "line-continuation": {
                pattern: /(^| )\+$/m,
                lookbehind: !0,
                alias: "punctuation",
              },
            }),
              (t.inside.interpreted.inside.rest = {
                macro: e.languages.asciidoc.macro,
                inline: e.languages.asciidoc.inline,
                replacement: e.languages.asciidoc.replacement,
                entity: e.languages.asciidoc.entity,
              }),
              (e.languages.asciidoc["passthrough-block"].inside.rest = {
                macro: e.languages.asciidoc.macro,
              }),
              (e.languages.asciidoc["literal-block"].inside.rest = {
                callout: e.languages.asciidoc.callout,
              }),
              (e.languages.asciidoc.table.inside.rest = {
                "comment-block": e.languages.asciidoc["comment-block"],
                "passthrough-block": e.languages.asciidoc["passthrough-block"],
                "literal-block": e.languages.asciidoc["literal-block"],
                "other-block": e.languages.asciidoc["other-block"],
                "list-punctuation": e.languages.asciidoc["list-punctuation"],
                "indented-block": e.languages.asciidoc["indented-block"],
                comment: e.languages.asciidoc.comment,
                title: e.languages.asciidoc.title,
                "attribute-entry": e.languages.asciidoc["attribute-entry"],
                attributes: e.languages.asciidoc.attributes,
                hr: e.languages.asciidoc.hr,
                "page-break": e.languages.asciidoc["page-break"],
                admonition: e.languages.asciidoc.admonition,
                "list-label": e.languages.asciidoc["list-label"],
                callout: e.languages.asciidoc.callout,
                macro: e.languages.asciidoc.macro,
                inline: e.languages.asciidoc.inline,
                replacement: e.languages.asciidoc.replacement,
                entity: e.languages.asciidoc.entity,
                "line-continuation": e.languages.asciidoc["line-continuation"],
              }),
              (e.languages.asciidoc["other-block"].inside.rest = {
                table: e.languages.asciidoc.table,
                "list-punctuation": e.languages.asciidoc["list-punctuation"],
                "indented-block": e.languages.asciidoc["indented-block"],
                comment: e.languages.asciidoc.comment,
                "attribute-entry": e.languages.asciidoc["attribute-entry"],
                attributes: e.languages.asciidoc.attributes,
                hr: e.languages.asciidoc.hr,
                "page-break": e.languages.asciidoc["page-break"],
                admonition: e.languages.asciidoc.admonition,
                "list-label": e.languages.asciidoc["list-label"],
                macro: e.languages.asciidoc.macro,
                inline: e.languages.asciidoc.inline,
                replacement: e.languages.asciidoc.replacement,
                entity: e.languages.asciidoc.entity,
                "line-continuation": e.languages.asciidoc["line-continuation"],
              }),
              (e.languages.asciidoc.title.inside.rest = {
                macro: e.languages.asciidoc.macro,
                inline: e.languages.asciidoc.inline,
                replacement: e.languages.asciidoc.replacement,
                entity: e.languages.asciidoc.entity,
              }),
              e.hooks.add("wrap", function (e) {
                "entity" === e.type &&
                  (e.attributes.title = e.content.replace(/&amp;/, "&"));
              });
          })(n),
          (n.languages.asm6502 = {
            comment: /;.*/,
            directive: { pattern: /\.\w+(?= )/, alias: "keyword" },
            string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            opcode: {
              pattern: /\b(?:adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cpx|cpy|dec|dex|dey|eor|inc|inx|iny|jmp|jsr|lda|ldx|ldy|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|sec|sed|sei|sta|stx|sty|tax|tay|tsx|txa|txs|tya|ADC|AND|ASL|BCC|BCS|BEQ|BIT|BMI|BNE|BPL|BRK|BVC|BVS|CLC|CLD|CLI|CLV|CMP|CPX|CPY|DEC|DEX|DEY|EOR|INC|INX|INY|JMP|JSR|LDA|LDX|LDY|LSR|NOP|ORA|PHA|PHP|PLA|PLP|ROL|ROR|RTI|RTS|SBC|SEC|SED|SEI|STA|STX|STY|TAX|TAY|TSX|TXA|TXS|TYA)\b/,
              alias: "property",
            },
            hexnumber: { pattern: /#?\$[\da-f]{2,4}/i, alias: "string" },
            binarynumber: { pattern: /#?%[01]+/, alias: "string" },
            decimalnumber: { pattern: /#?\d+/, alias: "string" },
            register: { pattern: /\b[xya]\b/i, alias: "variable" },
          }),
          (n.languages.csharp = n.languages.extend("clike", {
            keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
            string: [
              { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
              { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
            ],
            "class-name": [
              {
                pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
                inside: { punctuation: /\./ },
              },
              {
                pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
              },
              {
                pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
              },
              {
                pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
                lookbehind: !0,
                inside: { punctuation: /\./ },
              },
            ],
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
          })),
          n.languages.insertBefore("csharp", "class-name", {
            "generic-method": {
              pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
              inside: {
                function: /^\w+/,
                "class-name": {
                  pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                  inside: { punctuation: /\./ },
                },
                keyword: n.languages.csharp.keyword,
                punctuation: /[<>(),.:]/,
              },
            },
            preprocessor: {
              pattern: /(^\s*)#.*/m,
              lookbehind: !0,
              alias: "property",
              inside: {
                directive: {
                  pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                  lookbehind: !0,
                  alias: "keyword",
                },
              },
            },
          }),
          (n.languages.dotnet = n.languages.csharp),
          (n.languages.autohotkey = {
            comment: {
              pattern: /(^[^";\n]*("[^"\n]*?"[^"\n]*?)*)(?:;.*$|^\s*\/\*[\s\S]*\n\*\/)/m,
              lookbehind: !0,
            },
            string: /"(?:[^"\n\r]|"")*"/m,
            function: /[^(); \t,\n+*\-=?>:\\\/<&%\[\]]+?(?=\()/m,
            tag: /^[ \t]*[^\s:]+?(?=:(?:[^:]|$))/m,
            variable: /%\w+%/,
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /\?|\/\/?=?|:=|\|[=|]?|&[=&]?|\+[=+]?|-[=-]?|\*[=*]?|<(?:<=?|>|=)?|>>?=?|[.^!=~]=?|\b(?:AND|NOT|OR)\b/,
            punctuation: /[{}[\]():,]/,
            boolean: /\b(?:true|false)\b/,
            selector: /\b(?:AutoTrim|BlockInput|Break|Click|ClipWait|Continue|Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText|CoordMode|Critical|DetectHiddenText|DetectHiddenWindows|Drive|DriveGet|DriveSpaceFree|EnvAdd|EnvDiv|EnvGet|EnvMult|EnvSet|EnvSub|EnvUpdate|Exit|ExitApp|FileAppend|FileCopy|FileCopyDir|FileCreateDir|FileCreateShortcut|FileDelete|FileEncoding|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileMoveDir|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileRemoveDir|FileSelectFile|FileSelectFolder|FileSetAttrib|FileSetTime|FormatTime|GetKeyState|Gosub|Goto|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|Gui|GuiControl|GuiControlGet|Hotkey|ImageSearch|IniDelete|IniRead|IniWrite|Input|InputBox|KeyWait|ListHotkeys|ListLines|ListVars|Loop|Menu|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|OnExit|OutputDebug|Pause|PixelGetColor|PixelSearch|PostMessage|Process|Progress|Random|RegDelete|RegRead|RegWrite|Reload|Repeat|Return|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendMessage|SendMode|SendPlay|SendRaw|SetBatchLines|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetEnv|SetFormat|SetKeyDelay|SetMouseDelay|SetNumlockState|SetScrollLockState|SetStoreCapslockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sleep|Sort|SoundBeep|SoundGet|SoundGetWaveVolume|SoundPlay|SoundSet|SoundSetWaveVolume|SplashImage|SplashTextOff|SplashTextOn|SplitPath|StatusBarGetText|StatusBarWait|StringCaseSense|StringGetPos|StringLeft|StringLen|StringLower|StringMid|StringReplace|StringRight|StringSplit|StringTrimLeft|StringTrimRight|StringUpper|Suspend|SysGet|Thread|ToolTip|Transform|TrayTip|URLDownloadToFile|WinActivate|WinActivateBottom|WinClose|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle|WinHide|WinKill|WinMaximize|WinMenuSelectItem|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinRestore|WinSet|WinSetTitle|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/i,
            constant: /\b(?:a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_formatfloat|a_formatinteger|a_gui|a_guievent|a_guicontrol|a_guicontrolevent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|programfiles|a_programfiles|a_programs|a_programscommon|a-screenheight|a-screenwidth|a_scriptdir|a_scriptfullpath|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel)\b/i,
            builtin: /\b(?:abs|acos|asc|asin|atan|ceil|chr|class|cos|dllcall|exp|fileexist|Fileopen|floor|il_add|il_create|il_destroy|instr|substr|isfunc|islabel|IsObject|ln|log|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modify|lv_modifycol|lv_setimagelist|mod|onmessage|numget|numput|registercallback|regexmatch|regexreplace|round|sin|tan|sqrt|strlen|sb_seticon|sb_setparts|sb_settext|strsplit|tv_add|tv_delete|tv_getchild|tv_getcount|tv_getnext|tv_get|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist|__New|__Call|__Get|__Set)\b/i,
            symbol: /\b(?:alt|altdown|altup|appskey|backspace|browser_back|browser_favorites|browser_forward|browser_home|browser_refresh|browser_search|browser_stop|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f1|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f2|f20|f21|f22|f23|f24|f3|f4|f5|f6|f7|f8|f9|home|ins|insert|joy1|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy2|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy3|joy30|joy31|joy32|joy4|joy5|joy6|joy7|joy8|joy9|joyaxes|joybuttons|joyinfo|joyname|joypov|joyr|joyu|joyv|joyx|joyy|joyz|lalt|launch_app1|launch_app2|launch_mail|launch_media|lbutton|lcontrol|lctrl|left|lshift|lwin|lwindown|lwinup|mbutton|media_next|media_play_pause|media_prev|media_stop|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadadd|numpadclear|numpaddel|numpaddiv|numpaddot|numpaddown|numpadend|numpadenter|numpadhome|numpadins|numpadleft|numpadmult|numpadpgdn|numpadpgup|numpadright|numpadsub|numpadup|pgdn|pgup|printscreen|ralt|rbutton|rcontrol|rctrl|right|rshift|rwin|rwindown|rwinup|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton1|xbutton2)\b/i,
            important: /#\b(?:AllowSameLineComments|ClipboardTimeout|CommentFlag|ErrorStdOut|EscapeChar|HotkeyInterval|HotkeyModifierTimeout|Hotstring|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Include|IncludeAgain|InstallKeybdHook|InstallMouseHook|KeyHistory|LTrim|MaxHotkeysPerInterval|MaxMem|MaxThreads|MaxThreadsBuffer|MaxThreadsPerHotkey|NoEnv|NoTrayIcon|Persistent|SingleInstance|UseHook|WinActivateForce)\b/i,
            keyword: /\b(?:Abort|AboveNormal|Add|ahk_class|ahk_group|ahk_id|ahk_pid|All|Alnum|Alpha|AltSubmit|AltTab|AltTabAndMenu|AltTabMenu|AltTabMenuDismiss|AlwaysOnTop|AutoSize|Background|BackgroundTrans|BelowNormal|between|BitAnd|BitNot|BitOr|BitShiftLeft|BitShiftRight|BitXOr|Bold|Border|Button|ByRef|Checkbox|Checked|CheckedGray|Choose|ChooseString|Close|Color|ComboBox|Contains|ControlList|Count|Date|DateTime|Days|DDL|Default|DeleteAll|Delimiter|Deref|Destroy|Digit|Disable|Disabled|DropDownList|Edit|Eject|Else|Enable|Enabled|Error|Exist|Expand|ExStyle|FileSystem|First|Flash|Float|FloatFast|Focus|Font|for|global|Grid|Group|GroupBox|GuiClose|GuiContextMenu|GuiDropFiles|GuiEscape|GuiSize|Hdr|Hidden|Hide|High|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|Hours|HScroll|Icon|IconSmall|ID|IDLast|If|IfEqual|IfExist|IfGreater|IfGreaterOrEqual|IfInString|IfLess|IfLessOrEqual|IfMsgBox|IfNotEqual|IfNotExist|IfNotInString|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Ignore|ImageList|in|Integer|IntegerFast|Interrupt|is|italic|Join|Label|LastFound|LastFoundExist|Limit|Lines|List|ListBox|ListView|local|Lock|Logoff|Low|Lower|Lowercase|MainWindow|Margin|Maximize|MaximizeBox|MaxSize|Minimize|MinimizeBox|MinMax|MinSize|Minutes|MonthCal|Mouse|Move|Multi|NA|No|NoActivate|NoDefault|NoHide|NoIcon|NoMainWindow|norm|Normal|NoSort|NoSortHdr|NoStandard|Not|NoTab|NoTimers|Number|Off|Ok|On|OwnDialogs|Owner|Parse|Password|Picture|Pixel|Pos|Pow|Priority|ProcessName|Radio|Range|Read|ReadOnly|Realtime|Redraw|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|Region|Relative|Rename|Report|Resize|Restore|Retry|RGB|Screen|Seconds|Section|Serial|SetLabel|ShiftAltTab|Show|Single|Slider|SortDesc|Standard|static|Status|StatusBar|StatusCD|strike|Style|Submit|SysMenu|Tab2|TabStop|Text|Theme|Tile|ToggleCheck|ToggleEnable|ToolWindow|Top|Topmost|TransColor|Transparent|Tray|TreeView|TryAgain|Type|UnCheck|underline|Unicode|Unlock|UpDown|Upper|Uppercase|UseErrorLevel|Vis|VisFirst|Visible|VScroll|Wait|WaitClose|WantCtrlA|WantF2|WantReturn|While|Wrap|Xdigit|xm|xp|xs|Yes|ym|yp|ys)\b/i,
          }),
          (n.languages.autoit = {
            comment: [
              /;.*/,
              {
                pattern: /(^\s*)#(?:comments-start|cs)[\s\S]*?^\s*#(?:comments-end|ce)/m,
                lookbehind: !0,
              },
            ],
            url: {
              pattern: /(^\s*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m,
              lookbehind: !0,
            },
            string: {
              pattern: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/,
              greedy: !0,
              inside: { variable: /([%$@])\w+\1/ },
            },
            directive: {
              pattern: /(^\s*)#\w+/m,
              lookbehind: !0,
              alias: "keyword",
            },
            function: /\b\w+(?=\()/,
            variable: /[$@]\w+/,
            keyword: /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|Select|Switch|With)|Enum|Exit(?:Loop)?|For|Func|Global|If|In|Local|Next|Null|ReDim|Select|Static|Step|Switch|Then|To|Until|Volatile|WEnd|While|With)\b/i,
            number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
            boolean: /\b(?:True|False)\b/i,
            operator: /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Or|Not)\b/i,
            punctuation: /[\[\]().,:]/,
          }),
          (function (e) {
            var t = {
              variable: [
                {
                  pattern: /\$?\(\([\s\S]+?\)\)/,
                  inside: {
                    variable: [
                      { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                      /^\$\(\(/,
                    ],
                    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                    operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                    punctuation: /\(\(?|\)\)?|,|;/,
                  },
                },
                {
                  pattern: /\$\([^)]+\)|`[^`]+`/,
                  greedy: !0,
                  inside: { variable: /^\$\(|^`|\)$|`$/ },
                },
                /\$(?:[\w#?*!@]+|\{[^}]+\})/i,
              ],
            };
            e.languages.bash = {
              shebang: {
                pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
                alias: "important",
              },
              comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
              string: [
                {
                  pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
                  lookbehind: !0,
                  greedy: !0,
                  inside: t,
                },
                {
                  pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
                  greedy: !0,
                  inside: t,
                },
              ],
              variable: t.variable,
              function: {
                pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
                lookbehind: !0,
              },
              keyword: {
                pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
                lookbehind: !0,
              },
              boolean: {
                pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
                lookbehind: !0,
              },
              operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
              punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/,
            };
            var n = t.variable[1].inside;
            (n.string = e.languages.bash.string),
              (n.function = e.languages.bash.function),
              (n.keyword = e.languages.bash.keyword),
              (n.boolean = e.languages.bash.boolean),
              (n.operator = e.languages.bash.operator),
              (n.punctuation = e.languages.bash.punctuation),
              (e.languages.shell = e.languages.bash);
          })(n),
          (n.languages.basic = {
            comment: {
              pattern: /(?:!|REM\b).+/i,
              inside: { keyword: /^REM/i },
            },
            string: {
              pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
              greedy: !0,
            },
            number: /(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
            keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
            function: /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
            operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
            punctuation: /[,;:()]/,
          }),
          (function (e) {
            var t = /%%?[~:\w]+%?|!\S+!/,
              a = {
                pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
                alias: "attr-name",
                inside: { punctuation: /:/ },
              },
              i = /"[^"]*"/,
              r = /(?:\b|-)\d+\b/;
            n.languages.batch = {
              comment: [
                /^::.*/m,
                {
                  pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                  lookbehind: !0,
                },
              ],
              label: { pattern: /^:.*/m, alias: "property" },
              command: [
                {
                  pattern: /((?:^|[&(])[ \t]*)for(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* \S+ in \([^)]+\) do/im,
                  lookbehind: !0,
                  inside: {
                    keyword: /^for\b|\b(?:in|do)\b/i,
                    string: i,
                    parameter: a,
                    variable: t,
                    number: r,
                    punctuation: /[()',]/,
                  },
                },
                {
                  pattern: /((?:^|[&(])[ \t]*)if(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|\S+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|\S+))/im,
                  lookbehind: !0,
                  inside: {
                    keyword: /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i,
                    string: i,
                    parameter: a,
                    variable: t,
                    number: r,
                    operator: /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i,
                  },
                },
                {
                  pattern: /((?:^|[&()])[ \t]*)else\b/im,
                  lookbehind: !0,
                  inside: { keyword: /^else\b/i },
                },
                {
                  pattern: /((?:^|[&(])[ \t]*)set(?: ?\/[a-z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                  lookbehind: !0,
                  inside: {
                    keyword: /^set\b/i,
                    string: i,
                    parameter: a,
                    variable: [t, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
                    number: r,
                    operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
                    punctuation: /[()',]/,
                  },
                },
                {
                  pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                  lookbehind: !0,
                  inside: {
                    keyword: /^\w+\b/i,
                    string: i,
                    parameter: a,
                    label: {
                      pattern: /(^\s*):\S+/m,
                      lookbehind: !0,
                      alias: "property",
                    },
                    variable: t,
                    number: r,
                    operator: /\^/,
                  },
                },
              ],
              operator: /[&@]/,
              punctuation: /[()']/,
            };
          })(),
          (n.languages.bison = n.languages.extend("c", {})),
          n.languages.insertBefore("bison", "comment", {
            bison: {
              pattern: /^[\s\S]*?%%[\s\S]*?%%/,
              inside: {
                c: {
                  pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
                  inside: {
                    delimiter: { pattern: /^%?\{|%?\}$/, alias: "punctuation" },
                    "bison-variable": {
                      pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
                      alias: "variable",
                      inside: { punctuation: /<|>/ },
                    },
                    rest: n.languages.c,
                  },
                },
                comment: n.languages.c.comment,
                string: n.languages.c.string,
                property: /\S+(?=:)/,
                keyword: /%\w+/,
                number: {
                  pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i,
                  lookbehind: !0,
                },
                punctuation: /%[%?]|[|:;\[\]<>]/,
              },
            },
          }),
          (n.languages.brainfuck = {
            pointer: { pattern: /<|>/, alias: "keyword" },
            increment: { pattern: /\+/, alias: "inserted" },
            decrement: { pattern: /-/, alias: "deleted" },
            branching: { pattern: /\[|\]/, alias: "important" },
            operator: /[.,]/,
            comment: /\S+/,
          }),
          (n.languages.bro = {
            comment: {
              pattern: /(^|[^\\$])#.*/,
              lookbehind: !0,
              inside: { italic: /\b(?:TODO|FIXME|XXX)\b/ },
            },
            string: {
              pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
            boolean: /\b[TF]\b/,
            function: {
              pattern: /(?:function|hook|event) \w+(?:::\w+)?/,
              inside: { keyword: /^(?:function|hook|event)/ },
            },
            variable: {
              pattern: /(?:global|local) \w+/i,
              inside: { keyword: /(?:global|local)/ },
            },
            builtin: /(?:@(?:load(?:-(?:sigs|plugin))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|group|error_handler|type_column))/,
            constant: { pattern: /const \w+/i, inside: { keyword: /const/ } },
            keyword: /\b(?:break|next|continue|alarm|using|of|add|delete|export|print|return|schedule|when|timeout|addr|any|bool|count|double|enum|file|int|interval|pattern|opaque|port|record|set|string|subnet|table|time|vector|for|if|else|in|module|function)\b/,
            operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&|\|\|?|\?|\*|\/|~|\^|%/,
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.cpp = n.languages.extend("c", {
            keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
            boolean: /\b(?:true|false)\b/,
            operator: /--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
          })),
          n.languages.insertBefore("cpp", "keyword", {
            "class-name": { pattern: /(class\s+)\w+/i, lookbehind: !0 },
          }),
          n.languages.insertBefore("cpp", "string", {
            "raw-string": {
              pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
              alias: "string",
              greedy: !0,
            },
          }),
          (n.languages.aspnet = n.languages.extend("markup", {
            "page-directive tag": {
              pattern: /<%\s*@.*%>/i,
              inside: {
                "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
                rest: n.languages.markup.tag.inside,
              },
            },
            "directive tag": {
              pattern: /<%.*%>/i,
              inside: {
                "directive tag": /<%\s*?[$=%#:]{0,2}|%>/i,
                rest: n.languages.csharp,
              },
            },
          })),
          (n.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
          n.languages.insertBefore(
            "inside",
            "punctuation",
            { "directive tag": n.languages.aspnet["directive tag"] },
            n.languages.aspnet.tag.inside["attr-value"]
          ),
          n.languages.insertBefore("aspnet", "comment", {
            "asp comment": /<%--[\s\S]*?--%>/,
          }),
          n.languages.insertBefore(
            "aspnet",
            n.languages.javascript ? "script" : "tag",
            {
              "asp script": {
                pattern: /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                lookbehind: !0,
                inside: n.languages.csharp || {},
              },
            }
          ),
          (n.languages.arduino = n.languages.extend("cpp", {
            keyword: /\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto|switch|case|new|try|throw|catch|finally|null|break|continue|boolean|bool|void|byte|word|string|String|array|int|long|integer|double)\b/,
            builtin: /\b(?:KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|LiquidCrystal_I2C|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD|runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer|disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/,
            constant: /\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/,
          })),
          (function (e) {
            var t = /#(?!\{).+/,
              n = { pattern: /#\{[^}]+\}/, alias: "variable" };
            (e.languages.coffeescript = e.languages.extend("javascript", {
              comment: t,
              string: [
                { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
                {
                  pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                  greedy: !0,
                  inside: { interpolation: n },
                },
              ],
              keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
              "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
            })),
              e.languages.insertBefore("coffeescript", "comment", {
                "multiline-comment": {
                  pattern: /###[\s\S]+?###/,
                  alias: "comment",
                },
                "block-regex": {
                  pattern: /\/{3}[\s\S]*?\/{3}/,
                  alias: "regex",
                  inside: { comment: t, interpolation: n },
                },
              }),
              e.languages.insertBefore("coffeescript", "string", {
                "inline-javascript": {
                  pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                  inside: {
                    delimiter: { pattern: /^`|`$/, alias: "punctuation" },
                    rest: e.languages.javascript,
                  },
                },
                "multiline-string": [
                  { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
                  {
                    pattern: /"""[\s\S]*?"""/,
                    greedy: !0,
                    alias: "string",
                    inside: { interpolation: n },
                  },
                ],
              }),
              e.languages.insertBefore("coffeescript", "keyword", {
                property: /(?!\d)\w+(?=\s*:(?!:))/,
              }),
              delete e.languages.coffeescript["template-string"];
          })(n),
          (n.languages.clojure = {
            comment: /;+.*/,
            string: /"(?:\\.|[^\\"\r\n])*"/,
            operator: /(?:::|[:|'])\b[a-z][\w*+!?-]*\b/i,
            keyword: {
              pattern: /([^\w+*'?-])(?:def|if|do|let|\.\.|quote|var|->>|->|fn|loop|recur|throw|try|monitor-enter|\.|new|set!|def\-|defn|defn\-|defmacro|defmulti|defmethod|defstruct|defonce|declare|definline|definterface|defprotocol|==|defrecord|>=|deftype|<=|defproject|ns|\*|\+|\-|\/|<|=|>|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|conj|cons|constantly|cond|if-not|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|deref|difference|disj|dissoc|distinct|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|for|fnseq|frest|gensym|get-proxy-class|get|hash-map|hash-set|identical\?|identity|if-let|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|line-seq|list\*|list|load|load-file|locking|long|loop|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|name|namespace|neg\?|new|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|time|to-array|to-array-2d|tree-seq|true\?|union|up|update-proxy|val|vals|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[^\w+*'?-])/,
              lookbehind: !0,
            },
            boolean: /\b(?:true|false|nil)\b/,
            number: /\b[0-9A-Fa-f]+\b/,
            punctuation: /[{}\[\](),]/,
          }),
          (function (e) {
            e.languages.ruby = e.languages.extend("clike", {
              comment: [
                /#.*/,
                {
                  pattern: /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
                  greedy: !0,
                },
              ],
              keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
            });
            var t = {
              pattern: /#\{[^}]+\}/,
              inside: {
                delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
                rest: e.languages.ruby,
              },
            };
            e.languages.insertBefore("ruby", "keyword", {
              regex: [
                {
                  pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
                  lookbehind: !0,
                  greedy: !0,
                },
              ],
              variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
              symbol: {
                pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                lookbehind: !0,
              },
            }),
              e.languages.insertBefore("ruby", "number", {
                builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
                constant: /\b[A-Z]\w*(?:[?!]|\b)/,
              }),
              (e.languages.ruby.string = [
                {
                  pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
                {
                  pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                  greedy: !0,
                  inside: { interpolation: t },
                },
              ]);
          })(n),
          (n.languages.csp = {
            directive: {
              pattern: /\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,
              alias: "keyword",
            },
            safe: {
              pattern: /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=\/]+)'/,
              alias: "selector",
            },
            unsafe: {
              pattern: /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,
              alias: "function",
            },
          }),
          (n.languages.css.selector = {
            pattern: /[^{}\s][^{}]*(?=\s*\{)/,
            inside: {
              "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
              "pseudo-class": /:[-\w]+(?:\(.*\))?/,
              class: /\.[-:.\w]+/,
              id: /#[-:.\w]+/,
              attribute: /\[[^\]]+\]/,
            },
          }),
          n.languages.insertBefore("css", "function", {
            hexcode: /#[\da-f]{3,8}/i,
            entity: /\\[\da-f]{1,8}/i,
            number: /[\d%.]+/,
          }),
          (n.languages.d = n.languages.extend("clike", {
            string: [
              /\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?/,
              /\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|\{[\s\S]*?\})"/,
              /\bq"([_a-zA-Z][_a-zA-Z\d]*)(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\1"/,
              /\bq"(.)[\s\S]*?\1"/,
              /'(?:\\'|\\?[^']+)'/,
              /(["`])(?:\\[\s\S]|(?!\1)[^\\])*\1[cwd]?/,
            ],
            number: [
              /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]*/i,
              {
                pattern: /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]*/i,
                lookbehind: !0,
              },
            ],
            keyword: /\$|\b(?:abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|public|pure|real|ref|return|scope|shared|short|static|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|__(?:(?:FILE|MODULE|LINE|FUNCTION|PRETTY_FUNCTION|DATE|EOF|TIME|TIMESTAMP|VENDOR|VERSION)__|gshared|traits|vector|parameters)|string|wstring|dstring|size_t|ptrdiff_t)\b/,
            operator: /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/,
          })),
          (n.languages.d.comment = [
            /^\s*#!.+/,
            {
              pattern: /(^|[^\\])\/\+(?:\/\+[\s\S]*?\+\/|[\s\S])*?\+\//,
              lookbehind: !0,
            },
          ].concat(n.languages.d.comment)),
          n.languages.insertBefore("d", "comment", {
            "token-string": {
              pattern: /\bq\{(?:\{[^}]*\}|[^}])*\}/,
              alias: "string",
            },
          }),
          n.languages.insertBefore("d", "keyword", { property: /\B@\w*/ }),
          n.languages.insertBefore("d", "function", {
            register: {
              pattern: /\b(?:[ABCD][LHX]|E[ABCD]X|E?(?:BP|SP|DI|SI)|[ECSDGF]S|CR[0234]|DR[012367]|TR[3-7]|X?MM[0-7]|R[ABCD]X|[BS]PL|R[BS]P|[DS]IL|R[DS]I|R(?:[89]|1[0-5])[BWD]?|XMM(?:[89]|1[0-5])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
              alias: "variable",
            },
          }),
          (n.languages.dart = n.languages.extend("clike", {
            string: [
              { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
              { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            ],
            keyword: [
              /\b(?:async|sync|yield)\*/,
              /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|external|extends|factory|final|finally|for|get|if|implements|import|in|library|new|null|operator|part|rethrow|return|set|static|super|switch|this|throw|try|typedef|var|void|while|with|yield)\b/,
            ],
            operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
          })),
          n.languages.insertBefore("dart", "function", {
            metadata: { pattern: /@\w+/, alias: "symbol" },
          }),
          (n.languages.diff = {
            coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
            deleted: /^[-<].*$/m,
            inserted: /^[+>].*$/m,
            diff: { pattern: /^!(?!!).+$/m, alias: "important" },
          });
        var a = {
          property: {
            pattern: /(?:{{|{%)[\s\S]*?(?:%}|}})/g,
            greedy: !0,
            inside: {
              string: {
                pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                greedy: !0,
              },
              keyword: /\b(?:\||load|verbatim|widthratio|ssi|firstof|for|url|ifchanged|csrf_token|lorem|ifnotequal|autoescape|now|templatetag|debug|cycle|ifequal|regroup|comment|filter|endfilter|if|spaceless|with|extends|block|include|else|empty|endif|endfor|as|endblock|endautoescape|endverbatim|trans|endtrans|[Tt]rue|[Ff]alse|[Nn]one|in|is|static|macro|endmacro|call|endcall|set|endset|raw|endraw)\b/,
              operator: /[-+=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
              function: /\b(?:_|abs|add|addslashes|attr|batch|callable|capfirst|capitalize|center|count|cut|d|date|default|default_if_none|defined|dictsort|dictsortreversed|divisibleby|e|equalto|escape|escaped|escapejs|even|filesizeformat|first|float|floatformat|force_escape|forceescape|format|get_digit|groupby|indent|int|iriencode|iterable|join|last|length|length_is|linebreaks|linebreaksbr|linenumbers|list|ljust|lower|make_list|map|mapping|number|odd|phone2numeric|pluralize|pprint|random|reject|rejectattr|removetags|replace|reverse|rjust|round|safe|safeseq|sameas|select|selectattr|sequence|slice|slugify|sort|string|stringformat|striptags|sum|time|timesince|timeuntil|title|trim|truncate|truncatechars|truncatechars_html|truncatewords|truncatewords_html|undefined|unordered_list|upper|urlencode|urlize|urlizetrunc|wordcount|wordwrap|xmlattr|yesno)\b/,
              important: /\b-?\d+(?:\.\d+)?\b/,
              variable: /\b\w+?\b/,
              punctuation: /[[\];(),.:]/,
            },
          },
        };
        (n.languages.django = n.languages.extend("markup", {
          comment: /(?:<!--|{#)[\s\S]*?(?:#}|-->)/,
        })),
          (n.languages.django.tag.pattern = /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^>=]+))?)*\s*\/?>/i),
          n.languages.insertBefore("django", "entity", a),
          n.languages.insertBefore("inside", "tag", a, n.languages.django.tag),
          n.languages.javascript &&
            (n.languages.insertBefore(
              "inside",
              "string",
              a,
              n.languages.django.script
            ),
            (n.languages.django.script.inside.string.inside = a)),
          n.languages.css &&
            (n.languages.insertBefore(
              "inside",
              "atrule",
              { tag: a.property },
              n.languages.django.style
            ),
            (n.languages.django.style.inside.string.inside = a)),
          (n.languages.jinja2 = n.languages.django),
          (n.languages.docker = {
            keyword: {
              pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
              lookbehind: !0,
            },
            string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
            comment: /#.*/,
            punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
          }),
          (n.languages.dockerfile = n.languages.docker),
          (n.languages.eiffel = {
            comment: /--.*/,
            string: [
              { pattern: /"([^[]*)\[[\s\S]*?\]\1"/, greedy: !0 },
              { pattern: /"([^{]*)\{[\s\S]*?\}\1"/, greedy: !0 },
              { pattern: /"(?:%\s+%|%.|[^%"\r\n])*"/, greedy: !0 },
            ],
            char: /'(?:%.|[^%'\r\n])+'/,
            keyword: /\b(?:across|agent|alias|all|and|attached|as|assign|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\b/i,
            boolean: /\b(?:True|False)\b/i,
            "class-name": { pattern: /\b[A-Z][\dA-Z_]*\b/, alias: "builtin" },
            number: [
              /\b0[xcb][\da-f](?:_*[\da-f])*\b/i,
              /(?:\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*|\d(?:_*\d)*\.?/i,
            ],
            punctuation: /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/,
            operator: /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/,
          }),
          (n.languages.elixir = {
            comment: { pattern: /#.*/m, lookbehind: !0 },
            regex: {
              pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
              greedy: !0,
            },
            string: [
              {
                pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
                greedy: !0,
                inside: {},
              },
              { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
              {
                pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0,
                inside: {},
              },
            ],
            atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
            "attr-name": /\w+:(?!:)/,
            capture: {
              pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
              lookbehind: !0,
              alias: "function",
            },
            argument: {
              pattern: /(^|[^&])&\d+/,
              lookbehind: !0,
              alias: "variable",
            },
            attribute: { pattern: /@\w+/, alias: "variable" },
            number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
            keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
            boolean: /\b(?:true|false|nil)\b/,
            operator: [
              /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
              { pattern: /([^<])<(?!<)/, lookbehind: !0 },
              { pattern: /([^>])>(?!>)/, lookbehind: !0 },
            ],
            punctuation: /<<|>>|[.,%\[\]{}()]/,
          }),
          n.languages.elixir.string.forEach(function (e) {
            e.inside = {
              interpolation: {
                pattern: /#\{[^}]+\}/,
                inside: {
                  delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
                  rest: n.languages.elixir,
                },
              },
            };
          }),
          (n.languages.elm = {
            comment: /--.*|{-[\s\S]*?-}/,
            char: {
              pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/,
              greedy: !0,
            },
            string: [
              { pattern: /"""[\s\S]*?"""/, greedy: !0 },
              {
                pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/,
                greedy: !0,
              },
            ],
            import_statement: {
              pattern: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+([A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
              inside: { keyword: /\b(?:import|as|exposing)\b/ },
            },
            keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
            builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
            number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
            operator: /\s\.\s|[+\-\/*=.$<>:&|^?%#@~!]{2,}|[+\-\/*=$<>:&|^?%#@~!]/,
            hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
            constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
            punctuation: /[{}[\]|(),.:]/,
          }),
          (n.languages["markup-templating"] = {}),
          Object.defineProperties(n.languages["markup-templating"], {
            buildPlaceholders: {
              value: function (e, t, a, i) {
                e.language === t &&
                  ((e.tokenStack = []),
                  (e.code = e.code.replace(a, function (n) {
                    if ("function" == typeof i && !i(n)) return n;
                    for (
                      var a = e.tokenStack.length;
                      -1 !==
                      e.code.indexOf("___" + t.toUpperCase() + a + "___");

                    )
                      ++a;
                    return (
                      (e.tokenStack[a] = n), "___" + t.toUpperCase() + a + "___"
                    );
                  })),
                  (e.grammar = n.languages.markup));
              },
            },
            tokenizePlaceholders: {
              value: function (e, t) {
                if (e.language === t && e.tokenStack) {
                  e.grammar = n.languages[t];
                  var a = 0,
                    i = Object.keys(e.tokenStack);
                  !(function r(o) {
                    if (!(a >= i.length))
                      for (var s = 0; s < o.length; s++) {
                        var l = o[s];
                        if (
                          "string" == typeof l ||
                          (l.content && "string" == typeof l.content)
                        ) {
                          var d = i[a],
                            c = e.tokenStack[d],
                            p = "string" == typeof l ? l : l.content,
                            u = p.indexOf("___" + t.toUpperCase() + d + "___");
                          if (u > -1) {
                            ++a;
                            var g,
                              m = p.substring(0, u),
                              b = new n.Token(
                                t,
                                n.tokenize(c, e.grammar, t),
                                "language-" + t,
                                c
                              ),
                              f = p.substring(
                                u + ("___" + t.toUpperCase() + d + "___").length
                              );
                            if (
                              (m || f
                                ? r(
                                    (g = [m, b, f].filter(function (e) {
                                      return !!e;
                                    }))
                                  )
                                : (g = b),
                              "string" == typeof l
                                ? Array.prototype.splice.apply(
                                    o,
                                    [s, 1].concat(g)
                                  )
                                : (l.content = g),
                              a >= i.length)
                            )
                              break;
                          }
                        } else
                          l.content &&
                            "string" != typeof l.content &&
                            r(l.content);
                      }
                  })(e.tokens);
                }
              },
            },
          }),
          (n.languages.erlang = {
            comment: /%.+/,
            string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
            "quoted-function": {
              pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
              alias: "function",
            },
            "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
            boolean: /\b(?:true|false)\b/,
            keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
            number: [
              /\$\\?./,
              /\d+#[a-z0-9]+/i,
              /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            ],
            function: /\b[a-z][\w@]*(?=\()/,
            variable: {
              pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
              lookbehind: !0,
            },
            operator: [
              /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
              { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
              { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
            ],
            atom: /\b[a-z][\w@]*/,
            punctuation: /[()[\]{}:;,.#|]|<<|>>/,
          }),
          (n.languages.fsharp = n.languages.extend("clike", {
            comment: [
              { pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/, lookbehind: !0 },
              { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
            ],
            keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
            string: {
              pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1)B?/,
              greedy: !0,
            },
            number: [
              /\b0x[\da-fA-F]+(?:un|lf|LF)?\b/,
              /\b0b[01]+(?:y|uy)?\b/,
              /(?:\b\d+\.?\d*|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
              /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/,
            ],
          })),
          n.languages.insertBefore("fsharp", "keyword", {
            preprocessor: {
              pattern: /^[^\r\n\S]*#.*/m,
              alias: "property",
              inside: {
                directive: {
                  pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
                  lookbehind: !0,
                  alias: "keyword",
                },
              },
            },
          }),
          (function (e) {
            (e.languages.flow = e.languages.extend("javascript", {})),
              e.languages.insertBefore("flow", "keyword", {
                type: [
                  {
                    pattern: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
                    alias: "tag",
                  },
                ],
              }),
              (e.languages.flow[
                "function-variable"
              ].pattern = /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i),
              e.languages.insertBefore("flow", "operator", {
                "flow-punctuation": {
                  pattern: /\{\||\|\}/,
                  alias: "punctuation",
                },
              }),
              "Array" !== e.util.type(e.languages.flow.keyword) &&
                (e.languages.flow.keyword = [e.languages.flow.keyword]),
              e.languages.flow.keyword.unshift(
                {
                  pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/,
                  lookbehind: !0,
                },
                {
                  pattern: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
                  lookbehind: !0,
                }
              );
          })(n),
          (n.languages.fortran = {
            "quoted-number": {
              pattern: /[BOZ](['"])[A-F0-9]+\1/i,
              alias: "number",
            },
            string: {
              pattern: /(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/,
              inside: {
                comment: { pattern: /(&(?:\r\n?|\n)\s*)!.*/, lookbehind: !0 },
              },
            },
            comment: { pattern: /!.*/, greedy: !0 },
            boolean: /\.(?:TRUE|FALSE)\.(?:_\w+)?/i,
            number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
            keyword: [
              /\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i,
              /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i,
              /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i,
              /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i,
            ],
            operator: [
              /\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i,
              { pattern: /(^|(?!\().)\/(?!\))/, lookbehind: !0 },
            ],
            punctuation: /\(\/|\/\)|[(),;:&]/,
          }),
          (n.languages.gedcom = {
            "line-value": {
              pattern: /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?\w+ +).+/m,
              lookbehind: !0,
              inside: {
                pointer: {
                  pattern: /^@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^`{|}~\x80-\xfe #]*@$/,
                  alias: "variable",
                },
              },
            },
            tag: {
              pattern: /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?)\w+/m,
              lookbehind: !0,
              alias: "string",
            },
            level: { pattern: /(^\s*)\d+/m, lookbehind: !0, alias: "number" },
            pointer: {
              pattern: /@\w[\w!"$%&'()*+,\-.\/:;<=>?[\\\]^`{|}~\x80-\xfe #]*@/,
              alias: "variable",
            },
          }),
          (n.languages.gherkin = {
            pystring: { pattern: /("""|''')[\s\S]+?\1/, alias: "string" },
            comment: { pattern: /((?:^|\r?\n|\r)[ \t]*)#.*/, lookbehind: !0 },
            tag: { pattern: /((?:^|\r?\n|\r)[ \t]*)@\S*/, lookbehind: !0 },
            feature: {
              pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenskab|Egenskap|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|laH|Lastnost|Mak|Mogucnost|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|perbogh|poQbogh malja'|Potrzeba biznesowa|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^:]+(?:\r?\n|\r|$))*/,
              lookbehind: !0,
              inside: {
                important: { pattern: /(:)[^\r\n]+/, lookbehind: !0 },
                keyword: /[^:\r\n]+:/,
              },
            },
            scenario: {
              pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedentes|Antecedents|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cenario|Cenário|Cenario de Fundo|Cenário de Fundo|Cenarios|Cenários|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram senaryo|Dyagram Senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|Examples|EXAMPLZ|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|ghantoH|Grundlage|Hannergrond|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut|lut chovnatlh|lutmey|Lýsing Atburðarásar|Lýsing Dæma|Menggariskan Senario|MISHUN|MISHUN SRSLY|mo'|Náčrt Scenára|Náčrt Scénáře|Náčrt Scenáru|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan senaryo|Plan Senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primer|Primeri|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenarie|Scenarij|Scenarijai|Scenarijaus šablonas|Scenariji|Scenārijs|Scenārijs pēc parauga|Scenarijus|Scenario|Scénario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senario|Senaryo|Senaryo deskripsyon|Senaryo Deskripsyon|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie|Situasie Uiteensetting|Skenario|Skenario konsep|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa|Swa hwaer swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo\-ho\-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρια|Σενάριο|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Пример|Примери|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例|例子|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^:\r\n]*/,
              lookbehind: !0,
              inside: {
                important: { pattern: /(:)[^\r\n]*/, lookbehind: !0 },
                keyword: /[^:\r\n]+:/,
              },
            },
            "table-body": {
              pattern: /((?:\r?\n|\r)[ \t]*\|.+\|[^\r\n]*)+/,
              lookbehind: !0,
              inside: {
                outline: { pattern: /<[^>]+?>/, alias: "variable" },
                td: { pattern: /\s*[^\s|][^|]*/, alias: "string" },
                punctuation: /\|/,
              },
            },
            "table-head": {
              pattern: /(?:\r?\n|\r)[ \t]*\|.+\|[^\r\n]*/,
              inside: {
                th: { pattern: /\s*[^\s|][^|]*/, alias: "variable" },
                punctuation: /\|/,
              },
            },
            atrule: {
              pattern: /((?:\r?\n|\r)[ \t]+)(?:'ach|'a|'ej|7|a|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cando|Cand|Ce|Cuando|Če|Ða ðe|Ða|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Daţi fiind|Dați fiind|Dato|DEN|Den youse gotta|Dengan|De|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|Entonces|En|Epi|E|És|Etant donnée|Etant donné|Et|Étant données|Étant donnée|Étant donné|Etant données|Etant donnés|Étant donnés|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kadar|Kada|Kad|Kai|Kaj|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Majd|Maka|Manawa|Mas|Ma|Menawa|Men|Mutta|Nalikaning|Nalika|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Og|Och|Oletetaan|Onda|Ond|Oraz|Pak|Pero|Però|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|qaSDI'|Quando|Quand|Quan|Så|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Thì|Thurh|Toda|Too right|ugeholl|Und|Un|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadani|Zadano|Zadan|Zadate|Zadato|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Але|Али|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задате|Задати|Задато|И|І|К тому же|Када|Кад|Когато|Когда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|Онда|Припустимо, що|Припустимо|Пусть|Также|Та|Тогда|Тоді|То|Унда|Һәм|Якщо|אבל|אזי|אז|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ \t]+)/,
              lookbehind: !0,
            },
            string: {
              pattern: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/,
              inside: { outline: { pattern: /<[^>]+?>/, alias: "variable" } },
            },
            outline: { pattern: /<[^>]+?>/, alias: "variable" },
          }),
          (n.languages.git = {
            comment: /^#.*/m,
            deleted: /^[-–].*/m,
            inserted: /^\+.*/m,
            string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
            command: {
              pattern: /^.*\$ git .*$/m,
              inside: { parameter: /\s--?\w+/m },
            },
            coord: /^@@.*@@$/m,
            commit_sha1: /^commit \w{40}$/m,
          }),
          (n.languages.glsl = n.languages.extend("clike", {
            comment: [
              /\/\*[\s\S]*?\*\//,
              /\/\/(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
            ],
            number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ulf]*/i,
            keyword: /\b(?:attribute|const|uniform|varying|buffer|shared|coherent|volatile|restrict|readonly|writeonly|atomic_uint|layout|centroid|flat|smooth|noperspective|patch|sample|break|continue|do|for|while|switch|case|default|if|else|subroutine|in|out|inout|float|double|int|void|bool|true|false|invariant|precise|discard|return|d?mat[234](?:x[234])?|[ibdu]?vec[234]|uint|lowp|mediump|highp|precision|[iu]?sampler[123]D|[iu]?samplerCube|sampler[12]DShadow|samplerCubeShadow|[iu]?sampler[12]DArray|sampler[12]DArrayShadow|[iu]?sampler2DRect|sampler2DRectShadow|[iu]?samplerBuffer|[iu]?sampler2DMS(?:Array)?|[iu]?samplerCubeArray|samplerCubeArrayShadow|[iu]?image[123]D|[iu]?image2DRect|[iu]?imageCube|[iu]?imageBuffer|[iu]?image[12]DArray|[iu]?imageCubeArray|[iu]?image2DMS(?:Array)?|struct|common|partition|active|asm|class|union|enum|typedef|template|this|resource|goto|inline|noinline|public|static|extern|external|interface|long|short|half|fixed|unsigned|superp|input|output|hvec[234]|fvec[234]|sampler3DRect|filter|sizeof|cast|namespace|using)\b/,
          })),
          n.languages.insertBefore("glsl", "comment", {
            preprocessor: {
              pattern: /(^[ \t]*)#(?:(?:define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|extension|version|line)\b)?/m,
              lookbehind: !0,
              alias: "builtin",
            },
          }),
          (n.languages.go = n.languages.extend("clike", {
            keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
            builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
            boolean: /\b(?:_|iota|nil|true|false)\b/,
            operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
            number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
            string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
          })),
          delete n.languages.go["class-name"],
          (n.languages.graphql = {
            comment: /#.*/,
            string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
            number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
            boolean: /\b(?:true|false)\b/,
            variable: /\$[a-z_]\w*/i,
            directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
            "attr-name": /[a-z_]\w*(?=\s*:)/i,
            keyword: [
              {
                pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.{3}\s*)on\b/,
                lookbehind: !0,
              },
              /\b(?:query|fragment|mutation)\b/,
            ],
            operator: /!|=|\.{3}/,
            punctuation: /[!(){}\[\]:=,]/,
          }),
          (n.languages.groovy = n.languages.extend("clike", {
            keyword: /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
            string: [
              {
                pattern: /("""|''')[\s\S]*?\1|(?:\$\/)(?:\$\/\$|[\s\S])*?\/\$/,
                greedy: !0,
              },
              { pattern: /(["'\/])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            ],
            number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
            operator: {
              pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.{1,2}(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
              lookbehind: !0,
            },
            punctuation: /\.+|[{}[\];(),:$]/,
          })),
          n.languages.insertBefore("groovy", "string", {
            shebang: { pattern: /#!.+/, alias: "comment" },
          }),
          n.languages.insertBefore("groovy", "punctuation", {
            "spock-block": /\b(?:setup|given|when|then|and|cleanup|expect|where):/,
          }),
          n.languages.insertBefore("groovy", "function", {
            annotation: {
              alias: "punctuation",
              pattern: /(^|[^.])@\w+/,
              lookbehind: !0,
            },
          }),
          n.hooks.add("wrap", function (e) {
            if ("groovy" === e.language && "string" === e.type) {
              var t = e.content[0];
              if ("'" != t) {
                var a = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
                "$" === t && (a = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/),
                  (e.content = e.content
                    .replace(/&lt;/g, "<")
                    .replace(/&amp;/g, "&")),
                  (e.content = n.highlight(e.content, {
                    expression: {
                      pattern: a,
                      lookbehind: !0,
                      inside: n.languages.groovy,
                    },
                  })),
                  e.classes.push("/" === t ? "regex" : "gstring");
              }
            }
          }),
          (function (e) {
            e.languages.haml = {
              "multiline-comment": {
                pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
                lookbehind: !0,
                alias: "comment",
              },
              "multiline-code": [
                {
                  pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
                  lookbehind: !0,
                  inside: { rest: e.languages.ruby },
                },
                {
                  pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
                  lookbehind: !0,
                  inside: { rest: e.languages.ruby },
                },
              ],
              filter: {
                pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
                lookbehind: !0,
                inside: {
                  "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                },
              },
              markup: {
                pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
                lookbehind: !0,
                inside: { rest: e.languages.markup },
              },
              doctype: {
                pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
                lookbehind: !0,
              },
              tag: {
                pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
                lookbehind: !0,
                inside: {
                  attributes: [
                    {
                      pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
                      lookbehind: !0,
                      inside: { rest: e.languages.ruby },
                    },
                    {
                      pattern: /\([^)]+\)/,
                      inside: {
                        "attr-value": {
                          pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                          lookbehind: !0,
                        },
                        "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                        punctuation: /[=(),]/,
                      },
                    },
                    {
                      pattern: /\[[^\]]+\]/,
                      inside: { rest: e.languages.ruby },
                    },
                  ],
                  punctuation: /[<>]/,
                },
              },
              code: {
                pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
                lookbehind: !0,
                inside: { rest: e.languages.ruby },
              },
              interpolation: {
                pattern: /#\{[^}]+\}/,
                inside: {
                  delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
                  rest: e.languages.ruby,
                },
              },
              punctuation: {
                pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
                lookbehind: !0,
              },
            };
            for (
              var t = [
                  "css",
                  { filter: "coffee", language: "coffeescript" },
                  "erb",
                  "javascript",
                  "less",
                  "markdown",
                  "ruby",
                  "scss",
                  "textile",
                ],
                n = {},
                a = 0,
                i = t.length;
              i > a;
              a++
            ) {
              var r = t[a];
              (r = "string" == typeof r ? { filter: r, language: r } : r),
                e.languages[r.language] &&
                  (n["filter-" + r.filter] = {
                    pattern: RegExp(
                      "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace(
                        "{{filter_name}}",
                        r.filter
                      )
                    ),
                    lookbehind: !0,
                    inside: {
                      "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                      rest: e.languages[r.language],
                    },
                  });
            }
            e.languages.insertBefore("haml", "filter", n);
          })(n),
          (function (e) {
            (e.languages.handlebars = {
              comment: /\{\{![\s\S]*?\}\}/,
              delimiter: {
                pattern: /^\{\{\{?|\}\}\}?$/i,
                alias: "punctuation",
              },
              string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
              number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
              boolean: /\b(?:true|false)\b/,
              block: {
                pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
                lookbehind: !0,
                alias: "keyword",
              },
              brackets: {
                pattern: /\[[^\]]+\]/,
                inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
              },
              punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
              variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/,
            }),
              e.hooks.add("before-tokenize", function (t) {
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "handlebars",
                  /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
                );
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(
                  t,
                  "handlebars"
                );
              });
          })(n),
          (n.languages.haskell = {
            comment: {
              pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
              lookbehind: !0,
            },
            char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
            string: {
              pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
              greedy: !0,
            },
            keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
            import_statement: {
              pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
              lookbehind: !0,
              inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
            },
            builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
            number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
            operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
            hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
            constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.haxe = n.languages.extend("clike", {
            string: {
              pattern: /(["'])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
              greedy: !0,
              inside: {
                interpolation: {
                  pattern: /(^|[^\\])\$(?:\w+|\{[^}]+\})/,
                  lookbehind: !0,
                  inside: {
                    interpolation: { pattern: /^\$\w*/, alias: "variable" },
                  },
                },
              },
            },
            keyword: /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|from|for|function|if|implements|import|in|inline|interface|macro|new|null|override|public|private|return|static|super|switch|throw|to|try|typedef|using|var|while)(?!\.)\b/,
            operator: /\.{3}|\+\+?|-[->]?|[=!]=?|&&?|\|\|?|<[<=]?|>[>=]?|[*\/%~^]/,
          })),
          n.languages.insertBefore("haxe", "class-name", {
            regex: { pattern: /~\/(?:[^\/\\\r\n]|\\.)+\/[igmsu]*/, greedy: !0 },
          }),
          n.languages.insertBefore("haxe", "keyword", {
            preprocessor: { pattern: /#\w+/, alias: "builtin" },
            metadata: { pattern: /@:?\w+/, alias: "symbol" },
            reification: { pattern: /\$(?:\w+|(?=\{))/, alias: "variable" },
          }),
          (n.languages.haxe.string.inside.interpolation.inside.rest =
            n.languages.haxe),
          delete n.languages.haxe["class-name"],
          (n.languages.http = {
            "request-line": {
              pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
              inside: {
                property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
                "attr-name": /:\w+/,
              },
            },
            "response-status": {
              pattern: /^HTTP\/1.[01] \d+.*/m,
              inside: {
                property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 },
              },
            },
            "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
          });
        var i = {
          "application/json": n.languages.javascript,
          "application/xml": n.languages.markup,
          "text/xml": n.languages.markup,
          "text/html": n.languages.markup,
        };
        for (var r in i)
          if (i[r]) {
            var o = {};
            (o[r] = {
              pattern: new RegExp(
                "(content-type:\\s*" +
                  r +
                  "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*",
                "i"
              ),
              lookbehind: !0,
              inside: { rest: i[r] },
            }),
              n.languages.insertBefore("http", "header-name", o);
          }
        (n.languages.hpkp = {
          directive: {
            pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=\/]+"|(?:max-age|report-uri)=|report-to )/,
            alias: "keyword",
          },
          safe: { pattern: /\d{7,}/, alias: "selector" },
          unsafe: { pattern: /\d{0,6}/, alias: "function" },
        }),
          (n.languages.hsts = {
            directive: {
              pattern: /\b(?:max-age=|includeSubDomains|preload)/,
              alias: "keyword",
            },
            safe: { pattern: /\d{8,}/, alias: "selector" },
            unsafe: { pattern: /\d{0,7}/, alias: "function" },
          }),
          (n.languages.ichigojam = {
            comment: /(?:\B'|REM)(?:[^\n\r]*)/i,
            string: {
              pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
              greedy: !0,
            },
            number: /\B#[0-9A-F]+|\B`[01]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
            keyword: /\b(?:BEEP|BPS|CASE|CLEAR|CLK|CLO|CLP|CLS|CLT|CLV|CONT|COPY|ELSE|END|FILE|FILES|FOR|GOSUB|GSB|GOTO|IF|INPUT|KBD|LED|LET|LIST|LOAD|LOCATE|LRUN|NEW|NEXT|OUT|RIGHT|PLAY|POKE|PRINT|PWM|REM|RENUM|RESET|RETURN|RTN|RUN|SAVE|SCROLL|SLEEP|SRND|STEP|STOP|SUB|TEMPO|THEN|TO|UART|VIDEO|WAIT)(?:\$|\b)/i,
            function: /\b(?:ABS|ANA|ASC|BIN|BTN|DEC|END|FREE|HELP|HEX|I2CR|I2CW|IN|INKEY|LEN|LINE|PEEK|RND|SCR|SOUND|STR|TICK|USR|VER|VPEEK|ZER)(?:\$|\b)/i,
            label: /(?:\B@[^\s]+)/i,
            operator: /<[=>]?|>=?|\|\||&&|[+\-*\/=|&^~!]|\b(?:AND|NOT|OR)\b/i,
            punctuation: /[\[,;:()\]]/,
          }),
          (n.languages.icon = {
            comment: /#.*/,
            string: {
              pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
              greedy: !0,
            },
            number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
            "builtin-keyword": {
              pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
              alias: "variable",
            },
            directive: { pattern: /\$\w+/, alias: "builtin" },
            keyword: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
            function: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
            operator: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
            punctuation: /[\[\](){},;]/,
          }),
          (n.languages.inform7 = {
            string: {
              pattern: /"[^"]*"/,
              inside: {
                substitution: {
                  pattern: /\[[^\]]+\]/,
                  inside: {
                    delimiter: { pattern: /\[|\]/, alias: "punctuation" },
                  },
                },
              },
            },
            comment: { pattern: /\[[^\]]+\]/, greedy: !0 },
            title: {
              pattern: /^[ \t]*(?:volume|book|part(?! of)|chapter|section|table)\b.+/im,
              alias: "important",
            },
            number: {
              pattern: /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?\w*|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve))\b(?!-)/i,
              lookbehind: !0,
            },
            verb: {
              pattern: /(^|[^-])\b(?:applying to|are|attacking|answering|asking|be(?:ing)?|burning|buying|called|carries|carry(?! out)|carrying|climbing|closing|conceal(?:s|ing)?|consulting|contain(?:s|ing)?|cutting|drinking|dropping|eating|enclos(?:es?|ing)|entering|examining|exiting|getting|giving|going|ha(?:ve|s|ving)|hold(?:s|ing)?|impl(?:y|ies)|incorporat(?:es?|ing)|inserting|is|jumping|kissing|listening|locking|looking|mean(?:s|ing)?|opening|provid(?:es?|ing)|pulling|pushing|putting|relat(?:es?|ing)|removing|searching|see(?:s|ing)?|setting|showing|singing|sleeping|smelling|squeezing|switching|support(?:s|ing)?|swearing|taking|tasting|telling|thinking|throwing|touching|turning|tying|unlock(?:s|ing)?|var(?:y|ies|ying)|waiting|waking|waving|wear(?:s|ing)?)\b(?!-)/i,
              lookbehind: !0,
              alias: "operator",
            },
            keyword: {
              pattern: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|unless|the story)|every turn|if|include|instead(?: of)?|let|move|no|now|otherwise|repeat|report|resume the story|rule for|running through|say(?:ing)?|stop the action|test|try(?:ing)?|understand|unless|use|when|while|yes)\b(?!-)/i,
              lookbehind: !0,
            },
            property: {
              pattern: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lock(?:able|ed)|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed(?: on| off)?)|touch(?:able|ed)|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
              lookbehind: !0,
              alias: "symbol",
            },
            position: {
              pattern: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|north(?:east|west)?|nowhere|on(?: top of)?|other side|outside(?: from)?|parts? of|regionally in|south(?:east|west)?|through|up|west|within)\b(?!-)/i,
              lookbehind: !0,
              alias: "keyword",
            },
            type: {
              pattern: /(^|[^-])\b(?:actions?|activit(?:y|ies)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
              lookbehind: !0,
              alias: "variable",
            },
            punctuation: /[.,:;(){}]/,
          }),
          (n.languages.inform7.string.inside.substitution.inside.rest =
            n.languages.inform7),
          (n.languages.inform7.string.inside.substitution.inside.rest.text = {
            pattern: /\S(?:\s*\S)*/,
            alias: "comment",
          }),
          (n.languages.ini = {
            comment: /^[ \t]*;.*$/m,
            selector: /^[ \t]*\[.*?\]/m,
            constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
            "attr-value": { pattern: /=.*/, inside: { punctuation: /^[=]/ } },
          }),
          (n.languages.io = {
            comment: [
              { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
              { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
              { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
            ],
            "triple-quoted-string": {
              pattern: /"""(?:\\[\s\S]|(?!""")[^\\])*"""/,
              greedy: !0,
              alias: "string",
            },
            string: { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
            keyword: /\b(?:activate|activeCoroCount|asString|block|break|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getSlot|getEnvironmentVariable|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|setSlot|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|call|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/,
            builtin: /\b(?:Array|AudioDevice|AudioMixer|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GL|GLE|GLScissor|GLU|GLUCylinder|GLUQuadric|GLUSphere|GLUT|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Regex|SGML|SGMLElement|SGMLParser|SQLite|Server|Sequence|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink|Random|BigNum|Sequence)\b/,
            boolean: /\b(?:true|false|nil)\b/,
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?/i,
            operator: /[=!*\/%+-^&|]=|>>?=?|<<?=?|:?:?=|\+\+?|--?|\*\*?|\/\/?|%|\|\|?|&&?|(\b(?:return|and|or|not)\b)|@@?|\?\??|\.\./,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.j = {
            comment: /\bNB\..*/,
            string: { pattern: /'(?:''|[^'\r\n])*'/, greedy: !0 },
            keyword: /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
            verb: {
              pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
              alias: "keyword",
            },
            number: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_(?!\.))/,
            adverb: {
              pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/,
              alias: "builtin",
            },
            operator: /[=a][.:]|_\./,
            conjunction: {
              pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
              alias: "variable",
            },
            punctuation: /[()]/,
          }),
          (n.languages.java = n.languages.extend("clike", {
            keyword: /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
            number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
            operator: {
              pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
              lookbehind: !0,
            },
          })),
          n.languages.insertBefore("java", "function", {
            annotation: {
              alias: "punctuation",
              pattern: /(^|[^.])@\w+/,
              lookbehind: !0,
            },
          }),
          n.languages.insertBefore("java", "class-name", {
            generics: {
              pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
              alias: "function",
              inside: {
                keyword: n.languages.java.keyword,
                punctuation: /[<>(),.:]/,
              },
            },
          }),
          (n.languages.jolie = n.languages.extend("clike", {
            keyword: /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/,
            builtin: /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
            number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?l?/i,
            operator: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/,
            symbol: /[|;@]/,
            punctuation: /[,.]/,
            string: {
              pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
          })),
          delete n.languages.jolie["class-name"],
          delete n.languages.jolie.function,
          n.languages.insertBefore("jolie", "keyword", {
            function: {
              pattern: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/,
              lookbehind: !0,
            },
            aggregates: {
              pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
              lookbehind: !0,
              inside: {
                withExtension: {
                  pattern: /\bwith\s+\w+/,
                  inside: { keyword: /\bwith\b/ },
                },
                function: { pattern: /\w+/ },
                punctuation: { pattern: /,/ },
              },
            },
            redirects: {
              pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
              lookbehind: !0,
              inside: {
                punctuation: { pattern: /,/ },
                function: { pattern: /\w+/ },
                symbol: { pattern: /=>/ },
              },
            },
          }),
          (n.languages.json = {
            property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
            string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            punctuation: /[{}[\]);,]/,
            operator: /:/g,
            boolean: /\b(?:true|false)\b/i,
            null: /\bnull\b/i,
          }),
          (n.languages.jsonp = n.languages.json),
          (n.languages.julia = {
            comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
            string: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,
            keyword: /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|let|local|macro|module|print|println|quote|return|try|type|typealias|using|while)\b/,
            boolean: /\b(?:true|false)\b/,
            number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?/i,
            operator: /[-+*^%÷&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.keyman = {
            comment: /\bc\s.*/i,
            function: /\[\s*(?:(?:CTRL|SHIFT|ALT|LCTRL|RCTRL|LALT|RALT|CAPS|NCAPS)\s+)*(?:[TKU]_[\w?]+|".+?"|'.+?')\s*\]/i,
            string: /("|').*?\1/,
            bold: [
              /&(?:baselayout|bitmap|capsononly|capsalwaysoff|shiftfreescaps|copyright|ethnologuecode|hotkey|includecodes|keyboardversion|kmw_embedcss|kmw_embedjs|kmw_helpfile|kmw_helptext|kmw_rtl|language|layer|layoutfile|message|mnemoniclayout|name|oldcharposmatching|platform|targets|version|visualkeyboard|windowslanguages)\b/i,
              /\b(?:bitmap|bitmaps|caps on only|caps always off|shift frees caps|copyright|hotkey|language|layout|message|name|version)\b/i,
            ],
            keyword: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|return|reset|save|set|store|use)\b/i,
            atrule: /\b(?:ansi|begin|unicode|group|using keys|match|nomatch)\b/i,
            number: /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i,
            operator: /[+>\\,()]/,
            tag: /\$(?:keyman|kmfl|weaver|keymanweb|keymanonly):/i,
          }),
          (function (e) {
            (e.languages.kotlin = e.languages.extend("clike", {
              keyword: {
                pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
                lookbehind: !0,
              },
              function: [
                /\w+(?=\s*\()/,
                { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 },
              ],
              number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
              operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
            })),
              delete e.languages.kotlin["class-name"],
              e.languages.insertBefore("kotlin", "string", {
                "raw-string": {
                  pattern: /("""|''')[\s\S]*?\1/,
                  alias: "string",
                },
              }),
              e.languages.insertBefore("kotlin", "keyword", {
                annotation: {
                  pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
                  alias: "builtin",
                },
              }),
              e.languages.insertBefore("kotlin", "function", {
                label: { pattern: /\w+@|@\w+/, alias: "symbol" },
              });
            var t = [
              {
                pattern: /\$\{[^}]+\}/,
                inside: {
                  delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
                  rest: e.languages.kotlin,
                },
              },
              { pattern: /\$\w+/, alias: "variable" },
            ];
            e.languages.kotlin.string.inside = e.languages.kotlin[
              "raw-string"
            ].inside = { interpolation: t };
          })(n),
          (function (e) {
            var t = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
              a = { "equation-command": { pattern: t, alias: "regex" } };
            n.languages.latex = {
              comment: /%.*/m,
              cdata: {
                pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                lookbehind: !0,
              },
              equation: [
                {
                  pattern: /\$(?:\\[\s\S]|[^\\$])*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
                  inside: a,
                  alias: "string",
                },
                {
                  pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                  lookbehind: !0,
                  inside: a,
                  alias: "string",
                },
              ],
              keyword: {
                pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
                lookbehind: !0,
              },
              url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
              headline: {
                pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
                lookbehind: !0,
                alias: "class-name",
              },
              function: { pattern: t, alias: "selector" },
              punctuation: /[[\]{}&]/,
            };
          })(),
          (n.languages.less = n.languages.extend("css", {
            comment: [
              /\/\*[\s\S]*?\*\//,
              { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
            ],
            atrule: {
              pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
              inside: { punctuation: /[:()]/ },
            },
            selector: {
              pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
              inside: { variable: /@+[\w-]+/ },
            },
            property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
            punctuation: /[{}();:,]/,
            operator: /[+\-*\/]/,
          })),
          n.languages.insertBefore("less", "punctuation", {
            function: n.languages.less.function,
          }),
          n.languages.insertBefore("less", "property", {
            variable: [
              { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
              /@@?[\w-]+/,
            ],
            "mixin-usage": {
              pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
              lookbehind: !0,
              alias: "function",
            },
          }),
          (n.languages.liquid = {
            keyword: /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/,
            number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
            operator: {
              pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
              lookbehind: !0,
            },
            function: {
              pattern: /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s;|&])/,
              lookbehind: !0,
            },
          }),
          (function (e) {
            function t(e) {
              return new RegExp("(\\()" + e + "(?=[\\s\\)])");
            }
            function n(e) {
              return new RegExp("([\\s([])" + e + "(?=[\\s)])");
            }
            var a = "[-+*/_~!@$%^=<>{}\\w]+",
              i = "(\\()",
              r = "(?=\\))",
              o = "(?=\\s)",
              s = {
                heading: { pattern: /;;;.*/, alias: ["comment", "title"] },
                comment: /;.*/,
                string: {
                  pattern: /"(?:[^"\\]*|\\.)*"/,
                  greedy: !0,
                  inside: {
                    argument: /[-A-Z]+(?=[.,\s])/,
                    symbol: new RegExp("`" + a + "'"),
                  },
                },
                "quoted-symbol": {
                  pattern: new RegExp("#?'" + a),
                  alias: ["variable", "symbol"],
                },
                "lisp-property": {
                  pattern: new RegExp(":" + a),
                  alias: "property",
                },
                splice: {
                  pattern: new RegExp(",@?" + a),
                  alias: ["symbol", "variable"],
                },
                keyword: [
                  {
                    pattern: new RegExp(
                      i +
                        "(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)" +
                        o
                    ),
                    lookbehind: !0,
                  },
                  {
                    pattern: new RegExp(
                      i +
                        "(?:for|do|collect|return|finally|append|concat|in|by)" +
                        o
                    ),
                    lookbehind: !0,
                  },
                ],
                declare: {
                  pattern: t("declare"),
                  lookbehind: !0,
                  alias: "keyword",
                },
                interactive: {
                  pattern: t("interactive"),
                  lookbehind: !0,
                  alias: "keyword",
                },
                boolean: { pattern: n("(?:t|nil)"), lookbehind: !0 },
                number: { pattern: n("[-+]?\\d+(?:\\.\\d*)?"), lookbehind: !0 },
                defvar: {
                  pattern: new RegExp(
                    i + "def(?:var|const|custom|group)\\s+" + a
                  ),
                  lookbehind: !0,
                  inside: { keyword: /^def[a-z]+/, variable: new RegExp(a) },
                },
                defun: {
                  pattern: new RegExp(
                    i +
                      "(?:cl-)?(?:defun\\*?|defmacro)\\s+" +
                      a +
                      "\\s+\\([\\s\\S]*?\\)"
                  ),
                  lookbehind: !0,
                  inside: {
                    keyword: /^(?:cl-)?def\S+/,
                    arguments: null,
                    function: {
                      pattern: new RegExp("(^\\s)" + a),
                      lookbehind: !0,
                    },
                    punctuation: /[()]/,
                  },
                },
                lambda: {
                  pattern: new RegExp(
                    i + "lambda\\s+\\((?:&?" + a + "\\s*)*\\)"
                  ),
                  lookbehind: !0,
                  inside: {
                    keyword: /^lambda/,
                    arguments: null,
                    punctuation: /[()]/,
                  },
                },
                car: { pattern: new RegExp(i + a), lookbehind: !0 },
                punctuation: [
                  /(['`,]?\(|[)\[\]])/,
                  { pattern: /(\s)\.(?=\s)/, lookbehind: !0 },
                ],
              },
              l = {
                "lisp-marker": new RegExp("&[-+*/_~!@$%^=<>{}\\w]+"),
                rest: {
                  argument: { pattern: new RegExp(a), alias: "variable" },
                  varform: {
                    pattern: new RegExp(i + a + "\\s+\\S[\\s\\S]*" + r),
                    lookbehind: !0,
                    inside: {
                      string: s.string,
                      boolean: s.boolean,
                      number: s.number,
                      symbol: s.symbol,
                      punctuation: /[()]/,
                    },
                  },
                },
              },
              d = "\\S+(?:\\s+\\S+)*",
              c = {
                pattern: new RegExp(i + "[\\s\\S]*" + r),
                lookbehind: !0,
                inside: {
                  "rest-vars": {
                    pattern: new RegExp("&(?:rest|body)\\s+" + d),
                    inside: l,
                  },
                  "other-marker-vars": {
                    pattern: new RegExp("&(?:optional|aux)\\s+" + d),
                    inside: l,
                  },
                  keys: {
                    pattern: new RegExp(
                      "&key\\s+" + d + "(?:\\s+&allow-other-keys)?"
                    ),
                    inside: l,
                  },
                  argument: { pattern: new RegExp(a), alias: "variable" },
                  punctuation: /[()]/,
                },
              };
            (s.lambda.inside.arguments = c),
              (s.defun.inside.arguments = e.util.clone(c)),
              (s.defun.inside.arguments.inside.sublist = c),
              (e.languages.lisp = s),
              (e.languages.elisp = s),
              (e.languages.emacs = s),
              (e.languages["emacs-lisp"] = s);
          })(n),
          (n.languages.livescript = {
            comment: [
              { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
              { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
            ],
            "interpolated-string": {
              pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
              lookbehind: !0,
              greedy: !0,
              inside: {
                variable: {
                  pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
                  lookbehind: !0,
                },
                interpolation: {
                  pattern: /(^|[^\\])#\{[^}]+\}/m,
                  lookbehind: !0,
                  inside: {
                    "interpolation-punctuation": {
                      pattern: /^#\{|\}$/,
                      alias: "variable",
                    },
                  },
                },
                string: /[\s\S]+/,
              },
            },
            string: [
              { pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
              { pattern: /<\[[\s\S]*?\]>/, greedy: !0 },
              /\\[^\s,;\])}]+/,
            ],
            regex: [
              {
                pattern: /\/\/(\[.+?]|\\.|(?!\/\/)[^\\])+\/\/[gimyu]{0,5}/,
                greedy: !0,
                inside: {
                  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
                },
              },
              {
                pattern: /\/(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}/,
                greedy: !0,
              },
            ],
            keyword: {
              pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
              lookbehind: !0,
            },
            "keyword-operator": {
              pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
              lookbehind: !0,
              alias: "operator",
            },
            boolean: {
              pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
              lookbehind: !0,
            },
            argument: {
              pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
              lookbehind: !0,
              alias: "variable",
            },
            number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
            identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
            operator: [
              { pattern: /( )\.(?= )/, lookbehind: !0 },
              /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/,
            ],
            punctuation: /[(){}\[\]|.,:;`]/,
          }),
          (n.languages.livescript[
            "interpolated-string"
          ].inside.interpolation.inside.rest = n.languages.livescript),
          (n.languages.lolcode = {
            comment: [/\bOBTW\s+[\s\S]*?\s+TLDR\b/, /\bBTW.+/],
            string: {
              pattern: /"(?::.|[^"])*"/,
              inside: {
                variable: /:\{[^}]+\}/,
                symbol: [/:\([a-f\d]+\)/i, /:\[[^\]]+\]/, /:[)>o":]/],
              },
              greedy: !0,
            },
            number: /(?:\B-)?(?:\b\d+\.?\d*|\B\.\d+)/,
            symbol: {
              pattern: /(^|\s)(?:A )?(?:YARN|NUMBR|NUMBAR|TROOF|BUKKIT|NOOB)(?=\s|,|$)/,
              lookbehind: !0,
              inside: { keyword: /A(?=\s)/ },
            },
            label: {
              pattern: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/,
              lookbehind: !0,
              alias: "string",
            },
            function: {
              pattern: /((?:^|\s)(?:I IZ|HOW IZ I|IZ) )[a-zA-Z]\w*/,
              lookbehind: !0,
            },
            keyword: [
              {
                pattern: /(^|\s)(?:O HAI IM|KTHX|HAI|KTHXBYE|I HAS A|ITZ(?: A)?|R|AN|MKAY|SMOOSH|MAEK|IS NOW(?: A)?|VISIBLE|GIMMEH|O RLY\?|YA RLY|NO WAI|OIC|MEBBE|WTF\?|OMG|OMGWTF|GTFO|IM IN YR|IM OUTTA YR|FOUND YR|YR|TIL|WILE|UPPIN|NERFIN|I IZ|HOW IZ I|IF U SAY SO|SRS|HAS A|LIEK(?: A)?|IZ)(?=\s|,|$)/,
                lookbehind: !0,
              },
              /'Z(?=\s|,|$)/,
            ],
            boolean: {
              pattern: /(^|\s)(?:WIN|FAIL)(?=\s|,|$)/,
              lookbehind: !0,
            },
            variable: { pattern: /(^|\s)IT(?=\s|,|$)/, lookbehind: !0 },
            operator: {
              pattern: /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:SUM|DIFF|PRODUKT|QUOSHUNT|MOD|BIGGR|SMALLR|BOTH|EITHER|WON|ALL|ANY) OF)(?=\s|,|$)/,
              lookbehind: !0,
            },
            punctuation: /\.{3}|…|,|!/,
          }),
          (n.languages.lua = {
            comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
            string: {
              pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
              greedy: !0,
            },
            number: /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
            keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
            function: /(?!\d)\w+(?=\s*(?:[({]))/,
            operator: [
              /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
              { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 },
            ],
            punctuation: /[\[\](){},;]|\.+|:+/,
          }),
          (n.languages.makefile = {
            comment: {
              pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
              lookbehind: !0,
            },
            string: {
              pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
            builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
            symbol: {
              pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
              inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ },
            },
            variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
            keyword: [
              /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
              {
                pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
                lookbehind: !0,
              },
            ],
            operator: /(?:::|[?:+!])?=|[|@]/,
            punctuation: /[:;(){}]/,
          }),
          (n.languages.markdown = n.languages.extend("markup", {})),
          n.languages.insertBefore("markdown", "prolog", {
            blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
            code: [
              { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
              { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" },
            ],
            title: [
              {
                pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
                alias: "important",
                inside: { punctuation: /==+$|--+$/ },
              },
              {
                pattern: /(^\s*)#+.+/m,
                lookbehind: !0,
                alias: "important",
                inside: { punctuation: /^#+|#+$/ },
              },
            ],
            hr: {
              pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
              lookbehind: !0,
              alias: "punctuation",
            },
            list: {
              pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
              lookbehind: !0,
              alias: "punctuation",
            },
            "url-reference": {
              pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
              inside: {
                variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/,
              },
              alias: "url",
            },
            bold: {
              pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
              lookbehind: !0,
              inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
            },
            italic: {
              pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
              lookbehind: !0,
              inside: { punctuation: /^[*_]|[*_]$/ },
            },
            url: {
              pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
              inside: {
                variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
                string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
              },
            },
          }),
          (n.languages.markdown.bold.inside.url = n.languages.markdown.url),
          (n.languages.markdown.italic.inside.url = n.languages.markdown.url),
          (n.languages.markdown.bold.inside.italic =
            n.languages.markdown.italic),
          (n.languages.markdown.italic.inside.bold = n.languages.markdown.bold),
          (function (e) {
            (e.languages.erb = e.languages.extend("ruby", {})),
              e.languages.insertBefore("erb", "comment", {
                delimiter: { pattern: /^<%=?|%>$/, alias: "punctuation" },
              }),
              e.hooks.add("before-tokenize", function (t) {
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "erb",
                  /<%=?[\s\S]+?%>/g
                );
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(t, "erb");
              });
          })(n),
          (n.languages.matlab = {
            comment: [/%\{[\s\S]*?\}%/, /%.+/],
            string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
            number: /(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
            keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
            function: /(?!\d)\w+(?=\s*\()/,
            operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
            punctuation: /\.{3}|[.,;\[\](){}!]/,
          }),
          (n.languages.mel = {
            comment: /\/\/.*/,
            code: {
              pattern: /`(?:\\.|[^\\`\r\n])*`/,
              greedy: !0,
              alias: "italic",
              inside: { delimiter: { pattern: /^`|`$/, alias: "punctuation" } },
            },
            string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
            variable: /\$\w+/,
            number: /\b0x[\da-fA-F]+\b|\b\d+\.?\d*|\B\.\d+/,
            flag: { pattern: /-[^\d\W]\w*/, alias: "operator" },
            keyword: /\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc|return|string|switch|vector|while)\b/,
            function: /\w+(?=\()|\b(?:about|abs|addAttr|addAttributeEditorNodeHelp|addDynamic|addNewShelfTab|addPP|addPanelCategory|addPrefixToName|advanceToNextDrivenKey|affectedNet|affects|aimConstraint|air|alias|aliasAttr|align|alignCtx|alignCurve|alignSurface|allViewFit|ambientLight|angle|angleBetween|animCone|animCurveEditor|animDisplay|animView|annotate|appendStringArray|applicationName|applyAttrPreset|applyTake|arcLenDimContext|arcLengthDimension|arclen|arrayMapper|art3dPaintCtx|artAttrCtx|artAttrPaintVertexCtx|artAttrSkinPaintCtx|artAttrTool|artBuildPaintMenu|artFluidAttrCtx|artPuttyCtx|artSelectCtx|artSetPaintCtx|artUserPaintCtx|assignCommand|assignInputDevice|assignViewportFactories|attachCurve|attachDeviceAttr|attachSurface|attrColorSliderGrp|attrCompatibility|attrControlGrp|attrEnumOptionMenu|attrEnumOptionMenuGrp|attrFieldGrp|attrFieldSliderGrp|attrNavigationControlGrp|attrPresetEditWin|attributeExists|attributeInfo|attributeMenu|attributeQuery|autoKeyframe|autoPlace|bakeClip|bakeFluidShading|bakePartialHistory|bakeResults|bakeSimulation|basename|basenameEx|batchRender|bessel|bevel|bevelPlus|binMembership|bindSkin|blend2|blendShape|blendShapeEditor|blendShapePanel|blendTwoAttr|blindDataType|boneLattice|boundary|boxDollyCtx|boxZoomCtx|bufferCurve|buildBookmarkMenu|buildKeyframeMenu|button|buttonManip|CBG|cacheFile|cacheFileCombine|cacheFileMerge|cacheFileTrack|camera|cameraView|canCreateManip|canvas|capitalizeString|catch|catchQuiet|ceil|changeSubdivComponentDisplayLevel|changeSubdivRegion|channelBox|character|characterMap|characterOutlineEditor|characterize|chdir|checkBox|checkBoxGrp|checkDefaultRenderGlobals|choice|circle|circularFillet|clamp|clear|clearCache|clip|clipEditor|clipEditorCurrentTimeCtx|clipSchedule|clipSchedulerOutliner|clipTrimBefore|closeCurve|closeSurface|cluster|cmdFileOutput|cmdScrollFieldExecuter|cmdScrollFieldReporter|cmdShell|coarsenSubdivSelectionList|collision|color|colorAtPoint|colorEditor|colorIndex|colorIndexSliderGrp|colorSliderButtonGrp|colorSliderGrp|columnLayout|commandEcho|commandLine|commandPort|compactHairSystem|componentEditor|compositingInterop|computePolysetVolume|condition|cone|confirmDialog|connectAttr|connectControl|connectDynamic|connectJoint|connectionInfo|constrain|constrainValue|constructionHistory|container|containsMultibyte|contextInfo|control|convertFromOldLayers|convertIffToPsd|convertLightmap|convertSolidTx|convertTessellation|convertUnit|copyArray|copyFlexor|copyKey|copySkinWeights|cos|cpButton|cpCache|cpClothSet|cpCollision|cpConstraint|cpConvClothToMesh|cpForces|cpGetSolverAttr|cpPanel|cpProperty|cpRigidCollisionFilter|cpSeam|cpSetEdit|cpSetSolverAttr|cpSolver|cpSolverTypes|cpTool|cpUpdateClothUVs|createDisplayLayer|createDrawCtx|createEditor|createLayeredPsdFile|createMotionField|createNewShelf|createNode|createRenderLayer|createSubdivRegion|cross|crossProduct|ctxAbort|ctxCompletion|ctxEditMode|ctxTraverse|currentCtx|currentTime|currentTimeCtx|currentUnit|curve|curveAddPtCtx|curveCVCtx|curveEPCtx|curveEditorCtx|curveIntersect|curveMoveEPCtx|curveOnSurface|curveSketchCtx|cutKey|cycleCheck|cylinder|dagPose|date|defaultLightListCheckBox|defaultNavigation|defineDataServer|defineVirtualDevice|deformer|deg_to_rad|delete|deleteAttr|deleteShadingGroupsAndMaterials|deleteShelfTab|deleteUI|deleteUnusedBrushes|delrandstr|detachCurve|detachDeviceAttr|detachSurface|deviceEditor|devicePanel|dgInfo|dgdirty|dgeval|dgtimer|dimWhen|directKeyCtx|directionalLight|dirmap|dirname|disable|disconnectAttr|disconnectJoint|diskCache|displacementToPoly|displayAffected|displayColor|displayCull|displayLevelOfDetail|displayPref|displayRGBColor|displaySmoothness|displayStats|displayString|displaySurface|distanceDimContext|distanceDimension|doBlur|dolly|dollyCtx|dopeSheetEditor|dot|dotProduct|doubleProfileBirailSurface|drag|dragAttrContext|draggerContext|dropoffLocator|duplicate|duplicateCurve|duplicateSurface|dynCache|dynControl|dynExport|dynExpression|dynGlobals|dynPaintEditor|dynParticleCtx|dynPref|dynRelEdPanel|dynRelEditor|dynamicLoad|editAttrLimits|editDisplayLayerGlobals|editDisplayLayerMembers|editRenderLayerAdjustment|editRenderLayerGlobals|editRenderLayerMembers|editor|editorTemplate|effector|emit|emitter|enableDevice|encodeString|endString|endsWith|env|equivalent|equivalentTol|erf|error|eval|evalDeferred|evalEcho|event|exactWorldBoundingBox|exclusiveLightCheckBox|exec|executeForEachObject|exists|exp|expression|expressionEditorListen|extendCurve|extendSurface|extrude|fcheck|fclose|feof|fflush|fgetline|fgetword|file|fileBrowserDialog|fileDialog|fileExtension|fileInfo|filetest|filletCurve|filter|filterCurve|filterExpand|filterStudioImport|findAllIntersections|findAnimCurves|findKeyframe|findMenuItem|findRelatedSkinCluster|finder|firstParentOf|fitBspline|flexor|floatEq|floatField|floatFieldGrp|floatScrollBar|floatSlider|floatSlider2|floatSliderButtonGrp|floatSliderGrp|floor|flow|fluidCacheInfo|fluidEmitter|fluidVoxelInfo|flushUndo|fmod|fontDialog|fopen|formLayout|format|fprint|frameLayout|fread|freeFormFillet|frewind|fromNativePath|fwrite|gamma|gauss|geometryConstraint|getApplicationVersionAsFloat|getAttr|getClassification|getDefaultBrush|getFileList|getFluidAttr|getInputDeviceRange|getMayaPanelTypes|getModifiers|getPanel|getParticleAttr|getPluginResource|getenv|getpid|glRender|glRenderEditor|globalStitch|gmatch|goal|gotoBindPose|grabColor|gradientControl|gradientControlNoAttr|graphDollyCtx|graphSelectContext|graphTrackCtx|gravity|grid|gridLayout|group|groupObjectsByName|HfAddAttractorToAS|HfAssignAS|HfBuildEqualMap|HfBuildFurFiles|HfBuildFurImages|HfCancelAFR|HfConnectASToHF|HfCreateAttractor|HfDeleteAS|HfEditAS|HfPerformCreateAS|HfRemoveAttractorFromAS|HfSelectAttached|HfSelectAttractors|HfUnAssignAS|hardenPointCurve|hardware|hardwareRenderPanel|headsUpDisplay|headsUpMessage|help|helpLine|hermite|hide|hilite|hitTest|hotBox|hotkey|hotkeyCheck|hsv_to_rgb|hudButton|hudSlider|hudSliderButton|hwReflectionMap|hwRender|hwRenderLoad|hyperGraph|hyperPanel|hyperShade|hypot|iconTextButton|iconTextCheckBox|iconTextRadioButton|iconTextRadioCollection|iconTextScrollList|iconTextStaticLabel|ikHandle|ikHandleCtx|ikHandleDisplayScale|ikSolver|ikSplineHandleCtx|ikSystem|ikSystemInfo|ikfkDisplayMethod|illustratorCurves|image|imfPlugins|inheritTransform|insertJoint|insertJointCtx|insertKeyCtx|insertKnotCurve|insertKnotSurface|instance|instanceable|instancer|intField|intFieldGrp|intScrollBar|intSlider|intSliderGrp|interToUI|internalVar|intersect|iprEngine|isAnimCurve|isConnected|isDirty|isParentOf|isSameObject|isTrue|isValidObjectName|isValidString|isValidUiName|isolateSelect|itemFilter|itemFilterAttr|itemFilterRender|itemFilterType|joint|jointCluster|jointCtx|jointDisplayScale|jointLattice|keyTangent|keyframe|keyframeOutliner|keyframeRegionCurrentTimeCtx|keyframeRegionDirectKeyCtx|keyframeRegionDollyCtx|keyframeRegionInsertKeyCtx|keyframeRegionMoveKeyCtx|keyframeRegionScaleKeyCtx|keyframeRegionSelectKeyCtx|keyframeRegionSetKeyCtx|keyframeRegionTrackCtx|keyframeStats|lassoContext|lattice|latticeDeformKeyCtx|launch|launchImageEditor|layerButton|layeredShaderPort|layeredTexturePort|layout|layoutDialog|lightList|lightListEditor|lightListPanel|lightlink|lineIntersection|linearPrecision|linstep|listAnimatable|listAttr|listCameras|listConnections|listDeviceAttachments|listHistory|listInputDeviceAxes|listInputDeviceButtons|listInputDevices|listMenuAnnotation|listNodeTypes|listPanelCategories|listRelatives|listSets|listTransforms|listUnselected|listerEditor|loadFluid|loadNewShelf|loadPlugin|loadPluginLanguageResources|loadPrefObjects|localizedPanelLabel|lockNode|loft|log|longNameOf|lookThru|ls|lsThroughFilter|lsType|lsUI|Mayatomr|mag|makeIdentity|makeLive|makePaintable|makeRoll|makeSingleSurface|makeTubeOn|makebot|manipMoveContext|manipMoveLimitsCtx|manipOptions|manipRotateContext|manipRotateLimitsCtx|manipScaleContext|manipScaleLimitsCtx|marker|match|max|memory|menu|menuBarLayout|menuEditor|menuItem|menuItemToShelf|menuSet|menuSetPref|messageLine|min|minimizeApp|mirrorJoint|modelCurrentTimeCtx|modelEditor|modelPanel|mouse|movIn|movOut|move|moveIKtoFK|moveKeyCtx|moveVertexAlongDirection|multiProfileBirailSurface|mute|nParticle|nameCommand|nameField|namespace|namespaceInfo|newPanelItems|newton|nodeCast|nodeIconButton|nodeOutliner|nodePreset|nodeType|noise|nonLinear|normalConstraint|normalize|nurbsBoolean|nurbsCopyUVSet|nurbsCube|nurbsEditUV|nurbsPlane|nurbsSelect|nurbsSquare|nurbsToPoly|nurbsToPolygonsPref|nurbsToSubdiv|nurbsToSubdivPref|nurbsUVSet|nurbsViewDirectionVector|objExists|objectCenter|objectLayer|objectType|objectTypeUI|obsoleteProc|oceanNurbsPreviewPlane|offsetCurve|offsetCurveOnSurface|offsetSurface|openGLExtension|openMayaPref|optionMenu|optionMenuGrp|optionVar|orbit|orbitCtx|orientConstraint|outlinerEditor|outlinerPanel|overrideModifier|paintEffectsDisplay|pairBlend|palettePort|paneLayout|panel|panelConfiguration|panelHistory|paramDimContext|paramDimension|paramLocator|parent|parentConstraint|particle|particleExists|particleInstancer|particleRenderInfo|partition|pasteKey|pathAnimation|pause|pclose|percent|performanceOptions|pfxstrokes|pickWalk|picture|pixelMove|planarSrf|plane|play|playbackOptions|playblast|plugAttr|plugNode|pluginInfo|pluginResourceUtil|pointConstraint|pointCurveConstraint|pointLight|pointMatrixMult|pointOnCurve|pointOnSurface|pointPosition|poleVectorConstraint|polyAppend|polyAppendFacetCtx|polyAppendVertex|polyAutoProjection|polyAverageNormal|polyAverageVertex|polyBevel|polyBlendColor|polyBlindData|polyBoolOp|polyBridgeEdge|polyCacheMonitor|polyCheck|polyChipOff|polyClipboard|polyCloseBorder|polyCollapseEdge|polyCollapseFacet|polyColorBlindData|polyColorDel|polyColorPerVertex|polyColorSet|polyCompare|polyCone|polyCopyUV|polyCrease|polyCreaseCtx|polyCreateFacet|polyCreateFacetCtx|polyCube|polyCut|polyCutCtx|polyCylinder|polyCylindricalProjection|polyDelEdge|polyDelFacet|polyDelVertex|polyDuplicateAndConnect|polyDuplicateEdge|polyEditUV|polyEditUVShell|polyEvaluate|polyExtrudeEdge|polyExtrudeFacet|polyExtrudeVertex|polyFlipEdge|polyFlipUV|polyForceUV|polyGeoSampler|polyHelix|polyInfo|polyInstallAction|polyLayoutUV|polyListComponentConversion|polyMapCut|polyMapDel|polyMapSew|polyMapSewMove|polyMergeEdge|polyMergeEdgeCtx|polyMergeFacet|polyMergeFacetCtx|polyMergeUV|polyMergeVertex|polyMirrorFace|polyMoveEdge|polyMoveFacet|polyMoveFacetUV|polyMoveUV|polyMoveVertex|polyNormal|polyNormalPerVertex|polyNormalizeUV|polyOptUvs|polyOptions|polyOutput|polyPipe|polyPlanarProjection|polyPlane|polyPlatonicSolid|polyPoke|polyPrimitive|polyPrism|polyProjection|polyPyramid|polyQuad|polyQueryBlindData|polyReduce|polySelect|polySelectConstraint|polySelectConstraintMonitor|polySelectCtx|polySelectEditCtx|polySeparate|polySetToFaceNormal|polySewEdge|polyShortestPathCtx|polySmooth|polySoftEdge|polySphere|polySphericalProjection|polySplit|polySplitCtx|polySplitEdge|polySplitRing|polySplitVertex|polyStraightenUVBorder|polySubdivideEdge|polySubdivideFacet|polyToSubdiv|polyTorus|polyTransfer|polyTriangulate|polyUVSet|polyUnite|polyWedgeFace|popen|popupMenu|pose|pow|preloadRefEd|print|progressBar|progressWindow|projFileViewer|projectCurve|projectTangent|projectionContext|projectionManip|promptDialog|propModCtx|propMove|psdChannelOutliner|psdEditTextureFile|psdExport|psdTextureFile|putenv|pwd|python|querySubdiv|quit|rad_to_deg|radial|radioButton|radioButtonGrp|radioCollection|radioMenuItemCollection|rampColorPort|rand|randomizeFollicles|randstate|rangeControl|readTake|rebuildCurve|rebuildSurface|recordAttr|recordDevice|redo|reference|referenceEdit|referenceQuery|refineSubdivSelectionList|refresh|refreshAE|registerPluginResource|rehash|reloadImage|removeJoint|removeMultiInstance|removePanelCategory|rename|renameAttr|renameSelectionList|renameUI|render|renderGlobalsNode|renderInfo|renderLayerButton|renderLayerParent|renderLayerPostProcess|renderLayerUnparent|renderManip|renderPartition|renderQualityNode|renderSettings|renderThumbnailUpdate|renderWindowEditor|renderWindowSelectContext|renderer|reorder|reorderDeformers|requires|reroot|resampleFluid|resetAE|resetPfxToPolyCamera|resetTool|resolutionNode|retarget|reverseCurve|reverseSurface|revolve|rgb_to_hsv|rigidBody|rigidSolver|roll|rollCtx|rootOf|rot|rotate|rotationInterpolation|roundConstantRadius|rowColumnLayout|rowLayout|runTimeCommand|runup|sampleImage|saveAllShelves|saveAttrPreset|saveFluid|saveImage|saveInitialState|saveMenu|savePrefObjects|savePrefs|saveShelf|saveToolSettings|scale|scaleBrushBrightness|scaleComponents|scaleConstraint|scaleKey|scaleKeyCtx|sceneEditor|sceneUIReplacement|scmh|scriptCtx|scriptEditorInfo|scriptJob|scriptNode|scriptTable|scriptToShelf|scriptedPanel|scriptedPanelType|scrollField|scrollLayout|sculpt|searchPathArray|seed|selLoadSettings|select|selectContext|selectCurveCV|selectKey|selectKeyCtx|selectKeyframeRegionCtx|selectMode|selectPref|selectPriority|selectType|selectedNodes|selectionConnection|separator|setAttr|setAttrEnumResource|setAttrMapping|setAttrNiceNameResource|setConstraintRestPosition|setDefaultShadingGroup|setDrivenKeyframe|setDynamic|setEditCtx|setEditor|setFluidAttr|setFocus|setInfinity|setInputDeviceMapping|setKeyCtx|setKeyPath|setKeyframe|setKeyframeBlendshapeTargetWts|setMenuMode|setNodeNiceNameResource|setNodeTypeFlag|setParent|setParticleAttr|setPfxToPolyCamera|setPluginResource|setProject|setStampDensity|setStartupMessage|setState|setToolTo|setUITemplate|setXformManip|sets|shadingConnection|shadingGeometryRelCtx|shadingLightRelCtx|shadingNetworkCompare|shadingNode|shapeCompare|shelfButton|shelfLayout|shelfTabLayout|shellField|shortNameOf|showHelp|showHidden|showManipCtx|showSelectionInTitle|showShadingGroupAttrEditor|showWindow|sign|simplify|sin|singleProfileBirailSurface|size|sizeBytes|skinCluster|skinPercent|smoothCurve|smoothTangentSurface|smoothstep|snap2to2|snapKey|snapMode|snapTogetherCtx|snapshot|soft|softMod|softModCtx|sort|sound|soundControl|source|spaceLocator|sphere|sphrand|spotLight|spotLightPreviewPort|spreadSheetEditor|spring|sqrt|squareSurface|srtContext|stackTrace|startString|startsWith|stitchAndExplodeShell|stitchSurface|stitchSurfacePoints|strcmp|stringArrayCatenate|stringArrayContains|stringArrayCount|stringArrayInsertAtIndex|stringArrayIntersector|stringArrayRemove|stringArrayRemoveAtIndex|stringArrayRemoveDuplicates|stringArrayRemoveExact|stringArrayToString|stringToStringArray|strip|stripPrefixFromName|stroke|subdAutoProjection|subdCleanTopology|subdCollapse|subdDuplicateAndConnect|subdEditUV|subdListComponentConversion|subdMapCut|subdMapSewMove|subdMatchTopology|subdMirror|subdToBlind|subdToPoly|subdTransferUVsToCache|subdiv|subdivCrease|subdivDisplaySmoothness|substitute|substituteAllString|substituteGeometry|substring|surface|surfaceSampler|surfaceShaderList|swatchDisplayPort|switchTable|symbolButton|symbolCheckBox|sysFile|system|tabLayout|tan|tangentConstraint|texLatticeDeformContext|texManipContext|texMoveContext|texMoveUVShellContext|texRotateContext|texScaleContext|texSelectContext|texSelectShortestPathCtx|texSmudgeUVContext|texWinToolCtx|text|textCurves|textField|textFieldButtonGrp|textFieldGrp|textManip|textScrollList|textToShelf|textureDisplacePlane|textureHairColor|texturePlacementContext|textureWindow|threadCount|threePointArcCtx|timeControl|timePort|timerX|toNativePath|toggle|toggleAxis|toggleWindowVisibility|tokenize|tokenizeList|tolerance|tolower|toolButton|toolCollection|toolDropped|toolHasOptions|toolPropertyWindow|torus|toupper|trace|track|trackCtx|transferAttributes|transformCompare|transformLimits|translator|trim|trunc|truncateFluidCache|truncateHairCache|tumble|tumbleCtx|turbulence|twoPointArcCtx|uiRes|uiTemplate|unassignInputDevice|undo|undoInfo|ungroup|uniform|unit|unloadPlugin|untangleUV|untitledFileName|untrim|upAxis|updateAE|userCtx|uvLink|uvSnapshot|validateShelfName|vectorize|view2dToolCtx|viewCamera|viewClipPlane|viewFit|viewHeadOn|viewLookAt|viewManip|viewPlace|viewSet|visor|volumeAxis|vortex|waitCursor|warning|webBrowser|webBrowserPrefs|whatIs|window|windowPref|wire|wireContext|workspace|wrinkle|wrinkleContext|writeTake|xbmLangPathList|xform)\b/,
            operator: [
              /\+[+=]?|-[-=]?|&&|\|\||[<>]=|[*\/!=]=?|[%^]/,
              { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
              { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
            ],
            punctuation: /<<|>>|[.,:;?\[\](){}]/,
          }),
          (n.languages.mel.code.inside.rest = n.languages.mel),
          (n.languages.mizar = {
            comment: /::.+/,
            keyword: /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|equals|end|environ|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:y|ies)|when|where|with|wrt)\b/,
            parameter: { pattern: /\$(?:10|\d)/, alias: "variable" },
            variable: /\w+(?=:)/,
            number: /(?:\b|-)\d+\b/,
            operator: /\.\.\.|->|&|\.?=/,
            punctuation: /\(#|#\)|[,:;\[\](){}]/,
          }),
          (n.languages.monkey = {
            string: /"[^"\r\n]*"/,
            comment: [
              { pattern: /^#Rem\s+[\s\S]*?^#End/im, greedy: !0 },
              { pattern: /'.+/, greedy: !0 },
            ],
            preprocessor: {
              pattern: /(^[ \t]*)#.+/m,
              lookbehind: !0,
              alias: "comment",
            },
            function: /\w+(?=\()/,
            "type-char": {
              pattern: /(\w)[?%#$]/,
              lookbehind: !0,
              alias: "variable",
            },
            number: {
              pattern: /((?:\.\.)?)(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\da-f]+)/i,
              lookbehind: !0,
            },
            keyword: /\b(?:Void|Strict|Public|Private|Property|Bool|Int|Float|String|Array|Object|Continue|Exit|Import|Extern|New|Self|Super|Try|Catch|Eachin|True|False|Extends|Abstract|Final|Select|Case|Default|Const|Local|Global|Field|Method|Function|Class|End|If|Then|Else|ElseIf|EndIf|While|Wend|Repeat|Until|Forever|For|To|Step|Next|Return|Module|Interface|Implements|Inline|Throw|Null)\b/i,
            operator: /\.\.|<[=>]?|>=?|:?=|(?:[+\-*\/&~|]|\b(?:Mod|Shl|Shr)\b)=?|\b(?:And|Not|Or)\b/i,
            punctuation: /[.,:;()\[\]]/,
          }),
          (n.languages.n4js = n.languages.extend("javascript", {
            keyword: /\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
          })),
          n.languages.insertBefore("n4js", "constant", {
            annotation: { pattern: /@+\w+/, alias: "operator" },
          }),
          (n.languages.n4jsd = n.languages.n4js),
          (n.languages.nasm = {
            comment: /;.*$/m,
            string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            label: {
              pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
              lookbehind: !0,
              alias: "function",
            },
            keyword: [
              /\[?BITS (?:16|32|64)\]?/,
              { pattern: /(^\s*)section\s*[a-zA-Z.]+:?/im, lookbehind: !0 },
              /(?:extern|global)[^;\r\n]*/i,
              /(?:CPU|FLOAT|DEFAULT).*$/m,
            ],
            register: {
              pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s)\b/i,
              alias: "variable",
            },
            number: /(?:\b|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,
            operator: /[\[\]*+\-\/%<>=&|$!]/,
          }),
          (n.languages.nginx = n.languages.extend("clike", {
            comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
            keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i,
          })),
          n.languages.insertBefore("nginx", "keyword", {
            variable: /\$[a-z_]+/i,
          }),
          (n.languages.nim = {
            comment: /#.*/,
            string: {
              pattern: /(?:(?:\b(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[\s\S]|""|[^"\\])*")|'(?:\\(?:\d+|x[\da-fA-F]{2}|.)|[^'])')/,
              greedy: !0,
            },
            number: /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
            keyword: /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
            function: {
              pattern: /(?:(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+|`[^`\r\n]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/,
              inside: { operator: /\*$/ },
            },
            ignore: { pattern: /`[^`\r\n]+`/, inside: { punctuation: /`/ } },
            operator: {
              pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]]))+|\b(?:and|div|of|or|in|is|isnot|mod|not|notin|shl|shr|xor)\b)/m,
              lookbehind: !0,
            },
            punctuation: /[({\[]\.|\.[)}\]]|[`(){}\[\],:]/,
          }),
          (n.languages.nix = {
            comment: /\/\*[\s\S]*?\*\/|#.*/,
            string: {
              pattern: /"(?:[^"\\]|\\[\s\S])*"|''(?:(?!'')[\s\S]|''(?:'|\\|\$\{))*''/,
              greedy: !0,
              inside: {
                interpolation: {
                  pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^}]|\{[^}]*\})*}/,
                  lookbehind: !0,
                  inside: {
                    antiquotation: { pattern: /^\$(?=\{)/, alias: "variable" },
                  },
                },
              },
            },
            url: [
              /\b(?:[a-z]{3,7}:\/\/)[\w\-+%~\/.:#=?&]+/,
              {
                pattern: /([^\/])(?:[\w\-+%~.:#=?&]*(?!\/\/)[\w\-+%~\/.:#=?&])?(?!\/\/)\/[\w\-+%~\/.:#=?&]*/,
                lookbehind: !0,
              },
            ],
            antiquotation: { pattern: /\$(?=\{)/, alias: "variable" },
            number: /\b\d+\b/,
            keyword: /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
            function: /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:url|Tarball)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
            boolean: /\b(?:true|false)\b/,
            operator: /[=!<>]=?|\+\+?|\|\||&&|\/\/|->?|[?@]/,
            punctuation: /[{}()[\].,:;]/,
          }),
          (n.languages.nix.string.inside.interpolation.inside.rest =
            n.languages.nix),
          (n.languages.nsis = {
            comment: {
              pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|[#;].*)/,
              lookbehind: !0,
            },
            string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            keyword: {
              pattern: /(^\s*)(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|Banner|BG(?:Font|Gradient|Image)|BrandingText|BringToFront|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|WriteUTF16LE|Seek|Write|WriteByte|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DlgItem|DLLVersion(?:Local)?|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|InstProgressFlags|Inst(?:Type(?:GetText|SetText)?)|Int(?:64|Ptr)?CmpU?|Int(?:64)?Fmt|Int(?:Ptr)?Op|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|Name|Nop|ns(?:Dialogs|Exec)|NSISdl|OutFile|Page(?:Callbacks)?|PE(?:DllCharacteristics|SubsysVer)|Pop|Push|Quit|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(?:End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|Unicode|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UninstPage|UnRegDLL|UserInfo|Var|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle)\b/m,
              lookbehind: !0,
            },
            property: /\b(?:admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user|ARCHIVE|FILE_(ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK((CR|CU|LM)(32|64)?|DD|PD|U)|HKEY_(CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)\b/,
            constant: /\${[\w\.:\^-]+}|\$\([\w\.:\^-]+\)/i,
            variable: /\$\w+/i,
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*\/~^%]/,
            punctuation: /[{}[\];(),.:]/,
            important: {
              pattern: /(^\s*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|pragma|searchparse|searchreplace|system|tempfile|undef|verbose|warning)\b/im,
              lookbehind: !0,
            },
          }),
          (n.languages.objectivec = n.languages.extend("c", {
            keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
            string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
            operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
          })),
          (n.languages.ocaml = {
            comment: /\(\*[\s\S]*?\*\)/,
            string: [
              { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
              {
                pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
                greedy: !0,
              },
            ],
            number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
            type: { pattern: /\B['`]\w*/, alias: "variable" },
            directive: { pattern: /\B#\w+/, alias: "function" },
            keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
            boolean: /\b(?:false|true)\b/,
            operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
            punctuation: /[(){}\[\]|_.,:;]/,
          }),
          (function (e) {
            e.languages.opencl = e.languages.extend("c", {
              keyword: /\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|auto|break|case|cl_(?:image_format|mem_fence_flags)|clk_event_t|complex|const|continue|default|do|(?:float|double)(?:16(?:x(?:1|16|2|4|8))?|1x(?:1|16|2|4|8)|2(?:x(?:1|16|2|4|8))?|3|4(?:x(?:1|16|2|4|8))?|8(?:x(?:1|16|2|4|8))?)?|else|enum|event_t|extern|for|goto|(?:u?(?:char|short|int|long)|half|quad|bool)(?:2|3|4|8|16)?|if|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|imaginary|inline|intptr_t|ndrange_t|packed|pipe|ptrdiff_t|queue_t|register|reserve_id_t|restrict|return|sampler_t|signed|size_t|sizeof|static|struct|switch|typedef|uintptr_t|uniform|union|unsigned|void|volatile|while)\b/,
              "function-opencl-kernel": {
                pattern: /\b(?:abs(?:_diff)?|a?(?:cos|sin)(?:h|pi)?|add_sat|aligned|all|and|any|async(?:_work_group_copy|_work_group_strided_copy)?|atan(?:2?(?:pi)?|h)?|atom_(?:add|and|cmpxchg|dec|inc|max|min|or|sub|xchg|xor)|barrier|bitselect|cbrt|ceil|clamp|clz|copies|copysign|cross|degrees|distance|dot|endian|erf|erfc|exp(?:2|10)?|expm1|fabs|fast_(?:distance|length|normalize)|fdim|floor|fma|fmax|fmin|fract|frexp|fro|from|get_(?:global_(?:id|offset|size)|group_id|image_(?:channel_data_type|channel_order|depth|dim|height|width)|local(?:_id|_size)|num_groups|work_dim)|hadd|(?:half|native)_(?:cos|divide|exp(?:2|10)?|log(?:2|10)?|powr|recip|r?sqrt|sin|tan)|hypot|ilogb|is(?:equal|finite|greater(?:equal)?|inf|less(?:equal|greater)?|nan|normal|notequal|(?:un)?ordered)|ldexp|length|lgamma|lgamma_r|log(?:b|1p|2|10)?|mad(?:24|_hi|_sat)?|max|mem(?:_fence)?|min|mix|modf|mul24|mul_hi|nan|nextafter|normalize|pow[nr]?|prefetch|radians|read_(?:image)(?:f|h|u?i)|read_mem_fence|remainder|remquo|reqd_work_group_size|rhadd|rint|rootn|rotate|round|rsqrt|select|shuffle2?|sign|signbit|sincos|smoothstep|sqrt|step|sub_sat|tan|tanh|tanpi|tgamma|to|trunc|upsample|vec_(?:step|type_hint)|v(?:load|store)(?:_half)?(?:2|3|4|8|16)?|v(?:loada_half|storea?(?:_half)?)(?:2|3|4|8|16)?(?:_(?:rte|rtn|rtp|rtz))?|wait_group_events|work_group_size_hint|write_image(?:f|h|u?i)|write_mem_fence)\b/,
                alias: "function",
              },
              "constant-opencl-kernel": {
                pattern: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:LOCAL|GLOBAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT)_(?:DIG|EPSILON|MANT_DIG|(?:MIN|MAX)(?:(?:_10)?_EXP)?)|FLT_RADIX|HUGE_VALF|INFINITY|(?:INT|LONG|SCHAR|SHRT|UCHAR|UINT|ULONG)_(?:MAX|MIN)|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:10|2)E?|PI[24]?|SQRT(?:1_2|2))|NAN)\b/,
                alias: "constant",
              },
            });
            var t = {
              "type-opencl-host": {
                pattern: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|short|int|long)|float|double)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
                alias: "keyword",
              },
              "boolean-opencl-host": {
                pattern: /\bCL_(?:TRUE|FALSE)\b/,
                alias: "boolean",
              },
              "constant-opencl-host": {
                pattern: /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:16|24|8|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/,
                alias: "constant",
              },
              "function-opencl-host": {
                pattern: /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|Kernel|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
                alias: "function",
              },
            };
            e.languages.insertBefore("c", "keyword", t),
              (t["type-opencl-host-c++"] = {
                pattern: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|Sampler|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|UserEvent)\b/,
                alias: "keyword",
              }),
              e.languages.insertBefore("cpp", "keyword", t);
          })(n),
          (n.languages.oz = {
            comment: /\/\*[\s\S]*?\*\/|%.*/,
            string: { pattern: /"(?:[^"\\]|\\[\s\S])*"/, greedy: !0 },
            atom: {
              pattern: /'(?:[^'\\]|\\[\s\S])*'/,
              greedy: !0,
              alias: "builtin",
            },
            keyword: /[$_]|\[\]|\b(?:at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/,
            function: [
              /[a-z][A-Za-z\d]*(?=\()/,
              { pattern: /(\{)[A-Z][A-Za-z\d]*/, lookbehind: !0 },
            ],
            number: /\b(?:0[bx][\da-f]+|\d+\.?\d*(?:e~?\d+)?\b)|&(?:[^\\]|\\(?:\d{3}|.))/i,
            variable: /\b[A-Z][A-Za-z\d]*|`(?:[^`\\]|\\.)+`/,
            "attr-name": /\w+(?=:)/,
            operator: /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|mod|orelse)\b/,
            punctuation: /[\[\](){}.:;?]/,
          }),
          (n.languages.parigp = {
            comment: /\/\*[\s\S]*?\*\/|\\\\.*/,
            string: { pattern: /"(?:[^"\\\r\n]|\\.)*"/, greedy: !0 },
            keyword: (function () {
              var e = [
                "breakpoint",
                "break",
                "dbg_down",
                "dbg_err",
                "dbg_up",
                "dbg_x",
                "forcomposite",
                "fordiv",
                "forell",
                "forpart",
                "forprime",
                "forstep",
                "forsubgroup",
                "forvec",
                "for",
                "iferr",
                "if",
                "local",
                "my",
                "next",
                "return",
                "until",
                "while",
              ];
              return (
                (e = e
                  .map(function (e) {
                    return e.split("").join(" *");
                  })
                  .join("|")),
                RegExp("\\b(?:" + e + ")\\b")
              );
            })(),
            function: /\w[\w ]*?(?= *\()/,
            number: {
              pattern: /((?:\. *\. *)?)(?:\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *[+-]? *\d(?: *\d)*)?/i,
              lookbehind: !0,
            },
            operator: /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?:(?: *<)?(?: *=)?| *>)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
            punctuation: /[\[\]{}().,:;|]/,
          }),
          (n.languages.parser = n.languages.extend("markup", {
            keyword: {
              pattern: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
              lookbehind: !0,
            },
            variable: {
              pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
              lookbehind: !0,
              inside: { punctuation: /\.|:+/ },
            },
            function: {
              pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
              lookbehind: !0,
              inside: {
                keyword: { pattern: /(^@)(?:GET_|SET_)/, lookbehind: !0 },
                punctuation: /\.|:+/,
              },
            },
            escape: {
              pattern: /\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i,
              alias: "builtin",
            },
            punctuation: /[\[\](){};]/,
          })),
          n.languages.insertBefore("parser", "keyword", {
            "parser-comment": {
              pattern: /(\s)#.*/,
              lookbehind: !0,
              alias: "comment",
            },
            expression: {
              pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/,
              greedy: !0,
              lookbehind: !0,
              inside: {
                string: {
                  pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/,
                  lookbehind: !0,
                },
                keyword: n.languages.parser.keyword,
                variable: n.languages.parser.variable,
                function: n.languages.parser.function,
                boolean: /\b(?:true|false)\b/,
                number: /\b(?:0x[a-f\d]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/i,
                escape: n.languages.parser.escape,
                operator: /[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/,
                punctuation: n.languages.parser.punctuation,
              },
            },
          }),
          n.languages.insertBefore(
            "inside",
            "punctuation",
            {
              expression: n.languages.parser.expression,
              keyword: n.languages.parser.keyword,
              variable: n.languages.parser.variable,
              function: n.languages.parser.function,
              escape: n.languages.parser.escape,
              "parser-punctuation": {
                pattern: n.languages.parser.punctuation,
                alias: "punctuation",
              },
            },
            n.languages.parser.tag.inside["attr-value"]
          ),
          (n.languages.pascal = {
            comment: [/\(\*[\s\S]+?\*\)/, /\{[\s\S]+?\}/, /\/\/.*/],
            string: {
              pattern: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
              greedy: !0,
            },
            keyword: [
              {
                pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
                lookbehind: !0,
              },
              {
                pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
                lookbehind: !0,
              },
              {
                pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
                lookbehind: !0,
              },
              {
                pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
                lookbehind: !0,
              },
            ],
            number: [
              /(?:[&%]\d+|\$[a-f\d]+)/i,
              /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
            ],
            operator: [
              /\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i,
              {
                pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
                lookbehind: !0,
              },
            ],
            punctuation: /\(\.|\.\)|[()\[\]:;,.]/,
          }),
          (n.languages.objectpascal = n.languages.pascal),
          (n.languages.perl = {
            comment: [
              { pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m, lookbehind: !0 },
              { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
            ],
            string: [
              {
                pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                greedy: !0,
              },
              {
                pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                greedy: !0,
              },
              {
                pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/,
                greedy: !0,
              },
              {
                pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/,
                greedy: !0,
              },
              {
                pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,
                greedy: !0,
              },
              {
                pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/,
                greedy: !0,
              },
              { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
              { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
            ],
            regex: [
              {
                pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
                lookbehind: !0,
                greedy: !0,
              },
              {
                pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
                greedy: !0,
              },
            ],
            variable: [
              /[&*$@%]\{\^[A-Z]+\}/,
              /[&*$@%]\^[A-Z_]/,
              /[&*$@%]#?(?=\{)/,
              /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
              /[&*$@%]\d+/,
              /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
            ],
            filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
            vstring: {
              pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
              alias: "string",
            },
            function: {
              pattern: /sub [a-z0-9_]+/i,
              inside: { keyword: /sub/ },
            },
            keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
            operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
            punctuation: /[{}[\];(),:]/,
          }),
          (function (e) {
            (e.languages.php = e.languages.extend("clike", {
              keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
              constant: /\b[A-Z0-9_]{2,}\b/,
              comment: {
                pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                lookbehind: !0,
              },
            })),
              e.languages.insertBefore("php", "string", {
                "shell-comment": {
                  pattern: /(^|[^\\])#.*/,
                  lookbehind: !0,
                  alias: "comment",
                },
              }),
              e.languages.insertBefore("php", "keyword", {
                delimiter: {
                  pattern: /\?>|<\?(?:php|=)?/i,
                  alias: "important",
                },
                variable: /\$+(?:\w+\b|(?={))/i,
                package: {
                  pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                  lookbehind: !0,
                  inside: { punctuation: /\\/ },
                },
              }),
              e.languages.insertBefore("php", "operator", {
                property: { pattern: /(->)[\w]+/, lookbehind: !0 },
              }),
              e.languages.insertBefore("php", "string", {
                "nowdoc-string": {
                  pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
                  greedy: !0,
                  alias: "string",
                  inside: {
                    delimiter: {
                      pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                      alias: "symbol",
                      inside: { punctuation: /^<<<'?|[';]$/ },
                    },
                  },
                },
                "heredoc-string": {
                  pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
                  greedy: !0,
                  alias: "string",
                  inside: {
                    delimiter: {
                      pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                      alias: "symbol",
                      inside: { punctuation: /^<<<"?|[";]$/ },
                    },
                    interpolation: null,
                  },
                },
                "single-quoted-string": {
                  pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                  greedy: !0,
                  alias: "string",
                },
                "double-quoted-string": {
                  pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                  greedy: !0,
                  alias: "string",
                  inside: { interpolation: null },
                },
              }),
              delete e.languages.php.string;
            var t = {
              pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
              lookbehind: !0,
              inside: { rest: e.languages.php },
            };
            (e.languages.php["heredoc-string"].inside.interpolation = t),
              (e.languages.php[
                "double-quoted-string"
              ].inside.interpolation = t),
              e.hooks.add("before-tokenize", function (t) {
                if (/(?:<\?php|<\?)/gi.test(t.code)) {
                  e.languages["markup-templating"].buildPlaceholders(
                    t,
                    "php",
                    /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi
                  );
                }
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(t, "php");
              });
          })(n),
          n.languages.insertBefore("php", "variable", {
            this: /\$this\b/,
            global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
            scope: {
              pattern: /\b[\w\\]+::/,
              inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
            },
          }),
          (n.languages.sql = {
            comment: {
              pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
              lookbehind: !0,
            },
            string: {
              pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
              greedy: !0,
              lookbehind: !0,
            },
            variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
            function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
            keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
            boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
            number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
            operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
            punctuation: /[;[\]()`,.]/,
          }),
          (n.languages.powershell = {
            comment: [
              { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
              { pattern: /(^|[^`])#.*/, lookbehind: !0 },
            ],
            string: [
              {
                pattern: /"(?:`[\s\S]|[^`"])*"/,
                greedy: !0,
                inside: {
                  function: {
                    pattern: /(^|[^`])\$\((?:\$\(.*?\)|(?!\$\()[^\r\n)])*\)/,
                    lookbehind: !0,
                    inside: {},
                  },
                },
              },
              { pattern: /'(?:[^']|'')*'/, greedy: !0 },
            ],
            namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
            boolean: /\$(?:true|false)\b/i,
            variable: /\$\w+\b/i,
            function: [
              /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
              /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
            ],
            keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
            operator: {
              pattern: /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
              lookbehind: !0,
            },
            punctuation: /[|{}[\];(),.]/,
          }),
          (n.languages.powershell.string[0].inside.boolean =
            n.languages.powershell.boolean),
          (n.languages.powershell.string[0].inside.variable =
            n.languages.powershell.variable),
          (n.languages.powershell.string[0].inside.function.inside =
            n.languages.powershell),
          (n.languages.processing = n.languages.extend("clike", {
            keyword: /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
            operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/,
          })),
          n.languages.insertBefore("processing", "number", {
            constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
            type: {
              pattern: /\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/,
              alias: "variable",
            },
          }),
          (n.languages.processing.function.pattern = /\w+(?=\s*\()/),
          (n.languages.processing["class-name"].alias = "variable"),
          (n.languages.prolog = {
            comment: [/%.+/, /\/\*[\s\S]*?\*\//],
            string: {
              pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
            },
            builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
            variable: /\b[A-Z_]\w*/,
            function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
            number: /\b\d+\.?\d*/,
            operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
            punctuation: /[(){}\[\],]/,
          }),
          (n.languages.properties = {
            comment: /^[ \t]*[#!].*$/m,
            "attr-value": {
              pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
              lookbehind: !0,
            },
            "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
            punctuation: /[=:]/,
          }),
          (n.languages.protobuf = n.languages.extend("clike", {
            keyword: /\b(?:package|import|message|enum)\b/,
            builtin: /\b(?:required|repeated|optional|reserved)\b/,
            primitive: {
              pattern: /\b(?:double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes)\b/,
              alias: "symbol",
            },
          })),
          (function (e) {
            e.languages.pug = {
              comment: {
                pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
                lookbehind: !0,
              },
              "multiline-script": {
                pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                lookbehind: !0,
                inside: { rest: e.languages.javascript },
              },
              filter: {
                pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                lookbehind: !0,
                inside: {
                  "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                },
              },
              "multiline-plain-text": {
                pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
                lookbehind: !0,
              },
              markup: {
                pattern: /(^[\t ]*)<.+/m,
                lookbehind: !0,
                inside: { rest: e.languages.markup },
              },
              doctype: {
                pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
                lookbehind: !0,
              },
              "flow-control": {
                pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
                lookbehind: !0,
                inside: {
                  each: {
                    pattern: /^each .+? in\b/,
                    inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ },
                  },
                  branch: {
                    pattern: /^(?:if|unless|else|case|when|default|while)\b/,
                    alias: "keyword",
                  },
                  rest: e.languages.javascript,
                },
              },
              keyword: {
                pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
                lookbehind: !0,
              },
              mixin: [
                {
                  pattern: /(^[\t ]*)mixin .+/m,
                  lookbehind: !0,
                  inside: {
                    keyword: /^mixin/,
                    function: /\w+(?=\s*\(|\s*$)/,
                    punctuation: /[(),.]/,
                  },
                },
                {
                  pattern: /(^[\t ]*)\+.+/m,
                  lookbehind: !0,
                  inside: {
                    name: { pattern: /^\+\w+/, alias: "function" },
                    rest: e.languages.javascript,
                  },
                },
              ],
              script: {
                pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
                lookbehind: !0,
                inside: { rest: e.languages.javascript },
              },
              "plain-text": {
                pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
                lookbehind: !0,
              },
              tag: {
                pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
                lookbehind: !0,
                inside: {
                  attributes: [
                    {
                      pattern: /&[^(]+\([^)]+\)/,
                      inside: { rest: e.languages.javascript },
                    },
                    {
                      pattern: /\([^)]+\)/,
                      inside: {
                        "attr-value": {
                          pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                          lookbehind: !0,
                          inside: { rest: e.languages.javascript },
                        },
                        "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                        punctuation: /[!=(),]+/,
                      },
                    },
                  ],
                  punctuation: /:/,
                },
              },
              code: [
                {
                  pattern: /(^[\t ]*(?:-|!?=)).+/m,
                  lookbehind: !0,
                  inside: { rest: e.languages.javascript },
                },
              ],
              punctuation: /[.\-!=|]+/,
            };
            for (
              var t = [
                  { filter: "atpl", language: "twig" },
                  { filter: "coffee", language: "coffeescript" },
                  "ejs",
                  "handlebars",
                  "hogan",
                  "less",
                  "livescript",
                  "markdown",
                  "mustache",
                  "plates",
                  { filter: "sass", language: "scss" },
                  "stylus",
                  "swig",
                ],
                n = {},
                a = 0,
                i = t.length;
              i > a;
              a++
            ) {
              var r = t[a];
              (r = "string" == typeof r ? { filter: r, language: r } : r),
                e.languages[r.language] &&
                  (n["filter-" + r.filter] = {
                    pattern: RegExp(
                      "(^([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace(
                        "{{filter_name}}",
                        r.filter
                      ),
                      "m"
                    ),
                    lookbehind: !0,
                    inside: {
                      "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
                      rest: e.languages[r.language],
                    },
                  });
            }
            e.languages.insertBefore("pug", "filter", n);
          })(n),
          (function (e) {
            e.languages.puppet = {
              heredoc: [
                {
                  pattern: /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
                  lookbehind: !0,
                  alias: "string",
                  inside: { punctuation: /(?=\S).*\S(?= *$)/ },
                },
                {
                  pattern: /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
                  lookbehind: !0,
                  greedy: !0,
                  alias: "string",
                  inside: { punctuation: /(?=\S).*\S(?= *$)/ },
                },
                {
                  pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/,
                  alias: "string",
                  inside: {
                    punctuation: { pattern: /(\().+?(?=\))/, lookbehind: !0 },
                  },
                },
              ],
              "multiline-comment": {
                pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
                lookbehind: !0,
                greedy: !0,
                alias: "comment",
              },
              regex: {
                pattern: /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                  "extended-regex": {
                    pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/,
                    inside: { comment: /#.*/ },
                  },
                },
              },
              comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
              string: {
                pattern: /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|(?!\1)[^\\]|\\[\s\S])*\1/,
                greedy: !0,
                inside: {
                  "double-quoted": { pattern: /^"[\s\S]*"$/, inside: {} },
                },
              },
              variable: {
                pattern: /\$(?:::)?\w+(?:::\w+)*/,
                inside: { punctuation: /::/ },
              },
              "attr-name": /(?:\w+|\*)(?=\s*=>)/,
              function: [
                { pattern: /(\.)(?!\d)\w+/, lookbehind: !0 },
                /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/,
              ],
              number: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
              boolean: /\b(?:true|false)\b/,
              keyword: /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
              datatype: {
                pattern: /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
                alias: "symbol",
              },
              operator: /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
              punctuation: /[\[\]{}().,;]|:+/,
            };
            var t = [
              {
                pattern: /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
                lookbehind: !0,
                inside: {
                  "short-variable": {
                    pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
                    lookbehind: !0,
                    alias: "variable",
                    inside: { punctuation: /::/ },
                  },
                  delimiter: { pattern: /^\$/, alias: "variable" },
                  rest: e.languages.puppet,
                },
              },
              {
                pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
                lookbehind: !0,
                alias: "variable",
                inside: { punctuation: /::/ },
              },
            ];
            (e.languages.puppet.heredoc[0].inside.interpolation = t),
              (e.languages.puppet.string.inside[
                "double-quoted"
              ].inside.interpolation = t);
          })(n),
          (function (e) {
            e.languages.pure = {
              comment: [
                { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
                { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
                /#!.+/,
              ],
              "inline-lang": {
                pattern: /%<[\s\S]+?%>/,
                greedy: !0,
                inside: {
                  lang: {
                    pattern: /(^%< *)-\*-.+?-\*-/,
                    lookbehind: !0,
                    alias: "comment",
                  },
                  delimiter: { pattern: /^%<.*|%>$/, alias: "punctuation" },
                },
              },
              string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
              number: {
                pattern: /((?:\.\.)?)(?:\b(?:inf|nan)\b|\b0x[\da-f]+|(?:\b(?:0b)?\d+(?:\.\d)?|\B\.\d)\d*(?:e[+-]?\d+)?L?)/i,
                lookbehind: !0,
              },
              keyword: /\b(?:ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|false|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|NULL|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|then|throw|trace|true|type|underride|using|when|with)\b/,
              function: /\b(?:abs|add_(?:(?:fundef|interface|macdef|typedef)(?:_at)?|addr|constdef|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_(?:matrix|pointer)|byte_c?string(?:_pointer)?|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|short|sentry|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix(?:_view)?|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:err(?:pos)?)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|matrixp?|max|member|min|nanp|nargs|nmatrixp?|null|numberp?|ord|pack(?:ed)?|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int(?:64)?|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce(?:_with)?|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcat(?:map)?|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|subdiag(?:mat)?|submat|subseq2?|substr|succ|supdiag(?:mat)?|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vector(?:p|seq)?|void|zip3?|zipwith3?)\b/,
              special: { pattern: /\b__[a-z]+__\b/i, alias: "builtin" },
              operator: /(?=\b_|[^_])[!"#$%&'*+,\-.\/:<=>?@\\^_`|~\u00a1-\u00bf\u00d7-\u00f7\u20d0-\u2bff]+|\b(?:and|div|mod|not|or)\b/,
              punctuation: /[(){}\[\];,|]/,
            };
            [
              "c",
              { lang: "c++", alias: "cpp" },
              "fortran",
              "ats",
              "dsp",
            ].forEach(function (t) {
              var n = t;
              if (
                ("string" != typeof t && ((n = t.alias), (t = t.lang)),
                e.languages[n])
              ) {
                var a = {};
                (a["inline-lang-" + n] = {
                  pattern: RegExp(
                    "%< *-\\*- *{lang}\\d* *-\\*-[\\s\\S]+?%>".replace(
                      "{lang}",
                      t.replace(/([.+*?\/\\(){}\[\]])/g, "\\$1")
                    ),
                    "i"
                  ),
                  inside: e.util.clone(e.languages.pure["inline-lang"].inside),
                }),
                  (a["inline-lang-" + n].inside.rest = e.util.clone(
                    e.languages[n]
                  )),
                  e.languages.insertBefore("pure", "inline-lang", a);
              }
            }),
              e.languages.c &&
                (e.languages.pure["inline-lang"].inside.rest = e.util.clone(
                  e.languages.c
                ));
          })(n),
          (n.languages.python = {
            comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
            "triple-quoted-string": {
              pattern: /("""|''')[\s\S]+?\1/,
              greedy: !0,
              alias: "string",
            },
            string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            function: {
              pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
              lookbehind: !0,
            },
            "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
            keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
            builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
            boolean: /\b(?:True|False|None)\b/,
            number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
            operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.q = {
            string: /"(?:\\.|[^"\\\r\n])*"/,
            comment: [
              { pattern: /([\t )\]}])\/.*/, lookbehind: !0, greedy: !0 },
              {
                pattern: /(^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?(?:\\(?=[\t ]*(?:\r?\n|\r))|$)|\S.*)/,
                lookbehind: !0,
                greedy: !0,
              },
              { pattern: /^\\[\t ]*(?:\r?\n|\r)[\s\S]+/m, greedy: !0 },
              { pattern: /^#!.+/m, greedy: !0 },
            ],
            symbol: /`(?::\S+|[\w.]*)/,
            datetime: {
              pattern: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
              alias: "number",
            },
            number: /\b(?![01]:)(?:0[wn]|0W[hj]?|0N[hje]?|0x[\da-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?[hjfeb]?)/,
            keyword: /\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|ceiling|cols|cor|cos|count|cov|cross|csv|cut|delete|deltas|desc|dev|differ|distinct|div|do|dsave|ej|enlist|eval|except|exec|exit|exp|fby|fills|first|fkeys|flip|floor|from|get|getenv|group|gtime|hclose|hcount|hdel|hopen|hsym|iasc|identity|idesc|if|ij|in|insert|inter|inv|keys?|last|like|list|ljf?|load|log|lower|lsq|ltime|ltrim|mavg|maxs?|mcount|md5|mdev|med|meta|mins?|mmax|mmin|mmu|mod|msum|neg|next|not|null|or|over|parse|peach|pj|plist|prds?|prev|prior|rand|rank|ratios|raze|read0|read1|reciprocal|reval|reverse|rload|rotate|rsave|rtrim|save|scan|scov|sdev|select|set|setenv|show|signum|sin|sqrt|ssr?|string|sublist|sums?|sv|svar|system|tables|tan|til|trim|txf|type|uj|ungroup|union|update|upper|upsert|value|var|views?|vs|wavg|where|while|within|wj1?|wsum|ww|xasc|xbar|xcols?|xdesc|xexp|xgroup|xkey|xlog|xprev|xrank)\b/,
            adverb: { pattern: /['\/\\]:?|\beach\b/, alias: "function" },
            verb: {
              pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:+\-*%,!?_~=|$&#@^]):?/,
              alias: "operator",
            },
            punctuation: /[(){}\[\];.]/,
          }),
          (n.languages.qore = n.languages.extend("clike", {
            comment: {
              pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
              lookbehind: !0,
            },
            string: { pattern: /("|')(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
            variable: /\$(?!\d)\w+\b/,
            keyword: /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:int|float|number|bool|string|date|list)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
            number: /\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp\-]+|\d*\.?\d+e?\d*[df]|\d*\.?\d+)\b/i,
            boolean: /\b(?:true|false)\b/i,
            operator: {
              pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
              lookbehind: !0,
            },
            function: /\$?\b(?!\d)\w+(?=\()/,
          })),
          (n.languages.r = {
            comment: /#.*/,
            string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            "percent-operator": { pattern: /%[^%\s]*%/, alias: "operator" },
            boolean: /\b(?:TRUE|FALSE)\b/,
            ellipsis: /\.\.(?:\.|\d+)/,
            number: [
              /\b(?:NaN|Inf)\b/,
              /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/,
            ],
            keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
            operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
            punctuation: /[(){}\[\],;]/,
          }),
          (function (e) {
            var t = e.util.clone(e.languages.javascript);
            (e.languages.jsx = e.languages.extend("markup", t)),
              (e.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
              (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
              (e.languages.jsx.tag.inside[
                "attr-value"
              ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
              e.languages.insertBefore(
                "inside",
                "attr-name",
                {
                  spread: {
                    pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
                    inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
                  },
                },
                e.languages.jsx.tag
              ),
              e.languages.insertBefore(
                "inside",
                "attr-value",
                {
                  script: {
                    pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
                    inside: {
                      "script-punctuation": {
                        pattern: /^=(?={)/,
                        alias: "punctuation",
                      },
                      rest: e.languages.jsx,
                    },
                    alias: "language-javascript",
                  },
                },
                e.languages.jsx.tag
              );
            var n = function e(t) {
                return t
                  ? "string" == typeof t
                    ? t
                    : "string" == typeof t.content
                    ? t.content
                    : t.content.map(e).join("")
                  : "";
              },
              a = function t(a) {
                for (var i = [], r = 0; r < a.length; r++) {
                  var o = a[r],
                    s = !1;
                  if (
                    ("string" != typeof o &&
                      ("tag" === o.type &&
                      o.content[0] &&
                      "tag" === o.content[0].type
                        ? "</" === o.content[0].content[0].content
                          ? i.length > 0 &&
                            i[i.length - 1].tagName ===
                              n(o.content[0].content[1]) &&
                            i.pop()
                          : "/>" === o.content[o.content.length - 1].content ||
                            i.push({
                              tagName: n(o.content[0].content[1]),
                              openedBraces: 0,
                            })
                        : i.length > 0 &&
                          "punctuation" === o.type &&
                          "{" === o.content
                        ? i[i.length - 1].openedBraces++
                        : i.length > 0 &&
                          i[i.length - 1].openedBraces > 0 &&
                          "punctuation" === o.type &&
                          "}" === o.content
                        ? i[i.length - 1].openedBraces--
                        : (s = !0)),
                    (s || "string" == typeof o) &&
                      i.length > 0 &&
                      0 === i[i.length - 1].openedBraces)
                  ) {
                    var l = n(o);
                    r < a.length - 1 &&
                      ("string" == typeof a[r + 1] ||
                        "plain-text" === a[r + 1].type) &&
                      ((l += n(a[r + 1])), a.splice(r + 1, 1)),
                      r > 0 &&
                        ("string" == typeof a[r - 1] ||
                          "plain-text" === a[r - 1].type) &&
                        ((l = n(a[r - 1]) + l), a.splice(r - 1, 1), r--),
                      (a[r] = new e.Token("plain-text", l, null, l));
                  }
                  o.content && "string" != typeof o.content && t(o.content);
                }
              };
            e.hooks.add("after-tokenize", function (e) {
              ("jsx" === e.language || "tsx" === e.language) && a(e.tokens);
            });
          })(n),
          (n.languages.typescript = n.languages.extend("javascript", {
            keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\b/,
            builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/,
          })),
          (n.languages.ts = n.languages.typescript),
          (n.languages.renpy = {
            comment: { pattern: /(^|[^\\])#.+/, lookbehind: !0 },
            string: {
              pattern: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2|(?:^#?(?:(?:[0-9a-fA-F]{2}){3}|(?:[0-9a-fA-F]){3})$)/m,
              greedy: !0,
            },
            function: /[a-z_]\w*(?=\()/i,
            property: /\b(?:insensitive|idle|hover|selected_idle|selected_hover|background|position|alt|xpos|ypos|pos|xanchor|yanchor|anchor|xalign|yalign|align|xcenter|ycenter|xofsset|yoffset|ymaximum|maximum|xmaximum|xminimum|yminimum|minimum|xsize|ysizexysize|xfill|yfill|area|antialias|black_color|bold|caret|color|first_indent|font|size|italic|justify|kerning|language|layout|line_leading|line_overlap_split|line_spacing|min_width|newline_indent|outlines|rest_indent|ruby_style|slow_cps|slow_cps_multiplier|strikethrough|text_align|underline|hyperlink_functions|vertical|hinting|foreground|left_margin|xmargin|top_margin|bottom_margin|ymargin|left_padding|right_padding|xpadding|top_padding|bottom_padding|ypadding|size_group|child|hover_sound|activate_sound|mouse|focus_mask|keyboard_focus|bar_vertical|bar_invert|bar_resizing|left_gutter|right_gutter|top_gutter|bottom_gutter|left_bar|right_bar|top_bar|bottom_bar|thumb|thumb_shadow|thumb_offset|unscrollable|spacing|first_spacing|box_reverse|box_wrap|order_reverse|fit_first|ysize|thumbnail_width|thumbnail_height|help|text_ypos|text_xpos|idle_color|hover_color|selected_idle_color|selected_hover_color|insensitive_color|alpha|insensitive_background|hover_background|zorder|value|width|xadjustment|xanchoraround|xaround|xinitial|xoffset|xzoom|yadjustment|yanchoraround|yaround|yinitial|yzoom|zoom|ground|height|text_style|text_y_fudge|selected_insensitive|has_sound|has_music|has_voice|focus|hovered|image_style|length|minwidth|mousewheel|offset|prefix|radius|range|right_margin|rotate|rotate_pad|developer|screen_width|screen_height|window_title|name|version|windows_icon|default_fullscreen|default_text_cps|default_afm_time|main_menu_music|sample_sound|enter_sound|exit_sound|save_directory|enter_transition|exit_transition|intra_transition|main_game_transition|game_main_transition|end_splash_transition|end_game_transition|after_load_transition|window_show_transition|window_hide_transition|adv_nvl_transition|nvl_adv_transition|enter_yesno_transition|exit_yesno_transition|enter_replay_transition|exit_replay_transition|say_attribute_transition|directory_name|executable_name|include_update|window_icon|modal|google_play_key|google_play_salt|drag_name|drag_handle|draggable|dragged|droppable|dropped|narrator_menu|action|default_afm_enable|version_name|version_tuple|inside|fadeout|fadein|layers|layer_clipping|linear|scrollbars|side_xpos|side_ypos|side_spacing|edgescroll|drag_joined|drag_raise|drop_shadow|drop_shadow_color|subpixel|easein|easeout|time|crop|auto|update|get_installed_packages|can_update|UpdateVersion|Update|overlay_functions|translations|window_left_padding|show_side_image|show_two_window)\b/,
            tag: /\b(?:label|image|menu|[hv]box|frame|text|imagemap|imagebutton|bar|vbar|screen|textbutton|buttoscreenn|fixed|grid|input|key|mousearea|side|timer|viewport|window|hotspot|hotbar|self|button|drag|draggroup|tag|mm_menu_frame|nvl|block|parallel)\b|\$/,
            keyword: /\b(?:as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|yield|adjustment|alignaround|allow|angle|around|box_layout|cache|changed|child_size|clicked|clipping|corner1|corner2|default|delay|exclude|scope|slow|slow_abortable|slow_done|sound|style_group|substitute|suffix|transform_anchor|transpose|unhovered|config|theme|mm_root|gm_root|rounded_window|build|disabled_text|disabled|widget_selected|widget_text|widget_hover|widget|updater|behind|call|expression|hide|init|jump|onlayer|python|renpy|scene|set|show|transform|play|queue|stop|pause|define|window|repeat|contains|choice|on|function|event|animation|clockwise|counterclockwise|circles|knot|null|None|random|has|add|use|fade|dissolve|style|store|id|voice|center|left|right|less_rounded|music|movie|clear|persistent|ui)\b/,
            boolean: /\b(?:[Tt]rue|[Ff]alse)\b/,
            number: /(?:\b(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*)|\B\.\d+)(?:e[+-]?\d+)?j?/i,
            operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at)\b/,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.reason = n.languages.extend("clike", {
            comment: { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
            string: {
              pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
              greedy: !0,
            },
            "class-name": /\b[A-Z]\w*/,
            keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
            operator: /\.{3}|:[:=]|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/,
          })),
          n.languages.insertBefore("reason", "class-name", {
            character: {
              pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
              alias: "string",
            },
            constructor: {
              pattern: /\b[A-Z]\w*\b(?!\s*\.)/,
              alias: "variable",
            },
            label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" },
          }),
          delete n.languages.reason.function,
          (n.languages.rest = {
            table: [
              {
                pattern: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1(?:[+|].+)+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
                lookbehind: !0,
                inside: { punctuation: /\||(?:\+[=-]+)+\+/ },
              },
              {
                pattern: /(\s*)(?:=+ +)+=+(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1(?:=+ +)+=+(?=(?:\r?\n|\r){2}|\s*$)/,
                lookbehind: !0,
                inside: { punctuation: /[=-]+/ },
              },
            ],
            "substitution-def": {
              pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
              lookbehind: !0,
              inside: {
                substitution: {
                  pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
                  alias: "attr-value",
                  inside: { punctuation: /^\||\|$/ },
                },
                directive: {
                  pattern: /( +)[^:]+::/,
                  lookbehind: !0,
                  alias: "function",
                  inside: { punctuation: /::$/ },
                },
              },
            },
            "link-target": [
              {
                pattern: /(^\s*\.\. )\[[^\]]+\]/m,
                lookbehind: !0,
                alias: "string",
                inside: { punctuation: /^\[|\]$/ },
              },
              {
                pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
                lookbehind: !0,
                alias: "string",
                inside: { punctuation: /^_|:$/ },
              },
            ],
            directive: {
              pattern: /(^\s*\.\. )[^:]+::/m,
              lookbehind: !0,
              alias: "function",
              inside: { punctuation: /::$/ },
            },
            comment: {
              pattern: /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m,
              lookbehind: !0,
            },
            title: [
              {
                pattern: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
                inside: {
                  punctuation: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
                  important: /.+/,
                },
              },
              {
                pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
                lookbehind: !0,
                inside: {
                  punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
                  important: /.+/,
                },
              },
            ],
            hr: {
              pattern: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
              lookbehind: !0,
              alias: "punctuation",
            },
            field: {
              pattern: /(^\s*):[^:\r\n]+:(?= )/m,
              lookbehind: !0,
              alias: "attr-name",
            },
            "command-line-option": {
              pattern: /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
              lookbehind: !0,
              alias: "symbol",
            },
            "literal-block": {
              pattern: /::(?:\r?\n|\r){2}([ \t]+).+(?:(?:\r?\n|\r)\1.+)*/,
              inside: {
                "literal-block-punctuation": {
                  pattern: /^::/,
                  alias: "punctuation",
                },
              },
            },
            "quoted-literal-block": {
              pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
              inside: {
                "literal-block-punctuation": {
                  pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
                  alias: "punctuation",
                },
              },
            },
            "list-bullet": {
              pattern: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
              lookbehind: !0,
              alias: "punctuation",
            },
            "doctest-block": {
              pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m,
              lookbehind: !0,
              inside: { punctuation: /^>>>/ },
            },
            inline: [
              {
                pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
                lookbehind: !0,
                inside: {
                  bold: { pattern: /(^\*\*).+(?=\*\*$)/, lookbehind: !0 },
                  italic: { pattern: /(^\*).+(?=\*$)/, lookbehind: !0 },
                  "inline-literal": {
                    pattern: /(^``).+(?=``$)/,
                    lookbehind: !0,
                    alias: "symbol",
                  },
                  role: {
                    pattern: /^:[^:]+:|:[^:]+:$/,
                    alias: "function",
                    inside: { punctuation: /^:|:$/ },
                  },
                  "interpreted-text": {
                    pattern: /(^`).+(?=`$)/,
                    lookbehind: !0,
                    alias: "attr-value",
                  },
                  substitution: {
                    pattern: /(^\|).+(?=\|$)/,
                    lookbehind: !0,
                    alias: "attr-value",
                  },
                  punctuation: /\*\*?|``?|\|/,
                },
              },
            ],
            link: [
              {
                pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
                alias: "string",
                inside: { punctuation: /^\[|\]_$/ },
              },
              {
                pattern: /(?:\b[a-z\d](?:[_.:+]?[a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
                alias: "string",
                inside: { punctuation: /^_?`|`$|`?_?_$/ },
              },
            ],
            punctuation: {
              pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
              lookbehind: !0,
            },
          }),
          (n.languages.rip = {
            comment: /#.*/,
            keyword: /(?:=>|->)|\b(?:class|if|else|switch|case|return|exit|try|catch|finally|raise)\b/,
            builtin: /@|\bSystem\b/,
            boolean: /\b(?:true|false)\b/,
            date: /\b\d{4}-\d{2}-\d{2}\b/,
            time: /\b\d{2}:\d{2}:\d{2}\b/,
            datetime: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,
            character: /\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,
            regex: {
              pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/(?=\s*($|[\r\n,.;})]))/,
              lookbehind: !0,
              greedy: !0,
            },
            symbol: /:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
            string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            number: /[+-]?(?:(?:\d+\.\d+)|(?:\d+))/,
            punctuation: /(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,
            reference: /[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
          }),
          (n.languages.roboconf = {
            comment: /#.*/,
            keyword: {
              pattern: /(^|\s)(?:(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{)|(?:external|import)\b)/,
              lookbehind: !0,
            },
            component: { pattern: /[\w-]+(?=[ \t]*\{)/, alias: "variable" },
            property: /[\w.-]+(?=[ \t]*:)/,
            value: {
              pattern: /(=[ \t]*)[^,;]+/,
              lookbehind: !0,
              alias: "attr-value",
            },
            optional: { pattern: /\(optional\)/, alias: "builtin" },
            wildcard: { pattern: /(\.)\*/, lookbehind: !0, alias: "operator" },
            punctuation: /[{},.;:=]/,
          }),
          (function (e) {
            (e.languages.crystal = e.languages.extend("ruby", {
              keyword: [
                /\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|rescue|return|require|select|self|sizeof|struct|super|then|type|typeof|uninitialized|union|unless|until|when|while|with|yield|__DIR__|__END_LINE__|__FILE__|__LINE__)\b/,
                { pattern: /(\.\s*)(?:is_a|responds_to)\?/, lookbehind: !0 },
              ],
              number: /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\da-fA-F_]*[\da-fA-F]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
            })),
              e.languages.insertBefore("crystal", "string", {
                attribute: {
                  pattern: /@\[.+?\]/,
                  alias: "attr-name",
                  inside: {
                    delimiter: { pattern: /^@\[|\]$/, alias: "tag" },
                    rest: e.languages.crystal,
                  },
                },
                expansion: [
                  {
                    pattern: /\{\{.+?\}\}/,
                    inside: {
                      delimiter: { pattern: /^\{\{|\}\}$/, alias: "tag" },
                      rest: e.languages.crystal,
                    },
                  },
                  {
                    pattern: /\{%.+?%\}/,
                    inside: {
                      delimiter: { pattern: /^\{%|%\}$/, alias: "tag" },
                      rest: e.languages.crystal,
                    },
                  },
                ],
              });
          })(n),
          (n.languages.rust = {
            comment: [
              { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
              { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
            ],
            string: [
              { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
              { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
            ],
            char: {
              pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
              alias: "string",
            },
            "lifetime-annotation": { pattern: /'[^\s>']+/, alias: "symbol" },
            keyword: /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,
            attribute: {
              pattern: /#!?\[.+?\]/,
              greedy: !0,
              alias: "attr-name",
            },
            function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
            "macro-rules": { pattern: /\w+!/, alias: "function" },
            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
            "closure-params": {
              pattern: /\|[^|]*\|(?=\s*[{-])/,
              inside: { punctuation: /[|:,]/, operator: /[&*]/ },
            },
            punctuation: /[{}[\];(),:]|\.+|->/,
            operator: /[-+*\/%!^]=?|=[=>]?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/,
          }),
          (n.languages.sas = {
            datalines: {
              pattern: /^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,
              alias: "string",
              inside: {
                keyword: {
                  pattern: /^(\s*)(?:(?:data)?lines|cards)/i,
                  lookbehind: !0,
                },
                punctuation: /;/,
              },
            },
            comment: [
              { pattern: /(^\s*|;\s*)\*.*;/m, lookbehind: !0 },
              /\/\*[\s\S]+?\*\//,
            ],
            datetime: { pattern: /'[^']+'(?:dt?|t)\b/i, alias: "number" },
            string: { pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/, greedy: !0 },
            keyword: /\b(?:data|else|format|if|input|proc\s\w+|quit|run|then)\b/i,
            number: /\b(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,
            operator: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
            punctuation: /[$%@.(){}\[\];,\\]/,
          }),
          (function (e) {
            (e.languages.sass = e.languages.extend("css", {
              comment: {
                pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
                lookbehind: !0,
              },
            })),
              e.languages.insertBefore("sass", "atrule", {
                "atrule-line": {
                  pattern: /^(?:[ \t]*)[@+=].+/m,
                  inside: { atrule: /(?:@[\w-]+|[+=])/m },
                },
              }),
              delete e.languages.sass.atrule;
            var t = /\$[-\w]+|#\{\$[-\w]+\}/,
              n = [
                /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
                { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
              ];
            e.languages.insertBefore("sass", "property", {
              "variable-line": {
                pattern: /^[ \t]*\$.+/m,
                inside: { punctuation: /:/, variable: t, operator: n },
              },
              "property-line": {
                pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
                inside: {
                  property: [
                    /[^:\s]+(?=\s*:)/,
                    { pattern: /(:)[^:\s]+/, lookbehind: !0 },
                  ],
                  punctuation: /:/,
                  variable: t,
                  operator: n,
                  important: e.languages.sass.important,
                },
              },
            }),
              delete e.languages.sass.property,
              delete e.languages.sass.important,
              delete e.languages.sass.selector,
              e.languages.insertBefore("sass", "punctuation", {
                selector: {
                  pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
                  lookbehind: !0,
                },
              });
          })(n),
          (n.languages.scss = n.languages.extend("css", {
            comment: {
              pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
              lookbehind: !0,
            },
            atrule: {
              pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
              inside: { rule: /@[\w-]+/ },
            },
            url: /(?:[-a-z]+-)*url(?=\()/i,
            selector: {
              pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
              inside: {
                parent: { pattern: /&/, alias: "important" },
                placeholder: /%[-\w]+/,
                variable: /\$[-\w]+|#\{\$[-\w]+\}/,
              },
            },
          })),
          n.languages.insertBefore("scss", "atrule", {
            keyword: [
              /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
              { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
            ],
          }),
          (n.languages.scss.property = {
            pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
            inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
          }),
          n.languages.insertBefore("scss", "important", {
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
          }),
          n.languages.insertBefore("scss", "function", {
            placeholder: { pattern: /%[-\w]+/, alias: "selector" },
            statement: {
              pattern: /\B!(?:default|optional)\b/i,
              alias: "keyword",
            },
            boolean: /\b(?:true|false)\b/,
            null: /\bnull\b/,
            operator: {
              pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
              lookbehind: !0,
            },
          }),
          (n.languages.scss.atrule.inside.rest = n.languages.scss),
          (n.languages.scala = n.languages.extend("java", {
            keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
            string: [
              { pattern: /"""[\s\S]*?"""/, greedy: !0 },
              { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
            ],
            builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
            number: /\b0x[\da-f]*\.?[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e\d+)?[dfl]?/i,
            symbol: /'[^\d\s\\]\w*/,
          })),
          delete n.languages.scala["class-name"],
          delete n.languages.scala.function,
          (n.languages.scheme = {
            comment: /;.*/,
            string: { pattern: /"(?:[^"\\\r\n]|\\.)*"|'[^('\s]*/, greedy: !0 },
            keyword: {
              pattern: /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)/,
              lookbehind: !0,
            },
            builtin: {
              pattern: /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)/,
              lookbehind: !0,
            },
            number: {
              pattern: /(\s|[()])[-+]?\d*\.?\d+(?:\s*[-+]\s*\d*\.?\d+i)?\b/,
              lookbehind: !0,
            },
            boolean: /#[tf]/,
            operator: {
              pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)/,
              lookbehind: !0,
            },
            function: { pattern: /(\()[^\s()]*(?=[\s)])/, lookbehind: !0 },
            punctuation: /[()]/,
          }),
          (n.languages.smalltalk = {
            comment: /"(?:""|[^"])+"/,
            string: /'(?:''|[^'])+'/,
            symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
            "block-arguments": {
              pattern: /(\[\s*):[^\[|]*\|/,
              lookbehind: !0,
              inside: { variable: /:[\da-z]+/i, punctuation: /\|/ },
            },
            "temporary-variables": {
              pattern: /\|[^|]+\|/,
              inside: { variable: /[\da-z]+/i, punctuation: /\|/ },
            },
            keyword: /\b(?:nil|true|false|self|super|new)\b/,
            character: { pattern: /\$./, alias: "string" },
            number: [
              /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
              /\b\d+(?:\.\d+)?(?:e-?\d+)?/,
            ],
            operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
            punctuation: /[.;:?\[\](){}]/,
          }),
          (function (e) {
            (e.languages.smarty = {
              comment: /\{\*[\s\S]*?\*\}/,
              delimiter: { pattern: /^\{|\}$/i, alias: "punctuation" },
              string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
              number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
              variable: [
                /\$(?!\d)\w+/,
                /#(?!\d)\w+#/,
                { pattern: /(\.|->)(?!\d)\w+/, lookbehind: !0 },
                { pattern: /(\[)(?!\d)\w+(?=\])/, lookbehind: !0 },
              ],
              function: [
                { pattern: /(\|\s*)@?(?!\d)\w+/, lookbehind: !0 },
                /^\/?(?!\d)\w+/,
                /(?!\d)\w+(?=\()/,
              ],
              "attr-name": {
                pattern: /\w+\s*=\s*(?:(?!\d)\w+)?/,
                inside: {
                  variable: { pattern: /(=\s*)(?!\d)\w+/, lookbehind: !0 },
                  operator: /=/,
                },
              },
              punctuation: [/[\[\]().,:`]|->/],
              operator: [
                /[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
                /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
                /\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/,
              ],
              keyword: /\b(?:false|off|on|no|true|yes)\b/,
            }),
              e.languages.insertBefore("smarty", "tag", {
                "smarty-comment": {
                  pattern: /\{\*[\s\S]*?\*\}/,
                  alias: ["smarty", "comment"],
                },
              }),
              e.hooks.add("before-tokenize", function (t) {
                var n = !1;
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "smarty",
                  /\{\*[\s\S]*?\*\}|\{[\s\S]+?\}/g,
                  function (e) {
                    return (
                      "{/literal}" === e && (n = !1),
                      !n && ("{literal}" === e && (n = !0), !0)
                    );
                  }
                );
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(
                  t,
                  "smarty"
                );
              });
          })(n),
          (n.languages.plsql = n.languages.extend("sql", {
            comment: [/\/\*[\s\S]*?\*\//, /--.*/],
          })),
          "Array" !== n.util.type(n.languages.plsql.keyword) &&
            (n.languages.plsql.keyword = [n.languages.plsql.keyword]),
          n.languages.plsql.keyword.unshift(
            /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
          ),
          "Array" !== n.util.type(n.languages.plsql.operator) &&
            (n.languages.plsql.operator = [n.languages.plsql.operator]),
          n.languages.plsql.operator.unshift(/:=/),
          (function (e) {
            var t = /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              n = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/;
            (e.languages.soy = {
              comment: [
                /\/\*[\s\S]*?\*\//,
                { pattern: /(\s)\/\/.*/, lookbehind: !0, greedy: !0 },
              ],
              "command-arg": {
                pattern: /({+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,
                lookbehind: !0,
                alias: "string",
                inside: { punctuation: /\./ },
              },
              parameter: {
                pattern: /({+\/?\s*@?param\??\s+)\.?[\w.]+/,
                lookbehind: !0,
                alias: "variable",
              },
              keyword: [
                {
                  pattern: /({+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/,
                  lookbehind: !0,
                },
                /\b(?:any|as|attributes|bool|css|float|in|int|js|html|list|map|null|number|string|uri)\b/,
              ],
              delimiter: { pattern: /^{+\/?|\/?}+$/, alias: "punctuation" },
              property: /\w+(?==)/,
              variable: {
                pattern: /\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+]))*/,
                inside: {
                  string: { pattern: t, greedy: !0 },
                  number: n,
                  punctuation: /[\[\].?]/,
                },
              },
              string: { pattern: t, greedy: !0 },
              function: [
                /\w+(?=\()/,
                { pattern: /(\|[^\S\r\n]*)\w+/, lookbehind: !0 },
              ],
              boolean: /\b(?:true|false)\b/,
              number: n,
              operator: /\?:?|<=?|>=?|==?|!=|[+*\/%-]|\b(?:and|not|or)\b/,
              punctuation: /[{}()\[\]|.,:]/,
            }),
              e.hooks.add("before-tokenize", function (t) {
                var n = !1;
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "soy",
                  /{{.+?}}|{.+?}|\s\/\/.*|\/\*[\s\S]*?\*\//g,
                  function (e) {
                    return (
                      "{/literal}" === e && (n = !1),
                      !n && ("{literal}" === e && (n = !0), !0)
                    );
                  }
                );
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(t, "soy");
              });
          })(n),
          (function (e) {
            var t = {
              url: /url\((["']?).*?\1\)/i,
              string: {
                pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
                greedy: !0,
              },
              interpolation: null,
              func: null,
              important: /\B!(?:important|optional)\b/i,
              keyword: {
                pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
                lookbehind: !0,
              },
              hexcode: /#[\da-f]{3,6}/i,
              number: /\b\d+(?:\.\d+)?%?/,
              boolean: /\b(?:true|false)\b/,
              operator: [
                /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
              ],
              punctuation: /[{}()\[\];:,]/,
            };
            (t.interpolation = {
              pattern: /\{[^\r\n}:]+\}/,
              alias: "variable",
              inside: {
                delimiter: { pattern: /^{|}$/, alias: "punctuation" },
                rest: t,
              },
            }),
              (t.func = {
                pattern: /[\w-]+\([^)]*\).*/,
                inside: { function: /^[^(]+/, rest: t },
              }),
              (e.languages.stylus = {
                comment: {
                  pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
                  lookbehind: !0,
                },
                "atrule-declaration": {
                  pattern: /(^\s*)@.+/m,
                  lookbehind: !0,
                  inside: { atrule: /^@[\w-]+/, rest: t },
                },
                "variable-declaration": {
                  pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
                  lookbehind: !0,
                  inside: { variable: /^\S+/, rest: t },
                },
                statement: {
                  pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
                  lookbehind: !0,
                  inside: { keyword: /^\S+/, rest: t },
                },
                "property-declaration": {
                  pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
                  lookbehind: !0,
                  inside: {
                    property: {
                      pattern: /^[^\s:]+/,
                      inside: { interpolation: t.interpolation },
                    },
                    rest: t,
                  },
                },
                selector: {
                  pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
                  lookbehind: !0,
                  inside: {
                    interpolation: t.interpolation,
                    punctuation: /[{},]/,
                  },
                },
                func: t.func,
                string: t.string,
                interpolation: t.interpolation,
                punctuation: /[{}()\[\];:.]/,
              });
          })(n),
          (n.languages.swift = n.languages.extend("clike", {
            string: {
              pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
              greedy: !0,
              inside: {
                interpolation: {
                  pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
                  inside: {
                    delimiter: { pattern: /^\\\(|\)$/, alias: "variable" },
                  },
                },
              },
            },
            keyword: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
            number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
            constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
            atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
            builtin: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
          })),
          (n.languages.swift.string.inside.interpolation.inside.rest =
            n.languages.swift),
          (n.languages.yaml = {
            scalar: {
              pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
              lookbehind: !0,
              alias: "string",
            },
            comment: /#.*/,
            key: {
              pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
              lookbehind: !0,
              alias: "atrule",
            },
            directive: {
              pattern: /(^[ \t]*)%.+/m,
              lookbehind: !0,
              alias: "important",
            },
            datetime: {
              pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
              lookbehind: !0,
              alias: "number",
            },
            boolean: {
              pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
              lookbehind: !0,
              alias: "important",
            },
            null: {
              pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
              lookbehind: !0,
              alias: "important",
            },
            string: {
              pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}))/m,
              lookbehind: !0,
              greedy: !0,
            },
            number: {
              pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
              lookbehind: !0,
            },
            tag: /![^\s]+/,
            important: /[&*][\w]+/,
            punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
          }),
          (n.languages.tcl = {
            comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
            string: {
              pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/,
              greedy: !0,
            },
            variable: [
              { pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/, lookbehind: !0 },
              { pattern: /(\$){[^}]+}/, lookbehind: !0 },
              {
                pattern: /(^\s*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
                lookbehind: !0,
              },
            ],
            function: { pattern: /(^\s*proc[ \t]+)[^\s]+/m, lookbehind: !0 },
            builtin: [
              {
                pattern: /(^\s*)(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|continue)\b/m,
                lookbehind: !0,
              },
              /\b(?:elseif|else)\b/,
            ],
            scope: {
              pattern: /(^\s*)(?:global|upvar|variable)\b/m,
              lookbehind: !0,
              alias: "constant",
            },
            keyword: {
              pattern: /(^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|Safe_Base|scan|seek|set|socket|source|split|string|subst|Tcl|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|wordBreak(?:After|Before)|test|vars)|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
              lookbehind: !0,
            },
            operator: /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|ne|in|ni)\b/,
            punctuation: /[{}()\[\]]/,
          }),
          (function (e) {
            var t = "(?:\\([^|)]+\\)|\\[[^\\]]+\\]|\\{[^}]+\\})+",
              n = {
                css: {
                  pattern: /\{[^}]+\}/,
                  inside: { rest: e.languages.css },
                },
                "class-id": {
                  pattern: /(\()[^)]+(?=\))/,
                  lookbehind: !0,
                  alias: "attr-value",
                },
                lang: {
                  pattern: /(\[)[^\]]+(?=\])/,
                  lookbehind: !0,
                  alias: "attr-value",
                },
                punctuation: /[\\\/]\d+|\S/,
              };
            e.languages.textile = e.languages.extend("markup", {
              phrase: {
                pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
                lookbehind: !0,
                inside: {
                  "block-tag": {
                    pattern: RegExp("^[a-z]\\w*(?:" + t + "|[<>=()])*\\."),
                    inside: {
                      modifier: {
                        pattern: RegExp(
                          "(^[a-z]\\w*)(?:" + t + "|[<>=()])+(?=\\.)"
                        ),
                        lookbehind: !0,
                        inside: n,
                      },
                      tag: /^[a-z]\w*/,
                      punctuation: /\.$/,
                    },
                  },
                  list: {
                    pattern: RegExp("^[*#]+(?:" + t + ")?\\s+.+", "m"),
                    inside: {
                      modifier: {
                        pattern: RegExp("(^[*#]+)" + t),
                        lookbehind: !0,
                        inside: n,
                      },
                      punctuation: /^[*#]+/,
                    },
                  },
                  table: {
                    pattern: RegExp(
                      "^(?:(?:" +
                        t +
                        "|[<>=()^~])+\\.\\s*)?(?:\\|(?:(?:" +
                        t +
                        "|[<>=()^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|",
                      "m"
                    ),
                    inside: {
                      modifier: {
                        pattern: RegExp(
                          "(^|\\|(?:\\r?\\n|\\r)?)(?:" +
                            t +
                            "|[<>=()^~_]|[\\\\/]\\d+)+(?=\\.)"
                        ),
                        lookbehind: !0,
                        inside: n,
                      },
                      punctuation: /\||^\./,
                    },
                  },
                  inline: {
                    pattern: RegExp(
                      "(\\*\\*|__|\\?\\?|[*_%@+\\-^~])(?:" + t + ")?.+?\\1"
                    ),
                    inside: {
                      bold: {
                        pattern: RegExp("(^(\\*\\*?)(?:" + t + ")?).+?(?=\\2)"),
                        lookbehind: !0,
                      },
                      italic: {
                        pattern: RegExp("(^(__?)(?:" + t + ")?).+?(?=\\2)"),
                        lookbehind: !0,
                      },
                      cite: {
                        pattern: RegExp("(^\\?\\?(?:" + t + ")?).+?(?=\\?\\?)"),
                        lookbehind: !0,
                        alias: "string",
                      },
                      code: {
                        pattern: RegExp("(^@(?:" + t + ")?).+?(?=@)"),
                        lookbehind: !0,
                        alias: "keyword",
                      },
                      inserted: {
                        pattern: RegExp("(^\\+(?:" + t + ")?).+?(?=\\+)"),
                        lookbehind: !0,
                      },
                      deleted: {
                        pattern: RegExp("(^-(?:" + t + ")?).+?(?=-)"),
                        lookbehind: !0,
                      },
                      span: {
                        pattern: RegExp("(^%(?:" + t + ")?).+?(?=%)"),
                        lookbehind: !0,
                      },
                      modifier: {
                        pattern: RegExp("(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])" + t),
                        lookbehind: !0,
                        inside: n,
                      },
                      punctuation: /[*_%?@+\-^~]+/,
                    },
                  },
                  "link-ref": {
                    pattern: /^\[[^\]]+\]\S+$/m,
                    inside: {
                      string: { pattern: /(\[)[^\]]+(?=\])/, lookbehind: !0 },
                      url: { pattern: /(\])\S+$/, lookbehind: !0 },
                      punctuation: /[\[\]]/,
                    },
                  },
                  link: {
                    pattern: RegExp(
                      '"(?:' + t + ')?[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'
                    ),
                    inside: {
                      text: {
                        pattern: RegExp('(^"(?:' + t + ')?)[^"]+(?=")'),
                        lookbehind: !0,
                      },
                      modifier: {
                        pattern: RegExp('(^")' + t),
                        lookbehind: !0,
                        inside: n,
                      },
                      url: { pattern: /(:).+/, lookbehind: !0 },
                      punctuation: /[":]/,
                    },
                  },
                  image: {
                    pattern: RegExp(
                      "!(?:" +
                        t +
                        "|[<>=()])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?"
                    ),
                    inside: {
                      source: {
                        pattern: RegExp(
                          "(^!(?:" +
                            t +
                            "|[<>=()])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)"
                        ),
                        lookbehind: !0,
                        alias: "url",
                      },
                      modifier: {
                        pattern: RegExp("(^!)(?:" + t + "|[<>=()])+"),
                        lookbehind: !0,
                        inside: n,
                      },
                      url: { pattern: /(:).+/, lookbehind: !0 },
                      punctuation: /[!:]/,
                    },
                  },
                  footnote: {
                    pattern: /\b\[\d+\]/,
                    alias: "comment",
                    inside: { punctuation: /\[|\]/ },
                  },
                  acronym: {
                    pattern: /\b[A-Z\d]+\([^)]+\)/,
                    inside: {
                      comment: { pattern: /(\()[^)]+(?=\))/, lookbehind: !0 },
                      punctuation: /[()]/,
                    },
                  },
                  mark: {
                    pattern: /\b\((?:TM|R|C)\)/,
                    alias: "comment",
                    inside: { punctuation: /[()]/ },
                  },
                },
              },
            });
            var a = {
              inline: e.languages.textile.phrase.inside.inline,
              link: e.languages.textile.phrase.inside.link,
              image: e.languages.textile.phrase.inside.image,
              footnote: e.languages.textile.phrase.inside.footnote,
              acronym: e.languages.textile.phrase.inside.acronym,
              mark: e.languages.textile.phrase.inside.mark,
            };
            (e.languages.textile.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
              (e.languages.textile.phrase.inside.inline.inside.bold.inside = a),
              (e.languages.textile.phrase.inside.inline.inside.italic.inside = a),
              (e.languages.textile.phrase.inside.inline.inside.inserted.inside = a),
              (e.languages.textile.phrase.inside.inline.inside.deleted.inside = a),
              (e.languages.textile.phrase.inside.inline.inside.span.inside = a),
              (e.languages.textile.phrase.inside.table.inside.inline =
                a.inline),
              (e.languages.textile.phrase.inside.table.inside.link = a.link),
              (e.languages.textile.phrase.inside.table.inside.image = a.image),
              (e.languages.textile.phrase.inside.table.inside.footnote =
                a.footnote),
              (e.languages.textile.phrase.inside.table.inside.acronym =
                a.acronym),
              (e.languages.textile.phrase.inside.table.inside.mark = a.mark);
          })(n),
          (function (e) {
            (e.languages.tt2 = e.languages.extend("clike", {
              comment: { pattern: /#.*|\[%#[\s\S]*?%\]/, lookbehind: !0 },
              keyword: /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|TAGS|THROW|TRY|SWITCH|UNLESS|USE|WHILE|WRAPPER)\b/,
              punctuation: /[[\]{},()]/,
            })),
              delete e.languages.tt2.operator,
              delete e.languages.tt2.variable,
              e.languages.insertBefore("tt2", "number", {
                operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|or|not)\b/,
                variable: {
                  pattern: /[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*/i,
                },
              }),
              delete e.languages.tt2.delimiter,
              e.languages.insertBefore("tt2", "keyword", {
                delimiter: {
                  pattern: /^(?:\[%|%%)-?|-?%]$/,
                  alias: "punctuation",
                },
              }),
              e.languages.insertBefore("tt2", "string", {
                "single-quoted-string": {
                  pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
                  greedy: !0,
                  alias: "string",
                },
                "double-quoted-string": {
                  pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
                  greedy: !0,
                  alias: "string",
                  inside: {
                    variable: {
                      pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i,
                    },
                  },
                },
              }),
              delete e.languages.tt2.string,
              e.hooks.add("before-tokenize", function (t) {
                e.languages["markup-templating"].buildPlaceholders(
                  t,
                  "tt2",
                  /\[%[\s\S]+?%\]/g
                );
              }),
              e.hooks.add("after-tokenize", function (t) {
                e.languages["markup-templating"].tokenizePlaceholders(t, "tt2");
              });
          })(n),
          (n.languages.twig = {
            comment: /\{#[\s\S]*?#\}/,
            tag: {
              pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
              inside: {
                ld: {
                  pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
                  inside: { punctuation: /^(?:\{\{|\{%)-?/, keyword: /\w+/ },
                },
                rd: {
                  pattern: /-?(?:%\}|\}\})$/,
                  inside: { punctuation: /.*/ },
                },
                string: {
                  pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                  inside: { punctuation: /^['"]|['"]$/ },
                },
                keyword: /\b(?:even|if|odd)\b/,
                boolean: /\b(?:true|false|null)\b/,
                number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
                operator: [
                  {
                    pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
                    lookbehind: !0,
                  },
                  /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/,
                ],
                property: /\b[a-zA-Z_]\w*\b/,
                punctuation: /[()\[\]{}:.,]/,
              },
            },
            other: { pattern: /\S(?:[\s\S]*\S)?/, inside: n.languages.markup },
          });
        var s = n.util.clone(n.languages.typescript);
        (n.languages.tsx = n.languages.extend("jsx", s)),
          (n.languages.vbnet = n.languages.extend("basic", {
            keyword: /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
            comment: [
              { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
              { pattern: /(^|[^\\:])'.*/, lookbehind: !0 },
            ],
          })),
          (function (e) {
            e.languages.velocity = e.languages.extend("markup", {});
            var t = {
              variable: {
                pattern: /(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))?|\[[^\]]+])*|{[^}]+})/i,
                lookbehind: !0,
                inside: {},
              },
              string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
              number: /\b\d+\b/,
              boolean: /\b(?:true|false)\b/,
              operator: /[=!<>]=?|[+*\/%-]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/,
              punctuation: /[(){}[\]:,.]/,
            };
            (t.variable.inside = {
              string: t.string,
              function: {
                pattern: /([^\w-])[a-z][\w-]*(?=\()/,
                lookbehind: !0,
              },
              number: t.number,
              boolean: t.boolean,
              punctuation: t.punctuation,
            }),
              e.languages.insertBefore("velocity", "comment", {
                unparsed: {
                  pattern: /(^|[^\\])#\[\[[\s\S]*?]]#/,
                  lookbehind: !0,
                  greedy: !0,
                  inside: { punctuation: /^#\[\[|]]#$/ },
                },
                "velocity-comment": [
                  {
                    pattern: /(^|[^\\])#\*[\s\S]*?\*#/,
                    lookbehind: !0,
                    greedy: !0,
                    alias: "comment",
                  },
                  {
                    pattern: /(^|[^\\])##.*/,
                    lookbehind: !0,
                    greedy: !0,
                    alias: "comment",
                  },
                ],
                directive: {
                  pattern: /(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|{[a-z][\w-]*})(?:\s*\((?:[^()]|\([^()]*\))*\))?/i,
                  lookbehind: !0,
                  inside: {
                    keyword: {
                      pattern: /^#@?(?:[a-z][\w-]*|{[a-z][\w-]*})|\bin\b/,
                      inside: { punctuation: /[{}]/ },
                    },
                    rest: t,
                  },
                },
                variable: t.variable,
              }),
              (e.languages.velocity.tag.inside["attr-value"].inside.rest =
                e.languages.velocity);
          })(n),
          (n.languages.verilog = {
            comment: /\/\/.*|\/\*[\s\S]*?\*\//,
            string: {
              pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
              greedy: !0,
            },
            property: /\B\$\w+\b/,
            constant: /\B`\w+\b/,
            function: /\w+(?=\()/,
            keyword: /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
            important: /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/,
            number: /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b\d*[._]?\d+(?:e[-+]?\d+)?/i,
            operator: /[-+{}^~%*\/?=!<>&|]+/,
            punctuation: /[[\];(),.:]/,
          }),
          (n.languages.vhdl = {
            comment: /--.+/,
            "vhdl-vectors": {
              pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
              alias: "number",
            },
            "quoted-function": { pattern: /"\S+?"(?=\()/, alias: "function" },
            string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
            constant: /\b(?:use|library)\b/i,
            keyword: /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
            boolean: /\b(?:true|false)\b/i,
            function: /\w+(?=\()/,
            number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
            operator: /[<>]=?|:=|[-+*\/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
            punctuation: /[{}[\];(),.:]/,
          }),
          (n.languages.vim = {
            string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
            comment: /".*/,
            function: /\w+(?=\()/,
            keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
            builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
            number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
            operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
            punctuation: /[{}[\](),;:]/,
          }),
          (n.languages["visual-basic"] = {
            comment: {
              pattern: /(?:['‘’]|REM\b).*/i,
              inside: { keyword: /^REM/i },
            },
            directive: {
              pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
              alias: "comment",
              greedy: !0,
            },
            string: {
              pattern: /["“”](?:["“”]{2}|[^"“”])*["“”]C?/i,
              greedy: !0,
            },
            date: {
              pattern: /#[^\S\r\n]*(?:\d+([\/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))[^\S\r\n]*#/i,
              alias: "builtin",
            },
            number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
            boolean: /\b(?:True|False|Nothing)\b/i,
            keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\b/i,
            operator: [
              /[+\-*\/\\^<=>&#@$%!]/,
              { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 },
            ],
            punctuation: /[{}().,:?]/,
          }),
          (n.languages.vb = n.languages["visual-basic"]),
          (n.languages.wasm = {
            comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
            string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
            keyword: [
              { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
              {
                pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
                inside: { punctuation: /\./ },
              },
              /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
            ],
            variable: /\$[\w!#$%&'*+\-.\/:<=>?@\\^_`|~]+/i,
            number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
            punctuation: /[()]/,
          }),
          (n.languages.wiki = n.languages.extend("markup", {
            "block-comment": {
              pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
              lookbehind: !0,
              alias: "comment",
            },
            heading: {
              pattern: /^(=+).+?\1/m,
              inside: { punctuation: /^=+|=+$/, important: /.+/ },
            },
            emphasis: {
              pattern: /('{2,5}).+?\1/,
              inside: {
                "bold italic": { pattern: /(''''').+?(?=\1)/, lookbehind: !0 },
                bold: {
                  pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
                  lookbehind: !0,
                },
                italic: {
                  pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
                  lookbehind: !0,
                },
                punctuation: /^''+|''+$/,
              },
            },
            hr: { pattern: /^-{4,}/m, alias: "punctuation" },
            url: [
              /ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:RFC|PMID) +\d+/i,
              /\[\[.+?\]\]|\[.+?\]/,
            ],
            variable: [/__[A-Z]+__/, /\{{3}.+?\}{3}/, /\{\{.+?\}\}/],
            symbol: [/^#redirect/im, /~{3,5}/],
            "table-tag": {
              pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
              lookbehind: !0,
              inside: {
                "table-bar": { pattern: /\|$/, alias: "punctuation" },
                rest: n.languages.markup.tag.inside,
              },
            },
            punctuation: /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m,
          })),
          n.languages.insertBefore("wiki", "tag", {
            nowiki: {
              pattern: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
              inside: {
                tag: {
                  pattern: /<(?:nowiki|pre|source)\b[\s\S]*?>|<\/(?:nowiki|pre|source)>/i,
                  inside: n.languages.markup.tag.inside,
                },
              },
            },
          }),
          (function (e) {
            (e.languages.xeora = e.languages.extend("markup", {
              constant: {
                pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
                inside: { punctuation: { pattern: /\$/ } },
              },
              variable: {
                pattern: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/,
                inside: {
                  punctuation: { pattern: /[$.]/ },
                  operator: { pattern: /#+|[-+*~=^@]/ },
                },
              },
              "function-inline": {
                pattern: /\$F:[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-#]*(?:\w+.)[\w+.]+)?)*)?\$/,
                inside: {
                  variable: {
                    pattern: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/,
                    inside: {
                      punctuation: { pattern: /[,.|]/ },
                      operator: { pattern: /#+|[-+*~=^@]/ },
                    },
                  },
                  punctuation: { pattern: /\$\w:|[$:?.,|]/ },
                },
                alias: "function",
              },
              "function-block": {
                pattern: /\$XF:{[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-#]*(?:\w+.)[\w+.]+)?)*)?}:XF\$/,
                inside: { punctuation: { pattern: /[$:{}?.,|]/ } },
                alias: "function",
              },
              "directive-inline": {
                pattern: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\/\w.]+\$/,
                inside: {
                  punctuation: {
                    pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
                    inside: { tag: { pattern: /#\d/ } },
                  },
                },
                alias: "function",
              },
              "directive-block-open": {
                pattern: /\$\w+:{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\w.]+:{(![A-Z]+)?/,
                inside: {
                  punctuation: {
                    pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
                    inside: { tag: { pattern: /#\d/ } },
                  },
                  attribute: {
                    pattern: /![A-Z]+$/,
                    inside: { punctuation: { pattern: /!/ } },
                    alias: "keyword",
                  },
                },
                alias: "function",
              },
              "directive-block-separator": {
                pattern: /}:[-\w.]+:{/,
                inside: { punctuation: { pattern: /[:{}]/ } },
                alias: "function",
              },
              "directive-block-close": {
                pattern: /}:[-\w.]+\$/,
                inside: { punctuation: { pattern: /[:{}$]/ } },
                alias: "function",
              },
            })),
              e.languages.insertBefore(
                "inside",
                "punctuation",
                {
                  variable:
                    e.languages.xeora["function-inline"].inside.variable,
                },
                e.languages.xeora["function-block"]
              ),
              (e.languages.xeoracube = e.languages.xeora);
          })(n),
          (n.languages.xojo = {
            comment: {
              pattern: /(?:'|\/\/|Rem\b).+/i,
              inside: { keyword: /^Rem/i },
            },
            string: { pattern: /"(?:""|[^"])*"/, greedy: !0 },
            number: [
              /(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
              /&[bchou][a-z\d]+/i,
            ],
            symbol: /#(?:If|Else|ElseIf|Endif|Pragma)\b/i,
            keyword: /\b(?:AddHandler|App|Array|As(?:signs)?|By(?:Ref|Val)|Break|Call|Case|Catch|Const|Continue|CurrentMethodName|Declare|Dim|Do(?:wnTo)?|Each|Else(?:If)?|End|Exit|Extends|False|Finally|For|Global|If|In|Lib|Loop|Me|Next|Nil|Optional|ParamArray|Raise(?:Event)?|ReDim|Rem|RemoveHandler|Return|Select|Self|Soft|Static|Step|Super|Then|To|True|Try|Ubound|Until|Using|Wend|While)\b/i,
            operator: /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|Xor|WeakAddressOf)\b/i,
            punctuation: /[.,;:()]/,
          }),
          (function (e) {
            (e.languages.xquery = e.languages.extend("markup", {
              "xquery-comment": {
                pattern: /\(:[\s\S]*?:\)/,
                greedy: !0,
                alias: "comment",
              },
              string: { pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/, greedy: !0 },
              extension: { pattern: /\(#.+?#\)/, alias: "symbol" },
              variable: /\$[\w-:]+/,
              axis: {
                pattern: /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,
                lookbehind: !0,
                alias: "operator",
              },
              "keyword-operator": {
                pattern: /(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^:-])/,
                lookbehind: !0,
                alias: "operator",
              },
              keyword: {
                pattern: /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,
                lookbehind: !0,
              },
              function: /[\w-]+(?::[\w-]+)*(?=\s*\()/,
              "xquery-element": {
                pattern: /(element\s+)[\w-]+(?::[\w-]+)*/,
                lookbehind: !0,
                alias: "tag",
              },
              "xquery-attribute": {
                pattern: /(attribute\s+)[\w-]+(?::[\w-]+)*/,
                lookbehind: !0,
                alias: "attr-name",
              },
              builtin: {
                pattern: /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|ENTITIES|ENTITY|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|ID|IDREFS?|int|integer|language|long|Name|NCName|negativeInteger|NMTOKENS?|nonNegativeInteger|nonPositiveInteger|normalizedString|NOTATION|positiveInteger|QName|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,
                lookbehind: !0,
              },
              number: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,
              operator: [
                /[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/,
                { pattern: /(\s)-(?=\s)/, lookbehind: !0 },
              ],
              punctuation: /[[\](){},;:\/]/,
            })),
              (e.languages.xquery.tag.pattern = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
              (e.languages.xquery.tag.inside[
                "attr-value"
              ].pattern = /=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}|(?!\1)[^\\])*\1|[^\s'">=]+)/i),
              (e.languages.xquery.tag.inside[
                "attr-value"
              ].inside.punctuation = /^="|"$/),
              (e.languages.xquery.tag.inside["attr-value"].inside.expression = {
                pattern: /{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}/,
                inside: { rest: e.languages.xquery },
                alias: "language-xquery",
              });
            var t = function e(t) {
                return "string" == typeof t
                  ? t
                  : "string" == typeof t.content
                  ? t.content
                  : t.content.map(e).join("");
              },
              n = function n(a) {
                for (var i = [], r = 0; r < a.length; r++) {
                  var o = a[r],
                    s = !1;
                  if (
                    ("string" != typeof o &&
                      ("tag" === o.type &&
                      o.content[0] &&
                      "tag" === o.content[0].type
                        ? "</" === o.content[0].content[0].content
                          ? i.length > 0 &&
                            i[i.length - 1].tagName ===
                              t(o.content[0].content[1]) &&
                            i.pop()
                          : "/>" === o.content[o.content.length - 1].content ||
                            i.push({
                              tagName: t(o.content[0].content[1]),
                              openedBraces: 0,
                            })
                        : !(
                            i.length > 0 &&
                            "punctuation" === o.type &&
                            "{" === o.content
                          ) ||
                          (a[r + 1] &&
                            "punctuation" === a[r + 1].type &&
                            "{" === a[r + 1].content) ||
                          (a[r - 1] &&
                            "plain-text" === a[r - 1].type &&
                            "{" === a[r - 1].content)
                        ? i.length > 0 &&
                          i[i.length - 1].openedBraces > 0 &&
                          "punctuation" === o.type &&
                          "}" === o.content
                          ? i[i.length - 1].openedBraces--
                          : "comment" !== o.type && (s = !0)
                        : i[i.length - 1].openedBraces++),
                    (s || "string" == typeof o) &&
                      i.length > 0 &&
                      0 === i[i.length - 1].openedBraces)
                  ) {
                    var l = t(o);
                    r < a.length - 1 &&
                      ("string" == typeof a[r + 1] ||
                        "plain-text" === a[r + 1].type) &&
                      ((l += t(a[r + 1])), a.splice(r + 1, 1)),
                      r > 0 &&
                        ("string" == typeof a[r - 1] ||
                          "plain-text" === a[r - 1].type) &&
                        ((l = t(a[r - 1]) + l), a.splice(r - 1, 1), r--),
                      (a[r] = /^\s+$/.test(l)
                        ? l
                        : new e.Token("plain-text", l, null, l));
                  }
                  o.content && "string" != typeof o.content && n(o.content);
                }
              };
            e.hooks.add("after-tokenize", function (e) {
              "xquery" === e.language && n(e.tokens);
            });
          })(n),
          (n.languages.tap = {
            fail: /not ok[^#{\n\r]*/,
            pass: /ok[^#{\n\r]*/,
            pragma: /pragma [+-][a-z]+/,
            bailout: /bail out!.*/i,
            version: /TAP version \d+/i,
            plan: /\d+\.\.\d+(?: +#.*)?/,
            subtest: { pattern: /# Subtest(?:: .*)?/, greedy: !0 },
            punctuation: /[{}]/,
            directive: /#.*/,
            yamlish: {
              pattern: /(^[^\S\r\n]*)---(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?[^\S\r\n]*\.\.\.$/m,
              lookbehind: !0,
              inside: n.languages.yaml,
              alias: "language-yaml",
            },
          }),
          (function () {
            function e(e, t) {
              return Array.prototype.slice.call(
                (t || document).querySelectorAll(e)
              );
            }
            function t(e, t) {
              return (
                (t = " " + t + " "),
                (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) >
                  -1
              );
            }
            function a(e, a, i) {
              for (
                var o,
                  s = (a =
                    "string" == typeof a ? a : e.getAttribute("data-line"))
                    .replace(/\s+/g, "")
                    .split(","),
                  l = +e.getAttribute("data-line-offset") || 0,
                  d = (r() ? parseInt : parseFloat)(
                    getComputedStyle(e).lineHeight
                  ),
                  c = t(e, "line-numbers"),
                  p = 0;
                (o = s[p++]);

              ) {
                var u = o.split("-"),
                  g = +u[0],
                  m = +u[1] || g,
                  b =
                    e.querySelector(
                      '.line-highlight[data-range="' + o + '"]'
                    ) || document.createElement("div");
                if (
                  (b.setAttribute("aria-hidden", "true"),
                  b.setAttribute("data-range", o),
                  (b.className = (i || "") + " line-highlight"),
                  c && n.plugins.lineNumbers)
                ) {
                  var f = n.plugins.lineNumbers.getLine(e, g),
                    E = n.plugins.lineNumbers.getLine(e, m);
                  f && (b.style.top = f.offsetTop + "px"),
                    E &&
                      (b.style.height =
                        E.offsetTop - f.offsetTop + E.offsetHeight + "px");
                } else
                  b.setAttribute("data-start", g),
                    m > g && b.setAttribute("data-end", m),
                    (b.style.top = (g - l - 1) * d + "px"),
                    (b.textContent = new Array(m - g + 2).join(" \n"));
                c
                  ? e.appendChild(b)
                  : (e.querySelector("code") || e).appendChild(b);
              }
            }
            function i() {
              var t = location.hash.slice(1);
              e(".temporary.line-highlight").forEach(function (e) {
                e.parentNode.removeChild(e);
              });
              var n = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
              if (n && !document.getElementById(t)) {
                var i = t.slice(0, t.lastIndexOf(".")),
                  r = document.getElementById(i);
                r &&
                  (r.hasAttribute("data-line") ||
                    r.setAttribute("data-line", ""),
                  a(r, n, "temporary "),
                  document
                    .querySelector(".temporary.line-highlight")
                    .scrollIntoView());
              }
            }
            if (
              "undefined" != typeof self &&
              self.Prism &&
              self.document &&
              document.querySelector
            ) {
              var r = (function () {
                  var e;
                  return function () {
                    if (void 0 === e) {
                      var t = document.createElement("div");
                      (t.style.fontSize = "13px"),
                        (t.style.lineHeight = "1.5"),
                        (t.style.padding = 0),
                        (t.style.border = 0),
                        (t.innerHTML = "&nbsp;<br />&nbsp;"),
                        document.body.appendChild(t),
                        (e = 38 === t.offsetHeight),
                        document.body.removeChild(t);
                    }
                    return e;
                  };
                })(),
                o = 0;
              n.hooks.add("before-sanity-check", function (t) {
                var n = t.element.parentNode,
                  a = n && n.getAttribute("data-line");
                if (n && a && /pre/i.test(n.nodeName)) {
                  var i = 0;
                  e(".line-highlight", n).forEach(function (e) {
                    (i += e.textContent.length), e.parentNode.removeChild(e);
                  }),
                    i &&
                      /^( \n)+$/.test(t.code.slice(-i)) &&
                      (t.code = t.code.slice(0, -i));
                }
              }),
                n.hooks.add("complete", function e(r) {
                  var s = r.element.parentNode,
                    l = s && s.getAttribute("data-line");
                  if (s && l && /pre/i.test(s.nodeName)) {
                    clearTimeout(o);
                    var d = n.plugins.lineNumbers,
                      c = r.plugins && r.plugins.lineNumbers;
                    t(s, "line-numbers") && d && !c
                      ? n.hooks.add("line-numbers", e)
                      : (a(s, l), (o = setTimeout(i, 1)));
                  }
                }),
                window.addEventListener("hashchange", i),
                window.addEventListener("resize", function () {
                  var e = document.querySelectorAll("pre[data-line]");
                  Array.prototype.forEach.call(e, function (e) {
                    a(e);
                  });
                });
            }
          })(),
          ("undefined" != typeof self && !self.Prism) ||
            (void 0 !== e && !e.Prism) ||
            n.hooks.add("wrap", function (e) {
              "keyword" === e.type && e.classes.push("keyword-" + e.content);
            }),
          (function () {
            function e(e) {
              this.defaults = i({}, e);
            }
            function t(e) {
              return e.replace(/-(\w)/g, function (e, t) {
                return t.toUpperCase();
              });
            }
            function a(e) {
              for (var t = 0, n = 0; n < e.length; ++n)
                e.charCodeAt(n) == "\t".charCodeAt(0) && (t += 3);
              return e.length + t;
            }
            var i =
              Object.assign ||
              function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
              };
            (e.prototype = {
              setDefaults: function (e) {
                this.defaults = i(this.defaults, e);
              },
              normalize: function (e, n) {
                for (var a in (n = i(this.defaults, n))) {
                  var r = t(a);
                  "normalize" !== a &&
                    "setDefaults" !== r &&
                    n[a] &&
                    this[r] &&
                    (e = this[r].call(this, e, n[a]));
                }
                return e;
              },
              leftTrim: function (e) {
                return e.replace(/^\s+/, "");
              },
              rightTrim: function (e) {
                return e.replace(/\s+$/, "");
              },
              tabsToSpaces: function (e, t) {
                return (
                  (t = 0 | t || 4), e.replace(/\t/g, new Array(++t).join(" "))
                );
              },
              spacesToTabs: function (e, t) {
                return (
                  (t = 0 | t || 4),
                  e.replace(new RegExp(" {" + t + "}", "g"), "\t")
                );
              },
              removeTrailing: function (e) {
                return e.replace(/\s*?$/gm, "");
              },
              removeInitialLineFeed: function (e) {
                return e.replace(/^(?:\r?\n|\r)/, "");
              },
              removeIndent: function (e) {
                var t = e.match(/^[^\S\n\r]*(?=\S)/gm);
                return t && t[0].length
                  ? (t.sort(function (e, t) {
                      return e.length - t.length;
                    }),
                    t[0].length
                      ? e.replace(new RegExp("^" + t[0], "gm"), "")
                      : e)
                  : e;
              },
              indent: function (e, t) {
                return e.replace(
                  /^[^\S\n\r]*(?=\S)/gm,
                  new Array(++t).join("\t") + "$&"
                );
              },
              breakLines: function (e, t) {
                t = !0 === t ? 80 : 0 | t || 80;
                for (var n = e.split("\n"), i = 0; i < n.length; ++i)
                  if (!(a(n[i]) <= t)) {
                    for (
                      var r = n[i].split(/(\s+)/g), o = 0, s = 0;
                      s < r.length;
                      ++s
                    ) {
                      var l = a(r[s]);
                      (o += l) > t && ((r[s] = "\n" + r[s]), (o = l));
                    }
                    n[i] = r.join("");
                  }
                return n.join("\n");
              },
            }),
              "undefined" != typeof module &&
                module.exports &&
                (module.exports = e),
              void 0 !== n &&
                ((n.plugins.NormalizeWhitespace = new e({
                  "remove-trailing": !0,
                  "remove-indent": !0,
                  "left-trim": !0,
                  "right-trim": !0,
                })),
                n.hooks.add("before-sanity-check", function (e) {
                  var t = n.plugins.NormalizeWhitespace;
                  if (
                    !e.settings ||
                    !1 !== e.settings["whitespace-normalization"]
                  ) {
                    if ((!e.element || !e.element.parentNode) && e.code)
                      return void (e.code = t.normalize(e.code, e.settings));
                    var a = e.element.parentNode,
                      i = /\bno-whitespace-normalization\b/;
                    if (
                      e.code &&
                      a &&
                      "pre" === a.nodeName.toLowerCase() &&
                      !i.test(a.className) &&
                      !i.test(e.element.className)
                    ) {
                      for (
                        var r = a.childNodes, o = "", s = "", l = !1, d = 0;
                        d < r.length;
                        ++d
                      ) {
                        var c = r[d];
                        c == e.element
                          ? (l = !0)
                          : "#text" === c.nodeName &&
                            (l ? (s += c.nodeValue) : (o += c.nodeValue),
                            a.removeChild(c),
                            --d);
                      }
                      if (e.element.children.length && n.plugins.KeepMarkup) {
                        var p = o + e.element.innerHTML + s;
                        (e.element.innerHTML = t.normalize(p, e.settings)),
                          (e.code = e.element.textContent);
                      } else
                        (e.code = o + e.code + s),
                          (e.code = t.normalize(e.code, e.settings));
                    }
                  }
                }));
          })();
      },
      {},
    ],
    "d+rf": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.$_ = e),
          (exports.$_ready = o),
          (exports.DOM = void 0);
        class t {
          constructor(t) {
            if ("string" == typeof t)
              (this.collection = document.querySelectorAll(t)),
                (this.length = this.collection.length);
            else if (t instanceof NodeList)
              (this.collection = t), (this.length = t.length);
            else {
              if ("object" != typeof t) return null;
              t.length >= 1 ? (this.collection = t) : (this.collection = [t]),
                (this.length = this.collection.length);
            }
          }
          hide() {
            for (const t of this.collection) t.style.display = "none";
          }
          show(t = "block") {
            for (const e of this.collection) e.style.display = t;
          }
          addClass(t) {
            for (const e of this.collection) e.classList.add(t);
          }
          removeClass(t = null) {
            if (null !== t)
              for (const e of this.collection) e.classList.remove(t);
            else
              for (const e of this.collection)
                for (; e.classList.length > 0; )
                  e.classList.remove(e.classList.item(0));
          }
          toggleClass(t) {
            t = t.split(" ");
            for (const e of this.collection)
              for (let o = 0; o < t.length; o++) e.classList.toggle(t[o]);
          }
          hasClass(t) {
            if (this.collection[0])
              for (let e = 0; e < this.collection[0].classList.length; e++)
                if (this.collection[0].classList[e] == t) return !0;
            return !1;
          }
          value(t) {
            if (this.length > 0) {
              if (void 0 === t) return this.collection[0].value;
              this.collection[0].value = t;
            }
          }
          focus() {
            this.length > 0 && this.collection[0].focus();
          }
          click(t) {
            for (const e of this.collection) e.addEventListener("click", t, !1);
          }
          keyup(t) {
            for (const e of this.collection) e.addEventListener("keyup", t, !1);
          }
          keydown(t) {
            for (const e of this.collection)
              e.addEventListener("keydown", t, !1);
          }
          submit(t) {
            for (const e of this.collection)
              e.addEventListener("submit", t, !1);
          }
          change(t) {
            for (const e of this.collection)
              e.addEventListener("change", t, !1);
          }
          scroll(t) {
            for (const e of this.collection)
              e.addEventListener("scroll", t, !1);
          }
          on(t, o, i) {
            t = t.split(" ");
            for (const l of this.collection)
              for (let n = 0; n < t.length; n++)
                "function" == typeof o
                  ? l.addEventListener(t[n], o, !1)
                  : "string" == typeof o &&
                    "function" == typeof i &&
                    l.addEventListener(
                      t[n],
                      (t) => {
                        t.target &&
                          e(t.target).matches(o) &&
                          i.call(t.target, t);
                      },
                      !1
                    );
          }
          filter(e) {
            if (this.length > 0)
              return new t(this.collection[0].querySelector(e));
          }
          data(t, e) {
            if (this.length > 0) {
              if (void 0 === e) return this.collection[0].dataset[t];
              this.collection[0].dataset[t] = e;
            }
          }
          text(t) {
            if (this.length > 0) {
              if (void 0 === t) return this.collection[0].textContent;
              this.collection[0].textContent = t;
            }
          }
          html(t) {
            if (this.length > 0) {
              if (void 0 === t) return this.collection[0].innerHTML;
              this.collection[0].innerHTML = t;
            }
          }
          append(t) {
            if (this.length > 0)
              if ("string" == typeof t) {
                const e = document.createElement("div");
                (e.innerHTML = "string" == typeof t ? t.trim() : t),
                  this.collection[0].appendChild(e.firstChild);
              } else this.collection[0].appendChild(t);
          }
          prepend(t) {
            if (this.length > 0)
              if ("string" == typeof t) {
                const e = document.createElement("div");
                (e.innerHTML = "string" == typeof t ? t.trim() : t),
                  this.collection[0].childNodes.length > 0
                    ? this.collection[0].insertBefore(
                        e.firstChild,
                        this.collection[0].childNodes[0]
                      )
                    : this.collection[0].appendChild(e.firstChild);
              } else
                this.collection[0].childNodes.length > 0
                  ? this.collection[0].insertBefore(
                      t,
                      this.collection[0].childNodes[0]
                    )
                  : this.collection[0].appendChild(t);
          }
          each(t) {
            for (const e of this.collection) t(e);
          }
          get(t) {
            return this.collection[t];
          }
          first() {
            if (this.length > 0) return new t(this.collection[0]);
          }
          last() {
            if (this.length > 0)
              return new t(this.collection[this.collection.length - 1]);
          }
          isVisible() {
            for (const t of this.collection)
              if (
                "none" != t.display &&
                t.offsetWidth > 0 &&
                t.offsetHeight > 0
              )
                return !0;
            return !1;
          }
          parent() {
            if (this.collection[0])
              return new t(this.collection[0].parentElement);
          }
          find(e) {
            if (this.collection[0])
              return new t(this.collection[0].querySelectorAll(e));
          }
          offset() {
            if (this.collection[0]) {
              const t = this.collection[0].getBoundingClientRect();
              return {
                top: t.top + document.body.scrollTop,
                left: t.left + document.body.scrollLeft,
              };
            }
          }
          closest(t) {
            let e = null,
              o = this;
            for (; void 0 !== o.get(0) && null === e; ) {
              const i = o.find(t);
              i.length > 0 && (e = i), (o = o.parent());
            }
            return null !== e ? e : o;
          }
          attribute(t, e) {
            if (this.collection[0]) {
              if (void 0 !== e) return this.collection[0].setAttribute(t, e);
              this.collection[0].getAttribute(t);
            }
          }
          hasAttribute(t) {
            if (this.collection[0]) return this.collection[0].hasAttribute(t);
          }
          after(t) {
            for (const e of this.collection)
              e.insertAdjacentHTML("afterend", t);
          }
          before(t) {
            for (const e of this.collection)
              e.insertAdjacentHTML("beforebegin", t);
          }
          style(t, e) {
            for (let o = 0; o < this.collection.length; o++)
              if ("string" == typeof t && "undefined" !== e)
                this.collection[o].style[t] = e;
              else {
                if ("string" == typeof t && "undefined" === e)
                  return this.collection[o].style[t];
                if ("object" == typeof t)
                  for (const e in t) this.collection[o].style[e] = t[e];
              }
          }
          animate(t, e) {
            for (let o = 0; o < this.collection.length; o++)
              for (const i in t) {
                const l = new Date().getTime(),
                  n = this.collection;
                let c, s;
                void 0 !== this.collection[o].style[i]
                  ? ((s = this.collection[o].style[i]),
                    (c = setInterval(() => {
                      const r = Math.min(1, (new Date().getTime() - l) / e);
                      (n[o].style[i] = s + r * (t[i] - s)),
                        1 == r && clearInterval(c);
                    }, 25)),
                    (this.collection[o].style[i] = s))
                  : void 0 !== this.collection[o][i] &&
                    ((s = this.collection[o][i]),
                    (c = setInterval(() => {
                      const r = Math.min(1, (new Date().getTime() - l) / e);
                      (n[o][i] = s + r * (t[i] - s)),
                        1 == r && clearInterval(c);
                    }, 25)),
                    (this.collection[o][i] = s));
              }
          }
          fadeIn(t = 400, e) {
            if (this.collection[0]) {
              const o = this.collection[0];
              o.style.opacity = 0;
              let i = +new Date();
              const l = () => {
                (o.style.opacity = +o.style.opacity + (new Date() - i) / t),
                  (i = +new Date()),
                  +o.style.opacity < 1
                    ? (window.requestAnimationFrame &&
                        requestAnimationFrame(l)) ||
                      setTimeout(l, 16)
                    : "function" == typeof e && e();
              };
              l();
            }
          }
          fadeOut(t = 400, e) {
            if (this.collection[0]) {
              let o = +new Date();
              const i = this.collection[0],
                l = () => {
                  (i.style.opacity = +i.style.opacity - (new Date() - o) / t),
                    (o = +new Date()),
                    +i.style.opacity > 0
                      ? (window.requestAnimationFrame &&
                          requestAnimationFrame(l)) ||
                        setTimeout(l, 16)
                      : "function" == typeof e && e();
                };
              l();
            }
          }
          matches(t) {
            const e = Element.prototype;
            return (
              e.matches ||
              e.webkitMatchesSelector ||
              e.mozMatchesSelector ||
              e.msMatchesSelector ||
              function () {
                return (
                  -1 !== [].indexOf.call(document.querySelectorAll(t), this)
                );
              }
            ).call(this.collection[0], t);
          }
          remove() {
            for (const t of this.collection) t.parentNode.removeChild(t);
          }
          replaceWith(t) {
            if (this.collection[0])
              if ("string" == typeof t) {
                const e = document.createElement("div");
                (e.innerHTML = t),
                  this.collection[0].parentElement.replaceChild(
                    e.firstChild,
                    this.collection[0]
                  );
              } else
                this.collection[0].parentElement.replaceChild(
                  t,
                  this.collection[0]
                );
          }
          reset() {
            this.length > 0 && this.collection[0].reset();
          }
          property(t, e) {
            if (this.collection[0]) {
              if (void 0 === e) return this.collection[0][t];
              this.collection[0][t] = e;
            }
          }
        }
        function e(e) {
          return void 0 !== e ? new t(e) : t;
        }
        function o(t) {
          window.addEventListener("load", t);
        }
        exports.DOM = t;
      },
      {},
    ],
    yWHc: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Request = void 0);
        class e {
          static serialize(e) {
            return Object.keys(e)
              .map(
                (t) => encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
              )
              .join("&");
          }
          static get(t, s = {}, o = {}) {
            const n = e.serialize(s);
            return "" !== n && (t = `${t}?${n}`), fetch(t, o);
          }
          static post(t, s, o = {}) {
            let n;
            if (void 0 !== o.headers) {
              const t = o.headers["Content-Type"];
              if (void 0 !== t)
                if ("multipart/form-data" == t) {
                  n = new FormData();
                  for (const e in s) n.append(e, s[e]);
                } else
                  n =
                    "application/json" == t
                      ? JSON.stringify(s)
                      : e.serialize(s);
            } else n = e.serialize(s);
            const r = Object.assign(
              {},
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: n,
              },
              o
            );
            return (
              void 0 !== r.headers &&
                "multipart/form-data" === r.headers["Content-Type"] &&
                delete r.headers["Content-Type"],
              fetch(t, r)
            );
          }
          static put(t, s, o = {}) {
            return e.post(t, s, Object.assign({}, { method: "PUT" }, o));
          }
          static delete(t, s, o = {}) {
            return e.get(t, s, Object.assign({}, { method: "DELETE" }, o));
          }
          static json(t, s = {}, o = {}) {
            return e.get(t, s, o).then((e) => e.json());
          }
          static blob(t, s = {}, o = {}) {
            return e.get(t, s, o).then((e) => e.blob());
          }
        }
        exports.Request = e;
      },
      {},
    ],
    MO3i: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FileSystem = void 0);
        var e = require("./Request");
        class t {
          static readRemote(r, s = "base64", a = {}) {
            return e.Request.blob(r, {}, a).then((e) => t.read(e, s));
          }
          static read(e, t = "text") {
            return new Promise((r, s) => {
              const a = new FileReader();
              (a.onload = (e) => {
                r(e, e.target.result);
              }),
                (a.onerror = (e) => {
                  s(e);
                }),
                "base64" === t
                  ? a.readAsDataURL(e)
                  : "buffer" === t
                  ? a.readAsArrayBuffer(e)
                  : a.readAsText(e, "UTF-8");
            });
          }
          static create(e, t, r = "text/plain") {
            return Promise.resolve(new File([t], e, { type: r }));
          }
          static extension(e) {
            return e.split(".").pop();
          }
          static isImage(e) {
            return (
              ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"].indexOf(
                t.extension(e).toLowerCase()
              ) > -1
            );
          }
        }
        exports.FileSystem = t;
      },
      { "./Request": "yWHc" },
    ],
    CErr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Form = void 0);
        var e = require("./DOM");
        class a {
          static fill(a, t) {
            for (const s in t) {
              const r = (0, e.$_)(`form[data-form='${a}'] [name='${s}']`).get(
                0
              );
              if (void 0 !== r)
                switch (r.type) {
                  case "file":
                  case "file[]":
                    break;
                  default:
                    r.value = t[s];
                }
            }
          }
          static values(a) {
            const t = {};
            return (
              (0, e.$_)(`form[data-form='${a}'] [name]`).each((e) => {
                let a;
                switch (e.type) {
                  case "file[]":
                    a = e.files;
                    break;
                  case "file":
                    a = e.files[0];
                    break;
                  default:
                    a = e.value;
                }
                null != a && (t[e.name] = a);
              }),
              t
            );
          }
        }
        exports.Form = a;
      },
      { "./DOM": "d+rf" },
    ],
    "8/F2": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Platform = void 0);
        class e {
          static retina() {
            return window.devicePixelRatio >= 2;
          }
          static portrait() {
            return 0 === window.orientation || 180 === window.orientation;
          }
          static landscape() {
            return 90 === window.orientation || -90 === window.orientation;
          }
          static orientation() {
            return e.portrait() ? "portrait" : "landscape";
          }
          static electron() {
            return window && window.process && window.process.type;
          }
          static cordova() {
            return !!window.cordova;
          }
          static desktop(e = "Any") {
            let t = !1;
            switch (e) {
              case "Windows":
                t = navigator.platform.includes("Win");
                break;
              case "macOS":
                t = navigator.platform.includes("Mac");
                break;
              case "Linux":
                t = navigator.platform.includes("Linux");
                break;
              case "FreeBSD":
                t = navigator.platform.includes("FreeBSD");
                break;
              case "webOS":
                t = navigator.platform.includes("WebTV");
                break;
              case "Any":
              default:
                t =
                  navigator.platform.includes("Win") ||
                  navigator.platform.includes("Mac") ||
                  navigator.platform.includes("Linux") ||
                  navigator.platform.includes("FreeBSD") ||
                  navigator.platform.includes("WebTV");
            }
            return t;
          }
          static mobile(e = "Any") {
            let t = !1;
            switch (e) {
              case "Android":
                t = /Android/i.test(navigator.userAgent);
                break;
              case "iOS":
                t = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                break;
              case "Opera":
                t = /Opera Mini/i.test(navigator.userAgent);
                break;
              case "Windows":
                t = /Windows Phone|IEMobile|WPDesktop/i.test(
                  navigator.userAgent
                );
                break;
              case "BlackBerry":
                t = /BlackBerry|BB10/i.test(navigator.userAgent);
                break;
              case "Any":
              default:
                t = /Android|iPhone|iPad|iPod|Windows Phone|IEMobile|WPDesktop|BlackBerry|BB10/i.test(
                  navigator.userAgent
                );
            }
            return t;
          }
          static serviceWorkers() {
            return (
              "undefined" != typeof navigator &&
              "serviceWorker" in navigator &&
              location.protocol.indexOf("http") > -1
            );
          }
        }
        exports.Platform = e;
      },
      {},
    ],
    "4C7P": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Preload = void 0);
        var e = require("./Request");
        class r {
          static image(e) {
            return new Promise((r, t) => {
              const o = new Image();
              (o.onload = () => {
                r(o);
              }),
                (o.onerror = (e) => {
                  t(e);
                }),
                (o.src = e);
            });
          }
          static file(r) {
            return e.Request.blob(r);
          }
        }
        exports.Preload = r;
      },
      { "./Request": "yWHc" },
    ],
    "4LQF": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.LocalStorage = void 0);
        class e {
          constructor({ name: e = "", version: t = "", store: s = "" }) {
            (this.name = e),
              (this.version = t),
              (this.store = s),
              (this.upgrades = {}),
              "" === this.version
                ? (this.numericVersion = 0)
                : (this.numericVersion = parseInt(t.replace(/\./g, ""))),
              (this.id =
                "" !== e && "" !== t && "" !== s
                  ? `${this.name}::${this.store}::${this.version}_`
                  : "" !== e && "" !== t
                  ? `${this.name}::${this.version}_`
                  : "" !== e
                  ? `${this.name}::_`
                  : "");
          }
          open() {
            return "object" != typeof this.storage ||
              this.storage instanceof Promise
              ? this.storage instanceof Promise
                ? this.storage
                : ((this.storage = new Promise((e) => {
                    let t = [];
                    if ("" !== this.version) {
                      let e = "";
                      "" !== this.name &&
                      "" !== this.version &&
                      "" !== this.store
                        ? (e = `${this.name}::${this.store}::`)
                        : "" !== this.name &&
                          "" !== this.version &&
                          (e = `${this.name}::`);
                      const s = Object.keys(window.localStorage)
                        .filter((t) => 0 === t.indexOf(e))
                        .map((t) => t.replace(e, "").split("_")[0])
                        .filter((e) => -1 === e.indexOf("::"))
                        .sort();
                      if (s.length > 0) {
                        const e = s[0],
                          i = parseInt(e.replace(/\./g, ""));
                        if (i < this.numericVersion) {
                          const s = Object.keys(this.upgrades).sort(),
                            r = s.findIndex((e) => {
                              const [t] = e.split("::");
                              return parseInt(t) === i;
                            });
                          r > -1 &&
                            (t = s.slice(r).filter((e) => {
                              const [t, s] = e.split("::");
                              return (
                                parseInt(t) < this.numericVersion &&
                                parseInt(s) <= this.numericVersion
                              );
                            }));
                          let o = `${this.name}::${e}_`;
                          "" !== this.name &&
                          "" !== this.version &&
                          "" !== this.store
                            ? (o = `${this.name}::${this.store}::${e}_`)
                            : "" !== this.name &&
                              "" !== this.version &&
                              (o = `${this.name}::${e}_`);
                          const n = Object.keys(window.localStorage)
                            .filter((e) => 0 === e.indexOf(o))
                            .map((e) => e.replace(o, ""));
                          for (const e of n) {
                            const t = window.localStorage.getItem(`${o}${e}`);
                            window.localStorage.setItem(this.id + e, t),
                              window.localStorage.removeItem(`${o}${e}`);
                          }
                        }
                      }
                    }
                    e({ upgrades: t });
                  }).then(
                    ({ upgrades: e }) => (
                      (this.storage = window.localStorage),
                      new Promise((t) => {
                        this._upgrade(e, () => t(this));
                      })
                    )
                  )),
                  this.storage)
              : Promise.resolve(this);
          }
          set(e, t) {
            return this.open().then(
              () => (
                "object" == typeof t
                  ? this.storage.setItem(this.id + e, JSON.stringify(t))
                  : this.storage.setItem(this.id + e, t),
                Promise.resolve({ key: e, value: t })
              )
            );
          }
          update(e, t) {
            return this.get(e).then(
              (s) => (
                "object" == typeof s
                  ? ("object" == typeof t && (t = Object.assign({}, s, t)),
                    this.storage.setItem(this.id + e, JSON.stringify(t)))
                  : this.storage.setItem(this.id + e, t),
                Promise.resolve({ key: e, value: t })
              )
            );
          }
          get(e) {
            return this.open().then(
              () =>
                new Promise((t, s) => {
                  let i = null;
                  i = this.storage.getItem(this.id + e);
                  try {
                    const e = JSON.parse(i);
                    e && "object" == typeof e && (i = e);
                  } catch (r) {}
                  null != i ? t(i) : s();
                })
            );
          }
          getAll() {
            return this.keys().then((e) => {
              const t = {},
                s = [];
              for (const i of e)
                s.push(
                  this.get(i).then((e) => {
                    t[i] = e;
                  })
                );
              return Promise.all(s).then(() => t);
            });
          }
          contains(e) {
            return this.keys().then((t) => {
              if (!t.includes(e)) return Promise.reject();
              Promise.resolve();
            });
          }
          upgrade(e, t, s) {
            return (
              (this.upgrades[
                `${parseInt(e.replace(/\./g, ""))}::${parseInt(
                  t.replace(/\./g, "")
                )}`
              ] = s),
              Promise.resolve()
            );
          }
          _upgrade(e, t) {
            e.length > 0
              ? this.upgrades[e[0]]
                  .call(this, this)
                  .then(() => {
                    this._upgrade(e.slice(1), t);
                  })
                  .catch((e) => console.error(e))
              : t();
          }
          rename(e) {
            return this.name !== e
              ? this.keys().then((t) => {
                  const s = this.id;
                  (this.name = e),
                    "" !== this.name && "" !== this.version && "" !== this.store
                      ? (this.id = `${this.name}::${this.store}::${this.version}_`)
                      : "" !== this.name && "" !== this.version
                      ? (this.id = `${this.name}::${this.version}_`)
                      : "" !== this.name
                      ? (this.id = `${this.name}::_`)
                      : (this.id = "");
                  const i = [];
                  for (const e of t)
                    i.push(
                      this.set(e, this.storage.getItem(`${s}${e}`)).then(() => {
                        this.storage.removeItem(`${s}${e}`);
                      })
                    );
                  return Promise.all(i);
                })
              : Promise.reject();
          }
          key(e, t = !1) {
            return this.open().then(() =>
              !0 === t
                ? Promise.resolve(this.storage.key(e))
                : Promise.resolve(this.storage.key(e).replace(this.id, ""))
            );
          }
          keys(e = !1) {
            return this.open().then(() =>
              Promise.resolve(
                Object.keys(this.storage)
                  .filter((e) => 0 === e.indexOf(this.id))
                  .map((t) => (!0 === e ? t : t.replace(this.id, "")))
              )
            );
          }
          remove(e) {
            return this.get(e).then(
              (t) => (this.storage.removeItem(this.id + e), Promise.resolve(t))
            );
          }
          clear() {
            return this.keys().then((e) => {
              for (const t of e) this.remove(t);
              return Promise.resolve();
            });
          }
        }
        exports.LocalStorage = e;
      },
      {},
    ],
    nnqJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SessionStorage = void 0);
        var e = require("./LocalStorage");
        class o extends e.LocalStorage {
          constructor({ name: e = "", version: o = "", store: s = "" }) {
            super({ name: e, version: o, store: s });
          }
          open() {
            return (
              void 0 === this.storage && (this.storage = window.sessionStorage),
              Promise.resolve(this)
            );
          }
        }
        exports.SessionStorage = o;
      },
      { "./LocalStorage": "4LQF" },
    ],
    wqDi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.IndexedDB = void 0);
        class e {
          constructor({
            name: e = "",
            version: t = "",
            store: s = "",
            props: r = {},
            index: n = {},
          }) {
            (this.name = e),
              (this.version = t),
              (this.store = s),
              (this.props = r),
              (this.index = n),
              (this.upgrades = {}),
              "" === this.version
                ? (this.numericVersion = 0)
                : (this.numericVersion = parseInt(t.replace(/\./g, "")));
          }
          open() {
            return "" === this.name
              ? (console.error("No name has been defined for IndexedDB space."),
                Promise.reject())
              : "" === this.store
              ? (console.error(
                  "No store has been defined for IndexedDB space."
                ),
                Promise.reject())
              : this.storage instanceof IDBDatabase
              ? Promise.resolve(this)
              : this.storage instanceof Promise
              ? this.storage
              : ((this.storage = new Promise((e, t) => {
                  let s = [];
                  const r = window.indexedDB.open(
                    this.name,
                    this.numericVersion
                  );
                  (r.onerror = (e) => {
                    t(e);
                  }),
                    (r.onsuccess = (t) => {
                      e({ storage: t.target.result, upgrades: s });
                    }),
                    (r.onupgradeneeded = (t) => {
                      if (t.oldVersion < 1) {
                        const e = t.target.result.createObjectStore(
                          this.store,
                          this.props
                        );
                        for (const t of Object.keys(this.index))
                          e.createIndex(
                            this.index[t].name,
                            this.index[t].field,
                            this.index[t].props
                          );
                      } else {
                        const e = Object.keys(this.upgrades).sort(),
                          r = e.findIndex((e) => {
                            const [s] = e.split("::");
                            return parseInt(s) === t.oldVersion;
                          });
                        r > -1 &&
                          (s = e.slice(r).filter((e) => {
                            const [t, s] = e.split("::");
                            return (
                              parseInt(t) < this.numericVersion &&
                              parseInt(s) <= this.numericVersion
                            );
                          }));
                      }
                      t.target.transaction.addEventListener("success", () => {
                        e({ storage: t.target.result, upgrades: s });
                      });
                    });
                }).then(
                  ({ storage: e, upgrades: t }) => (
                    (this.storage = e),
                    new Promise((s) => {
                      this._upgrade(t, () => s(e), event);
                    })
                  )
                )),
                this.storage);
          }
          set(e = null, t) {
            return this.open().then(
              () =>
                new Promise((s, r) => {
                  const n = this.storage
                    .transaction(this.store, "readwrite")
                    .objectStore(this.store);
                  let i;
                  (i =
                    null !== e
                      ? n.put(Object.assign({}, { id: e }, t))
                      : n.add(t)).addEventListener("success", (e) => {
                    s({ key: e.target.result, value: t });
                  }),
                    i.addEventListener("error", (e) => {
                      r(e);
                    });
                })
            );
          }
          update(e, t) {
            return this.get(e).then((s) =>
              void 0 === s
                ? this.set(e, t)
                : new Promise((e, r) => {
                    const n = this.storage
                      .transaction(this.store, "readwrite")
                      .objectStore(this.store)
                      .put(Object.assign({}, s, t));
                    n.addEventListener("success", (s) => {
                      e({ key: s.target.result, value: t });
                    }),
                      n.addEventListener("error", (e) => {
                        r(e);
                      });
                  })
            );
          }
          get(e) {
            return this.open().then(
              () =>
                new Promise((t, s) => {
                  const r = this.storage
                    .transaction(this.store)
                    .objectStore(this.store)
                    .get(e);
                  r.addEventListener("success", (e) => {
                    t(e.target.result);
                  }),
                    r.addEventListener("error", (e) => {
                      s(e);
                    });
                })
            );
          }
          getAll() {
            return this.open().then(
              () =>
                new Promise((e, t) => {
                  const s = this.storage
                    .transaction(this.store)
                    .objectStore(this.store)
                    .getAll();
                  s.addEventListener("success", (t) => {
                    e(t.target.result);
                  }),
                    s.addEventListener("error", (e) => {
                      t(e);
                    });
                })
            );
          }
          contains(e) {
            return this.get(e).then((t) => {
              if (!t.includes(e)) return Promise.reject();
              Promise.resolve();
            });
          }
          upgrade(e, t, s) {
            return (
              (this.upgrades[
                `${parseInt(e.replace(/\./g, ""))}::${parseInt(
                  t.replace(/\./g, "")
                )}`
              ] = s),
              Promise.resolve()
            );
          }
          _upgrade(e, t, s) {
            e.length > 0
              ? this.upgrades[e[0]]
                  .call(this, this, s)
                  .then(() => {
                    this._upgrade(e.slice(1), t, s);
                  })
                  .catch((e) => console.error(e))
              : t();
          }
          rename() {
            return Promise.reject();
          }
          key() {
            return Promise.reject();
          }
          keys() {
            return this.open().then(
              () =>
                new Promise((e, t) => {
                  const s = this.storage
                    .transaction(this.store, "readwrite")
                    .objectStore(this.store)
                    .getAllKeys();
                  s.addEventListener(
                    "success",
                    (t) => {
                      e(t.target.result);
                    },
                    !1
                  ),
                    s.addEventListener(
                      "error",
                      (e) => {
                        t(e);
                      },
                      !1
                    );
                })
            );
          }
          remove(e) {
            return this.get(e).then(
              (t) =>
                new Promise((s, r) => {
                  const n = this.storage
                    .transaction(this.store, "readwrite")
                    .objectStore(this.store)
                    .delete(e);
                  n.addEventListener(
                    "success",
                    () => {
                      s(t);
                    },
                    !1
                  ),
                    n.addEventListener(
                      "error",
                      (e) => {
                        r(e);
                      },
                      !1
                    );
                })
            );
          }
          clear() {
            return this.open().then(
              () =>
                new Promise((e, t) => {
                  const s = this.storage
                    .transaction(this.store, "readwrite")
                    .objectStore(this.store)
                    .clear();
                  s.addEventListener(
                    "success",
                    () => {
                      e();
                    },
                    !1
                  ),
                    s.addEventListener(
                      "error",
                      (e) => {
                        t(e);
                      },
                      !1
                    );
                })
            );
          }
        }
        exports.IndexedDB = e;
      },
      {},
    ],
    he21: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.RemoteStorage = void 0);
        var e = require("./../Request");
        class t {
          constructor({
            name: e = "",
            version: t = "",
            store: s = "",
            endpoint: r = "",
            props: o = {},
          }) {
            (this.name = e),
              (this.version = t),
              (this.store = s),
              (this.endpoint = `${r}${s}/`),
              (this.props = o);
          }
          open() {
            return (
              void 0 === this.storage && (this.storage = e.Request),
              Promise.resolve(this)
            );
          }
          set(e, t) {
            return this.open().then(() =>
              this.storage.post(this.endpoint + e, t, this.props)
            );
          }
          update(e, t) {
            return this.get(e).then((s) =>
              this.storage
                .put(this.endpoint + e, Object.assign({}, s, t), this.props)
                .then((e) => e.json())
            );
          }
          get(e) {
            return this.open().then(() =>
              this.storage.json(this.endpoint + e, {}, this.props)
            );
          }
          getAll() {
            return this.open().then(() =>
              this.storage.json(this.endpoint, {}, this.props)
            );
          }
          contains(e) {
            return this.keys().then((t) => {
              if (!t.includes(e)) return Promise.reject();
              Promise.resolve();
            });
          }
          upgrade() {
            return Promise.reject();
          }
          rename() {
            return Promise.reject();
          }
          key() {
            return Promise.reject();
          }
          keys() {
            return this.open().then(() =>
              this.storage.json(this.endpoint, { keys: !0 }, this.props)
            );
          }
          remove(e) {
            return this.open().then(() =>
              this.storage
                .delete(this.endpoint + e, {}, this.props)
                .then((t) => Promise.resolve(e, t.json()))
            );
          }
          clear() {
            return this.open().then(() =>
              this.storage.delete(this.endpoint, {}, this.props)
            );
          }
        }
        exports.RemoteStorage = t;
      },
      { "./../Request": "yWHc" },
    ],
    "9aYX": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Space = exports.SpaceAdapter = void 0);
        var t = require("./SpaceAdapter/LocalStorage"),
          e = require("./SpaceAdapter/SessionStorage"),
          r = require("./SpaceAdapter/IndexedDB"),
          a = require("./SpaceAdapter/RemoteStorage");
        const s = {
          LocalStorage: t.LocalStorage,
          SessionStorage: e.SessionStorage,
          IndexedDB: r.IndexedDB,
          RemoteStorage: a.RemoteStorage,
        };
        exports.SpaceAdapter = s;
        class o {
          constructor(t = s.LocalStorage, e = {}) {
            (this._configuration = Object.assign(
              {},
              { name: "", version: "", store: "" },
              e
            )),
              (this.adapter = new t(this._configuration)),
              (this.callbacks = { create: [], update: [], delete: [] }),
              (this.transformations = {});
          }
          configuration(t = null) {
            if (null === t) return this._configuration;
            (this._configuration = Object.assign({}, this._configuration, t)),
              this.adapter.configuration(t);
          }
          open() {
            return this.adapter.open().then(() => Promise.resolve(this));
          }
          set(t, e) {
            for (const r of Object.keys(this.transformations))
              "function" == typeof this.transformations[r].set &&
                (e = this.transformations[r].set.call(null, t, e));
            return this.adapter.set(t, e).then(({ key: t, value: e }) => {
              for (const r of this.callbacks.create) r.call(null, t, e);
              return Promise.resolve({ key: t, value: e });
            });
          }
          update(t, e) {
            for (const r of Object.keys(this.transformations))
              "function" == typeof this.transformations[r].set &&
                (e = this.transformations[r].set.call(null, t, e));
            return this.adapter.update(t, e).then(({ key: t, value: e }) => {
              for (const r of this.callbacks.update) r.call(null, t, e);
              return Promise.resolve({ key: t, value: e });
            });
          }
          get(t) {
            return this.adapter.get(t).then((e) => {
              for (const r of Object.keys(this.transformations))
                "function" == typeof this.transformations[r].get &&
                  (e = this.transformations[r].get.call(null, t, e));
              return e;
            });
          }
          getAll() {
            return this.adapter.getAll().then((t) => {
              for (const e of Object.keys(t))
                for (const r of Object.keys(this.transformations))
                  "function" == typeof this.transformations[r].get &&
                    (t[e] = this.transformations[r].get.call(null, e, t[e]));
              return t;
            });
          }
          each(t) {
            return this.getAll().then((e) => {
              const r = [];
              for (const a of Object.keys(e)) r.push(t.call(this, a, e[a]));
              return Promise.all(r);
            });
          }
          contains(t) {
            return this.adapter.contains(t);
          }
          upgrade(t, e, r) {
            return this.adapter
              .upgrade(t, e, r)
              .then(() => Promise.resolve(this));
          }
          rename(t) {
            return this.adapter.rename(t);
          }
          onCreate(t) {
            this.callbacks.create.push(t);
          }
          onUpdate(t) {
            this.callbacks.update.push(t);
          }
          onDelete(t) {
            this.callbacks.delete.push(t);
          }
          addTransformation({ id: t, get: e, set: r }) {
            this.transformations[t] = { id: t, get: e, set: r };
          }
          removeTransformation(t) {
            delete this.transformations[t];
          }
          key(t, e = !1) {
            return this.adapter.key(t, e);
          }
          keys(t = !1) {
            return this.adapter.keys(t);
          }
          remove(t) {
            return this.adapter.remove(t).then((e) => {
              for (const r of this.callbacks.delete) r.call(null, t, e);
            });
          }
          clear() {
            return this.adapter.clear();
          }
        }
        exports.Space = o;
      },
      {
        "./SpaceAdapter/LocalStorage": "4LQF",
        "./SpaceAdapter/SessionStorage": "nnqJ",
        "./SpaceAdapter/IndexedDB": "wqDi",
        "./SpaceAdapter/RemoteStorage": "he21",
      },
    ],
    cPWY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Text = void 0);
        class e {
          static capitalize(e) {
            return e.replace(
              /\w\S*/g,
              (e) => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            );
          }
          static suffix(e, t) {
            let n = "",
              r = t.indexOf(e);
            return (
              -1 !== r && ((r += e.length), (n = t.substr(r, t.length - r))), n
            );
          }
          static selection() {
            return window.getSelection
              ? window.getSelection().toString()
              : document.selection && "Control" != document.selection.type
              ? document.selection.createRange().text
              : void 0;
          }
          static prefix(e, t) {
            let n = "";
            const r = t.indexOf(e);
            return -1 != r && (n = t.substr(0, r)), n;
          }
          static friendly(e) {
            const t = [
                /[áàâãªä]/,
                /[ÁÀÂÃÄ]/,
                /[ÍÌÎÏ]/,
                /[íìîï]/,
                /[éèêë]/,
                /[ÉÈÊË]/,
                /[óòôõºö]/,
                /[ÓÒÔÕÖ]/,
                /[úùûü]/,
                /[ÚÙÛÜ]/,
                /ç/,
                /Ç/,
                /ñ/,
                /Ñ/,
                /_/,
                /[’‘‹›<>']/,
                /[“”«»„"]/,
                /[(){}[\]]/,
                /[?¿!¡#$%&^*´`~\/°|]/,
                /[,.:;]/,
                / /,
              ],
              n = [
                "a",
                "A",
                "I",
                "i",
                "e",
                "E",
                "o",
                "O",
                "u",
                "U",
                "c",
                "C",
                "n",
                "N",
                "-",
                "",
                "",
                "",
                "",
                "",
                "-",
              ];
            for (const r in t) e = e.replace(new RegExp(t[r], "g"), n[r]);
            return e;
          }
        }
        exports.Text = e;
      },
      {},
    ],
    "8TNu": [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.Util = void 0);
        class t {
          static callAsync(t, e, ...r) {
            try {
              const s = t.apply(e, r);
              return s instanceof Promise ? s : Promise.resolve(s);
            } catch (o) {
              return Promise.reject(o);
            }
          }
          static uuid() {
            if (window.crypto)
              return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                (t) =>
                  (
                    t ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                      (15 >> (t / 4)))
                  ).toString(16)
              );
            {
              const t = () =>
                Math.floor(65536 * (1 + Math.random()))
                  .toString(16)
                  .substring(1);
              return (
                t() +
                t() +
                "-" +
                t() +
                "-" +
                t() +
                "-" +
                t() +
                "-" +
                t() +
                t() +
                t()
              );
            }
          }
        }
        exports.Util = t;
      },
      {},
    ],
    lFT0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 });
        var e = require("./src/DOM");
        Object.keys(e).forEach(function (r) {
          "default" !== r &&
            "__esModule" !== r &&
            Object.defineProperty(exports, r, {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            });
        });
        var r = require("./src/FileSystem");
        Object.keys(r).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return r[e];
              },
            });
        });
        var t = require("./src/Form");
        Object.keys(t).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return t[e];
              },
            });
        });
        var u = require("./src/Platform");
        Object.keys(u).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return u[e];
              },
            });
        });
        var n = require("./src/Preload");
        Object.keys(n).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return n[e];
              },
            });
        });
        var o = require("./src/Request");
        Object.keys(o).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return o[e];
              },
            });
        });
        var c = require("./src/Space");
        Object.keys(c).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return c[e];
              },
            });
        });
        var f = require("./src/Text");
        Object.keys(f).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return f[e];
              },
            });
        });
        var s = require("./src/Util");
        Object.keys(s).forEach(function (e) {
          "default" !== e &&
            "__esModule" !== e &&
            Object.defineProperty(exports, e, {
              enumerable: !0,
              get: function () {
                return s[e];
              },
            });
        });
      },
      {
        "./src/DOM": "d+rf",
        "./src/FileSystem": "MO3i",
        "./src/Form": "CErr",
        "./src/Platform": "8/F2",
        "./src/Preload": "4C7P",
        "./src/Request": "yWHc",
        "./src/Space": "9aYX",
        "./src/Text": "cPWY",
        "./src/Util": "8TNu",
      },
    ],
    Lb19: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.FancyError = void 0);
        var t = require("@aegis-framework/artemis");
        function e(t) {
          return (e =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        function r(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function o(t, e) {
          for (var r = 0; r < e.length; r++) {
            var o = e[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        function a(t, e, r) {
          return e && o(t.prototype, e), r && o(t, r), t;
        }
        var n = (function () {
          function o() {
            r(this, o);
          }
          return (
            a(o, null, [
              { key: "init", value: function () {} },
              {
                key: "pop",
                value: function () {
                  if (
                    (0 === window.location.protocol.indexOf("file") ||
                      "localhost" === window.location.host) &&
                    "undefined" != typeof Prism &&
                    o.queue.length > 0
                  ) {
                    var e = o.queue.pop();
                    (0, t.$_)("body").prepend(
                      "\n\t\t\t\t\t<div class='fancy-error modal modal--active' data-error='"
                        .concat(
                          e.id,
                          "'>\n\t\t\t\t\t\t<div class='modal__content'>\n\t\t\t\t\t\t\t<h2>"
                        )
                        .concat(e.title, "</h2>\n\t\t\t\t\t\t\t<p>")
                        .concat(
                          e.message,
                          "</p>\n\t\t\t\t\t\t\t<div class='padded  text--left'>\n\t\t\t\t\t\t\t\t<h3>Details</h3>\n\t\t\t\t\t\t\t\t"
                        )
                        .concat(
                          o.render(e.props),
                          "\n\t\t\t\t\t\t\t\t<hr class='separator--material'/>\n\t\t\t\t\t\t\t\t<h3>Need More Help?</h3>\n\t\t\t\t\t\t\t\t<div class='error-section'>\n\t\t\t\t\t\t\t\t\t<p>Remember you can always ask for more help if you need it at:</p>\n\t\t\t\t\t\t\t\t\t<p><b>Discord</b>: <a href='https://discord.gg/gWSeDTz' target='_blank'>https://discord.gg/gWSeDTz</a></p>\n\t\t\t\t\t\t\t\t\t<p><b>GitHub</b>: <a href='https://github.com/Monogatari/Monogatari/issues/' target='_blank'>https://github.com/Monogatari/Monogatari/issues/</a></p>\n\t\t\t\t\t\t\t\t\t<p><b>Twitter</b>: <a href='https://twitter.com/monogatari' target='_blank'>https://twitter.com/monogatari</a></p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button>Ok</button>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t"
                        )
                    ),
                      (0, t.$_)(
                        '[data-error="'.concat(e.id, '"] button')
                      ).click(function () {
                        (0, t.$_)('[data-error="'.concat(e.id, '"]')).remove(),
                          o.pop();
                      }),
                      Prism.highlightAll();
                  }
                },
              },
              {
                key: "show",
                value: function () {
                  var r =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : "Error",
                    a =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "An error has ocurred! Please check the console so you get more insight.",
                    n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {};
                  if (
                    "object" ===
                    ("undefined" == typeof MonogatariDebug
                      ? "undefined"
                      : e(MonogatariDebug))
                  ) {
                    var i = t.Util.uuid(),
                      c = { id: i, title: r, message: a, props: n };
                    (0, t.$_)("[data-error]").isVisible()
                      ? o.queue.unshift(c)
                      : ((0, t.$_)("body").prepend(
                          "\n\t\t\t\t\t<div class='fancy-error modal modal--active' data-error='"
                            .concat(
                              i,
                              "'>\n\t\t\t\t\t\t<div class='modal__content'>\n\t\t\t\t\t\t\t<h2>"
                            )
                            .concat(r, "</h2>\n\t\t\t\t\t\t\t<p>")
                            .concat(
                              a,
                              "</p>\n\t\t\t\t\t\t\t<div class='padded  text--left'>\n\t\t\t\t\t\t\t\t<h3>Details</h3>\n\t\t\t\t\t\t\t\t"
                            )
                            .concat(
                              o.render(n),
                              "\n\t\t\t\t\t\t\t\t<hr class='separator--material'/>\n\t\t\t\t\t\t\t\t<h3>Need More Help?</h3>\n\t\t\t\t\t\t\t\t<div class='error-section'>\n\t\t\t\t\t\t\t\t\t<p>Remember you can always ask for more help if you need it at:</p>\n\t\t\t\t\t\t\t\t\t<p><b>Discord</b>: <a href='https://discord.gg/gWSeDTz' target='_blank'>https://discord.gg/gWSeDTz</a></p>\n\t\t\t\t\t\t\t\t\t<p><b>GitHub</b>: <a href='https://github.com/Monogatari/Monogatari/issues/' target='_blank'>https://github.com/Monogatari/Monogatari/issues/</a></p>\n\t\t\t\t\t\t\t\t\t<p><b>Twitter</b>: <a href='https://twitter.com/monogatari' target='_blank'>https://twitter.com/monogatari</a></p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button>Ok</button>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t"
                            )
                        ),
                        (0, t.$_)('[data-error="'.concat(i, '"] button')).click(
                          function () {
                            (0, t.$_)('[data-error="'.concat(i, '"]')).remove(),
                              o.pop();
                          }
                        ),
                        Prism.highlightAll());
                  }
                },
              },
              {
                key: "render",
                value: function () {
                  for (
                    var r =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : {},
                      o = '<div class="error-section">',
                      a = Object.keys(r),
                      n = 0;
                    n < a.length;
                    n++
                  ) {
                    var i = a[n];
                    if ("string" == typeof r[i] || "number" == typeof r[i])
                      o += "<p><b>".concat(i, "</b>: ").concat(r[i], "</p>");
                    else if (r[i] instanceof Array)
                      o += "<p><b>"
                        .concat(i, "</b>: ")
                        .concat(r[i].toString().replace(/,/g, ", "), "</p>");
                    else if (r[i] instanceof NodeList) {
                      o += "<p><b>".concat(i, "</b>:<br><pre>");
                      var c = !0,
                        l = !1,
                        s = void 0;
                      try {
                        for (
                          var p, d = r[i][Symbol.iterator]();
                          !(c = (p = d.next()).done);
                          c = !0
                        ) {
                          var u = p.value;
                          o += "<code class='language-markup'>".concat(
                            u._html
                              .replace(/&/g, "&amp;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                              .replace(/"/g, "&quot;"),
                            "</code>"
                          );
                        }
                      } catch (x) {
                        (l = !0), (s = x);
                      } finally {
                        try {
                          c || null == d.return || d.return();
                        } finally {
                          if (l) throw s;
                        }
                      }
                      o += "</pre></p>";
                    }
                  }
                  o += "</div>";
                  for (var f = Object.keys(r), g = 0; g < f.length; g++) {
                    var b = f[g];
                    if (
                      !(
                        "object" !== e(r[b]) ||
                        r[b] instanceof Array ||
                        r[b] instanceof NodeList
                      )
                    ) {
                      o += "<hr class='separator--material'/><h3>".concat(
                        t.Text.capitalize(b),
                        "</h3><div class='error-section'>"
                      );
                      for (
                        var h = Object.keys(r[b]), v = 0;
                        v < h.length;
                        v++
                      ) {
                        var y = h[v];
                        if (0 === y.indexOf("_"))
                          o += "<p>".concat(r[b][y], "</p>");
                        else if (
                          "string" == typeof r[b][y] ||
                          "number" == typeof r[b][y]
                        )
                          o += "<p><b>"
                            .concat(y, "</b>: ")
                            .concat(r[b][y], "</p>");
                        else if (r[b][y] instanceof Array)
                          o += "<p><b>"
                            .concat(y, "</b>: ")
                            .concat(
                              r[b][y].toString().replace(/,/g, ", "),
                              "</p>"
                            );
                        else if (r[b][y] instanceof NodeList) {
                          o += "<p><b>".concat(y, "</b>:<br><pre>");
                          var m = !0,
                            k = !1,
                            _ = void 0;
                          try {
                            for (
                              var w, M = r[b][y][Symbol.iterator]();
                              !(m = (w = M.next()).done);
                              m = !0
                            ) {
                              var S = w.value;
                              o += "<code class='language-markup'>".concat(
                                S._html
                                  .replace(/&/g, "&amp;")
                                  .replace(/</g, "&lt;")
                                  .replace(/>/g, "&gt;")
                                  .replace(/"/g, "&quot;"),
                                "</code>"
                              );
                            }
                          } catch (x) {
                            (k = !0), (_ = x);
                          } finally {
                            try {
                              m || null == M.return || M.return();
                            } finally {
                              if (k) throw _;
                            }
                          }
                          o += "</pre></p>";
                        }
                      }
                      o += "</div>";
                    }
                  }
                  return o;
                },
              },
            ]),
            o
          );
        })();
        (exports.FancyError = n), (n.queue = []);
      },
      { "@aegis-framework/artemis": "lFT0" },
    ],
    Focm: [
      function (require, module, exports) {
        "use strict";
        require("./vendor/prism.js");
        var r = require("../core/lib/FancyError"),
          e = require("@aegis-framework/artemis");
        window.addEventListener("error", function (o) {
          var i = o.message,
            n = o.lineno,
            s = o.filename;
          (0, e.$_ready)(function () {
            r.FancyError.show("An Unknown Error Occurred", i, {
              File: s,
              Line: n,
              Help: {
                _:
                  "This is most likely a scripting error, please check your script and JavaScript code for missing commas or incorrect syntax.",
                _1:
                  "There may be additional information on your browser’s console. You can open your console by pressing Ctrl + Shift + I",
              },
            });
          });
        });
      },
      {
        "./vendor/prism.js": "i8Cz",
        "../core/lib/FancyError": "Lb19",
        "@aegis-framework/artemis": "lFT0",
      },
    ],
  },
  {},
  ["Focm"],
  "MonogatariDebug"
);
//# sourceMappingURL=debug.map
