var month = {
//		color: ['#F05E33','#70A6AC'],
		legend: {
			x: 'center',
			y: 'bottom',
			itemGap: 15,
			textStyle: {
				color: 'auto',
				fontSize: 12
			},
			selected: {
				"新增用户": true,"活跃用户": true,"新增企业": false,"活跃企业": false,"通话次数": false,"通话时间": false
			},
			data: ["新增用户", "活跃用户", "新增企业", "" , "活跃企业", "通话次数", "通话时间"]
		},
	    xAxis: [{
	    	type: 'category',
	    	boundaryGap: true,
			axisLine: { 
				lineStyle: {
					width: 2
				}
			}, 
			axisLabel: {
				interval: 'auto',
				rotate: -45,
				clickable: true,
		    	textStyle: {
		    		color: '#767676'
		    	}
			},
			axisTick: {
				interval: 'auto',
				onGap: false
			},
			splitLine: {
				show: true,
				onGap: false,
				lineStyle: {
					type: 'dashed'
				}
			},
	    	data: ['4-11', '4-12', '4-13', '4-14', '4-15', '4-16', '4-17']
	    }],
	    yAxis: [{
	    	type: 'value',
			axisLine: {
				lineStyle: {
					width: 2
				}
			}, 
			axisLabel: {
		    	textStyle: {
		    		color: '#3F3F3F'
		    	}
			},
			splitLine: {
				show: true,
				onGap: false,
				lineStyle: {
					type: 'dashed'
				}
			}
	    }],
	    grid: {
			x: 40,y: 10,x2: 20,y2: 100
	    },
		series: [{
			name: '新增用户',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}	
				}
			},
			data: [2, 234, 346, 765, 354,876,1234]
		},{
			name: '活跃用户',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}	
				}
			},
			data: [50, 234, 450, 600, 800,1000,900]
		},{
			name: '新增企业',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}
				}
			},
			data: [100, 400, 500, 650, 810,1020,1000]
		},{
			name: '活跃企业',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}
				}
			},
			data: [300, 450, 678, 789, 980,1234,2134]
		},{
			name: '通话次数',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}	
				}
			},
			data: [1234, 3231, 456, 346, 567,987,342]
		},{
			name: '通话时间',type: 'line',symbol: 'emptyCircle',symbolSize: 3,
			itemStyle: {
				normal: {
					lineStyle:{
						width: 3
					}
				}
			},
			data: [3221, 342, 456, 678, 876,456,432]
		}]
};
var quarter = {
		color: ['#4CA2FA'],
	    xAxis: [{
	    	type: 'category',
	    	boundaryGap: false,
			axisLine: { 
				lineStyle: {
					color: '#E3E5E8',
					width: 2
				}
			}, 
			axisLabel: {
		    	textStyle: {
		    		color: '#E3E5E8',
		    		fontSize: 30
		    	}
			},
	    	data: ['4月', '5月', '6月']
	    }],
	    yAxis: [{
	    	type: 'value',
	    	name: '(万元)',
	    	nameTextStyle:{
	    		align: 'right',
	    		fontSize: 25
	    	},
			axisLine: {
				lineStyle: {
					color: '#E3E5E8',
					width: 3
				}
			}, 
			axisLabel: {
		    	textStyle: {
		    		color: '#A4A5A7',
		    		fontSize: 25
		    	}
			}
	    }],
	    grid: {
			x: 80,
			y: 30,
			x2: 40,
			y2: 60
	    },
		series: [{
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle:{
						width: 5
					}
					
				}
			},
			data: [150, 350, 180]
		}]
};

var year = {
		color: ['#4CA2FA'],
	    xAxis: [{
	    	type: 'category',
	    	boundaryGap: false,
			axisLine: { 
				lineStyle: {
					color: '#E3E5E8',
					width: 2
				}
			}, 
			axisLabel: {
		    	textStyle: {
		    		color: '#E3E5E8',
		    		fontSize: 30
		    	}
			},
	    	data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	    }],
	    yAxis: [{
	    	type: 'value',
	    	name: '(万元)',
	    	nameTextStyle:{
	    		align: 'right',
	    		fontSize: 25
	    	}, 
			axisLine: {
				lineStyle: {
					color: '#E3E5E8',
					width: 3
				}
			}, 
			axisLabel: {
		    	textStyle: {
		    		color: '#A4A5A7',
		    		fontSize: 25
		    	}
			}
	    }],
	    grid: {
			x: 80,
			y: 30,
			x2: 40,
			y2: 60
	    },
		series: [{
			type: 'line',
			itemStyle: {
				normal: {
					lineStyle:{
						width: 5
					}
					
				}
			},
			data: [120, 150, 200, 160,300,230,189,321,234,432,126,126]
		}]
};