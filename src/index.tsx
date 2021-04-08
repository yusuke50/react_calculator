import './index.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function numberFormat(n: string) {
  let insideN = n;
  insideN += '';
  const arr = insideN.split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return `${arr[0].replace(re, '$1,')}${arr.length === 2 ? `.${arr[1]}` : ''}`;
}

function Num(props: any) {
  return (
    <button
      type='button'
      className='btn btn-secondary w-100'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Operator(props) {
  switch (props.value) {
    case 'back':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-long-arrow-alt-left'></i>
        </button>
      );
    case 'C':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    case 'divide':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-divide'></i>
        </button>
      );
    case 'times':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-times'></i>
        </button>
      );
    case 'minus':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-minus'></i>
        </button>
      );
    case '.':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          {props.value}
        </button>
      );
    case 'equals':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-equals'></i>
        </button>
      );
    case 'plus':
      return (
        <button
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-plus'></i>
        </button>
      );

    default:
      console.log(`Sorry, we are out of ${props.value}.`);
      return <div></div>;
  }
}

function CalDiv(props) {
  console.log(props);

  let str =
    typeof props.value[props.value.length - 1] === 'number'
      ? props.value[props.value.length - 1]
      : props.value[props.value.length - 2];
  return (
    <div className='total col-12 text-right'>
      <div>{props.value.join(' ')}</div>
      <div className='form-control'>{str}</div>
    </div>
  );
}

class Btns extends React.Component {
  renderSquare(i) {
    if (typeof i === 'number') {
      return <Num value={i} onClick={() => this.props.onClick(i)} />;
    } else {
      return <Operator value={i} onClick={() => this.props.onClick(i)} />;
    }
  }

  render() {
    return (
      <div>
        <div className='row mb-4'>
          <div className='col-6 text-center'>{this.renderSquare('back')}</div>
          <div className='col-6 text-center'>{this.renderSquare('C')}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(7)}</div>
          <div className='col-3 text-center'>{this.renderSquare(8)}</div>
          <div className='col-3 text-center'>{this.renderSquare(9)}</div>
          <div className='col-3 text-center'>{this.renderSquare('divide')}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(4)}</div>
          <div className='col-3 text-center'>{this.renderSquare(5)}</div>
          <div className='col-3 text-center'>{this.renderSquare(6)}</div>
          <div className='col-3 text-center'>{this.renderSquare('times')}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(1)}</div>
          <div className='col-3 text-center'>{this.renderSquare(2)}</div>
          <div className='col-3 text-center'>{this.renderSquare(3)}</div>
          <div className='col-3 text-center'>{this.renderSquare('minus')}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(0)}</div>
          <div className='col-3 text-center'>{this.renderSquare('.')}</div>
          <div className='col-3 text-center'>{this.renderSquare('equals')}</div>
          <div className='col-3 text-center'>{this.renderSquare('plus')}</div>
        </div>
      </div>
    );
  }
}

function calc(h: any) {
  let [a, op, b] = h;
  let res;
  switch (op) {
    case '+':
      res = a + b;
      break;
    case '-':
      res = a - b;
      break;
    case '*':
      res = a * b;
      break;
    case '/':
      res = a / b;
      break;
    default:
      break;
  }
  return res;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [0],
      steps: [],
    };
  }

  clickEvent(i) {
    let h = this.state.history.slice();

    switch (i) {
      case 'back':
        h[h.length - 1] = Math.floor(h[h.length - 1] / 10);
        break;
      case 'C':
        h = [0];
        break;
      case 'divide':
        if (
          h.indexOf('+') > -1 ||
          h.indexOf('-') > -1 ||
          h.indexOf('*') > -1 ||
          h.indexOf('/') > -1
        ) {
          h = [calc(h)];
        }
        h[h.length] = '/';
        break;
      case 'times':
        if (
          h.indexOf('+') > -1 ||
          h.indexOf('-') > -1 ||
          h.indexOf('*') > -1 ||
          h.indexOf('/') > -1
        ) {
          h = [calc(h)];
        }
        h[h.length] = '*';
        break;
      case 'minus':
        if (
          h.indexOf('+') > -1 ||
          h.indexOf('-') > -1 ||
          h.indexOf('*') > -1 ||
          h.indexOf('/') > -1
        ) {
          h = [calc(h)];
        }
        h[h.length] = '-';
        break;
      case '.':
        if (h[h.length - 1].toString().indexOf('.') < 0) {
          h[h.length - 1] = `${h[h.length - 1]}.`;
        }
        break;
      case 'equals':
        h = [calc(h)];
        break;
      case 'plus':
        if (
          h.indexOf('+') > -1 ||
          h.indexOf('-') > -1 ||
          h.indexOf('*') > -1 ||
          h.indexOf('/') > -1
        ) {
          h = [calc(h)];
        }
        h[h.length] = '+';
        break;
      default:
        if (typeof h[h.length - 1] === 'number') {
          h[h.length - 1] = h[h.length - 1] * 10 + i;
        } else if (h[h.length - 1].indexOf('.') > -1) {
          h[h.length - 1] = +`${h[h.length - 1]}${i}`;
        } else {
          h.push(i);
        }
        break;
    }

    this.setState({
      history: h,
      step: history.length,
    });
  }

  render() {
    const history = this.state.history;

    return (
      <div className='main-container'>
        <div className='row'>
          <div className='col-7'>
            <div className='row mb-4'>
              <CalDiv value={history}></CalDiv>
            </div>
            <div className='btns'>
              <Btns
                num={history.join('')}
                onClick={(i) => this.clickEvent(i)}
              />
            </div>
          </div>
          <div className='col-5'>
            <div className='history'>
              <div>{/* {history.join('')} */}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Main />, document.getElementById('calc'));
