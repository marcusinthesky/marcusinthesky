import { mkdir } from "node:fs/promises";

const username = "marcusinthesky";
const siteDataUrl = "https://marcusinthesky.github.io/data/writing.json";
const token = process.env.GITHUB_TOKEN;

type Writing = {
  canonicalUrl: string;
  publishedAt: string;
  source: string;
  title: string;
};

type GitHubUser = {
  followers: number;
  public_repos: number;
};

type Repository = {
  fork: boolean;
  stargazers_count: number;
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${username}-profile-refresh`,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function json<T>(url: string, requestHeaders: HeadersInit = {}): Promise<T> {
  const response = await fetch(url, { headers: requestHeaders });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json() as Promise<T>;
}

async function refreshWriting(): Promise<void> {
  try {
    const writing = await json<Writing[]>(siteDataUrl);
    const latest = writing
      .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, 3)
      .map(({ canonicalUrl, source, title }) => `- [${title}](${canonicalUrl}) — ${source}`)
      .join("\n");
    const readme = await Bun.file("README.md").text();
    const updated = readme.replace(
      /<!-- WRITING:START -->[\s\S]*?<!-- WRITING:END -->/,
      `<!-- WRITING:START -->\n${latest}\n<!-- WRITING:END -->`,
    );
    await Bun.write("README.md", updated);
  } catch (error) {
    console.warn(`Writing refresh skipped: ${String(error)}`);
  }
}

async function refreshStats(): Promise<void> {
  const [user, repositories] = await Promise.all([
    json<GitHubUser>(`https://api.github.com/users/${username}`, headers),
    json<Repository[]>(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, headers),
  ]);
  const stars = repositories
    .filter(({ fork }) => !fork)
    .reduce((total, repository) => total + repository.stargazers_count, 0);
  const updated = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeZone: "Africa/Johannesburg",
  }).format(new Date());
  const cells = [
    ["Public repositories", String(user.public_repos)],
    ["Stars received", String(stars)],
    ["Followers", String(user.followers)],
  ];
  const metrics = cells
    .map(
      ([label, value], index) => `
        <g transform="translate(${36 + index * 202} 78)">
          <text class="value" y="0">${escapeXml(value)}</text>
          <text class="label" y="28">${escapeXml(label)}</text>
        </g>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="178" viewBox="0 0 640 178" role="img" aria-labelledby="title description">
  <title id="title">Public GitHub activity for Marcus Gawronsky</title>
  <desc id="description">${cells.map(([label, value]) => `${label}: ${value}`).join("; ")}</desc>
  <style>
    :root { --bg: #fcfcf9; --border: #cecec5; --text: #090909; --muted: #666660; }
    .frame { fill: var(--bg); stroke: var(--border); }
    text { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; fill: var(--text); }
    .value { font-family: ui-serif, Palatino, Georgia, serif; font-size: 28px; font-weight: 600; }
    .label { fill: var(--muted); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
    .meta { font-size: 11px; }
  </style>
  <rect class="frame" x="1" y="1" width="638" height="176" rx="8"/>
  <text class="meta" x="36" y="35">PUBLIC GITHUB ACTIVITY</text>
  ${metrics}
  <text class="label" x="36" y="151">Updated ${escapeXml(updated)} · Generated from the GitHub API</text>
</svg>`;
  await mkdir("assets", { recursive: true });
  await Bun.write("assets/github-stats.svg", svg);
}

await Promise.all([refreshWriting(), refreshStats()]);
