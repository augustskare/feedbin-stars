const CacheAsset = require("@11ty/eleventy-cache-assets");
const feedbinStars = require("feedbin-stars");

function feedbinStarsPlugin(eleventyConfig, options) {
  if (typeof options.feed_id !== "string") {
    throw new Error("eleventy-plugin-feedbin-stars requires a feed_id");
  }

  function fetch(url) {
    return CacheAsset(url, {
      duration: options.cache_duration || "4h",
      type: "text",
    });
  }

  eleventyConfig.addCollection("feedbinStars", async function() {
    const feed = await feedbinStars(options.feed_id, fetch);
    return feed.items;
  });
}

module.exports = feedbinStarsPlugin;
