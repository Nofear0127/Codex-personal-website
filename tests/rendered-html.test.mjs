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

test("server-renders the 0715 portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>孙晨曦（雾崎）— 技术型 AI 产品经理<\/title>/i);
  assert.match(html, /近 3 年头部大厂（阿里巴巴 \+ 智谱）AI 产品经历/);
  assert.match(html, /mailto:sunchenxi@wuqiai\.cn/);
  assert.match(html, /WUQI_ROOM/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps the 0715 resume claims and downloadable resume wired", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /3C 品类产品负责人/);
  assert.match(page, /对照实验结果 · 3C 板块/);
  assert.match(page, /\+4\.5%/);
  assert.match(page, /\+11\.5%/);
  assert.match(page, /总述 → 相同点 → 核心区别 → 选购建议 → 小提示 → 参数对比表/);
  assert.match(page, /参与 CogView 系列文生图模型的数据构建与效果迭代/);
  assert.match(layout, /孙晨曦（雾崎）— 技术型 AI 产品经理/);
  await access(new URL("../public/孙晨曦-AI产品经理-简历-0715.pdf", import.meta.url));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});
