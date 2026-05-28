const SUBSTACK_FEED = "https://shalina25.substack.com/feed";
const API = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(SUBSTACK_FEED);

async function loadArticles() {
  const list = document.getElementById("articles");
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Feed " + res.status);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("Bad feed");
    if (!data.items.length) {
      list.innerHTML = "<li>No articles yet.</li>";
      return;
    }
    list.innerHTML = "";
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
    list.innerHTML =
      '<li><a href="https://shalina25.substack.com" target="_blank" rel="noopener">Read on Substack →</a></li>';
  }
}

loadArticles();
