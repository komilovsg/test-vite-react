// Мини-подсветка синтаксиса для JS/JSX-сниппетов на странице /router.
// ponytail: regex-хайлайтер под наши контролируемые сниппеты, не либа.
//           заменить на shiki/prism, если понадобится реальная токенизация.

const KEYWORDS =
  "import|from|export|default|function|return|const|let|var|new|if|else|for|while";

// сначала escape HTML, потом один общий regex — так keyword внутри строки/комментария не красится
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const RE = new RegExp(
  [
    "(\\/\\/[^\\n]*)", // 1 comment
    "(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
    `\\b(${KEYWORDS})\\b`, // 3 keyword
    "\\b([A-Z][A-Za-z0-9_]*)\\b", // 4 type/component
    "\\b(\\d+)\\b", // 5 number
    "\\b([a-zA-Z_$][\\w$]*)(?=\\s*\\()", // 6 function call
  ].join("|"),
  "g"
);

export function highlight(code) {
  return escape(code).replace(RE, (m, c, s, kw, type, num, fn) => {
    if (c) return `<span class="tok-comment">${c}</span>`;
    if (s) return `<span class="tok-string">${s}</span>`;
    if (kw) return `<span class="tok-keyword">${kw}</span>`;
    if (type) return `<span class="tok-type">${type}</span>`;
    if (num) return `<span class="tok-number">${num}</span>`;
    if (fn) return `<span class="tok-fn">${fn}</span>`;
    return m;
  });
}
