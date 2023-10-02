import React from 'react'
import styles from './Menu.module.css'

const SubMenuHeader = ({ title, handler }) => (
  <div className={styles['sub-menu-wrapper']}>
    <button onClick={handler} type="button" className={styles['sub-menu-item']}>
      {title}
    </button>
  </div>
)

export default SubMenuHeader
