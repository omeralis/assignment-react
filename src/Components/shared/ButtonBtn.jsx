import PropTypes from 'prop-types';


const ButtonBtn = ({text ,onClick }) => {
  return  <button
  onClick={onClick}
  className='btn'>{text} </button>

}
ButtonBtn.prototype={
    text:PropTypes.string,
    onClick:PropTypes.func,
}
export default ButtonBtn;