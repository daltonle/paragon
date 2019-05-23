import React from 'react'

import styles from './Buttons.module.scss'

export const ButtonNormal = (props) => {
  const { name, className, isSubmitting, onClick, type } = props
  return (
    <button className={`${styles.buttonNormal} ${className}`} onClick={onClick} type={type}>
      {
        isSubmitting ? 
        <div className={`${styles.preloader} animateInfiniteRotate`}></div> :
        name
      }
    </button>
  )
}

export const ButtonNormalDanger = (props) => {
  const { name, className, isSubmitting, onClick, type } = props
  return (
    <button className={`${styles.buttonNormalDanger} ${className}`} onClick={onClick} type={type}>
      {
        isSubmitting ? 
        <div className={`${styles.preloader} animateInfiniteRotate`}></div> :
        name
      }
    </button>
  )
}

export const GhostButton = (props) => {
  const { name, className, isSubmitting, onClick } = props
  return (
    <button className={`${styles.buttonGhost} ${className}`} onClick={onClick} >
      {
        isSubmitting ? 
        <div className={`${styles.preloader} animateInfiniteRotate`}></div> :
        name
      }
    </button>
  )
}
