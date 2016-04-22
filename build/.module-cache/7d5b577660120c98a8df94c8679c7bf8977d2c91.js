var Runner = React.createClass({displayName: "Runner",
  render: function() {
    var divstyle= {
      position:"absolute",
      left: this.props.posleft,
      top: this.props.postop
    }
    return React.createElement("div", {style: divstyle}, "runner!");
  }
});
$( document ).ready(function() {
    console.log( "ready!" );
    ReactDOM.render(
      React.createElement(Runner, {posleft: "10px", postop: "20px"}),
      document.getElementById('runner1')
    )
});
