import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import styles from './PicModal.module.scss'

function PicModal(props) {
  const {toggle, onClose, data} = props

  const renderContent = () => {
    if (!data) {
      return (
        <div className="alert alert-warning p-6 mb-0">
          <h6>Oops...There was nothing to load.</h6>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <article className={styles.container + ' position-relative'}>
            <img
              src={data.img}
              alt={data.title}
            />
          <div className={styles.textBlk}>
            <h2 className="h3">{data.title}</h2>
            <p className="mb-1">{data.desc}</p>
            <div className="text-wrap">
              {data.tags && data.tags.map((t, i) => (
                <small key={i} className="me-2">#{t}</small>
              ))}
            </div>
          </div>
          </article>
        </React.Fragment>
      )
    }
  }

  return (
    <Modal
      show={toggle}
      onHide={onClose}
      centered
      dialogClassName={styles.modalSize}
    >
      <button onClick={onClose} aria-label="close">
        {renderContent()}
      </button>
    </Modal>
  )
}

PicModal.propTypes = {
  toggle: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string,
    desc: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default PicModal

