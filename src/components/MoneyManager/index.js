import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

// eslint-disable-next-line
const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetails1 = [
  {
    id: uuidv4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    imageAlt: 'balance',
    name: 'Your Balance',
    net: 0,
    testId: 'balanceAmount',
  },
  {
    id: uuidv4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    imageAlt: 'income',
    name: 'Your Income',
    net: 0,
    testId: 'incomeAmount',
  },
  {
    id: uuidv4(),
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    imageAlt: 'expenses',
    name: 'Your Expenses',
    net: 0,
    testId: 'expensesAmount',
  },
]

class MoneyManager extends Component {
  state = {
    titleValue: '',
    amountValue: '',
    selectValue: transactionTypeOptions[0].optionId,
    history: [],
    moneyDetails: moneyDetails1,
  }

  modifyItems = (amountValue, selectValue, id) => {
    const {history} = this.state
    const setHistory = history.filter(n => n.id !== id)
    if (selectValue === 'Income') {
      this.setState(k => ({
        moneyDetails: k.moneyDetails.map(m => {
          if (m.name === 'Your Income') {
            return {...m, net: parseInt(m.net) - parseInt(amountValue)}
          }
          if (m.name === 'Your Balance') {
            return {...m, net: parseInt(m.net) - parseInt(amountValue)}
          }
          return m
        }),
        history: setHistory,
      }))
    } else if (selectValue === 'Expenses') {
      this.setState(k => ({
        moneyDetails: k.moneyDetails.map(m => {
          if (m.name === 'Your Expenses') {
            return {...m, net: parseInt(m.net) - parseInt(amountValue)}
          }
          if (m.name === 'Your Balance') {
            return {...m, net: parseInt(m.net) + parseInt(amountValue)}
          }
          return m
        }),
        history: setHistory,
      }))
    }
  }

  onClickButton = event => {
    event.preventDefault()
    const {titleValue, amountValue, selectValue} = this.state
    if (selectValue === 'INCOME') {
      const newHistory = {
        id: uuidv4(),
        titleValue,
        amountValue,
        selectValue: transactionTypeOptions[0].displayText,
      }
      this.setState(k => ({
        history: [...k.history, newHistory],
        moneyDetails: k.moneyDetails.map(m => {
          if (m.name === 'Your Income') {
            return {...m, net: parseInt(m.net) + parseInt(amountValue)}
          }
          if (m.name === 'Your Balance') {
            return {...m, net: parseInt(m.net) + parseInt(amountValue)}
          }
          return m
        }),
        amountValue: '',
        titleValue: '',
      }))
    } else if (selectValue === 'EXPENSES') {
      const newHistory = {
        id: uuidv4(),
        titleValue,
        amountValue,
        selectValue: transactionTypeOptions[1].displayText,
      }
      this.setState(k => ({
        history: [...k.history, newHistory],
        moneyDetails: k.moneyDetails.map(m => {
          if (m.name === 'Your Balance') {
            return {...m, net: parseInt(m.net) - parseInt(amountValue)}
          }
          if (m.name === 'Your Expenses') {
            return {...m, net: parseInt(m.net) + parseInt(amountValue)}
          }
          return m
        }),
        amountValue: '',
        titleValue: '',
      }))
    }
  }

  onChangeSelect = event => {
    this.setState({selectValue: event.target.value})
  }

  onChangeName = event => {
    this.setState({titleValue: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountValue: event.target.value})
  }

  render() {
    const {
      titleValue,
      amountValue,
      selectValue,
      moneyDetails,
      history,
    } = this.state
    return (
      <div className="container-1">
        <div className="details-container">
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <ul className="ul-con">
          {moneyDetails.map(k => (
            <MoneyDetails item={k} key={k.id} />
          ))}
        </ul>
        <div className="form-history">
          <form className="form">
            <h1 className="form-head">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              type="name"
              id="title"
              value={titleValue}
              placeholder="TITLE"
              onChange={this.onChangeName}
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <br />
            <input
              type="name"
              id="amount"
              value={amountValue}
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
            />
            <br />
            <select value={selectValue} onChange={this.onChangeSelect}>
              <option value="INCOME">Income</option>
              <option value="EXPENSES">Expenses</option>
            </select>
            <br />
            <button type="submit" onClick={this.onClickButton}>
              Add
            </button>
          </form>
          <div className="history-con">
            <h1>History</h1>
            <div>
              <li className="ul-li">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              <ul>
                {history.map(k => (
                  <TransactionItem
                    key={k.id}
                    item={k}
                    modifyItems={this.modifyItems}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
