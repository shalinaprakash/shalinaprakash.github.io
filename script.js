const SUBSTACK_FEED = "https://shalina25.substack.com/feed";
const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(SUBSTACK_FEED);

async function loadArticles() {
  const list = document.getElementById("articles");
  const anchor = document.getElementById("substack-anchor");
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Feed " + res.status);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Bad feed");
    const sorted = data.items.slice().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    for (const item of sorted) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = item.title;
      li.appendChild(a);
      list.insertBefore(li, anchor);
    }
  } catch (e) {
    console.error(e);
  }
}

loadArticles();
