var poslist = {
  1:["300px","20px"],
  2:["20px","30px"],
  3:["30px","40px"],
  4:["40px","50px"],
  5:["50px","60px"],
  5:["60px","70px"],
  6:["70px","80px"],
  7:["80px","90px"],
  8:["90px","100px"],
  9:["100px","110px"],
  10:["110px","120px"],
  11:["120px","130px"],
}
var Runner = React.createClass({displayName: "Runner",
  render: function() {
    var divstyle= {
      position:"absolute",
      width:"60px",
      left: poslist[this.props.rid][0],
      top: poslist[this.props.rid][1]
    }
    return (
    React.createElement("div", {style: divstyle}, 
    React.createElement("img", {src: "runner.gif"})
    )
  )
  }
});
$( document ).ready(function() {
  console.log( "ready!" );
  for (var n = 1; n < 12; ++ n){
    $('#runners').append('<div id="runner' + n +'"/>')
    ReactDOM.render(
      React.createElement(Runner, {rid: n}),
      document.getElementById('runner' + n)
    )
  }
});
