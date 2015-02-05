var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

// Non-Flux-related items
var CHANGE_EVENT = 'change';

var _dropboxFileList = {};
var _googleFileList = {};

// if we want to have a username, this is where it would go. this is not currently being used anywhere in our application
var _username = 'John';

//assign just adds the properties of the 2nd, 3rd, and larger arguments to the first object
//then returns the first object
var AppStore = assign({}, EventEmitter.prototype, {
  // adding methods to the EventEmitter
  logout: function() {
    //clears all data from our store on a logout
    _googleFileList = {};
    _dropboxFileList = {};
  },

  //return an object with all of the files
  getAll: function() {
    return {
      googleFileList: _googleFileList,
      dropboxFileList: _dropboxFileList
    };
  },

  getUsername: function() {
    return { username: _username };
  },

  updateFileLists: function(data) {
    _googleFileList = data.google;
    _dropboxFileList = data.dropbox;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
      // currently, CHANGE_EVENT is just a string ('change'), set on line 8
  },
  
  // This method allows components to register events with the Store -- and causes Store to execute the passed-in callback in response.
  //used by MainSection.js, where we send off new data to the store
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // register functions with dispatcher
  // assign it to an index (dispatcherIndex) in case one store has to wait for another store
  dispatcherIndex:AppDispatcher.register(function(payload){
    //we emit a change after each event after the switch statement
    //MainSection.js will be listening for these changes
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      // determine which method matches from AppConstants
      
      case AppConstants.UPDATE_FILE_LISTS:
        AppStore.updateFileLists(action.data);
        break;

      case AppConstants.LOGOUT:
        AppStore.logout();
        break;

    }

    AppStore.emitChange();
    //returning true says there are no errors. this is needed by promise in dispatcher
    return true;
  })

});

module.exports = AppStore;
