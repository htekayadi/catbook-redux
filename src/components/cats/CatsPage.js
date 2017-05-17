import CatList from './CatList';

class CatsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const cat = this.props.cats;
    return (
      <div className="col-md-12">
        <h1>Cats
          <Link to={'/cats/new'} className="btn btn-primary">
            + cat
          </Link>
        </h1>
        <div className="col-md-4">
          <CatList cats={cats} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}