coldWeb.controller('report', function ($scope, $location,$stateParams,$timeout,$http) {
	$scope.time = $stateParams.time;
	$scope.item = $stateParams.item;
	$scope.begin = new Date().toISOString().replace("T"," ").replace(/\..*/g,'');
	$scope.end = new Date(new Date().getTime() - 7 *24*60*60*1000).toISOString().replace("T"," ").replace(/\..*/g,'');
	$scope.picktime = $scope.begin + ' - ' + $scope.end;
	$scope.isEnergy = false;
	if ($scope.item == 'energy'){
		$scope.isEnergy = true;
	} else {
		$scope.isEnergy = false;
	}
	
	$scope.search4report = function(){
		
	}
	
	$scope.chageItem = function(item,time){
		$scope.item = item;
		$scope.time = time;
		if($scope.item == 'total'){
			$timeout(function() {
	           $scope.drawbount();
	         }, 0)
		}else if($scope.item == 'data'){
			$timeout(function(){
				$scope.drawDataLine();
			}, 0);
		}
	}
	
	$scope.search = function(){
		bothTime = $scope.picktime.split(" - ");
		$scope.begin = bothTime[0];
		$scope.end = bothTime[1];
		$scope.drawDataLine();
	}
	
	$scope.drawDataLine = function(){
		var lineChart = echarts.init($('#data-chart')[0]);
		xData = [1,2,3,4]
		data = [34,35,34,21]
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    calculable : true,
			    legend: {
			        data:['数据']
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : xData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : '数据',
			            axisLabel : {
			                formatter: '{value}'
			            }
			        }
			    ],
			    series : [

			        {
			            name:'数据',
			            type:'line',
			            data:data
			        }
			    ]
			};
		lineChart.setOption(option);
	}

	$scope.drawline = function(){
		var lineChart = echarts.init($('#line-chart')[0]);
		if($scope.time == 'daily'){
			xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30];
			totalEnergy1 = [718.5763638504435, 509.64048108025486, 873.2805245034152, 950.3769567105294, 847.1398362745539, 220.35518344860492, 192.35056230054215, 91.93543678171146, 503.83831938980114, 458.17544128782583, 367.8010720595164, 499.14927728554824, 565.7305342834112, 173.30339198261387, 817.3400544082863, 829.9232492986789, 439.47224755136347, 915.9665932182946, 927.1541835468956, 875.7906796929151, 680.104676630516, 886.8016727297473, 249.0764178106478, 734.5018224883057, 198.04800079148922, 59.478828631905095, 544.447890936104, 252.69574971963826, 716.1155282666341, 592.5369825373493];
			totalEnergy2 = [773.4456968754961, 550.7376386752832, 877.1714413084054, 1008.0184918508053, 943.5260087012891, 232.7165094501508, 289.9809960932834, 112.90676618086985, 569.6184527170907, 483.2990196374688, 456.4694899223377, 515.0036635831193, 615.3782585561406, 180.81219022142906, 817.6627779699658, 890.2368622477675, 459.3240447254968, 921.8793228654085, 991.5477569562385, 928.7299041862572, 686.3211978760648, 896.3365343084234, 262.11847719875163, 784.4582179695878, 243.27276651226322, 59.478828631905095, 611.7789662295157, 331.9600595359179, 788.4280152110665, 690.9585959370196];
		}else if($scope.time == 'monthly'){
			xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
			totalEnergy1 = [718.5763638504435, 509.64048108025486, 873.2805245034152, 950.3769567105294, 847.1398362745539, 190.35518344860492, 192.35056230054215, 91.93543678171146, 503.83831938980114, 458.17544128782583, 367.8010720595164];
			totalEnergy2 = [773.4456968754961, 550.7376386752832, 877.1714413084054, 1008.0184918508053, 943.5260087012891, 232.7165094501508, 289.9809960932834, 112.90676618086985, 569.6184527170907, 483.2990196374688, 456.4694899223377];
		}
		compare1 = [0];
		compare2 = [(totalEnergy2[0]-totalEnergy1[0]) / totalEnergy1[0] * 100];
		for(i=1;i<totalEnergy1.length;i++){
			compare1.push((totalEnergy1[i]-totalEnergy1[i-1]) / totalEnergy1[i] * 100);
			compare2.push((totalEnergy2[i]-totalEnergy1[i]) / totalEnergy1[i] * 100);
		}
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    calculable : true,
			    legend: {
			        data:['总耗能','同比','环比']
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : xData
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : '耗能',
			            axisLabel : {
			                formatter: '{value} kw'
			            }
			        },
			        {
			            type : 'value',
			            name : '比例',
			            axisLabel : {
			                formatter: '{value} %'
			            }
			        }
			    ],
			    series : [

			        {
			            name:'总耗能',
			            type:'bar',
			            data:totalEnergy1
			        },
			        {
			            name:'同比',
			            type:'line',
			            yAxisIndex: 1,
			            data:compare2
			        },
			        {
			            name:'环比',
			            type:'line',
			            yAxisIndex: 1,
			            data:compare1
			        }
			    ]
			};
		lineChart.setOption(option);
	};
	$scope.drawbount = function(){
		var pieChart = echarts.init($('#donut-chart')[0]);
		
		var donutData = [
         {name: "货物进出", value: 30},
         {name: "风机", value: 20},
         {name: "制冷机组", value: 30},
         {name: "灯", value: 10},
         {name: "门", value: 10}
       ];
		option = {
			    legend: {
			        orient : 'horizontal',
			        x : 'center',
			        data:['货物进出','风机','制冷机组','灯','门']
			    },
			    tooltip : {
	                trigger: 'item',
	                formatter: "{a} <br/>{b} : {c} ({d}%)"
	            },
			    calculable : true,
			    series : [
			        {
			            name:'耗能占比',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            legendHoverLink: true,
			            clockWise: true,
			            data:donutData
			        }
			    ]
			};
		pieChart.setOption(option);
	}
	$scope.drawTemperatureLine = function(){
		var lineChart = echarts.init($('#temperature-chart')[0]);
		if($scope.time == 'daily'){
			xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30];
			totalEnergy = [718.5763638504435, 509.64048108025486, 873.2805245034152, 950.3769567105294, 847.1398362745539, 220.35518344860492, 192.35056230054215, 91.93543678171146, 503.83831938980114, 458.17544128782583, 367.8010720595164, 499.14927728554824, 565.7305342834112, 173.30339198261387, 817.3400544082863, 829.9232492986789, 439.47224755136347, 915.9665932182946, 927.1541835468956, 875.7906796929151, 680.104676630516, 886.8016727297473, 249.0764178106478, 734.5018224883057, 198.04800079148922, 59.478828631905095, 544.447890936104, 252.69574971963826, 716.1155282666341, 592.5369825373493];
			temperature = [-5.6865280585676805, -8.975257930045457, -6.962515514593236, -0.16986469958904404, -5.311982746197992, -6.20770517739068, -6.2889990075067335, -5.140101406196741, -5.902660593008472, -4.568580983375531, -6.17160549330492, -9.771373567987197, -1.3833220839050686, -4.786171356214456, -0.2892897764009228, -4.403352802382027, -0.7968494460538433, -3.789211201164324, -5.728772426651659, -1.35231142798376, -0.39456264724221257, -0.5817528840700381, -0.9287476318871801, -4.141080761517864, -8.24619700454898, -2.4970250999400543, -3.386695789158863, -4.630126946923511, -6.847141849351343, -7.4328197266091856];
		}else if($scope.time == 'monthly'){
			xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
			totalEnergy = [718.5763638504435, 509.64048108025486, 873.2805245034152, 950.3769567105294, 847.1398362745539, 190.35518344860492, 192.35056230054215, 91.93543678171146, 503.83831938980114, 458.17544128782583, 367.8010720595164];
			temperature = [-5.6865280585676805, -8.975257930045457, -6.962515514593236, -0.16986469958904404, -5.311982746197992, -6.20770517739068, -6.2889990075067335, -5.140101406196741, -5.902660593008472, -4.568580983375531, -6.17160549330492];
		}
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['耗能','温度']
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : xData
			        }
			    ],
			    yAxis : [
				        {
				            type : 'value',
				            name : '耗能',
				            axisLabel : {
				                formatter: '{value} kw'
				            }
				        },
				        {
				            type : 'value',
				            name : '温度',
				            axisLabel : {
				                formatter: '{value} °C'
				            }
				        }
				    ],
			    series : [
			        {
			            name:'耗能',
			            type:'bar',
			            data:totalEnergy,
			        },
			        {
			            name:'温度',
			            type:'line',
			            yAxisIndex: 1,
			            data:temperature,
			        }
			    ]
			};
		lineChart.setOption(option);
	}
	$scope.drawline();
	$scope.drawTemperatureLine();
	if($scope.item == 'total'){
		$timeout(function() {
           $scope.drawbount();
         }, 0)
      }

	$scope.uncheckState = true;
	$scope.checkState = false;

	$scope.goCheck = function () {
		$scope.uncheckState = false;
		$scope.checkState = true;

		// 能耗评分图——仪表盘
		var myChart = echarts.init(document.getElementById('energyScoreChart'));
		var option = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			toolbox: {
				show: false,
				feature: {
					mark: {show: true},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			series: [
				{
					name: '能耗评分',
					type: 'gauge',
					min: 0,
					max: 100,
					detail: {formatter: '{value}分'},
					textStyle: {
						color: 'auto',
						fontSize: 30
					},
					data: [{value: 0, name: '能耗评分'}]
				}
			]
		};

		$scope.blowerScore = (Math.random() * (25)).toFixed(0) - 0;
		$scope.lightScore = (Math.random() * (25)).toFixed(0) - 0;
		$scope.coldScore = (Math.random() * (25)).toFixed(0) - 0;
		$scope.doorScore = (Math.random() * (25)).toFixed(0) - 0;

		var score = $scope.blowerScore + $scope.lightScore + $scope.coldScore + $scope.doorScore;

		var tem = score;
		setInterval(function () {
			if (score >= 0) {
				option.series[0].data[0].value = tem - (score--);
				myChart.setOption(option, true);
			}
		}, 100);
		$scope.totalScore = tem;
	}

	$scope.stopCheck = function () {
		$scope.uncheckState = true;
		$scope.checkState = false;
		$scope.load();
	}

	$scope.load = function () {
		$('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 1, format: 'YYYY-MM-DD HH:mm:ss'});
		$http.get('/i/rdc/findRdcList').success(function(data,headers,config,status){
			$scope.rdcList = data;
			$scope.rdcModal = data[0];
		})

		// 能耗评分图——仪表盘
		var myChart = echarts.init(document.getElementById('energyScoreChart'));
		var option = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			toolbox: {
				show: false,
				feature: {
					mark: {show: true},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			series: [
				{
					name: '能耗评分',
					type: 'gauge',
					min: 0,
					max: 100,
					detail: {formatter: '{value}分'},
					textStyle: {
						color: 'auto',
						fontSize: 30
					},
					data: [{value: 0, name: '能耗评分'}]
				}
			]
		};

		myChart.setOption(option);
	}

	$scope.load();
});