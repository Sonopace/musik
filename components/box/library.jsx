var React = require('react');
var Box = require('./index');
var __ = require('../../tools/translate');
var {List} = require('immutable');
module.exports = LibraryBox;
class LibraryBox extends Box {
    updateBoxFilter (e){
        this.props.setBoxFilter(e.target.value);
    }

    getFilterForm (){
        return (
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder={__('Search')}
                    value={this.props.filter}
                    onChange={this.updateBoxFilter.bind(this)}
                    />
            </form>
        )
    }

    render () {
        return this.wrap(
            this.getFilterForm(),
            this.props.tracks.map(track => track.get('title'))
        )
    }
}

LibraryBox.propTypes = {
    filter: React.PropTypes.string,
    setBoxFilter: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.instanceOf(List).isRequired
};