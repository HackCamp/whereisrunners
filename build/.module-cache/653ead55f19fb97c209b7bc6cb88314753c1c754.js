var Runner = React.createClass({displayName: "Runner",
  render: function() {
    var divstyle= {
      left: this.props.posleft,
      top: this.props.postop
    }
    return React.createElement("div", {style: divstyle}, "runner!");
  }
});
$( document ).ready(function() {
    console.log( "ready!" );
    ReactDOM.render(React.createElement(Runner, {posleft: "10", postop: "20"}), $("runner1"))
});
