import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import Input from 'components/Input';
import InfoMessage from 'components/InfoMessage';
import Button from 'components/Button';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    setTextToCrypt: PropTypes.func,
    hideOutputArea: PropTypes.func,
    changeMode: PropTypes.func,
    changeTextMode: PropTypes.func,
    decodeMode: PropTypes.bool,
    textMode: PropTypes.bool,
  };


  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Введите текст для шифрования',
      },
      text: '',
      shakeInfo: false,
      encrypt: false,
      decodeMode: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.decodeMode) {
      this.setState({
        info: {
          type: 'info',
          text: 'Введите текст для дешифрования',
        },
      });
    } else {
      this.setState({
        info: {
          type: 'info',
          text: 'Введите текст для шифрования',
        },
      });
    }
  }

  textChange = (e) => {
    if (e.target.value.length === 0) {
      this.props.hideOutputArea();
    }
    this.setState({
      text: e.target.value,
    });
  }


  encodeText = () => {
    return false;
  }


  render() {
    const getContent = interpolated => (
      <div className={cx('input-area', {
        'input-area_top': this.state.text.length > 0,
      })}>
        <div
          className='input-area__content'
          style={Object.assign({}, {transform: `scale(${interpolated.scale})`})}
        >
          <form
            className='input-area__form'
            onSubmit={this.props.setTextToCrypt}
          >
            <InfoMessage
              className='input-area__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <Input
              className={cx('input-area__input', {
                'input_type_error': this.state.showEmailError,
              })}
              value={this.state.text}
              name='text'
              placeholder={this.props.textMode ? 'Text(e.g. hello)' : 'Text(e.g. 1201-12312-31231)'}
              pattern={this.props.textMode ? '^[a-zA-Z\s]+$' : '^([0-9]+-)+[0-9]+$'}
              onChange={this.textChange}
            />
            <div
              className={cx('input-area__type-button', {
                'input-area__type-button_decode': this.props.decodeMode,
              })}
              onClick={this.props.changeMode}
            ></div>
            <div
              className={cx('input-area__input-type-button', {
                'input-area__input-type-button_text': this.props.textMode,
              })}
              onClick={this.props.changeTextMode}
            >Aa</div>
            <Button
              className='input-area__submit-button'
              type='submit'
              inProgress={this.state.inProgress}
            >{this.state.inProgress ? 'Saving' : (this.props.decodeMode ? 'Decode' : 'Code')}</Button>
          </form>
        </div>
      </div>
    );

    return (
      <Motion
        defaultStyle={{scale: spring(0)}}
        style={{scale: spring(1, [120, 11])}}
      >
       {interpolated => getContent(interpolated)}
      </Motion>
    );
  }
}
