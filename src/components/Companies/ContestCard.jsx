import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating, Transition} from 'semantic-ui-react';
import {goToPage} from '../../actions/UsersActions';
import {RENDER_PROJ,FULL_CONTEST} from '../../actions/constants';
import {connect } from 'react-redux';
import _ from 'lodash';

class ContestC extends Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <Card>
        <a onClick={()=>{this.props.goToPage(FULL_CONTEST)}}>
          <Image src="https://portal.ucol.mx/content/micrositios/188/image/Escudos%202017/UDC_2L_Abajo/01%20UdeC%202L%20872.png" />
        </a>
        <Card.Content>
          <Card.Header>
            <a onClick={()=>{this.props.goToPage(FULL_CONTEST)}}>
              UDC Financia tu Proyecto
            </a>
          </Card.Header>
          <Card.Meta>
           <span className='date'>
             14 Projects Registered
           </span>
         </Card.Meta>
          <Card.Description>
            UDC Financía tu proyecto o start-up
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            3 Evaluators
        </Card.Content>
      </Card>
    )
  }
}

let ContestCard = (ContestC);
ContestCard = connect(state=>({
	users: state.users
}),{goToPage})(ContestCard);

export default ContestCard;
