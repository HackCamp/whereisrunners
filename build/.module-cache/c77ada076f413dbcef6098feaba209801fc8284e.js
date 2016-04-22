var poslist = {
  1:["565px","470px"],
  2:["718px","317px"],
  3:["840px","370px"],
  4:["910px","200px"],
  5:["694px","105px"],
  6:["518px","308px"],
  7:["365px","445px"],
  8:["90px","100px"],
  9:["100px","110px"],
  10:["110px","120px"],
  11:["120px","130px"],
}
var Runner = React.createClass({displayName: "Runner",
  render: function() {
    var divstyle= {
      position:"absolute",
      left: poslist[this.props.rid][0],
      top: poslist[this.props.rid][1]
    }
    return (
    React.createElement("div", {style: divstyle, className: "runner"}, 
      React.createElement("img", {className: "runnerimg", src: "runner.gif"}), 
      React.createElement("div", {className: "number"})
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
