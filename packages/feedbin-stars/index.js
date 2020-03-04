const got = require("got");
const parseStringSync = require("xml2js").parseString;

function parseString(xml) {
  return new Promise((resolve, reject) => {
    parseStringSync(xml, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
}

function normalizeItem(item) {
  const { href: link, origin, host, pathname } = new URL(item.link[0]);
  return {
    title: item.title[0],
    description: item.description[0],
    link: link,
    meta: { origin, host, pathname },
    pubDate: new Date(item.pubDate[0]),
    guid: item.guid[0]._,
  };
}

async function getStarredFeed(feed_id) {
  if (feed_id === undefined) {
    throw new Error("feed_id is required");
  }

  const xmlFeed = await got(`https://feedbin.com/starred/${feed_id}.xml`, {
    resolveBodyOnly: true,
  });
  const { rss } = await parseString(xmlFeed);

  const { title, lastBuildDate, item } = rss.channel[0];
  return {
    title: title[0],
    lastBuildDate: new Date(lastBuildDate),
    items: item.map(normalizeItem),
  };
}

module.exports = getStarredFeed;
