import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

    header = (
      <nav
        style={{
          position: `fixed`,
          backgroundColor: `#0077aa`,
          width: `100%`,
          padding: `5px 20px`,
          top: `0px`,
          left: `0px`,
          zIndex: `99`,
        }}
      >
        <h1
          style={{
            ...scale(0.4),
            marginTop: 0,
            lineHeight: `3.5rem`,
            marginBottom: `0px`,
            marginTop: `0px`,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `#fff`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      </nav>
    )
    
  return (
    <div>
      <header>{header}</header>
      <main
        style={{
          paddingTop: `66px`,
          marginLeft: `auto`,
          marginRight: `auto`
        }}
      >
        {children}
      </main>
      <footer
        style={{
          backgroundColor: `#266580`,
          width: `100%`,
          color: `#fff`,
          padding: `${rhythm(1)}`,
        }}
      >
        © {new Date().getFullYear()}, All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
