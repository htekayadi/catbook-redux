import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as catActions from '../../actions/catActions';
import HobbyList from '../hobbies/HobbyList';

class CatPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      cat: this.props.cat,
      catHobbies: this.props.catHobbies,
      checkBoxHobbies: this.props.checkBoxHobbies
    };
    this.updateCatState = this.updateCatState.bind(this);
    this.updateCatHobbies = this.updateCatHobbies.bind(this);
    this.saveCat = this.saveCat.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.cat.id != nextPRops.cat.id) {
      this.setState({cat: nextProps.cat});
    }
    if(this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
      this.setState({catHobbies: nextPRops.catHobbies, checkBoxHobbies: nextProps.checkBoxHobbies});
    }
  }

  updateCatState() {
    const field = event.target.name;
    const cat = this.state.cat;
    cat[field] = event.target.value;
    return this.setState({cat: cat});
  }

  updateCatHobbies(event) {
    const cat = this.state.cat;
    const hobbyId = event.target.value;
    const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0];
    const checked = !hobby.checked;
    hobby['checked'] = !hobby.checked;
    if(checked) {
      cat.hobby_ids.push(hobby.id);
    } else {
      cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id));
    }
    this.setState({cat: cat});
  }

  saveCat(event) {
    event.preventDefault();
    this.props.actions.updateCat(this.state.cat);
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  render() {
    if(this.state.isEditing) {
      return(
        <div>
          <h1>edit cat</h1>
        </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.props.cat.name}</h1>
        <p>breed: {this.props.cat.breed}</p>
        <p>weight: {this.props.cat.weight}</p>
        <p>temperament: {this.props.cat.temperament}</p>
        <HobbyList hobbies={this.props.catHobbies} />
      </div>
    );
  }
}

CatPage.propTypes = {
  cat: PropTypes.object.isRequired,
  cats: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function collectCatHobbies(hobbies, cat) {
  let selected = hobbies.map(hobby => {
    if(cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length >0) {
      return hobby
    }
  })
}

function hobbiesForCheckBoxes(hobbies, cat=null) {
  return hobbies.map(hobby => {
    if(cat && cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length) {
      hobby['checked'] = true;
    } else {
      hobby['checked'] = false;
    }
    return hobby;
  });
}

function getCatById(cats, id) {
  let cat = cats.find(cat => cat.id == id);
  return Object.assign({}, cat);
}

function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies);
  const catId = ownProps.params.id;
  let checkBoxHobbies = [];
  let catHobbies = []
  let cat = {name: '', breed: '', weight: '', temperament:'', hobby_ids: []};

  if(state.cats.length > 0 && state.hobbies.length > 0) {
    cat = getCatById(state.cats, ownProps.params.id);
    if(cat.hobby_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, cat);
      catHobbies = collectCatHobbies(stateHobbies, cat)
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies);
    }
  }
  return {cat: cat, checkBoxHobbies: checkBoxHobbies, catHobbies: catHobbies};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(catActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatPage);

