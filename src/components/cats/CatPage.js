class CatPage extends React.Component {
  render() {

  }
}

CatPage.propTypes = {
  cats: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  let cat = {name: '', breed: '', weight: '', temperament:'', hobby_ids: []};
  const catId = ownProps.params.id;
  if(state.cats.length > 0) {
    cat = Object.assign({}, state.cats.find(cat => cat.id == id))
  }
  return {cat: cat};
}

export default connect(mapStateToProps)(CatPage);

