/* eslint-disable max-classes-per-file */
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
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-long-arrow-alt-left' />
        </button>
      );
    case 'C':
      return (
        <button
          type='button'
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
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-divide' />
        </button>
      );
    case 'times':
      return (
        <button
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-times' />
        </button>
      );
    case 'minus':
      return (
        <button
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-minus' />
        </button>
      );
    case '.':
      return (
        <button
          type='button'
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
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-equals' />
        </button>
      );
    case 'plus':
      return (
        <button
          type='button'
          className='btn btn-secondary w-100'
          value={props.value}
          onClick={props.onClick}
        >
          <i className='fas fa-plus' />
        </button>
      );

    default:
      console.log(`Sorry, we are out of ${props.value}.`);
      return <div />;
  }
}

function CalDiv(props) {
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
  renderSquare(i, cb) {
    if (typeof i === 'number') {
      return <Num value={i} onClick={cb} />;
    }
    return <Operator value={i} onClick={cb} />;
  }

  render() {
    return (
      <div>
        <div className='row mb-4'>
          <div className='col-6 text-center'>{this.renderSquare('back', () => this.props.onBack())}</div>
          <div className='col-6 text-center'>{this.renderSquare('C', () => this.props.onClear())}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(7, () => this.props.onNum(7))}</div>
          <div className='col-3 text-center'>{this.renderSquare(8, () => this.props.onNum(8))}</div>
          <div className='col-3 text-center'>{this.renderSquare(9, () => this.props.onNum(9))}</div>
          <div className='col-3 text-center'>{this.renderSquare('divide', () => this.props.onDivide())}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(4, () => this.props.onNum(4))}</div>
          <div className='col-3 text-center'>{this.renderSquare(5, () => this.props.onNum(5))}</div>
          <div className='col-3 text-center'>{this.renderSquare(6, () => this.props.onNum(6))}</div>
          <div className='col-3 text-center'>{this.renderSquare('times', () => this.props.onTimes())}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(1, () => this.props.onNum(1))}</div>
          <div className='col-3 text-center'>{this.renderSquare(2, () => this.props.onNum(2))}</div>
          <div className='col-3 text-center'>{this.renderSquare(3, () => this.props.onNum(3))}</div>
          <div className='col-3 text-center'>{this.renderSquare('minus', () => this.props.onMinus())}</div>
        </div>
        <div className='row mb-4'>
          <div className='col-3 text-center'>{this.renderSquare(0, () => this.props.onNum(0))}</div>
          <div className='col-3 text-center'>{this.renderSquare('.', () => this.props.onPoint())}</div>
          <div className='col-3 text-center'>{this.renderSquare('equals', () => this.props.onEquals())}</div>
          <div className='col-3 text-center'>{this.renderSquare('plus', () => this.props.onPlus())}</div>
        </div>
      </div>
    );
  }
}

function calc(h: any) {
  const [a, op, b] = h;
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
    };

    this.onNum = this.onNum.bind(this);
    this.onPoint = this.onPoint.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onPlus = this.onPlus.bind(this);
    this.onMinus = this.onMinus.bind(this);
    this.onTimes = this.onTimes.bind(this);
    this.onDivide = this.onDivide.bind(this);
    this.onEquals = this.onEquals.bind(this);
  }

  onNum(num) {
    let h = this.state.history.slice();
    if (typeof h[h.length - 1] === 'number') {
      h[h.length - 1] = h[h.length - 1] * 10 + num;
    } else if (h[h.length - 1].indexOf('.') > -1) {
      h[h.length - 1] = +`${h[h.length - 1]}${num}`;
    } else {
      h.push(num);
    }

    this.setState({
      history: h,
    });
  }

  onPoint() {
    let h = this.state.history.slice();

    if (h[h.length - 1].toString().indexOf('.') < 0) {
      h[h.length - 1] = `${h[h.length - 1]}.`;
    }

    this.setState({
      history: h,
    });
  }

  onBack() {
    let h = this.state.history.slice();

    h[h.length - 1] = Math.floor(h[h.length - 1] / 10);

    this.setState({
      history: h,
    });
  }

  onClear() {
    let h = this.state.history.slice();

    h = [0];

    this.setState({
      history: h,
    });
  }

  onPlus() {
    let h = this.state.history.slice();

    if (
      h.indexOf('+') > -1
      || h.indexOf('-') > -1
      || h.indexOf('*') > -1
      || h.indexOf('/') > -1
    ) {
      h = [calc(h)];
    }
    h[h.length] = '+';

    this.setState({
      history: h,
    });
  }

  onMinus() {
    let h = this.state.history.slice();

    if (
      h.indexOf('+') > -1
      || h.indexOf('-') > -1
      || h.indexOf('*') > -1
      || h.indexOf('/') > -1
    ) {
      h = [calc(h)];
    }
    h[h.length] = '-';

    this.setState({
      history: h,
    });
  }

  onTimes() {
    let h = this.state.history.slice();

    if (
      h.indexOf('+') > -1
      || h.indexOf('-') > -1
      || h.indexOf('*') > -1
      || h.indexOf('/') > -1
    ) {
      h = [calc(h)];
    }
    h[h.length] = '*';

    this.setState({
      history: h,
    });
  }

  onDivide() {
    let h = this.state.history.slice();

    if (
      h.indexOf('+') > -1
      || h.indexOf('-') > -1
      || h.indexOf('*') > -1
      || h.indexOf('/') > -1
    ) {
      h = [calc(h)];
    }
    h[h.length] = '/';

    this.setState({
      history: h,
    });
  }

  onEquals() {
    let h = this.state.history.slice();

    h = [calc(h)];

    this.setState({
      history: h,
    });
  }

  render() {
    const history = this.state.history;

    return (
      <div className='main-container'>
        <div className='row'>
          <div className='col-7'>
            <div className='row mb-4'>
              <CalDiv value={history} />
            </div>
            <div className='btns'>
              <Btns
                onNum={this.onNum}
                onPoint={this.onPoint}
                onBack={this.onBack}
                onClear={this.onClear}
                onPlus={this.onPlus}
                onMinus={this.onMinus}
                onTimes={this.onTimes}
                onDivide={this.onDivide}
                onEquals={this.onEquals}
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
