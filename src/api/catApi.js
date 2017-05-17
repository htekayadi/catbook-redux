class CatApi {
  static getAllCats() {
    return fetch('http://localhost:5000/api/v1/cats').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateCat(cat) {
    const request = new Request('http://localhost:5000/api/v1/cats/${cat.id}', {
      method: 'PUT',
      headers: new Headers({
        'Content-Type' : 'application/json'
      }),
      body: JSON.stringify({cat: cat})
    });
  }

  static deleteCat(cat) {
    const request = new Request('http://localhost:5000/api/v1/cats/${cat.id}', {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default CatApi;