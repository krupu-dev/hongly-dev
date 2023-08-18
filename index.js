var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => entry_server_default,
  handleDataRequest: () => handleDataRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_etag = __toESM(require("etag")), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3, handleRequest = (request, responseStatusCode, responseHeaders, remixContext) => (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) : handleBrowserRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
), entry_server_default = handleRequest, handleBotRequest = (request, responseStatusCode, responseHeaders, remixContext) => new Promise((resolve, reject) => {
  let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
    {
      onAllReady: () => {
        let body = new import_stream.PassThrough();
        responseHeaders.set("Content-Type", "text/html"), resolve(
          new import_node.Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode
          })
        ), pipe(body);
      },
      onShellError: (error) => {
        reject(error);
      },
      onError: (error) => {
        didError = !0, console.error(error);
      }
    }
  );
  setTimeout(abort, ABORT_DELAY);
}), handleBrowserRequest = (request, responseStatusCode, responseHeaders, remixContext) => new Promise((resolve, reject) => {
  let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
    {
      onShellReady: () => {
        let body = new import_stream.PassThrough();
        responseHeaders.set("Content-Type", "text/html"), resolve(
          new import_node.Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode
          })
        ), pipe(body);
      },
      onShellError: (error) => {
        reject(error);
      },
      onError: (error) => {
        didError = !0, console.error(error);
      }
    }
  );
  setTimeout(abort, ABORT_DELAY);
}), handleDataRequest = async (response, { request }) => {
  let body = await response.clone().text();
  return request.method.toLowerCase() === "get" && (response.headers.set("etag", (0, import_etag.default)(body)), request.headers.get("If-None-Match") === response.headers.get("ETag")) ? new import_node.Response("", { status: 304, headers: response.headers }) : response;
};

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => AppWithProviders,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react7 = require("@remix-run/react"), import_clsx = __toESM(require("clsx"));

// app/utils/theme-provider.tsx
var import_react2 = require("react"), import_react3 = require("@remix-run/react"), import_jsx_runtime2 = require("react/jsx-runtime"), Theme = /* @__PURE__ */ ((Theme2) => (Theme2.DARK = "dark", Theme2.LIGHT = "light", Theme2))(Theme || {}), themes = Object.values(Theme), ThemeContext = (0, import_react2.createContext)(void 0), prefersLightMQ = "(prefers-color-scheme: light)", getPreferredTheme = () => window.matchMedia(prefersLightMQ).matches ? "light" /* LIGHT */ : "dark" /* DARK */;
function ThemeProvider({
  children,
  specifiedTheme
}) {
  let [theme, setTheme] = (0, import_react2.useState)(() => specifiedTheme ? themes.includes(specifiedTheme) ? specifiedTheme : null : typeof window != "object" ? null : getPreferredTheme()), persistTheme = (0, import_react3.useFetcher)(), mountRun = (0, import_react2.useRef)(!1);
  return (0, import_react2.useEffect)(() => {
    if (!mountRun.current) {
      mountRun.current = !0;
      return;
    }
    theme && persistTheme.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]), (0, import_react2.useEffect)(() => {
    let mediaQuery = window.matchMedia(prefersLightMQ), handleChange = () => {
      setTheme(mediaQuery.matches ? "light" /* LIGHT */ : "dark" /* DARK */);
    };
    return mediaQuery.addEventListener("change", handleChange), () => mediaQuery.removeEventListener("change", handleChange);
  }, []), /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ThemeContext.Provider, { value: [theme, setTheme], children });
}
var clientThemeCode = `
// hi there dear reader \u{1F44B}
// this is how I make certain we avoid a flash of the wrong theme. If you select
// a theme, then I'll know what you want in the future and you'll not see this
// script anymore.
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'light'
    : 'dark';

  const cl = document.documentElement.classList;

  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let Matt know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let Matt know you're seeing this message? Thanks!",
    );
  }
})();
`;
function NonFlashOfWrongThemeEls({ ssrTheme }) {
  let [theme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "meta",
      {
        name: "color-scheme",
        content: theme === "light" ? "light dark" : "dark light"
      }
    ),
    ssrTheme ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "script",
      {
        dangerouslySetInnerHTML: { __html: clientThemeCode }
      }
    )
  ] });
}
function useTheme() {
  let context = (0, import_react2.useContext)(ThemeContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
function isTheme(value) {
  return typeof value == "string" && themes.includes(value);
}

// app/utils/theme.server.ts
var import_node2 = require("@remix-run/node");

// app/utils/misc.tsx
function getRequiredEnvVarFromObj(obj, key, devValue = `${key}-dev-value`) {
  let value = devValue, envVal = obj[key];
  if (envVal)
    value = envVal;
  else if (obj.NODE_ENV === "production")
    throw new Error(`${key} is a required env variable`);
  return value;
}
function getRequiredServerEnvVar(key, devValue) {
  return getRequiredEnvVarFromObj(process.env, key, devValue);
}

// app/utils/theme.server.ts
var themeStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "my_remix_theme",
    secure: !0,
    secrets: [getRequiredServerEnvVar("SESSION_SECRET")],
    sameSite: "lax",
    path: "/",
    // no theme for you on Kent's 100th birthday! 😂
    expires: /* @__PURE__ */ new Date("2088-10-18"),
    httpOnly: !0
  }
});
async function getThemeSession(request) {
  let session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      let themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : "dark" /* DARK */;
    },
    setTheme: (theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session)
  };
}

// app/components/Logo.tsx
var import_react4 = require("@remix-run/react"), import_jsx_runtime3 = require("react/jsx-runtime"), Logo = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.NavLink, { to: "/", className: "inline-block", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { className: "font-comfortaa", children: "Hongly DEV" }) }), Logo_default = Logo;

// app/components/Nav.tsx
var import_react5 = require("@remix-run/react");

// app/components/ThemeToggleIcon.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime"), iconThemeMap = /* @__PURE__ */ new Map([
  ["light" /* LIGHT */, import_lucide_react.Sun],
  ["dark" /* DARK */, import_lucide_react.Moon]
]), ThemeToggleIcon = ({ theme, checked }) => {
  let Component = iconThemeMap.get(theme);
  return Component ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Component,
    {
      width: 23,
      className: checked ? "fill-text-primary dark:fill-d-text-primary" : ""
    },
    theme
  ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, {});
}, ThemeToggleIcon_default = ThemeToggleIcon;

// app/components/ThemeToggle.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), themes2 = ["light" /* LIGHT */, "dark" /* DARK */], ThemeToggle = () => {
  let [theme, setTheme] = useTheme();
  function handleChange() {
    setTheme(
      (prevTheme) => prevTheme === "light" /* LIGHT */ ? "dark" /* DARK */ : "light" /* LIGHT */
    );
  }
  let labelClass = "relative flex cursor-pointer items-center justify-center";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "theme-toggle ml-2.5 inline-flex h-full items-center gap-[0.6em] rounded-[99em] px-[0.67em] py-[0.33em] pt-2", children: themes2.map((t) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "label",
    {
      className: theme === t ? `text-text-primary opacity-100 dark:text-d-text-primary ${labelClass}` : labelClass,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ThemeToggleIcon_default, { theme: t, checked: theme === t }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "input",
          {
            type: "radio",
            name: "theme-toggle",
            className: "absolute inset-0 z-[-1] opacity-0",
            checked: theme === t,
            value: t,
            title: `Use ${t} theme`,
            "aria-label": `Use ${t} theme`,
            onChange: handleChange
          }
        )
      ]
    },
    t
  )) });
}, ThemeToggle_default = ThemeToggle;

// app/components/Nav.tsx
var import_react6 = require("react"), import_lucide_react2 = require("lucide-react"), import_framer_motion = require("framer-motion");

// app/data/animationConfig.ts
var textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}, containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 1
    }
  }
}, imageLoadAnimationProps = {
  initial: { scale: 1.5 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    duration: 1
  }
}, mobileNavContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}, mobileNavListVariant = {
  hidden: { y: -20, height: 0, opacity: 0 },
  show: { opacity: 1, height: "auto", y: 0 }
}, mobileNavExitProps = {
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// app/components/Nav.tsx
var import_jsx_runtime6 = require("react/jsx-runtime"), activeClassName = "selected navlink", activeStyleCallback = ({ isActive }) => isActive ? activeClassName : "navlink", NavLinks = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/", className: activeStyleCallback, children: "Home" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/apps", className: activeStyleCallback, children: "My App" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/privacy", className: activeStyleCallback, children: "Privacy Policy" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/terms", className: activeStyleCallback, children: "Terms & Conditions" })
] }), Nav = () => {
  let [isOpen, setIsOpen] = (0, import_react6.useState)(!1), location = (0, import_react5.useLocation)(), toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (0, import_react6.useEffect)(() => {
    setIsOpen(!1);
  }, [location.pathname]), /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("nav", { className: "flex flex-[1] items-center justify-end overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "hidden justify-end md:flex", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NavLinks, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-[75px]", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ThemeToggle_default, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex w-[75px] justify-end md:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: toggleNavbar, children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.X, {}) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.Menu, {}) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      import_framer_motion.motion.div,
      {
        layout: "position",
        variants: mobileNavContainerVariant,
        initial: "hidden",
        animate: "show",
        className: "mt-4 basis-full md:hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion.motion.div, { variants: mobileNavListVariant, ...mobileNavExitProps, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/", className: activeStyleCallback, children: "Overview" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion.motion.div, { variants: mobileNavListVariant, ...mobileNavExitProps, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/apps", className: activeStyleCallback, children: "My App" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion.motion.div, { variants: mobileNavListVariant, ...mobileNavExitProps, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/privacy", className: activeStyleCallback, children: "Privacy Policy" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_framer_motion.motion.div, { variants: mobileNavListVariant, ...mobileNavExitProps, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react5.NavLink, { to: "/terms", className: activeStyleCallback, children: "Terms and Conditions" }) })
        ]
      },
      "nav-links"
    ) })
  ] });
}, Nav_default = Nav;

// app/components/Header.tsx
var import_jsx_runtime7 = require("react/jsx-runtime"), Header = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { className: "sticky top-0 z-[1] mx-auto  flex w-full max-w-7xl flex-wrap items-center justify-between border-b border-gray-100 bg-background p-4 font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Logo_default, {}),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Nav_default, {})
] }), Header_default = Header;

// app/components/Footer.tsx
var import_jsx_runtime8 = require("react/jsx-runtime"), Footer = () => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("footer", { className: "mx-auto my-4 w-full max-w-7xl px-8 py-4 text-center text-[0.8rem] text-text-secondary dark:text-d-text-secondary font-comfortaa", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { children: [
  "\xA9 ",
  (/* @__PURE__ */ new Date()).getFullYear(),
  " Hongly Dev"
] }) }), Footer_default = Footer;

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-4IK4DEWZ.css";

// app/root.tsx
var import_jsx_runtime9 = require("react/jsx-runtime"), links = () => [
  {
    rel: "stylesheet",
    href: tailwind_default
  }
], meta = () => ({
  charset: "utf-8",
  title: "Hongly DEV",
  viewport: "width=device-width,initial-scale=1"
}), loader = async ({ request }) => ({
  theme: (await getThemeSession(request)).getTheme()
});
function App() {
  let data = (0, import_react7.useLoaderData)(), [theme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("html", { lang: "en", className: (0, import_clsx.default)(theme), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Links, {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(NonFlashOfWrongThemeEls, { ssrTheme: Boolean(data.theme) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("body", { className: "bg-background text-text-primary dark:bg-d-background dark:text-d-text-primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex min-h-screen flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Header_default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("main", { className: "relative mx-auto my-0 box-border flex w-full max-w-7xl flex-[1] flex-grow flex-col py-[1em] px-[2em]", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Outlet, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Footer_default, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react7.LiveReload, {})
    ] })
  ] });
}
function AppWithProviders() {
  let data = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ThemeProvider, { specifiedTheme: data.theme, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(App, {}) });
}

// mdx:routes/_mdx.blog.another-markdown.mdx
var mdx_blog_another_markdown_exports = {};
__export(mdx_blog_another_markdown_exports, {
  attributes: () => attributes,
  default: () => mdx_blog_another_markdown_default,
  filename: () => filename,
  handle: () => handle,
  headers: () => headers,
  meta: () => meta2
});
var import_jsx_runtime10 = require("react/jsx-runtime"), attributes = {
  title: "Another Markdown",
  publishDate: "25 Dec 2021",
  meta: {
    title: "Another Markdown",
    publishDate: "25 Dec 2021",
    description: "A sample page with the most common elements of an article, including headings, paragraphs, lists, and images. Generated by chatGPT."
  }
};
function MDXContent(props = {}) {
  let _components = Object.assign({
    p: "p",
    img: "img",
    ul: "ul",
    li: "li",
    a: "a",
    hr: "hr",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    blockquote: "blockquote",
    ol: "ol",
    code: "code",
    pre: "pre",
    span: "span",
    strong: "strong",
    em: "em"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.img, { src: "/assets/images/casual-life-3d-likes.webp", alt: "Illustration of woman using a meditation app" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Headings", children: "Headings" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Paragraphs", children: "Paragraphs" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Blockquotes", children: "Blockquotes" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Lists", children: "Lists" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Horizontal", children: "Horizontal rule" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Table", children: "Table" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Code", children: "Code" }) }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#Inline", children: "Inline elements" }) }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.hr, {}),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "top" }),
      "Headings"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h1, { children: "Heading one" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Sint sit cillum pariatur eiusmod nulla pariatur ipsum. Sit laborum anim qui mollit tempor pariatur nisi minim dolor. Aliquip et adipisicing sit sit fugiat commodo id sunt. Nostrud enim ad commodo incididunt cupidatat in ullamco ullamco Lorem cupidatat velit enim et Lorem. Ut laborum cillum laboris fugiat culpa sint irure do reprehenderit culpa occaecat. Exercitation esse mollit tempor magna aliqua in occaecat aliquip veniam reprehenderit nisi dolor in laboris dolore velit." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h2, { children: "Heading two" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Aute officia nulla deserunt do deserunt cillum velit magna. Officia veniam culpa anim minim dolore labore pariatur voluptate id ad est duis quis velit dolor pariatur enim. Incididunt enim excepteur do veniam consequat culpa do voluptate dolor fugiat ad adipisicing sit. Labore officia est adipisicing dolore proident eiusmod exercitation deserunt ullamco anim do occaecat velit. Elit dolor consectetur proident sunt aliquip est do tempor quis aliqua culpa aute. Duis in tempor exercitation pariatur et adipisicing mollit irure tempor ut enim esse commodo laboris proident. Do excepteur laborum anim esse aliquip eu sit id Lorem incididunt elit irure ea nulla dolor et. Nulla amet fugiat qui minim deserunt enim eu cupidatat aute officia do velit ea reprehenderit." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h3, { children: "Heading three" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Voluptate cupidatat cillum elit quis ipsum eu voluptate fugiat consectetur enim. Quis ut voluptate culpa ex anim aute consectetur dolore proident voluptate exercitation eiusmod. Esse in do anim magna minim culpa sint. Adipisicing ipsum consectetur proident ullamco magna sit amet aliqua aute fugiat laborum exercitation duis et." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h4, { children: "Heading four" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Commodo fugiat aliqua minim quis pariatur mollit id tempor. Non occaecat minim esse enim aliqua adipisicing nostrud duis consequat eu adipisicing qui. Minim aliquip sit excepteur ipsum consequat laborum pariatur excepteur. Veniam fugiat et amet ad elit anim laborum duis mollit occaecat et et ipsum et reprehenderit. Occaecat aliquip dolore adipisicing sint labore occaecat officia fugiat. Quis adipisicing exercitation exercitation eu amet est laboris sunt nostrud ipsum reprehenderit ullamco. Enim sint ut consectetur id anim aute voluptate exercitation mollit dolore magna magna est Lorem. Ut adipisicing adipisicing aliqua ullamco voluptate labore nisi tempor esse magna incididunt." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h5, { children: "Heading five" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Veniam enim esse amet veniam deserunt laboris amet enim consequat. Minim nostrud deserunt cillum consectetur commodo eu enim nostrud ullamco occaecat excepteur. Aliquip et ut est commodo enim dolor amet sint excepteur. Amet ad laboris laborum deserunt sint sunt aliqua commodo ex duis deserunt enim est ex labore ut. Duis incididunt velit adipisicing non incididunt adipisicing adipisicing. Ad irure duis nisi tempor eu dolor fugiat magna et consequat tempor eu ex dolore. Mollit esse nisi qui culpa ut nisi ex proident culpa cupidatat cillum culpa occaecat anim. Ut officia sit ea nisi ea excepteur nostrud ipsum et nulla." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h6, { children: "Heading six" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Paragraphs" }),
      "Paragraphs"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Incididunt ex adipisicing ea ullamco consectetur in voluptate proident fugiat tempor deserunt reprehenderit ullamco id dolore laborum. Do laboris laboris minim incididunt qui consectetur exercitation adipisicing dolore et magna consequat magna anim sunt. Officia fugiat Lorem sunt pariatur incididunt Lorem reprehenderit proident irure. Dolore ipsum aliqua mollit ad officia fugiat sit eu aliquip cupidatat ipsum duis laborum laborum fugiat esse. Voluptate anim ex dolore deserunt ea ex eiusmod irure. Occaecat excepteur aliqua exercitation aliquip dolor esse eu eu." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Officia dolore laborum aute incididunt commodo nisi velit est est elit et dolore elit exercitation. Enim aliquip magna id ipsum aliquip consectetur ad nulla quis. Incididunt pariatur dolor consectetur cillum enim velit cupidatat laborum quis ex." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Officia irure in non voluptate adipisicing sit amet tempor duis dolore deserunt enim ut. Reprehenderit incididunt in ad anim et deserunt deserunt Lorem laborum quis. Enim aute anim labore proident laboris voluptate elit excepteur in. Ex labore nulla velit officia ullamco Lorem Lorem id do. Dolore ullamco ipsum magna dolor pariatur voluptate ipsum id occaecat ipsum. Dolore tempor quis duis commodo quis quis enim." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Blockquotes" }),
      "Blockquotes"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Ad nisi laborum aute cupidatat magna deserunt eu id laboris id. Aliquip nulla cupidatat sint ex Lorem mollit laborum dolor amet est ut esse aute. Nostrud ex consequat id incididunt proident ipsum minim duis aliqua ut ex et ad quis. Laborum sint esse cillum anim nulla cillum consectetur aliqua sit. Nisi excepteur cillum labore amet excepteur commodo enim occaecat consequat ipsum proident exercitation duis id in." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.blockquote, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Ipsum et cupidatat mollit exercitation enim duis sunt irure aliqua reprehenderit mollit. Pariatur Lorem pariatur laboris do culpa do elit irure. Eiusmod amet nulla voluptate velit culpa et aliqua ad reprehenderit sit ut." }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Labore ea magna Lorem consequat aliquip consectetur cillum duis dolore. Et veniam dolor qui incididunt minim amet laboris sit. Dolore ad esse commodo et dolore amet est velit ut nisi ea. Excepteur ea nulla commodo dolore anim dolore adipisicing eiusmod labore id enim esse quis mollit deserunt est. Minim ea culpa voluptate nostrud commodo proident in duis aliquip minim." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.blockquote, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Qui est sit et reprehenderit aute est esse enim aliqua id aliquip ea anim. Pariatur sint reprehenderit mollit velit voluptate enim consectetur sint enim. Quis exercitation proident elit non id qui culpa dolore esse aliquip consequat." }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Ipsum excepteur cupidatat sunt minim ad eiusmod tempor sit." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.blockquote, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Deserunt excepteur adipisicing culpa pariatur cillum laboris ullamco nisi fugiat cillum officia. In cupidatat nulla aliquip tempor ad Lorem Lorem quis voluptate officia consectetur pariatur ex in est duis. Mollit id esse est elit exercitation voluptate nostrud nisi laborum magna dolore dolore tempor in est consectetur." }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Adipisicing voluptate ipsum culpa voluptate id aute laboris labore esse fugiat veniam ullamco occaecat do ut. Tempor et esse reprehenderit veniam proident ipsum irure sit ullamco et labore ea excepteur nulla labore ut. Ex aute minim quis tempor in eu id id irure ea nostrud dolor esse." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Lists" }),
      "Lists"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h3, { children: "Ordered List" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.ol, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Longan" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Lychee" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: `Excepteur ad cupidatat do elit laborum amet cillum reprehenderit consequat quis.
Deserunt officia esse aliquip consectetur duis ut labore laborum commodo aliquip aliquip velit pariatur dolore.` }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Marionberry" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.li, { children: [
        "Melon",
        `
`,
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.ul, { children: [
          `
`,
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Cantaloupe" }),
          `
`,
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Honeydew" }),
          `
`,
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Watermelon" }),
          `
`
        ] }),
        `
`
      ] }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Miracle fruit" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Mulberry" }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h3, { children: "Unordered List" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Olive" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.li, { children: [
        "Orange",
        `
`,
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.ul, { children: [
          `
`,
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Blood orange" }),
          `
`,
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Clementine" }),
          `
`
        ] }),
        `
`
      ] }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Papaya" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Ut aute ipsum occaecat nisi culpa Lorem id occaecat cupidatat id id magna laboris ad duis. Fugiat cillum dolore veniam nostrud proident sint consectetur eiusmod irure adipisicing." }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.li, { children: "Passionfruit" }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Horizontal" }),
      "Horizontal rule"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "In dolore velit aliquip labore mollit minim tempor veniam eu veniam ad in sint aliquip mollit mollit. Ex occaecat non deserunt elit laborum sunt tempor sint consequat culpa culpa qui sit. Irure ad commodo eu voluptate mollit cillum cupidatat veniam proident amet minim reprehenderit." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.hr, {}),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "In laboris eiusmod reprehenderit aliquip sit proident occaecat. Non sit labore anim elit veniam Lorem minim commodo eiusmod irure do minim nisi. Dolor amet cillum excepteur consequat sint non sint." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Table" }),
      "Table"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Duis sunt ut pariatur reprehenderit mollit mollit magna dolore in pariatur nulla commodo sit dolor ad fugiat. Laboris amet ea occaecat duis eu enim exercitation deserunt ea laborum occaecat reprehenderit. Et incididunt dolor commodo consequat mollit nisi proident non pariatur in et incididunt id. Eu ut et Lorem ea ex magna minim ipsum ipsum do." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: `| Table Heading 1 | Table Heading 2 | Center align | Right align | Table Heading 5 |
| :-------------- | :-------------- | :----------: | ----------: | :-------------- |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |` }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Minim id consequat adipisicing cupidatat laborum culpa veniam non consectetur et duis pariatur reprehenderit eu ex consectetur. Sunt nisi qui eiusmod ut cillum laborum Lorem officia aliquip laboris ullamco nostrud laboris non irure laboris. Cillum dolore labore Lorem deserunt mollit voluptate esse incididunt ex dolor." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Code" }),
      "Code"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h2, { children: "Inline code" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.p, { children: [
      "Ad amet irure est magna id mollit Lorem in do duis enim. Excepteur velit nisi magna ea pariatur pariatur ullamco fugiat deserunt sint non sint. Duis duis est ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.code, { children: "code in text" }),
      " velit velit aute culpa ex quis pariatur pariatur laborum aute pariatur duis tempor sunt ad. Irure magna voluptate dolore consectetur consectetur irure esse. Anim magna ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.code, { children: "<strong>in culpa qui officia</strong>" }),
      " dolor eiusmod esse amet aute cupidatat aliqua do id voluptate cupidatat reprehenderit amet labore deserunt."
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.h2, { children: "Highlighted" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Et fugiat ad nisi amet magna labore do cillum fugiat occaecat cillum Lorem proident. In sint dolor ullamco ad do adipisicing amet id excepteur Lorem aliquip sit irure veniam laborum duis cillum. Aliqua occaecat minim cillum deserunt magna sunt laboris do do irure ea nostrud consequat ut voluptate ex." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.pre, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.code, { className: "hljs language-go", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-keyword", children: "package" }),
      ` main

`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-keyword", children: "import" }),
      ` (
    `,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-string", children: '"fmt"' }),
      `
    `,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-string", children: '"net/http"' }),
      `
)

`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.span, { className: "hljs-function", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-keyword", children: "func" }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-title", children: "handler" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-params", children: "(w http.ResponseWriter, r *http.Request)" })
      ] }),
      ` {
    fmt.Fprintf(w, `,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-string", children: '"Hi there, I love %s!"' }),
      ", r.URL.Path[",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-number", children: "1" }),
      `:])
}

`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.span, { className: "hljs-function", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-keyword", children: "func" }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-title", children: "main" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-params", children: "()" })
      ] }),
      ` {
    http.HandleFunc(`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-string", children: '"/"' }),
      `, handler)
    http.ListenAndServe(`,
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-string", children: '":8080"' }),
      ", ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.span, { className: "hljs-literal", children: "nil" }),
      `)
}
`
    ] }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: "Ex amet id ex aliquip id do laborum excepteur exercitation elit sint commodo occaecat nostrud est. Nostrud pariatur esse veniam laborum non sint magna sit laboris minim in id. Aliqua pariatur pariatur excepteur adipisicing irure culpa consequat commodo et ex id ad." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#top", children: "[Top]" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.h1, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { name: "Inline" }),
      "Inline elements"
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.p, { children: [
      "Sint ea anim ipsum ad commodo cupidatat do ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.strong, { children: "exercitation" }),
      " incididunt et minim ad labore sunt. Minim deserunt labore laboris velit nulla incididunt ipsum nulla. Ullamco ad laborum ea qui et anim in laboris exercitation tempor sit officia laborum reprehenderit culpa velit quis. ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.strong, { children: "Consequat commodo" }),
      " reprehenderit duis ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#!", children: "irure" }),
      " esse esse exercitation minim enim Lorem dolore duis irure. Nisi Lorem reprehenderit ea amet excepteur dolor excepteur magna labore proident voluptate ipsum. Reprehenderit ex esse deserunt aliqua ea officia mollit Lorem nulla magna enim. Et ad ipsum labore enim ipsum ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.strong, { children: "cupidatat consequat" }),
      ". Commodo non ea cupidatat magna deserunt dolore ipsum velit nulla elit veniam nulla eiusmod proident officia."
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.img, { src: "http://placekitten.com/1280/800", alt: "Super wide" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.p, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.em, { children: "Proident sit veniam in est proident officia adipisicing" }),
      " ea tempor cillum non cillum velit deserunt. Voluptate laborum incididunt sit consectetur Lorem irure incididunt voluptate nostrud. Commodo ut eiusmod tempor cupidatat esse enim minim ex anim consequat. Mollit sint culpa qui laboris quis consectetur ad sint esse. Amet anim anim minim ullamco et duis non irure. Sit tempor adipisicing ea laboris ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.code, { children: "culpa ex duis sint" }),
      " anim aute reprehenderit id eu ea. Aute ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#!", children: "excepteur proident" }),
      " Lorem minim adipisicing nostrud mollit ad ut voluptate do nulla esse occaecat aliqua sint anim."
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(_components.p, { children: [
      "Reprehenderit non eu quis in ad elit esse qui aute id ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(_components.a, { href: "#!", children: "incididunt" }),
      " dolore cillum. Esse laboris consequat dolor anim exercitation tempor aliqua deserunt velit magna laboris. Culpa culpa minim duis amet mollit do quis amet commodo nulla irure."
    ] })
  ] });
  return MDXLayout ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(MDXLayout, { ...props, children: _content }) : _content;
}
var mdx_blog_another_markdown_default = MDXContent, filename = "_mdx.blog.another-markdown.mdx", headers = typeof attributes < "u" && attributes.headers, meta2 = typeof attributes < "u" && attributes.meta, handle = typeof attributes < "u" && attributes.handle;

// mdx:routes/_mdx.blog.markdown-test.mdx
var mdx_blog_markdown_test_exports = {};
__export(mdx_blog_markdown_test_exports, {
  attributes: () => attributes2,
  default: () => mdx_blog_markdown_test_default,
  filename: () => filename2,
  handle: () => handle2,
  headers: () => headers2,
  meta: () => meta3
});
var import_jsx_runtime11 = require("react/jsx-runtime"), attributes2 = {
  title: "Markdown Test Page",
  publishDate: "01 Dec 2021",
  layout: "./BlogLayout",
  meta: {
    title: "Markdown Test Page",
    publishDate: "01 Dec 2021",
    description: "A sample page with the most common elements of an article, including headings, paragraphs, lists, and images. Use it as a starting point for applying your own styles."
  }
};
function MDXContent2(props = {}) {
  let _components = Object.assign({
    p: "p",
    img: "img",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    ul: "ul",
    li: "li",
    ol: "ol",
    a: "a",
    blockquote: "blockquote",
    hr: "hr",
    code: "code",
    pre: "pre",
    span: "span"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.img, { src: "/assets/images/casual-life-3d-workspace.webp", alt: "Illustration of woman using a meditation app" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h1, { children: "MDX Test Page" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: "This is an MDX test page that showcases various MDX elements and code blocks." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Headings" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h3, { children: "Level 3 Heading" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h4, { children: "Level 4 Heading" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h5, { children: "Level 5 Heading" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h6, { children: "Level 6 Heading" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Paragraphs" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: "This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus felis vel risus lacinia, eu fringilla urna mattis. Sed maximus urna eu arcu blandit pulvinar." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: "Etiam lobortis volutpat ligula, a facilisis purus. Sed vel felis blandit, sodales urna ac, varius mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Lists" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h3, { children: "Unordered List" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(_components.ul, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 1" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 2" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 3" }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h3, { children: "Ordered List" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(_components.ol, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 1" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 2" }),
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.li, { children: "Item 3" }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Images" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.img, { src: "/assets/images/casual-life-3d-likes.webp", alt: "Alt text", title: "Optional title" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Links" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.a, { href: "https://example.com", children: "Link text" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Blockquote" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(_components.blockquote, { children: [
      `
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.p, { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus felis vel risus lacinia, eu fringilla urna mattis." }),
      `
`
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Horizontal Rule" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.hr, {}),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h2, { children: "Code Blocks" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h3, { children: "Inline Code" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(_components.p, { children: [
      "This is an example of ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.code, { children: "inline code" }),
      "."
    ] }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.h3, { children: "Fenced Code Blocks" }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.pre, { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(_components.code, { className: "hljs language-javascript", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-keyword", children: "const" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-title function_", children: "add" }),
      " = (",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-params", children: "a, b" }),
      `) => a + b;
`,
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-variable language_", children: "console" }),
      ".",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-title function_", children: "log" }),
      "(",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-title function_", children: "add" }),
      "(",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-number", children: "2" }),
      ", ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-number", children: "3" }),
      ")); ",
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(_components.span, { className: "hljs-comment", children: "// Output: 5" }),
      `
`
    ] }) })
  ] });
  return MDXLayout ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(MDXLayout, { ...props, children: _content }) : _content;
}
var mdx_blog_markdown_test_default = MDXContent2, filename2 = "_mdx.blog.markdown-test.mdx", headers2 = typeof attributes2 < "u" && attributes2.headers, meta3 = typeof attributes2 < "u" && attributes2.meta, handle2 = typeof attributes2 < "u" && attributes2.handle;

// mdx:routes/_mdx.blog.hello-world.mdx
var mdx_blog_hello_world_exports = {};
__export(mdx_blog_hello_world_exports, {
  attributes: () => attributes3,
  default: () => mdx_blog_hello_world_default,
  filename: () => filename3,
  handle: () => handle3,
  headers: () => headers3,
  meta: () => meta4
});
var import_jsx_runtime12 = require("react/jsx-runtime"), attributes3 = {
  title: "Hello World \u{1F44B}",
  publishDate: "30 Nov 2021",
  meta: {
    title: "Hello World \u{1F44B}",
    publishDate: "30 Nov 2021",
    description: "Every blog starts with a single post. This is yours. Make it great."
  }
};
function MDXContent3(props = {}) {
  let _components = Object.assign({
    p: "p",
    img: "img"
  }, props.components), { wrapper: MDXLayout } = _components, _content = /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(_components.p, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(_components.img, { src: "/assets/images/casual-life-3d-meditation-crystal.webp", alt: "Illustration of woman using a meditation app" }) }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(_components.p, { children: "This post intentionally left blank." }),
    `
`,
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(_components.p, { children: "Write what you want." })
  ] });
  return MDXLayout ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(MDXLayout, { ...props, children: _content }) : _content;
}
var mdx_blog_hello_world_default = MDXContent3, filename3 = "_mdx.blog.hello-world.mdx", headers3 = typeof attributes3 < "u" && attributes3.headers, meta4 = typeof attributes3 < "u" && attributes3.meta, handle3 = typeof attributes3 < "u" && attributes3.handle;

// app/routes/action.set-theme.ts
var action_set_theme_exports = {};
__export(action_set_theme_exports, {
  action: () => action,
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
var action = async ({ request }) => {
  let themeSession = await getThemeSession(request), requestText = await request.text(), theme = new URLSearchParams(requestText).get("theme");
  return console.log("hitting the action function"), isTheme(theme) ? (themeSession.setTheme(theme), (0, import_node3.json)(
    { success: !0 },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  )) : (0, import_node3.json)({
    success: !1,
    message: `theme value of ${theme} is not a valid theme`
  });
}, loader2 = () => (0, import_node3.redirect)("/", { status: 404 });

// app/routes/privacy.tsx
var privacy_exports = {};
__export(privacy_exports, {
  default: () => privacy
});
var import_jsx_runtime13 = require("react/jsx-runtime");
function privacy() {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "font-comfortaa", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "w-full md:text-center pt-8 pb-8 text-xl", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Privacy Policy" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "font-comfortaa", children: " Hongly Dev built the android app as an Ad Supported app. This SERVICE is provided by Hongly Dev at no cost and is intended for use as is." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-2", children: "This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-2", children: "If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-2", children: "The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Hongly Dev unless otherwise defined in this Privacy Policy." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Information Collection and Use" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way." }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Log Data" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (\u201CIP\u201D) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Cookies" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "This Service does not use these \u201Ccookies\u201D explicitly. However, the app may use third-party code and libraries that use \u201Ccookies\u201D to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Service Providers" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "I may employ third-party companies and individuals due to the following reasons:" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("ul", { className: "list-inside mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "To facilitate our Service" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "To provide the Service on our behalf" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "To perform Service-related services or" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("li", { children: "To assist us in analyzing how our Service is used." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-2", children: "I want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Security" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Links to Other Sites" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Children\u2019s Privacy" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "I do not knowingly collect personally identifiable information from children. I encourage all children to never submit any personally identifiable information through the Application and/or Services. I encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide personally identifiable information through the Application and/or Services without their permission. If you have reason to believe that a child has provided personally identifiable information to us through the Application and/or Services, please contact us. You must also be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries we may allow your parent or guardian to do so on your behalf)." }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Changes to This Privacy Policy" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs mt-4", children: "Last update at 14 August 2023" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("strong", { children: "Contact Us" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me :" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-4", children: "Email : hongly.developer@gmail.com" })
    ] })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
var import_framer_motion2 = require("framer-motion");
var import_jsx_runtime14 = require("react/jsx-runtime");
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mx-0 my-[2em] flex min-h-[400px] flex-[1] items-center justify-center max-w-md:flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      import_framer_motion2.motion.div,
      {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
        className: "max-w-md:flex-[0 flex-[1] px-[1em] py-0 max-w-md:pb-[2em] max-w-md:text-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_framer_motion2.motion.h1,
            {
              variants: textVariants,
              className: "mb-[0.5em] text-2xl font-bold leading-[1.3] md:text-4xl",
              children: "Hello, I'm Hongly."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_framer_motion2.motion.p, { variants: textVariants, className: "text-xlg md:text-xl", children: "I'm an Android developer. Developing amazing and useful apps is my passion." })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mx-[1em] my-0 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_framer_motion2.motion.div, { ...imageLoadAnimationProps, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("picture", { className: "block min-h-[250px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "source",
        {
          srcSet: "/assets/images/showlarge.webp",
          media: "(min-width: 600px)"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "img",
        {
          className: "mb-[1em] w-full max-w-[550px] max-w-lg:max-w-[400px]",
          alt: "Illustration of person reading a book",
          src: "/assets/images/showsmall.webp",
          width: "500",
          height: "500"
        }
      )
    ] }) }) })
  ] });
}

// app/routes/terms.tsx
var terms_exports = {};
__export(terms_exports, {
  default: () => terms
});
var import_jsx_runtime15 = require("react/jsx-runtime");
function terms() {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "font-comfortaa", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "pt-8 pb-8 md:text-center w-full text-xl", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: "Terms & Conditions" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "By downloading or using the app, these terms will automatically apply to you. You should make sure therefore that you read them carefully before using the app. You\u2019re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You\u2019re not allowed to attempt to extract the source code of the app, and you also shouldn\u2019t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Hongly Dev." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "Hongly Dev is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you\u2019re paying for." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "The android app stores and processes personal data that you have provided to us, to provide my Service. It\u2019s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone\u2019s security features and it could mean that the android app won\u2019t work properly or at all." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "You should be aware that there are certain things that Hongly Dev will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Hongly Dev cannot take responsibility for the app not working at full functionality if you don\u2019t have access to Wi-Fi, and you don\u2019t have any of your data allowance left." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "If you\u2019re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you\u2019re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you\u2019re using the app, please be aware that we assume that you have received permission from the bill payer for using the app." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "Along the same lines, Hongly Dev cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged, if it runs out of battery and you can\u2019t turn it on to avail the Service, Hongly Dev cannot accept responsibility." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "With respect to Hongly Dev\u2019s responsibility for your use of the app, when you\u2019re using the app, it\u2019s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Hongly Dev accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "At some point, we may wish to update the app. The app is currently available on Android, the requirements for the system(and for any additional systems we decide to extend the availability of the app to) may change, and you\u2019ll need to download the updates if you want to keep using the app. Hongly Dev does not promise that it will always update the app so that it is relevant to you and/or works with the Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: "Changes to This Terms and Conditions" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page." }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4 text-xs", children: "Last update at 16 August 2023" }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-8 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("strong", { children: "Contact Us" }) }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "If you have any questions or suggestions about my Terms and Conditions, do not hesitate to contact me : " }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-4", children: "Email : hongly.developer@gmail.com" })
    ] })
  ] });
}

// app/routes/_mdx.tsx
var mdx_exports = {};
__export(mdx_exports, {
  default: () => BlogLayout,
  links: () => links2,
  loader: () => loader3
});

// node_modules/highlight.js/styles/github-dark-dimmed.css
var github_dark_dimmed_default = "/build/_assets/github-dark-dimmed-KO72WEKC.css";

// app/routes/_mdx.tsx
var import_node4 = require("@remix-run/node"), import_react8 = require("@remix-run/react");

// app/data/blogList.server.ts
var blogList = [
  {
    slug: "hello-world",
    // Filename
    title: "Hello World \u{1F44B}",
    publishDate: "30 Nov 2021",
    description: "Every blog starts with a single post. This is yours. Make it great.",
    pathName: "/blog/hello-world",
    readingTime: "1 min"
  },
  {
    slug: "markdown-test",
    title: "Markdown Test Page",
    publishDate: "01 Dec 2021",
    description: "A sample page with the most common elements of an article, including headings, paragraphs, lists, and images. Use it as a starting point for applying your own styles.",
    pathName: "/blog/markdown-test",
    readingTime: "5 min"
  },
  {
    slug: "another-markdown",
    title: "Another Markdown",
    publishDate: "15 Dec 2021",
    description: " A sample page with the most common elements of an article, including headings, paragraphs, lists, and images. Generated by chatGPT.",
    pathName: "/blog/another-markdown",
    readingTime: "10 min"
  }
];

// app/routes/_mdx.tsx
var import_framer_motion3 = require("framer-motion");
var import_lucide_react3 = require("lucide-react"), import_jsx_runtime16 = require("react/jsx-runtime"), loader3 = async ({ request }) => {
  let pathname = new URL(request.url).pathname, currentPost = blogList.find(({ pathName }) => pathName === pathname);
  return (0, import_node4.json)(currentPost);
}, links2 = () => [{ rel: "stylesheet", href: github_dark_dimmed_default }];
function BlogLayout() {
  let currentPost = (0, import_react8.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_framer_motion3.motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "mx-auto flex w-full max-w-[47rem]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react3.ArrowLeft, {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react8.NavLink, { className: "back-button ml-2 font-sans", to: "/blog", children: "Back" })
    ] }),
    currentPost ? /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("header", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        import_framer_motion3.motion.p,
        {
          variants: textVariants,
          className: "my-10 font-sans font-semibold uppercase text-text-secondary dark:text-d-text-secondary",
          children: [
            currentPost.publishDate,
            " ~ ",
            currentPost.readingTime,
            " read"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        import_framer_motion3.motion.h1,
        {
          variants: textVariants,
          className: "mb-20 text-4xl font-bold leading-[1.3] md:text-6xl",
          children: currentPost.title
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        import_framer_motion3.motion.hr,
        {
          variants: textVariants,
          className: "w-[30%] min-w-[100px]"
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_jsx_runtime16.Fragment, {}),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_framer_motion3.motion.div, { variants: textVariants, className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "prose w-screen py-[1em] px-[2em] dark:prose-invert md:prose-lg lg:prose-xl prose-headings:text-text-primary prose-a:no-underline prose-pre:p-0 dark:prose-headings:text-d-text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_react8.Outlet, {}) }) })
  ] });
}

// app/routes/apps.tsx
var apps_exports = {};
__export(apps_exports, {
  default: () => apps,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_react9 = require("@remix-run/react");
var import_jsx_runtime17 = require("react/jsx-runtime"), loader4 = async () => (0, import_node5.json)(blogList);
function apps() {
  let posts = (0, import_react9.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "h-full w-full text-center", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "font-comfortaa mt-8 text-sm", children: "The list of apps will be available soon when those apps are published on the Play Store." }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-AKJJBJKB.js", imports: ["/build/_shared/chunk-2BCP7WVX.js", "/build/_shared/chunk-3RWUHEQO.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-RNLAEDJB.js", imports: ["/build/_shared/chunk-ANTXHZTM.js", "/build/_shared/chunk-FYYI22HO.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-B7GAAURP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_mdx": { id: "routes/_mdx", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/_mdx-EQWJULP3.js", imports: ["/build/_shared/chunk-ENO76Q6I.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_mdx.blog.another-markdown": { id: "routes/_mdx.blog.another-markdown", parentId: "routes/_mdx", path: "blog/another-markdown", index: void 0, caseSensitive: void 0, module: "/build/routes/_mdx.blog.another-markdown-VE2R6JO7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_mdx.blog.hello-world": { id: "routes/_mdx.blog.hello-world", parentId: "routes/_mdx", path: "blog/hello-world", index: void 0, caseSensitive: void 0, module: "/build/routes/_mdx.blog.hello-world-72HDCDGM.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_mdx.blog.markdown-test": { id: "routes/_mdx.blog.markdown-test", parentId: "routes/_mdx", path: "blog/markdown-test", index: void 0, caseSensitive: void 0, module: "/build/routes/_mdx.blog.markdown-test-KAB554I5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/action.set-theme": { id: "routes/action.set-theme", parentId: "root", path: "action/set-theme", index: void 0, caseSensitive: void 0, module: "/build/routes/action.set-theme-JSIJNEPO.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/apps": { id: "routes/apps", parentId: "root", path: "apps", index: void 0, caseSensitive: void 0, module: "/build/routes/apps-GX26EJ6N.js", imports: ["/build/_shared/chunk-ENO76Q6I.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/privacy": { id: "routes/privacy", parentId: "root", path: "privacy", index: void 0, caseSensitive: void 0, module: "/build/routes/privacy-3ALFPF6D.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/terms": { id: "routes/terms", parentId: "root", path: "terms", index: void 0, caseSensitive: void 0, module: "/build/routes/terms-BMEX6QQV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "7b82964d", hmr: void 0, url: "/build/manifest-7B82964D.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !0, v2_errorBoundary: !1, v2_headers: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_mdx.blog.another-markdown": {
    id: "routes/_mdx.blog.another-markdown",
    parentId: "routes/_mdx",
    path: "blog/another-markdown",
    index: void 0,
    caseSensitive: void 0,
    module: mdx_blog_another_markdown_exports
  },
  "routes/_mdx.blog.markdown-test": {
    id: "routes/_mdx.blog.markdown-test",
    parentId: "routes/_mdx",
    path: "blog/markdown-test",
    index: void 0,
    caseSensitive: void 0,
    module: mdx_blog_markdown_test_exports
  },
  "routes/_mdx.blog.hello-world": {
    id: "routes/_mdx.blog.hello-world",
    parentId: "routes/_mdx",
    path: "blog/hello-world",
    index: void 0,
    caseSensitive: void 0,
    module: mdx_blog_hello_world_exports
  },
  "routes/action.set-theme": {
    id: "routes/action.set-theme",
    parentId: "root",
    path: "action/set-theme",
    index: void 0,
    caseSensitive: void 0,
    module: action_set_theme_exports
  },
  "routes/privacy": {
    id: "routes/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: privacy_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/terms": {
    id: "routes/terms",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: terms_exports
  },
  "routes/_mdx": {
    id: "routes/_mdx",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: mdx_exports
  },
  "routes/apps": {
    id: "routes/apps",
    parentId: "root",
    path: "apps",
    index: void 0,
    caseSensitive: void 0,
    module: apps_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
