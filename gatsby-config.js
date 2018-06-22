module.exports = {
  siteMetadata: {
    title: 'Weekend Read',
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `./src/data`,
    },
  }, 'gatsby-plugin-react-helmet',
    `gatsby-transformer-json`
  ],
}
