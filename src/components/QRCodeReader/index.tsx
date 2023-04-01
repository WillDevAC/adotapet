import React, { useEffect, useRef, useState } from "react"
import styled from "./qr-code-reader.module.scss"
import { X } from "phosphor-react"
import { BrowserQRCodeReader, DecodeHintType } from "@zxing/library"
import { RotatingLines } from "react-loader-spinner"

interface IReaderQRCodeProps {
  setQRCodeReader: Function
}

export const ReaderQRCode: React.FC<IReaderQRCodeProps> = ({
  setQRCodeReader,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)

  const handleQRCodeScanned = async (result: string) => {
    let id = result.replace(/[^0-9]/g, "")
    await navigator.vibrate(4000)
    window.location.href = "/id-tags/view/" + id
  }

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          alert("autorize a sua camera para leitura.")
        }

        const selectedDeviceId =
          videoInputDevices[videoInputDevices.length - 1].deviceId

        const hints = new Map()
        hints.set(DecodeHintType.TRY_HARDER, true)

        codeReader
          .decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result) => {
              if (result) {
                //@ts-ignore
                handleQRCodeScanned(result.text)
              }
            },
            //@ts-ignore
            hints,
          )
          .then(() => {
            setLoading(false)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleQRCodeScanned])

  return (
    <>
      <div className={styled.qrCodeReader}>
        <div className={styled.closeButton}>
          <X size={32} color="#FFF" onClick={() => setQRCodeReader(false)} />
        </div>
        <div className={styled.content}>
          <h1>Leitor de ID TAG</h1>
          <span>Posicione a sua camera para leitura.</span>
          {loading ? (
            <RotatingLines strokeColor="grey" strokeWidth="5" width="50" />
          ) : (
            <video ref={videoRef} style={{ width: "100%" }} />
          )}
        </div>
      </div>
    </>
  )
}
