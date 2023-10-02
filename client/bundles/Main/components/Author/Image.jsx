import React from 'react'
import no_image from './no_image.svg'
import styles from './Author.module.css'

const Image = ({ imageUrl, name }) => {
  const source = imageUrl ? imageUrl : no_image
  const alt = imageUrl
    ? `Image of ${name} from wikipedia`
    : 'no image is being displayed'

  return (
    <div className={styles['author-image-wrapper']}>
      <img className={styles['author-image']} src={source} alt={alt} />
    </div>
  )
}

export default Image
