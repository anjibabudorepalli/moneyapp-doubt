import './index.css'

const MoneyDetails = props => {
  const {item} = props
  const {imageUrl, imageAlt, name, net, testId} = item

  return (
    <li className={`ll li-${imageAlt}`}>
      <div>
        <img src={imageUrl} alt={imageAlt} className="image" />
      </div>
      <div>
        <p>{name}</p>
        <p>Rs</p>
        <p data-testid={testId}> {net}</p>
      </div>
    </li>
  )
}

export default MoneyDetails
