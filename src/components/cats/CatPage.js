class CatPage extends React.Component {
  render() {

  }
}

CatPage.propTypes = {
  cats: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    cats: state.cats
  };
}

export default connect(mapStateToProps)(CatPage);