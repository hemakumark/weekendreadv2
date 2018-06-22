import React from "react"
import Link from 'gatsby-link'

export default ({ data }) => {
  console.log(data)
  return (
    <div>
        
            {data.dataJson.articles.map((article) => (
            <article key={article.id}>
                <h5>
                {article.title}
                </h5>
                <Link href="/">{article.link}</Link>
                <p className="badge"><i>{article.keywords.join(", ")}</i></p>
                <hr/>
            </article>
            
        ))}
        
      
    </div>
  )
}


export const query = graphql`
  query ArticlesQuery {
    dataJson {
        articles {
          title
          link
          id
          keywords
        }
      }
  }
  `