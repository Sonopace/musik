var constants = require('./constants');
var actions = {
    [constants.CURRENT_MAIN_NAVIGATION_ITEM_CHANGED]: 'setCurrentMainNavigationItem',
    [constants.BOX_FILTER_UPDATED]: 'setBoxFilter',
    [constants.PLAYLIST_CREATED]: 'appendPlaylist',
    [constants.CURRENT_PLAYLIST_CHANGED]: 'setCurrentPlaylist'
};
var {List, Map} = require('immutable');
module.exports = class Store {
    createProperty (capitalizedName){
        var value;
        this['get' + capitalizedName] = () => value;
        this['set' + capitalizedName] = function(newVal){
            value = newVal;
            this.getOnUpdateListener()();
        }
    }

    constructor(){
        ['OnUpdateListener', 'CurrentMainNavigationItem', 'BoxFilter', 'Libraries', 'Playlists', 'CurrentPlaylist'].forEach(this.createProperty.bind(this));
        this.setOnUpdateListener(function(){});
        this.setCurrentMainNavigationItem('search');
        this.setLibraries(List());
        this.setPlaylists(List());
    }

    appendPlaylist(playlist){
        this.setPlaylists(this.getPlaylists().push(playlist));
        this.setCurrentPlaylist(this.getPlaylists().size - 1);
    }

    process(action, payload){
        if('undefined' != typeof actions[action]){
            this[actions[action]](payload);
        } else {
            console.warn(`No handler for the ${action} action`);
        }
    }
};