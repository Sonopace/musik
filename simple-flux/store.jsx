var constants = require('./constants');
module.exports = class Store {
    constructor(){
        var onUpdateListener = function(){};
        this.setOnUpdateListener = function(listener){
            onUpdateListener = listener;
            listener();
        };

        var currentMainNavigationItem = "search";
        this.getCurrentMainNavigationItem = () => currentMainNavigationItem;
        this.setCurrentMainNavigationIItem = function(newVal){
            currentMainNavigationItem = newVal;
            onUpdateListener();
        };
    }

    process(action, payload){
        switch(action){
            case constants.CURRENT_MAIN_NAVIGATION_ITEM_CHANGED:
                this.setCurrentMainNavigationIItem(payload);
                break;
        }
    }
};