import * as Tooltip from "@radix-ui/react-tooltip"
import { Info } from "phosphor-react"
import styled from "./tooltip.module.scss"

interface IDefaultTooltip {
  content: string
}

export const DefaultTooltip = ({ content }: IDefaultTooltip) => {

  //@ts-ignore
  const handleClick = (event) => {
    event.preventDefault();
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className={styled.icon__button} onClick={handleClick}>
            <Info size={32} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styled.tooltip__content} sideOffset={5}>
            {content}
            <Tooltip.Arrow className={styled.tooltip__arrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
