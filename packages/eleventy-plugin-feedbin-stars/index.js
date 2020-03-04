const feedbinStars = require("feedbin-stars");

function feedbinStarsPlugin(eleventyConfig, options) {
  if (typeof options.feed_id !== "string") {
    throw new Error("eleventy-plugin-feedbin-stars requires a feed_id");
  }

  eleventyConfig.addCollection("feedbinStars", async function() {
    const feed = await feedbinStars(options.feed_id);
    return feed.items;
  });
}

module.exports = feedbinStarsPlugin;
