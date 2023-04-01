import React from "react"

interface ModalType {
  children?: React.ReactNode
  isOpen: boolean
  toggle: () => void
}

import styled from "./modal.module.scss"

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className={styled.modal__overlay} onClick={props.toggle}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={styled.modal__box}
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  )
}
