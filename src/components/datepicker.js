import { html } from 'snabbdom-jsx' // eslint-disable-line
import defaultMaterial from './defaultMaterial'
import moment from 'moment'
import Dialog from './dialog'
import Calendar from './calendar'

export default function DatePicker ({
  className = '',
  isOpen = false,
  locale = 'en',
  month = (new Date()).getMonth(),
  onCancel,
  onChange,
  onNavigate,
  onOk,
  pickingValue,
  screenInfo,
  style = {},
  validDays,
  year = (new Date()).getFullYear(),
  material = defaultMaterial
}) {
  const { isPortrait } = screenInfo
  const displayDate = pickingValue ? moment(pickingValue) : moment({ year, month, day: 1 })
  displayDate.locale(locale)

  let dateLines = null
  if (!pickingValue) {
    dateLines = [displayDate.format('MMM')]
  } else if (isPortrait) {
    dateLines = [displayDate.format('ddd MMM D')]
  } else {
    dateLines = [
      displayDate.format('ddd'),
      displayDate.format('MMM D')
    ]
  }

  return (
    <Dialog
      isOpen={isOpen}
      footer={<span>
        <Dialog.Button flat onClick={onCancel}>Cancel</Dialog.Button>
        <Dialog.Button flat primary
          onClick={pickingValue ? () => onOk({ target: { value: pickingValue } }) : null}>
          OK
        </Dialog.Button>
      </span>}
      width={isPortrait ? 328 : 496}
      height={isPortrait ? 388 : 292}
      hideDivider
      noPadding
      screenInfo={screenInfo}
      className={className}
      style={Object.assign({ overflow: 'hidden' }, style)}
      material={material}>
      <div
        style={{
          width: isPortrait ? '100%' : '168px',
          height: isPortrait ? '96px' : '322px',
          marginBottom: isPortrait ? '0' : '-56px',
          backgroundColor: material.secondaryColor || defaultMaterial.secondaryColor,
          color: material.secondaryFontColor || defaultMaterial.secondaryFontColor,
          padding: isPortrait ? '16px 24px' : '16px',
          position: 'absolute'
        }}>
        <div style={{ fontSize: '15px', marginBottom: '2px' }}>
          {displayDate.get('year')}
        </div>
        <div style={{ fontSize: '36px', fontWeight: '600', lineHeight: '40px' }}>
          {dateLines.map((line) => (
            <div>{line}</div>
          ))}
        </div>
      </div>
      <Calendar
        locale={locale}
        month={month}
        onChange={onChange}
        onNavigate={onNavigate}
        validDays={validDays}
        value={pickingValue}
        year={year}
        style={{
          margin: isPortrait ? '104px 24px 0' : '8px 24px 0 192px'
        }}
        material={material}/>
    </Dialog>
  )
}
