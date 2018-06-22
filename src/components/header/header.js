import React from 'react'
import Link from 'gatsby-link'
import Logo from "../../images/logo.jpg";
import HeaderStyles from "./header.module.css"
console.log("HeaderStyles", HeaderStyles);
const Header = ({ siteTitle }) => (
  <header className={HeaderStyles.container}>
    <Link to="/">
      <img src={Logo} className={HeaderStyles.logo}/>
    </Link>
    <h2 className={HeaderStyles.mainTitle}>{siteTitle}</h2>
    <input type="text" defaultValue="search" name="searchField" className={HeaderStyles.siteSearch}/>
    <button className={HeaderStyles.searchCTA}>Search</button>
  </header>
)

export default Header
