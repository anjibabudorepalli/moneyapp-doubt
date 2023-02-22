import './index.css'

const TransactionItem = props => {
  const {item, modifyItems} = props
  const {titleValue, amountValue, selectValue, id} = item

  const onClickButton = () => {
    modifyItems(amountValue, selectValue, id)
  }

  return (
    <li className="li">
      <div className="li-con">
        <p>{titleValue}</p>
        <p>Rs</p>

        <p>{amountValue}</p>
        <p>{selectValue}</p>
      </div>
      <button type="button" onClick={onClickButton} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="button"
        />
      </button>
    </li>
  )
}

export default TransactionItem
