const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    //Gets file name as slug from markdown file
    const slug = createFilePath({ node, getNode, basePath: `pages` });

    //Adds the slug to node of GraphiQL
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

//implementation of the createPages API which Gatsby calls so plugins can add pages

/*
1. Query data with GraphQL
2. Map the query results to pages

*/

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      //Get data from above GraphQl query
      /*
            {
            "data": {
                "allMarkdownRemark": {
                    "edges": [
                        {
                            "node": {
                                "fields": {
                                    "slug": "/pandas-add-bananas/"
                                }
                            }
                        },
                        {
                            "node": {
                                "fields": {
                                    "slug": "/sweet-pandas-eating-sweets/"
                                }
                            }
                        }
                    ]
                }
            }
        }
      */

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        //CreatePage API
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug
          }
        });
      });
      resolve();
    });
  });
};
