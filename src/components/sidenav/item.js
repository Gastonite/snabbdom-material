import { html } from 'snabbdom-jsx' // eslint-disable-line
import h from 'snabbdom/h'
import MenuItem from '../menu/item'
import defaultMaterial from '../defaultMaterial'

export default function SidenavItem ({
  className = '',
  icon,
  onClick,
  onClose,
  selected = false,
  showIcon = false,
  style = {},
  material = defaultMaterial
}, children = '') {
  return (
    <MenuItem
      icon={icon}
      onClick={onClick}
      onClose={onClose}
      selected={false}
      showIcon={showIcon}
      className={className}
      style={Object.assign({
        padding: '8px 40px 8px 24px',
        color: selected
          ? material.primaryColor || defaultMaterial.primaryColor
          : material.typographyColor || defaultMaterial.typographyColor
      }, style)}
      material={material}>
      {h('span', children)}
    </MenuItem>
  )
}
