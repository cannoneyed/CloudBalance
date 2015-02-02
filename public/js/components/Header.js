/*** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/appStore');
var AppActions = require('../actions/appActions');
// var TodoTextInput = require('./TodoTextInput.react');


// FIXME: I want to set the state with the AppStore, but using objects in its return statement is both required and is causing errors...
// var getUsername = function() {
  // return {
    // username: AppStore.getUsername()
  // };
// };


var Header = React.createClass({

  // getInitialState: function() {
  //   return AppStore.getUsername();
  // },

  statics: {
    logoutClick: function() {
      console.log('heard a logout click');
      window.sessionStorage.removeItem('driveToken');
      window.sessionStorage.removeItem('dropboxToken');
      window.location.reload();
    }
    
    
  },


  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <div id="banner-img"></div>
        <h1 id="title-header">CloudBalance</h1>
        <h3 id="logout-header" onClick={Header.logoutClick}>Logout</h3>
        <h3 id="username-header">marcus</h3>
      </header>
    );
  }


});

    // This is breaking it right now:
    // <h2>{this.state.username}</h2>

module.exports = Header;
