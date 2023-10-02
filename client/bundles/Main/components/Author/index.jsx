import React from 'react'
import Image from './Image'
import Snippet from './Snippet'
import styles from './Author.module.css'

const Author = ({ name, imageUrl, snippet }) => (
  <div className={styles['author']}>
    <Image imageUrl={imageUrl} name={name} />
    <Snippet name={name} snippet={snippet} />
  </div>
)

export default Author
