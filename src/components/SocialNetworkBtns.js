import React, { useContext } from 'react'

import styles from './SocialNetworkBtns.module.scss'
import ThemeContext from '../context/ThemeContext'

function SocialNetworkBtns(props) {

  const socialMedia = [
    ["github", "https://github.com/solring"],
    ["twitter", "https://twitter.com/burntgoldfish"],
    ["tumblr", "https://sunburnt-goldfish.tumblr.com"],
  ]

  const {suffix} = useContext(ThemeContext)

  return (
    <nav className={`position-relative icon-socialmedia bg-theme-gradient${suffix} theme-transition`}>
      <ul className="position-absolute top-0 left-0">
        {socialMedia.map(([name, link], idx) => (
          <li key={idx} className="d-inline-block me-2">
            <a className={styles.btn} href={link}>
              <span className="visually-hidden">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SocialNetworkBtns

