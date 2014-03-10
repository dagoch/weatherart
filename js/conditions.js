/*
 Map Yahoo Weather Condition Codes to search terms for Cooper-Hewitt API
 The terms returned can be submitted to the api as query=<term>
 */


var yahooConditionCodes = {
	0: 'tornado+storm+wind+cataclysm', // 'tornado',
1: 'hurricane+rain+storm+wind+cataclysm', //'tropical storm',
2: 'hurricane+rain+storm+wind+cataclysm', // 'hurricane',
3: 'rain+storm+thunder', // severe thunderstorms',
4: 'rain+storm+thunder', // 'thunderstorms',
5: 'rain+snow', // mixed rain and snow',
6: 'rain+sleet', // mixed rain and sleet',
7: 'snow+sleet', //mixed snow and sleet',
8: 'rain+drizzle+sprinkle+shower', // freezing drizzle',
9: 'rain+drizzle+sprinkle+shower', //drizzle',
10: 'rain+sleet', // 'freezing rain',
11: 'rain+drizzle+sprinkle+shower', //'showers',
12: 'rain+drizzle+sprinkle+shower', //'showers',
13: 'snow+flurries+flurry',
14: 'snow+flurries+flurry',
15: 'snow+wind+drift+whiteout', //blowing snow',
16: 'snow',
17: 'hail',
18: 'sleet',
19: 'dust',
20: 'foggy+fog',
21: 'haze+hazy',
22: 'smoke+smoky',
23: 'wind+blow+blustery',
24: 'wind+blow+windy',
25: 'cold',
26: 'cloudy+cloud',
27: 'cloudy+cloud', //'mostly cloudy (night)',
28: 'cloudy+cloud', //'mostly cloudy (day)',
29: 'cloudy+cloud', //'partly cloudy (night)',
30: 'cloudy+cloud', //'partly cloudy (day)',
31: 'clear+night+stars+moon', //clear (night)',
32: 'sun+sunny',
33: 'clear+night+stars+moon', //'fair (night)',
34: 'sun+sunny', //'fair (day)',
35: 'rain+hail', // mixed rain and hail',
36: 'hot',
37: 'rain+storm+thunder', //'isolated thunderstorms',
38: 'rain+storm+thunder', //'scattered thunderstorms',
39: 'rain+storm+thunder', //'scattered thunderstorms',
40: 'rain+drizzle+sprinkle+shower', //'scattered showers',
41: 'snow+drift+heavy', // heavy snow',
42: 'snow+flurries+flurry', //'scattered snow showers',
43: 'snow+drift+heavy', //'heavy snow',
44: 'cloudy+cloud', //'partly cloudy',
45: 'rain+storm+thunder', //'thundershowers',
46: 'snow+flurries+flurry', //'snow showers',
47: 'rain+storm+thunder', //'isolated thundershowers'
};


function queryFromCondition(conditionCode) {
	return yahooConditionCodes[conditionCode];
}