const SUBSTACK_FEED = "https://shalina25.substack.com/feed";
const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(SUBSTACK_FEED);

async function loadArticles() {
  const list = document.getElementById("articles");
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Feed " + res.status);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Bad feed");
    for (const item of data.items) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = item.title;
      li.appendChild(a);
      list.appendChild(li);
    }
  } catch (e) {
    console.error(e);
  }
}

loadArticles();
