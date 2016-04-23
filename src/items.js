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
var Staff = React.createClass({
  render: function() {
    return (
    <div className="staff" id={this.props.staffid}>
      <div className="staffid">{this.props.staffid}</div>
      <div className="place">{this.props.place}</div>
      <div className="time">{this.props.lastdatetime}</div>
    </div>
  )
  }
});
var Item = React.createClass({
  render: function() {
    return (
    <div className="item" id={this.props.itemid}>
      <div className="itemid">{this.props.itemid}</div>
      <div className="place">{this.props.place}</div>
      <div className="time">{this.props.lastdatetime}</div>
    </div>
  )
  }
});
var updateStaffs = function(data){
  console.log(data)
  var data = {"no":"\u30b9\u30bf\u30c3\u30d5\uff13","lastdatetime":"2016-04-11 08:24:28","device":"\u30c6\u30b9\u30c8"}
  ReactDOM.render(
    <Staff staffid={data.no} place="" time={data.lastdatetime}/>,
    document.getElementById(data.no)
  )
  console.log(data)

}
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
var loadStaffs = function(){
  $("#staffs").children().each(function(idx,dom){
    var cardid = $(dom).first().attr('id')
    var url = "http://reg.picard.jp/map.php?no=" + cardid;
    ajaxcall(url, updateStaffs)
  });
};
$( document ).ready(function() {
  console.log( "ready!" );
  $.each(staffs, function(idx, data){
    $('#staffs').append('<div id="staff' + idx + '"/>')
    ReactDOM.render(
      <Staff staffid={data} place="A01" lastdatetime="2016-04-11 08:24:28"/>,
      document.getElementById('staff' + idx)
    )
  });
  $.each(items, function(idx, data){
    $('#items').append('<div id="item' + idx + '"/>')
    ReactDOM.render(
      <Item itemid={data} place="A01" lastdatetime="2016-04-11 08:24:28"/>,
      document.getElementById('item' + idx)
    )
  });
  loadStaffs();
  loadItems();
});
