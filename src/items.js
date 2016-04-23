var currentStaffIdx = 0
var currentItemIdx = 0
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
var updateItems = function(data){
  item = data[0]
  console.log(item)
  ReactDOM.render(
    <Item itemid={item.no} place={item.device} lastdatetime={item.lastdatetime}/>,
    document.getElementById(item.no)
  )
  setTimeout(searchNextItem, 1000);
}
var updateStaffs = function(data){
  staff = data[0]
  console.log(staff)
  ReactDOM.render(
    <Staff staffid={staff.no} place={staff.device} lastdatetime={staff.lastdatetime}/>,
    document.getElementById(staff.no)
  )
  setTimeout(searchNextStaff, 1000);
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
var ajaxcall = function(url, mycallback){
  console.log(url)
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: mycallback,
    success: function(data){
      console.log('success!!')
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus+": "+errorThrown);
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
  });
};
var updateCards = function(data){
  $.each(data, function(idx, card){
    if (card.no.startsWith("@")){
      $('#staffs').append('<div id="' + card.no + '" class="card"/>')
      ReactDOM.render(
        <Staff staffid={card.no} place="" lastdatetime=""/>,
        document.getElementById(card.no)
      )
    }
    if (card.no.startsWith("*")){
      $('#items').append('<div id="' + card.no + '" class="card"/>')
      ReactDOM.render(
        <Item itemid={card.no} place="" lastdatetime=""/>,
        document.getElementById(card.no)
      )
    }
  });
  setTimeout(searchNextStaff, 1000);
  setTimeout(searchNextItem, 1000);
  loadItems();
}
var searchNextItem = function(){
  console.log("search next item pos:" + currentItemIdx)
  var count = $('#items').children().length
  var cardid = $('#items').children()[currentItemIdx].id;
  var url = "http://reg.picard.jp/map.php?where=no&no=" + cardid;
  currentItemIdx++;
  if (currentItemIdx > count){
    currentItemIdx=0;
  }
  ajaxcall(url, 'updateItems')
}
var searchNextStaff = function(){
  console.log("search next staff pos:" + currentStaffIdx)
  var count = $('#staffs').children().length
  var cardid = $('#staffs').children()[currentStaffIdx].id;
  var url = "http://reg.picard.jp/map.php?where=no&no=" + cardid;
  currentStaffIdx++;
  if (currentStaffIdx > count){
    currentStaffIdx=0;
  }
  ajaxcall(url, 'updateStaffs')
}
$( document ).ready(function() {
  console.log( "ready!" );
  loadAllItems();
});
