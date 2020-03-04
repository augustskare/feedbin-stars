import React from "react";
import { graphql } from "gatsby";

function Index(props) {
  return (
    <ul>
      {props.data.favs.edges.map(({ node: fav }) => {
        return (
          <li key={fav.id}>
            <article>
              <h2>
                <a href={fav.link} rel="noopener">
                  {fav.title}
                </a>
              </h2>
              <p>{fav.meta.host}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export const query = graphql`
  query {
    favs: allFeedbinStars {
      edges {
        node {
          title
          link
          id
          meta {
            host
          }
        }
      }
    }
  }
`;

export default Index;
