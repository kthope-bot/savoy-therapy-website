import fs from "fs/promises";
import path from "path";
import { communityPages } from "../../client/src/lib/communityData";
import { publishedBlogPosts } from "../../client/src/lib/siteContent";
import { renderApp } from "./renderApp";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const builtTemplatePath = path.resolve(projectRoot, "dist", "public", "index.html");
const outputRoot = path.resolve(projectRoot, "dist", "public");

const staticRoutes = [
  "/",
  "/about",
  "/balanceiq",
  "/services",
  "/therapy-rockstars",
  "/testimonials",
  "/resources",
  "/blog",
  "/communities",
  "/contact-report",
  "/contact-thank-you",
  "/stimpod",
  "/home-safety-assessment",
  "/404",
  ...publishedBlogPosts.map((post) => `/blog/${post.slug}`),
  ...communityPages.map((community) => `/communities/${community.slug}`),
];

function routeToOutputFile(route: string) {
  if (route === "/") {
    return path.join(outputRoot, "index.html");
  }

  const normalized = route.replace(/^\//, "");
  return path.join(outputRoot, normalized, "index.html");
}

function injectRenderedApp(template: string, route: string) {
  const { appHtml } = renderApp(route);
  return template.replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);
}

async function writeRouteHtml(route: string, template: string) {
  const outputFile = routeToOutputFile(route);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, injectRenderedApp(template, route), "utf-8");
}

async function writeRedirectPage(fromRoute: string, toRoute: string, template: string) {
  const outputFile = routeToOutputFile(fromRoute);
  const redirectMarkup = `<div id="root"><main style="font-family: Arial, Helvetica, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; color: #10203f;"><div style="max-width: 42rem; text-align: center;"><h1 style="font-size: 2rem; margin-bottom: 1rem; color: #2121CC;">This page moved.</h1><p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.25rem;">The education page now lives under resources. If you are not redirected automatically, use the link below.</p><p><a href="${toRoute}" style="color: #2121CC; font-weight: 700;">Go to ${toRoute}</a></p></div></main></div>`;
  const page = template
    .replace(
      "</head>",
      `  <meta http-equiv="refresh" content="0; url=${toRoute}" />\n  <link rel="canonical" href="https://www.savoytherapy.com${toRoute}" />\n</head>`
    )
    .replace(/<div id="root"><\/div>/, redirectMarkup);

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, page, "utf-8");
}

async function main() {
  const template = await fs.readFile(builtTemplatePath, "utf-8");

  if (!template.includes('rel="stylesheet"') || !template.includes('<div id="root"></div>')) {
    throw new Error(
      "The built HTML template is missing the expected stylesheet tag or root mount. Run the client build before prerendering."
    );
  }

  await Promise.all(staticRoutes.map((route) => writeRouteHtml(route, template)));
  await writeRedirectPage("/education", "/resources", template);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
