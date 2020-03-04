# gatsby-source-feedbin-stars

[Gatsby](https://gatsbyjs.org) source plugin for getting starred items from [Feedbin](https://feedbin.com) into your Gatsby application.

## Install

`yarn add gatsby-source-feedbin-stars`

or with npm

`npm install gatsby-source-feedbin-stars`

## How to use

In your `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-feedbin-stars",
      options: {
        feed_id: "5Euw2uq5T9oUL7tUbs0_2A",
      },
    },
  ]
}
```

### Options

#### feed_id

Type: `string`<br>
Required: `true`

In Feedbin [general settings](https://feedbin.com/settings) you'll need to turn on "Starred article feed", you'll then get a feed URL. It will look something like https://feedbin.com/starred/5Euw2uq5T9oUL7tUbs0_2A.xml, grab the string between "https://feedbin.com/starred/" and ".xml". In this case the feed_id is `5Euw2uq5T9oUL7tUbs0_2A`.

## How to query

```graphql
query {
  allFeedbinStars {
    edges {
      node {
        title
        link
        description
        pubDate
        meta {
          host
          origin
          pathname
        }
      }
    }
  }
}
```
