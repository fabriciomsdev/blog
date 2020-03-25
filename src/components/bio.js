/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            linkedIn
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
        backgroundColor: `#008FCC`,
        color: `#fff`,
        paddingBottom: rhythm(1),
        paddingTop: rhythm(1),
      }}
    >
      <div
        style={{
          display: `flex`,
          maxWidth: rhythm(24),
          marginLeft: `auto`,
          marginRight: `auto`,
          verticalAlign: `middle`,
        }}
      >
        <p
          style={{
            alignSelf: `center`,
            marginBottom: `0px`,
          }}
        >
          Written by <strong>{author.name}</strong> {author.summary}
          <br></br>
          <a style={{
            color: `#fff`,
            marginRight: `10px`,
            marginTop: `20px`
          }} href={`${social.linkedIn}`}>Linked In</a>
          {` `}
          <a style={{
            color: `#fff`,
            marginRight: `10px`,
            marginTop: `20px`
          }} href={`${social.github}`}>Github</a>
        </p>
      </div>
    </div>
  )
}

export default Bio
