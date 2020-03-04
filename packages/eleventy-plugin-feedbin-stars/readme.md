# eleventy-plugin-feedbin-stars

[Eleventy](https://11ty.dev) plugin for getting starred items from [Feedbin](https://feedbin.com) into your Eleventy site.

## Install

`yarn add eleventy-plugin-feedbin-stars`

or with npm

`npm install eleventy-plugin-feedbin-stars`

## How to use

In your `.eleventy.js`

```
const feedbinStars = require("eleventy-plugin-feedbin-stars");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(feedbinStars, {
    feed_id: "5Euw2uq5T9oUL7tUbs0_2A",
  });
};
```

### Options

#### feed_id

Type: `string`<br>
Required: `true`

In Feedbin [general settings](https://feedbin.com/settings) you'll need to turn on "Starred article feed", you'll then get a feed URL. It will look something like https://feedbin.com/starred/5Euw2uq5T9oUL7tUbs0_2A.xml, grab the string between "https://feedbin.com/starred/" and ".xml". In this case the feed_id is `5Euw2uq5T9oUL7tUbs0_2A`.

## How to use

The plugin will create a feedbinStars collection. You are then able to loop over the items in your template:

```html
<ul>
  {% for item in collections.feedbinStars %}
  <li>
    <article>
      <h2><a href="{{ item.link }}" rel="noopener">{{ item.title }}</a></h2>
      <p>{{ item.meta.host }}</p>
    </article>
  </li>
  {% endfor %}
</ul>
```
