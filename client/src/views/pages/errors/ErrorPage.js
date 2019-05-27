import React from 'react'
import { ButtonNormal } from '../../components/buttons/Buttons'
import { ReactComponent as Lost } from '../../../assets/lost.svg'

import styles from './ErrorPage.module.scss'

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={styles.errorPage}>
        <Lost className={styles.illustration}/>
        <h1>Not all those who wander are lost, but it looks like you are.</h1>
        <ButtonNormal
          name="Go to homepage" 
          onClick={() => this.props.history.push("/")} 
          className={styles.button} 
        />
      </div>
    )
  }
}

export default ErrorPage