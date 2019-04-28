import React from 'react'
import EditIcon from 'react-feather/dist/icons/edit-2'
import DeleteIcon from 'react-feather/dist/icons/trash-2'

import styles from './ActionColumn.module.scss'

// action column to be added to ReactTable, including Edit and Delete buttons

export const actionColumn = {
  Header: "Actions",
  Cell: () => (
    <div className={styles.container}>
      <div className={styles.button}>
        <EditIcon className={styles.icon} />
        <span>Edit</span>
      </div>
      <div className={styles.button}>
        <DeleteIcon className={styles.icon} />
        <span>Delete</span>
      </div>
    </div>
  ),
  filterable: false,
  width: 172
}