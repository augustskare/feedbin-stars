import { parseStringPromise } from "xml2js";

export default async function getStarredFeed(feed_id: string) {
  const response = await fetch(`https://feedbin.com/starred/${feed_id}.xml`);
  const xml = await response.text();
  const { rss: feed } = (await parseStringPromise(xml)) as Feed;

  const items: Item[] = feed.channel[0].item.map(item => {
    return {
      title: item.title[0],
      description: item.description[0] ?? undefined,
      link: new URL(item.link[0]),
      pubDate: new Date(item.pubDate[0]),
      guid: item.guid[0]._,
    };
  });

  return items;
}

export interface Item {
  title: string;
  description?: string;
  link: URL;
  pubDate: Date;
  guid: string;
}

interface Feed {
  rss: {
    channel: {
      item: {
        title: string[];
        description: string[];
        pubDate: string[];
        link: string[];
        guid: {
          _: string;
          $: { isPermaLink: string };
        }[];
      }[];
    }[];
  };
}
