import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the 0717 portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>孙晨曦 · 杠杆型 AI 产品经理｜阿里巴巴 × 字节跳动 × 智谱<\/title>/i);
  assert.match(html, /3 年头部大厂（阿里巴巴 \+ 字节跳动 \+ 智谱）AI 产品经历/);
  assert.match(html, /WQ19350524359/);
  assert.match(html, /WUQI_ROOM/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the 0717 resume claims, assets and project data wired", async () => {
  const [page, layout, projectData, siteConfig, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/siteConfig.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(projectData, /3C 品类产品负责人/);
  assert.match(page, /Seedream/);
  assert.match(page, /AgentTuning/);
  assert.match(projectData, /关键成果 · 3C 板块 · 对照实验/);
  assert.match(projectData, /\+4\.5%/);
  assert.match(projectData, /\+5\.7%/);
  assert.match(projectData, /98%/);
  assert.doesNotMatch(projectData, /\+11\.5%/);
  assert.match(siteConfig, /WECHAT_QR_PATH = "\/assets\/wechat-qr\.png"/);
  assert.match(siteConfig, /RESUME_PDF_PATH = "\/assets\/resume\.pdf"/);
  assert.match(siteConfig, /WECHAT_ID = "WQ19350524359"/);
  assert.match(page, /role="dialog"/);
  assert.match(page, /aria-modal="true"/);
  assert.doesNotMatch(page, /发送邮件|mailto:/);
  assert.match(styles, /@media\(max-width:1024px\)/);
  assert.match(styles, /\.writing-intro,.project-belief\{display:flex/);
  assert.match(projectData, /七段式输出：总述 → 相同点 → 核心区别 → 选购建议 → 小提示 → 参数对比表 → 追问入口/);
  assert.match(layout, /孙晨曦 · 杠杆型 AI 产品经理/);
  assert.doesNotMatch(`${page}\n${layout}\n${projectData}`, /CogView|TECHNICAL|技术型|近 3 年|年龄|六段式/);
  await access(new URL("../public/assets/resume.pdf", import.meta.url));
  await access(new URL("../public/assets/wechat-qr.png", import.meta.url));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
