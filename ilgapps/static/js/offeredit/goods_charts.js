var goodsCharts = function () {

    return {
        //main function to initiate the module

        init: function () {

            App.addResponsiveHandler(function () {
                 goodsCharts.initCharts();
            });

        },

        initCharts: function () {

            if (!jQuery.plot) {
                return;
            }
            data_samp=[];
            data_num = 0;
            num_1 = 0;



            //Interactive Chart

            function chart5() {

                var d1 = [];
                var d2 = [];
                if (data_num<10){
                    for (var i = 1; i <= data_num; i += 1)
                    {
                        d1.push([i, data_samp[i-1].c]);
                        d2.push([i, data_samp[i-1].goods_name]);
                    }

                }else{
                    for (var i = 1; i <= num_1; i += 1)
                    {
                        d1.push([i, data_samp[i-1].c]);
                        d2.push([i, data_samp[i-1].goods_name]);

                    }


                }

                var stack = 0,
                    bars = true,
                    lines = false,
                    steps = false;

                function plotWithOptions() {
                    $.plot($("#chart_5"), [d1], {
                            series: {
                                stack: stack,
                                lines: {
                                    show: lines,
                                    fill: true,
                                    steps: steps
                                },
                                bars: {
                                    show: bars,
                                    barWidth: 0.6
                                }
                            },
                            xaxis: {
                                ticks:d2
                            }
                        });
                }

                $(".stackControls input").click(function (e) {
                    e.preventDefault();
                    stack = $(this).val() == "With stacking" ? true : null;
                    plotWithOptions();
                });
                $(".graphControls input").click(function (e) {
                    e.preventDefault();
                    bars = $(this).val().indexOf("Bars") != -1;
                    lines = $(this).val().indexOf("Lines") != -1;
                    steps = $(this).val().indexOf("steps") != -1;
                    plotWithOptions();
                });

                plotWithOptions();
            }

            function chart6() {
                var d1 = [];
                var d2 = []
                if (data_num<20){
                    for (var i = num_1+1; i <= data_num; i += 1)
                    {
                        d1.push([i, data_samp[i-1].c]);
                        d2.push([i, data_samp[i-1].goods_name]);
                    }

                }else{
                    for (var i = 11; i <= 20; i += 1)
                    {
                        d1.push([i, data_samp[i-1].c]);
                        d2.push([i, data_samp[i-1].goods_name]);

                    }


                }

                var stack = 0,
                    bars = true,
                    lines = false,
                    steps = false;

                function plotWithOptions1() {
                    $.plot($("#chart_6"), [d1], {
                            series: {
                                stack: stack,
                                lines: {
                                    show: lines,
                                    fill: true,
                                    steps: steps
                                },
                                bars: {
                                    show: bars,
                                    barWidth: 0.6
                                }
                            },
                            xaxis: {
                                ticks:d2
                            }
                        });
                }

                $(".stackControls input").click(function (e) {
                    e.preventDefault();
                    stack = $(this).val() == "With stacking" ? true : null;
                    plotWithOptions1();
                });
                $(".graphControls input").click(function (e) {
                    e.preventDefault();
                    bars = $(this).val().indexOf("Bars") != -1;
                    lines = $(this).val().indexOf("Lines") != -1;
                    steps = $(this).val().indexOf("steps") != -1;
                    plotWithOptions1();
                });

                plotWithOptions1();
            }


            function getOrderStatic() {
                params={}
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/offer/api/getGoodsStatic/",
                    "data": params,
                    "success": function (data) {
                       data_samp = data.data;

                       data_num= data_samp.length;
                       num_1 =parseInt(data_num/2);
                       chart5();
                       if(data_num>10){
                           chart6();
                       }

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