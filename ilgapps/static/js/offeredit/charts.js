var Charts = function () {

    return {
        //main function to initiate the module

        init: function () {

            App.addResponsiveHandler(function () {
                 Charts.initCharts();
            });

        },

        initCharts: function () {

            if (!jQuery.plot) {
                return;
            }

            var data = [];
            var totalPoints = 250;
            data_visitors=[];
            data_samp={};
            // random data generator for plot charts

            function getRandomData() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 2 - 5;
                    if (y < 0) y = 0;
                    if (y > 100) y = 100;
                    data.push(y);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
                return res;
            }

            //Interactive Chart

            function chart2() {
                function randValue() {
                    return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
                }
                var visitors =data_visitors;

                var plot = $.plot($("#chart_2"), [
                          {
                            data: visitors,
                            label: "订单统计"
                        }
                    ], {
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 2,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                            opacity: 0.05
                                        }, {
                                            opacity: 0.01
                                        }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"],
                        xaxis: {
                            ticks: [
                                    [1, data_samp["1"]['date']], [2, data_samp["2"]['date']],
                                    [3, data_samp["3"]['date']], [4, data_samp["4"]['date']],
                                    [5, data_samp["5"]['date']], [6, data_samp["6"]['date']], [7, data_samp["7"]['date']]
                            ]
                        },
                        yaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        }
                    });


                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                            position: 'absolute',
                            display: 'none',
                            top: y + 15,
                            left: x + 15,
                            border: '1px solid #333',
                            padding: '4px',
                            color: '#fff',
                            'border-radius': '3px',
                            'background-color': '#333',
                            opacity: 0.80
                        }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $("#chart_2").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(0),
                                y = item.datapoint[1].toFixed(0);

                            // showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                            x_syr = x+"";
                            showTooltip(item.pageX, item.pageY, item.series.label + " 日期： " + data_samp[x_syr]['date'] + "：订单金额： " + data_samp[x_syr]['amount']);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            }


            function getOrderStatic() {
                params={}
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/offer/api/getOrderStatic/",
                    "data": params,
                    "success": function (data) {
                       data_visitors = data.data['d_list'];
                       data_samp = data.data;
                       chart2();

                    },
                    "error": function (xhr, status, error) {
                        alert("数据导出出错！");
                    }
                });
            }

            getOrderStatic();



        },

        
    };

}();