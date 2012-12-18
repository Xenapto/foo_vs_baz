var FooVsBaz = FooVsBaz || {};
FooVsBaz.pages = FooVsBaz.pages || {};
FooVsBaz.pages_show = FooVsBaz.pages_show || {};
FooVsBaz.pages_new = FooVsBaz.pages_new || {};
FooVsBaz.pages_edit = FooVsBaz.pages_edit || {};
FooVsBaz.pages_create = FooVsBaz.pages_create || {};
FooVsBaz.pages_update = FooVsBaz.pages_update || {};

FooVsBaz.pages_new.init =
  FooVsBaz.pages_new.init =
  FooVsBaz.pages_create.init =
  FooVsBaz.pages_update.init =
  function(){ FooVsBaz.pages.form_init(); }

FooVsBaz.pages.form_init = function(){
  $('#your_vote input').change(function(){
    $('#your_vote label').removeClass('active')
    $(this).closest('label').addClass('active')
  });
}

FooVsBaz.pages_show.init = function(){
  

  var width = 160,
      height = 160,
      radius = Math.min(width, height) / 2,
      color = ['#aaa','#555'],//d3.scale.category10(),
      arc = d3.svg.arc().outerRadius(radius),
      donut = d3.layout.pie(),
      data = [
        //{ key : 'foo', value : $('#foo_count').text(), color : 'blue' },
        //{ key : 'baz', value : $('#baz_count').text(), color : 'red'  }
        $('#baz_count').text(),$('#foo_count').text()
      ];//d3.range(10).map(Math.random).sort(d3.descending),

  console.log(data);
  var vis = d3.select("#graph_results .graph").append("svg")
      .data([data],function(d){console.log(d); return 'fuck';})
      .attr("width", width)
      .attr("height", height);

  var arcs = vis.selectAll("g.arc")
      .data(donut)
    .enter().append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  var paths = arcs.append("path")
      .attr("fill", function(d, i) { return color[i]; });

  paths.transition()
      .ease("bounce")
      .duration(2000)
      .attrTween("d", tweenPie);

  paths.transition()
      .ease("elastic")
      .delay(function(d, i) { return 2000 + i * 50; })
      .duration(750)
      .attrTween("d", tweenDonut);

  function tweenPie(b) {
    console.log("b = ")
    console.log(b);
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) {
      return arc(i(t));
    };
  }

  function tweenDonut(b) {
    b.innerRadius = radius * .6;
    var i = d3.interpolate({innerRadius: 0}, b);
    return function(t) {
      return arc(i(t));
    };
  }

}
