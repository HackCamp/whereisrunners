var staffs = [
  "#-リーダー-上野まどか",
  "#-リーダー-熊谷寿博（迫リコー）",
  "#-リーダー-沼倉貴記（迫リコー）",
  "#-リーダー-堀野（ヤフー）",
  "#-リーダー-佐々木忠二（迫リコー）",
  "#-リーダー-遠藤 修（迫リコー）",
  "#-リーダー-北浦洋明（迫リコー）",
  "#-リーダー-北浦洋明（迫リコー）",
  "#-リーダー-北浦洋明（迫リコー）",
  "#-リーダー-佐々木 隆（迫リコー）",
  "#-リーダー-海老名（ヤフー）",
  "#-リーダー-武井（ヤフー）",
  "#-リーダー-調整中",
  "#-リーダー-須永（＋犬飼）（ヤフー）",
  "#-リーダー-横井（東北電力）",
  "#-リーダー-山田賢太郎（ヤフー）",
  "#-サポート-佐藤真司",
  "#-サポート-上山達也",
  "#-エイド統括-田中直史",
  "#-マネージャー-石田幸央（ヤフー）",
  "#-マネージャー-山田あきえ（ヤフー）",
  "#-マネージャー-沼田瑞木（ヤフー）",
  "#-マネージャー-鈴木哲也（ヤフー）",
  "#-マネージャー-竹川隆",
  "#-マネージャー-千田さん"
]
var items = [
  "*荷物1",
  "*荷物2",
  "*荷物3",
  "*荷物4",
  "*荷物5",
  "*荷物6",
  "*荷物7",
  "*荷物8",
  "*荷物9",
  "*荷物10"
]
var Staff = React.createClass({displayName: "Staff",
  render: function() {
    return (
    React.createElement("div", {className: "staff", id: this.props.staffid}, 
      React.createElement("div", {className: "staffid"}, this.props.staffid), 
      React.createElement("div", {className: "place"}, this.props.place), 
      React.createElement("div", {className: "time"}, this.props.lastdatetime)
    )
  )
  }
});
var Item = React.createClass({displayName: "Item",
  render: function() {
    return (
    React.createElement("div", {className: "item", id: this.props.itemid}, 
      React.createElement("div", {className: "itemid"}, this.props.itemid), 
      React.createElement("div", {className: "place"}, this.props.place), 
      React.createElement("div", {className: "time"}, this.props.lastdatetime)
    )
  )
  }
});
var updateStaffs = function(data){
  console.log(data)
  staff = data[0]
  ReactDOM.render(
    React.createElement(Staff, {staffid: staff.no, place: staff.device, time: staff.lastdatetime}),
    document.getElementById(staff.no)
  )
}
var loadAllItems = function(){
  $.ajax({
    url: 'http://reg.picard.jp/map.php?where=all',
    dataType: 'jsonp',
    jsonpCallback: 'updateCards',
    success: function(data){
      console.log('success!')
      //setTimeout(loadData,30 * 1000); // 30 seconds
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus+": "+errorThrown);
      //setTimeout(loadData(cardid),30 * 1000); // 30 seconds
    },
    beforeSend: function(xhr) {
      var credentials = $.base64.encode("ppc:hackcamp");
      xhr.setRequestHeader("Authorization", "Basic " + credentials);
    },
  });
};
var ajaxcall = function(url, callback){
  console.log(url)
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: callback,
    success: function(data){
      console.log('success!')
      callback(data)
      //setTimeout(loadData,30 * 1000); // 30 seconds
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus+": "+errorThrown);
      //setTimeout(loadData(cardid),30 * 1000); // 30 seconds
    },
    beforeSend: function(xhr) {
      var credentials = $.base64.encode("ppc:hackcamp");
      xhr.setRequestHeader("Authorization", "Basic " + credentials);
    },
  });
}
var loadItems = function(){
  $("#items").children().each(function(idx,dom){
    var cardid = $(dom).first().attr('id')
    var url = "http://reg.picard.jp/map.php?where=no&no=" + cardid;
    ajaxcall(url, 'updateItems')
  });
};
var loadStaffs = function(){
  $("#staffs").children().each(function(idx,dom){
    var cardid = $(dom).first().attr('id')
    var url = "http://reg.picard.jp/map.php?where=no&no=" + cardid;
    ajaxcall(url, 'updateStaffs')
  });
};
var updateCards = function(data){
  $.each(data, function(idx, card){
    if (card.no.startsWith("#")){
      $('#staffs').append('<div id="' + card.no + '" class="card"/>')
      ReactDOM.render(
        React.createElement(Staff, {staffid: card.no, place: "", lastdatetime: ""}),
        document.getElementById(card.no)
      )
    }
    if (card.no.startsWith("*")){
      $('#items').append('<div id="' + card.no + '" class="card"/>')
      ReactDOM.render(
        React.createElement(Item, {itemid: card.no, place: "", lastdatetime: ""}),
        document.getElementById(card.no)
      )
    }
  });
  loadStaffs();
  loadItems();
}
$( document ).ready(function() {
  console.log( "ready!" );
  loadAllItems();
});
