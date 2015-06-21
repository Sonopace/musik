var React = require('react');
var Box = require('./index');
var __ = require('../../tools/translate');
module.exports = class extends Box {
    render() {
        return this.wrap(
            <form className="form-inline">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder={__('Search')}/>
                </div>
            </form>
        )
    }
};