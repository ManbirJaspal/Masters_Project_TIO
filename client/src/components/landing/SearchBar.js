import React from 'react';

class SearchBar extends React.Component {
      state = {term: ''};


onInputChange = (event) =>  {
    this.setState({term: event.target.value});
}

onFormSubmit = (event) =>  {
    event.preventDefault();
    this.props.onFormSubmit(this.state.term);


}

    render(){
        return (
          <div className="ui container">
            <div className="search-bar ui segment">
              <form onSubmit={this.onFormSubmit} className="ui form">
                <div className="field">
                  <label>Group Search</label>
                  <input onChange={this.onInputChange} type="text" value={this.state.term} />
                </div>
              </form>
            </div>
            </div>

        );
    }
}

export default SearchBar;
