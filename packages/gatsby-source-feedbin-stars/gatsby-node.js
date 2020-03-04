const getStarredFeed = require("feedbin-stars");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  try {
    const feed = await getStarredFeed(configOptions.feed_id);

    return feed.items.forEach(item =>
      actions.createNode(
        Object.assign({}, item, {
          id: createNodeId(`pollenvarsel-${item.meta.pathname}`),
          parent: null,
          children: [],
          internal: {
            type: "FeedbinStars",
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        })
      )
    );
  } catch (error) {
    throw error;
  }
};
