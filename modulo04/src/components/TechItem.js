import React from 'react'; 
import propTypes from 'prop-types'

function TechItem({ tech, onDelete }){
  return (
    <li>{ tech }
      <button type="button" onClick={onDelete}> X </button>
    </li>
  );
}

TechItem.defaultProps = {
  tech: 'oculto'
}

TechItem.propTypes = {
  tech: propTypes.string, 
  onDelete: propTypes.func.isRequired,
}
export default TechItem;