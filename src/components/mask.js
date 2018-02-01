import h from 'snabbdom/h'
import { getStyle } from '../style'

export default function Mask ({
  selector = 'div',
  isOpen = false,
  dark = true,
  onClick,
  style
}) {
  const styles = getStyle('mask', style)

  return isOpen ? h(selector, {
    style: Object.assign({}, styles.mask, dark ? styles.dark : styles.transparent),
    on: {
      click: (e) => onClick ? onClick(e) : null
    }
  }) : h('span')
}
