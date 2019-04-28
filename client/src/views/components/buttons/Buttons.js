import React from 'react'

import styles from './Buttons.module.scss'

export const ButtonNormal = (props) => {
  const { name, className } = props
  return (
    <div className={`${styles.buttonNormal} ${className}`}>
      {name}
    </div>
  )
}
