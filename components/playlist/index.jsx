var React = require('react');
var PureRenderComponent = require('../pure-render-component');
var __ = require('../../tools/translate');
var Immutable = require('immutable');
var {List} = Immutable;
var Track = require('./track');
require('./style');
module.exports = Playlist;
class Playlist extends PureRenderComponent {
    onDragOver (e){
        e.preventDefault();
    }

    append (e){
        e.preventDefault();
        var newTracks = Immutable.fromJS(JSON.parse(e.dataTransfer.getData('text')));
        this.props.updatePlaylistTracks(this.props.tracks.concat(newTracks));
    }

    getHint (){
        return (
            <div className="music-empty-playlist-hint" onDrop={this.append.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <img src="assets/empty-playlist-hint.svg" width="640" height="300"/>
                <strong>{__('Drag your music here')}</strong>
            </div>
        )
    }

    getTracks () {
        return (
            <table className="table" onDrop={this.append.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <thead>
                    <tr>
                        <th>{__('Track')}</th>
                        <th>{__('Title')}</th>
                        <th>{__('Artist')}</th>
                        <th>{__('Album')}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tracks.map((track, index) => (
                        <Track key={index} track={track} setCurrentTrack={this.props.setCurrentTrack}/>
                    ))}
                </tbody>
            </table>
        )
    }

    render (){
        return this.props.tracks.isEmpty() ? this.getHint() : this.getTracks();
    }
}
Playlist.propTypes = {
    tracks: React.PropTypes.instanceOf(List).isRequired,
    updatePlaylistTracks: React.PropTypes.func.isRequired,
    setCurrentTrack: React.PropTypes.func.isRequired
};