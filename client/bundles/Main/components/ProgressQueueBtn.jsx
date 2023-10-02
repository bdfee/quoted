import React from 'react'
import styles from './Main.module.css'

const NextQueueBtn = ({ progressQueue }) => (
  <button className={styles['progress-queue-btn']} onClick={progressQueue}>
    next quote
  </button>
)

export default NextQueueBtn
