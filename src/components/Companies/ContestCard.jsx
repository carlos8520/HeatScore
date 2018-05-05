import React, { Component, PropTypes } from 'react';
import {Card, Icon, Image, Grid, Rating, Transition} from 'semantic-ui-react';
import { goToPage} from '../../actions/UsersActions';
import { selectContest} from '../../actions/CompanyActions';
import {RENDER_PROJ,FULL_CONTEST} from '../../actions/constants';
import {connect } from 'react-redux';
import _ from 'lodash';

class ContestC extends Component{
  constructor(props){
    super(props);

  }

  handleSelected(){
    this.props.goToPage(FULL_CONTEST); 
    this.props.selectContest(this.props.contest);
  }

  render(){
    return(
      <Card>
        <a onClick={()=>{this.handleSelected()}}>
          <Image src="https://portal.ucol.mx/content/micrositios/188/image/Escudos%202017/UDC_2L_Abajo/01%20UdeC%202L%20872.png" />
        </a>
        <Card.Content>
          <Card.Header>
            <a onClick={ ()=>{this.handleSelected()}}>
              {this.props.contest.title}
            </a>
          </Card.Header>
          <Card.Meta>
           <span className='date'>
             14 Projects Registered
           </span>
         </Card.Meta>
          <Card.Description>
            {this.props.contest.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            Evaluadores!
        </Card.Content>
      </Card>
    )
  }
}

let ContestCard = (ContestC);
ContestCard = connect(state=>({
	users: state.users
}), { goToPage, selectContest})(ContestCard);

export default ContestCard;
