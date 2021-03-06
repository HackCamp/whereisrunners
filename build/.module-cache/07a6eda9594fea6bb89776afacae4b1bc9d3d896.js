var poslist = {
  1:["565px","470px"],
  2:["718px","317px"],
  3:["840px","370px"],
  4:["910px","200px"],
  5:["694px","105px"],
  6:["518px","308px"],
  7:["365px","445px"],
  8:["112px","478px"],
  9:["246px","610px"],
  10:["415px","680px"],
  11:["494px","519px"],
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
    $("#runner" + n + " .number").html("0");
  }
  $.ajax({
    url: "http://reg.picard.jp/map.php?where=groupbypos",
    dataType: 'jsonp',
    jsonpCallback: 'updatenumbers',
    success: function(data){console.log(data);},
    error: function(jqXHR, textStatus, errorThrown){
      alert(textStatus+": "+errorThrown);
    },
    beforeSend: function(xhr) {
      var credentials = $.base64.encode("ppc:hackcamp");
      xhr.setRequestHeader("Authorization", "Basic " + credentials);
    },
  });
});
