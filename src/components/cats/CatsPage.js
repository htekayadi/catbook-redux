import CatList from './CatList';

class CatsPage extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <h1>Cats</h1>
        <div className="col-md-4">
          <CatList cats="{this.props.cats" />
        </div>
      </div>
    );
  }
}