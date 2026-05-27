(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,1851,e=>{"use strict";var t;let a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return (t={})=>{let a=t.width?String(t.width):e.defaultWidth;return e.formats[a]||e.formats[e.defaultWidth]}}let n={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},r={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function i(e){return(t,a)=>{let o;if("formatting"===(a?.context?String(a.context):"standalone")&&e.formattingValues){let t=e.defaultFormattingWidth||e.defaultWidth,n=a?.width?String(a.width):t;o=e.formattingValues[n]||e.formattingValues[t]}else{let t=e.defaultWidth,n=a?.width?String(a.width):e.defaultWidth;o=e.values[n]||e.values[t]}return o[e.argumentCallback?e.argumentCallback(t):t]}}function s(e){return(t,a={})=>{let o,n=a.width,r=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],i=t.match(r);if(!i)return null;let s=i[0],l=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(l)?function(e,t){for(let a=0;a<e.length;a++)if(t(e[a]))return a}(l,e=>e.test(s)):function(e,t){for(let a in e)if(Object.prototype.hasOwnProperty.call(e,a)&&t(e[a]))return a}(l,e=>e.test(s));return o=e.valueCallback?e.valueCallback(d):d,{value:o=a.valueCallback?a.valueCallback(o):o,rest:t.slice(s.length)}}}let l={code:"en-US",formatDistance:(e,t,o)=>{let n,r=a[e];if(n="string"==typeof r?r:1===t?r.one:r.other.replace("{{count}}",t.toString()),o?.addSuffix)if(o.comparison&&o.comparison>0)return"in "+n;else return n+" ago";return n},formatLong:n,formatRelative:(e,t,a,o)=>r[e],localize:{ordinalNumber:(e,t)=>{let a=Number(e),o=a%100;if(o>20||o<10)switch(o%10){case 1:return a+"st";case 2:return a+"nd";case 3:return a+"rd"}return a+"th"},era:i({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:i({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:i({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:i({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:i({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(t={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)},(e,a={})=>{let o=e.match(t.matchPattern);if(!o)return null;let n=o[0],r=e.match(t.parsePattern);if(!r)return null;let i=t.valueCallback?t.valueCallback(r[0]):r[0];return{value:i=a.valueCallback?a.valueCallback(i):i,rest:e.slice(n.length)}}),era:s({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:s({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:s({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:s({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}},d={},c=Symbol.for("constructDateFrom");function u(e,t){return"function"==typeof e?e(t):e&&"object"==typeof e&&c in e?e[c](t):e instanceof Date?new e.constructor(t):new Date(t)}function h(e,t){return u(t||e,e)}function m(e){let t=h(e),a=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return a.setUTCFullYear(t.getFullYear()),e-a}function g(e,t){let a=h(e,t?.in);return a.setHours(0,0,0,0),a}function f(e,t){let a=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??d.weekStartsOn??d.locale?.options?.weekStartsOn??0,o=h(e,t?.in),n=o.getDay();return o.setDate(o.getDate()-(7*(n<a)+n-a)),o.setHours(0,0,0,0),o}function p(e,t){return f(e,{...t,weekStartsOn:1})}function w(e,t){let a=h(e,t?.in),o=a.getFullYear(),n=u(a,0);n.setFullYear(o+1,0,4),n.setHours(0,0,0,0);let r=p(n),i=u(a,0);i.setFullYear(o,0,4),i.setHours(0,0,0,0);let s=p(i);return a.getTime()>=r.getTime()?o+1:a.getTime()>=s.getTime()?o:o-1}function y(e,t){let a=h(e,t?.in),o=a.getFullYear(),n=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??d.firstWeekContainsDate??d.locale?.options?.firstWeekContainsDate??1,r=u(t?.in||e,0);r.setFullYear(o+1,0,n),r.setHours(0,0,0,0);let i=f(r,t),s=u(t?.in||e,0);s.setFullYear(o,0,n),s.setHours(0,0,0,0);let l=f(s,t);return+a>=+i?o+1:+a>=+l?o:o-1}function b(e,t){let a=Math.abs(e).toString().padStart(t,"0");return(e<0?"-":"")+a}let v={y(e,t){let a=e.getFullYear(),o=a>0?a:1-a;return b("yy"===t?o%100:o,t.length)},M(e,t){let a=e.getMonth();return"M"===t?String(a+1):b(a+1,2)},d:(e,t)=>b(e.getDate(),t.length),a(e,t){let a=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return a.toUpperCase();case"aaa":return a;case"aaaaa":return a[0];default:return"am"===a?"a.m.":"p.m."}},h:(e,t)=>b(e.getHours()%12||12,t.length),H:(e,t)=>b(e.getHours(),t.length),m:(e,t)=>b(e.getMinutes(),t.length),s:(e,t)=>b(e.getSeconds(),t.length),S(e,t){let a=t.length;return b(Math.trunc(e.getMilliseconds()*Math.pow(10,a-3)),t.length)}},x={G:function(e,t,a){let o=+(e.getFullYear()>0);switch(t){case"G":case"GG":case"GGG":return a.era(o,{width:"abbreviated"});case"GGGGG":return a.era(o,{width:"narrow"});default:return a.era(o,{width:"wide"})}},y:function(e,t,a){if("yo"===t){let t=e.getFullYear();return a.ordinalNumber(t>0?t:1-t,{unit:"year"})}return v.y(e,t)},Y:function(e,t,a,o){let n=y(e,o),r=n>0?n:1-n;return"YY"===t?b(r%100,2):"Yo"===t?a.ordinalNumber(r,{unit:"year"}):b(r,t.length)},R:function(e,t){return b(w(e),t.length)},u:function(e,t){return b(e.getFullYear(),t.length)},Q:function(e,t,a){let o=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(o);case"QQ":return b(o,2);case"Qo":return a.ordinalNumber(o,{unit:"quarter"});case"QQQ":return a.quarter(o,{width:"abbreviated",context:"formatting"});case"QQQQQ":return a.quarter(o,{width:"narrow",context:"formatting"});default:return a.quarter(o,{width:"wide",context:"formatting"})}},q:function(e,t,a){let o=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(o);case"qq":return b(o,2);case"qo":return a.ordinalNumber(o,{unit:"quarter"});case"qqq":return a.quarter(o,{width:"abbreviated",context:"standalone"});case"qqqqq":return a.quarter(o,{width:"narrow",context:"standalone"});default:return a.quarter(o,{width:"wide",context:"standalone"})}},M:function(e,t,a){let o=e.getMonth();switch(t){case"M":case"MM":return v.M(e,t);case"Mo":return a.ordinalNumber(o+1,{unit:"month"});case"MMM":return a.month(o,{width:"abbreviated",context:"formatting"});case"MMMMM":return a.month(o,{width:"narrow",context:"formatting"});default:return a.month(o,{width:"wide",context:"formatting"})}},L:function(e,t,a){let o=e.getMonth();switch(t){case"L":return String(o+1);case"LL":return b(o+1,2);case"Lo":return a.ordinalNumber(o+1,{unit:"month"});case"LLL":return a.month(o,{width:"abbreviated",context:"standalone"});case"LLLLL":return a.month(o,{width:"narrow",context:"standalone"});default:return a.month(o,{width:"wide",context:"standalone"})}},w:function(e,t,a,o){let n,r,i,s,l=Math.round((f(n=h(e,o?.in),o)-(r=o?.firstWeekContainsDate??o?.locale?.options?.firstWeekContainsDate??d.firstWeekContainsDate??d.locale?.options?.firstWeekContainsDate??1,i=y(n,o),(s=u(o?.in||n,0)).setFullYear(i,0,r),s.setHours(0,0,0,0),f(s,o)))/6048e5)+1;return"wo"===t?a.ordinalNumber(l,{unit:"week"}):b(l,t.length)},I:function(e,t,a){let o,n,r,i=Math.round((p(o=h(e,void 0))-(n=w(o,void 0),(r=u(o,0)).setFullYear(n,0,4),r.setHours(0,0,0,0),p(r)))/6048e5)+1;return"Io"===t?a.ordinalNumber(i,{unit:"week"}):b(i,t.length)},d:function(e,t,a){return"do"===t?a.ordinalNumber(e.getDate(),{unit:"date"}):v.d(e,t)},D:function(e,t,a){let o,n,r=function(e,t){let[a,o]=function(e,...t){let a=u.bind(null,e||t.find(e=>"object"==typeof e));return t.map(a)}(void 0,e,t),n=g(a),r=g(o);return Math.round((n-m(n)-(r-m(r)))/864e5)}(n=h(e,void 0),((o=h(n,void 0)).setFullYear(o.getFullYear(),0,1),o.setHours(0,0,0,0),o))+1;return"Do"===t?a.ordinalNumber(r,{unit:"dayOfYear"}):b(r,t.length)},E:function(e,t,a){let o=e.getDay();switch(t){case"E":case"EE":case"EEE":return a.day(o,{width:"abbreviated",context:"formatting"});case"EEEEE":return a.day(o,{width:"narrow",context:"formatting"});case"EEEEEE":return a.day(o,{width:"short",context:"formatting"});default:return a.day(o,{width:"wide",context:"formatting"})}},e:function(e,t,a,o){let n=e.getDay(),r=(n-o.weekStartsOn+8)%7||7;switch(t){case"e":return String(r);case"ee":return b(r,2);case"eo":return a.ordinalNumber(r,{unit:"day"});case"eee":return a.day(n,{width:"abbreviated",context:"formatting"});case"eeeee":return a.day(n,{width:"narrow",context:"formatting"});case"eeeeee":return a.day(n,{width:"short",context:"formatting"});default:return a.day(n,{width:"wide",context:"formatting"})}},c:function(e,t,a,o){let n=e.getDay(),r=(n-o.weekStartsOn+8)%7||7;switch(t){case"c":return String(r);case"cc":return b(r,t.length);case"co":return a.ordinalNumber(r,{unit:"day"});case"ccc":return a.day(n,{width:"abbreviated",context:"standalone"});case"ccccc":return a.day(n,{width:"narrow",context:"standalone"});case"cccccc":return a.day(n,{width:"short",context:"standalone"});default:return a.day(n,{width:"wide",context:"standalone"})}},i:function(e,t,a){let o=e.getDay(),n=0===o?7:o;switch(t){case"i":return String(n);case"ii":return b(n,t.length);case"io":return a.ordinalNumber(n,{unit:"day"});case"iii":return a.day(o,{width:"abbreviated",context:"formatting"});case"iiiii":return a.day(o,{width:"narrow",context:"formatting"});case"iiiiii":return a.day(o,{width:"short",context:"formatting"});default:return a.day(o,{width:"wide",context:"formatting"})}},a:function(e,t,a){let o=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"aaa":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return a.dayPeriod(o,{width:"narrow",context:"formatting"});default:return a.dayPeriod(o,{width:"wide",context:"formatting"})}},b:function(e,t,a){let o,n=e.getHours();switch(o=12===n?"noon":0===n?"midnight":n/12>=1?"pm":"am",t){case"b":case"bb":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"bbb":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return a.dayPeriod(o,{width:"narrow",context:"formatting"});default:return a.dayPeriod(o,{width:"wide",context:"formatting"})}},B:function(e,t,a){let o,n=e.getHours();switch(o=n>=17?"evening":n>=12?"afternoon":n>=4?"morning":"night",t){case"B":case"BB":case"BBB":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"BBBBB":return a.dayPeriod(o,{width:"narrow",context:"formatting"});default:return a.dayPeriod(o,{width:"wide",context:"formatting"})}},h:function(e,t,a){if("ho"===t){let t=e.getHours()%12;return 0===t&&(t=12),a.ordinalNumber(t,{unit:"hour"})}return v.h(e,t)},H:function(e,t,a){return"Ho"===t?a.ordinalNumber(e.getHours(),{unit:"hour"}):v.H(e,t)},K:function(e,t,a){let o=e.getHours()%12;return"Ko"===t?a.ordinalNumber(o,{unit:"hour"}):b(o,t.length)},k:function(e,t,a){let o=e.getHours();return(0===o&&(o=24),"ko"===t)?a.ordinalNumber(o,{unit:"hour"}):b(o,t.length)},m:function(e,t,a){return"mo"===t?a.ordinalNumber(e.getMinutes(),{unit:"minute"}):v.m(e,t)},s:function(e,t,a){return"so"===t?a.ordinalNumber(e.getSeconds(),{unit:"second"}):v.s(e,t)},S:function(e,t){return v.S(e,t)},X:function(e,t,a){let o=e.getTimezoneOffset();if(0===o)return"Z";switch(t){case"X":return S(o);case"XXXX":case"XX":return A(o);default:return A(o,":")}},x:function(e,t,a){let o=e.getTimezoneOffset();switch(t){case"x":return S(o);case"xxxx":case"xx":return A(o);default:return A(o,":")}},O:function(e,t,a){let o=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+M(o,":");default:return"GMT"+A(o,":")}},z:function(e,t,a){let o=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+M(o,":");default:return"GMT"+A(o,":")}},t:function(e,t,a){return b(Math.trunc(e/1e3),t.length)},T:function(e,t,a){return b(+e,t.length)}};function M(e,t=""){let a=e>0?"-":"+",o=Math.abs(e),n=Math.trunc(o/60),r=o%60;return 0===r?a+String(n):a+String(n)+t+b(r,2)}function S(e,t){return e%60==0?(e>0?"-":"+")+b(Math.abs(e)/60,2):A(e,t)}function A(e,t=""){let a=Math.abs(e);return(e>0?"-":"+")+b(Math.trunc(a/60),2)+t+b(a%60,2)}let k=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},T=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},I={p:T,P:(e,t)=>{let a,o=e.match(/(P+)(p+)?/)||[],n=o[1],r=o[2];if(!r)return k(e,t);switch(n){case"P":a=t.dateTime({width:"short"});break;case"PP":a=t.dateTime({width:"medium"});break;case"PPP":a=t.dateTime({width:"long"});break;default:a=t.dateTime({width:"full"})}return a.replace("{{date}}",k(n,t)).replace("{{time}}",T(r,t))}},P=/^D+$/,C=/^Y+$/,D=["D","DD","YY","YYYY"],L=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,O=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,W=/^'([^]*?)'?$/,N=/''/g,j=/[a-zA-Z]/;e.s(["format",0,function(e,t,a){let o=a?.locale??d.locale??l,n=a?.firstWeekContainsDate??a?.locale?.options?.firstWeekContainsDate??d.firstWeekContainsDate??d.locale?.options?.firstWeekContainsDate??1,r=a?.weekStartsOn??a?.locale?.options?.weekStartsOn??d.weekStartsOn??d.locale?.options?.weekStartsOn??0,i=h(e,a?.in);if(!(i instanceof Date||"object"==typeof i&&"[object Date]"===Object.prototype.toString.call(i))&&"number"!=typeof i||isNaN(+h(i)))throw RangeError("Invalid time value");let s=t.match(O).map(e=>{let t=e[0];return"p"===t||"P"===t?(0,I[t])(e,o.formatLong):e}).join("").match(L).map(e=>{if("''"===e)return{isToken:!1,value:"'"};let t=e[0];if("'"===t){var a;let t;return{isToken:!1,value:(t=(a=e).match(W))?t[1].replace(N,"'"):a}}if(x[t])return{isToken:!0,value:e};if(t.match(j))throw RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}});o.localize.preprocessor&&(s=o.localize.preprocessor(i,s));let c={firstWeekContainsDate:n,weekStartsOn:r,locale:o};return s.map(n=>{if(!n.isToken)return n.value;let r=n.value;return(!a?.useAdditionalWeekYearTokens&&C.test(r)||!a?.useAdditionalDayOfYearTokens&&P.test(r))&&function(e,t,a){var o,n,r;let i,s=(o=e,n=t,r=a,i="Y"===o[0]?"years":"days of the month",`Use \`${o.toLowerCase()}\` instead of \`${o}\` (in \`${n}\`) for formatting ${i} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if(console.warn(s),D.includes(e))throw RangeError(s)}(r,t,String(e)),(0,x[r[0]])(i,r,o.localize,c)}).join("")}],1851)},31317,e=>{"use strict";let t={name:"Surya Pratap Singh",avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",role:"AI Engineer & Founder"},a=[{id:"1",slug:"build-offline-ai-assistant-lm-studio",title:"How to Build an Offline AI Assistant Using LM Studio",excerpt:"Learn how to set up, configure, and use LM Studio to run powerful open-source LLMs entirely offline on your local machine.",content:`
# How to Build an Offline AI Assistant Using LM Studio

In an era where data privacy is paramount, relying entirely on cloud-based AI models isn't always the best solution. Running Large Language Models (LLMs) locally ensures that your data never leaves your machine, while also providing zero-latency responses once the model is loaded. 

Today, we're building a fully functional offline AI assistant using **LM Studio**.

## The Architecture of Local AI

Before we dive into the setup, it's important to understand how local AI works. Unlike API-based solutions (like OpenAI's GPT-4 or Google's Gemini), local models require computational power directly from your CPU and GPU. The more VRAM your GPU has, the faster the model will generate tokens.

### What is LM Studio?
LM Studio is an incredibly user-friendly desktop application that allows you to discover, download, and run local LLMs. It handles the complexities of hardware acceleration (like using Apple Metal, NVIDIA CUDA, or AMD ROCm) seamlessly in the background.

## Step-by-Step Setup

### Step 1: Download and Installation
Head over to the [LM Studio website](https://lmstudio.ai/) and download the client for your respective OS (Windows, macOS, or Linux).

### Step 2: Selecting the Right Model
Once installed, use the search bar to find a model. For general assistance, I highly recommend:
- **Llama-3-8B-Instruct**
- **Phi-3-Mini-4K-Instruct**

*Tip: Look for the \`Q4_K_M\` or \`Q5_K_M\` quantization tags. These represent quantized (compressed) models that balance speed and accuracy, allowing them to run on standard consumer hardware.*

### Step 3: Configuring the Local Server
LM Studio isn't just a chat interface; it can act as a local API server replacing cloud calls.
1. Navigate to the **Local Server** tab on the left sidebar.
2. Click **Start Server**.
3. Note the port (usually \`1234\`).

## Integrating the Local API in Next.js

Now that our local AI is running, let's create a simple Next.js client to communicate with it.

\`\`\`typescript
// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages,
      temperature: 0.7,
      max_tokens: -1, // -1 means infinite until stop token
      stream: false
    })
  });

  const data = await response.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
\`\`\`

## Conclusion
Running AI locally is no longer a luxury for supercomputers. With tools like LM Studio and heavily optimized models, any developer can build private, offline-first AI applications today.
    `,coverImage:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",date:"2026-05-24",readingTime:"8 min read",category:"Artificial Intelligence",tags:["Local AI","LM Studio","LLM","Development"],author:t,featured:!0},{id:"2",slug:"running-ai-completely-offline",title:"Running AI Completely Offline in 2026",excerpt:"From Edge TPUs to unified memory architectures, here is how offline AI evolved and how you can leverage it today.",content:`
# Running AI Completely Offline in 2026

The dream of the early 2020s was cloud computing for everything. The reality of 2026 is edge computing—running powerful, reasoning-capable AI completely offline.

## The Hardware Revolution
The biggest bottleneck for local AI used to be VRAM. However, with the standardization of Unified Memory Architectures (UMA) in modern developer laptops, developers can now utilize 32GB, 64GB, or even 128GB of RAM directly for model inference.

## Best Practices for Offline Inference
1. **Model Quantization**: GGUF replaced older formats, providing exceptional flexibility.
2. **Context Window Management**: Local models now support up to 128K context, but caching computation is crucial.
3. **Task-Specific Micro-Models**: Instead of running a massive 70B parameter model, developers are now using orchestrated workflows of specialized 3B and 8B models.

As local hardware continues to improve, the reliance on cloud providers for pure inference will continue to decrease for security-conscious developers.
    `,coverImage:"https://images.unsplash.com/photo-1698064560799-a8647acfc37e?q=80&w=1200&auto=format&fit=crop",date:"2026-05-22",readingTime:"5 min read",category:"Artificial Intelligence",tags:["Future","Edge AI","Hardware"],author:t},{id:"3",slug:"phi-3-vs-llama-3-local-ai",title:"Phi-3 vs Llama 3 for Local AI",excerpt:"A comprehensive developer benchmark comparing the two reigning champions of small-scale local models.",content:`
# Phi-3 vs Llama 3 for Local AI

When selecting a model for local deployments, parameter count dictates your hardware requirements. Currently, two models dominate the sub-10B space: Meta's **Llama 3 (8B)** and Microsoft's **Phi-3 (Mini 3.8B)**.

## Architectural Differences

### Llama 3 (8B)
- **Strengths**: Incredible nuance, vast generalized knowledge, highly capable of complex logical reasoning.
- **Hardware needed**: Minimum 8GB VRAM (with Q4 quantization) for comfortable speeds.

### Phi-3 Mini (3.8B)
- **Strengths**: Trained heavily on "textbook" data. Unbelievably smart for its size, handles coding tasks exceptionally well.
- **Hardware needed**: Runs flawlessly on almost any modern laptop, even without a dedicated GPU.

## The Benchmark: Code Generation
We tested both models on a 0-shot prompt to generate a React \`useIntersectionObserver\` hook.

**Llama 3** provided a complete, robust solution with comments explaining the teardown phase.
**Phi-3** provided a highly optimized, concise solution but missed a specific edgecase regarding React's \`deps\` array.

## Conclusion
If you have the RAM, Llama 3 provides a more robust conversational experience. If you are building background agents or running hardware-constrained devices, Phi-3 is unmatched.
    `,coverImage:"https://images.unsplash.com/photo-1681412328122-8bf8828b8123?q=80&w=1200&auto=format&fit=crop",date:"2026-05-18",readingTime:"6 min read",category:"Artificial Intelligence",tags:["Benchmarks","LLM","Llama 3","Phi-3"],author:t},{id:"4",slug:"android-performance-optimization-guide",title:"Android Performance Optimization Guide",excerpt:"Stop your device from stuttering. A deep dive into kernel governors, background limits, and rendering paths.",content:`
# Android Performance Optimization Guide

Android provides developers and power users incredible freedom, but with that freedom comes the risk of poor optimization. Here is how I set up Android for maximum responsiveness.

## 1. Disabling Unnecessary Background Limits
Modern Android is aggressive with battery management. But if you have a device with 12GB+ of RAM, suspending apps is actively harming your performance as the CPU has to constantly fetch them from storage instead of keeping them in memory.

Go to **Developer Options** -> **Suspend execution for cached apps** -> Select \`Disabled\`.

## 2. Animation Scaling
The oldest trick in the book, yet the most effective.
1. Window animation scale: \`0.5x\`
2. Transition animation scale: \`0.5x\`
3. Animator duration scale: \`0.5x\`

## 3. Force MSAA
In developer options, forcing \`4x MSAA\` forces the GPU to render OpenGL ES 2.0 apps with higher precision. It consumes slightly more battery but resolves micro-stutters in older legacy applications.
    `,coverImage:"https://images.unsplash.com/photo-1607252656733-fd7428c57385?q=80&w=1200&auto=format&fit=crop",date:"2026-05-15",readingTime:"7 min read",category:"Android Customization",tags:["Android","Performance","Smartphones"],author:t},{id:"5",slug:"best-android-roms-for-performance",title:"Best Android ROMs for Performance",excerpt:"Custom ROMs aren't dead. Here are the top custom firmware projects focusing purely on compute and battery efficiency.",content:`
# Best Android ROMs for Performance

With manufacturers locking down bootloaders, the custom ROM scene has consolidated. However, the projects that remain are architectural masterpieces of efficiency.

## 1. LineageOS 
The king of stability. It lacks extreme customization features, which is exactly why it performs so well. The kernel is strictly tuned to AOSP baselines without OEM bloatware.

## 2. Paranoid Android (AOSPA)
Utilizing the Qualcomm CAF (Code Aurora Forum) baselines, PA often performs better than stock firmware on Snapdragon devices because it utilizes device-specific drivers optimized directly by Qualcomm.

## 3. Crdroid
If you need features but despise the heavy framework modifications of OEM skins like OneUI, Crdroid offers a perfect middle-ground.
    `,coverImage:"https://images.unsplash.com/photo-1629196914210-91c6bf9e984f?q=80&w=1200&auto=format&fit=crop",date:"2026-05-10",readingTime:"5 min read",category:"Android Customization",tags:["ROMs","Root","AOSP"],author:t},{id:"6",slug:"how-to-debloat-windows-for-developers",title:"How to Debloat Windows for Developers",excerpt:"A clean developer environment is a fast environment. How to strip Windows 11 down to its bare essentials.",content:`
# How to Debloat Windows for Developers

Windows is a fantastic development environment thanks to WSL2, but out-of-the-box, it is filled with telemetry, pre-installed bloat, and background services you don't need.

## The Automated Approach
Instead of manually disabling services, I highly recommend using the open-source **Chris Titus Tech (CTT) Windows Utility**. 

### How to run:
1. Open PowerShell as Administrator.
2. Run \`iwr -useb https://christitus.com/win | iex\`
3. Navigate to the "Tweaks" tab.
4. Select "Desktop" for standard setups, or "Laptop" to preserve sleep/battery services.

## Manual Telemetry Disabling
If you prefer doing it manually, disable these services via \`services.msc\`:
- \`Connected User Experiences and Telemetry\`
- \`SysMain\` (Only if on a fast NVMe SSD, disable this)

A clean system utilizes fewer resources, giving Docker and WSL2 the memory they desperately need.
    `,coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",date:"2026-05-08",readingTime:"6 min read",category:"Performance Optimization",tags:["Windows","Debloat","Dev Setup"],author:t},{id:"7",slug:"best-tools-for-power-users",title:"Best Tools for Power Users in 2026",excerpt:"Software utilities that completely transform how you interact with your operating system.",content:`
# Best Tools for Power Users in 2026

Relying on default operating system tools limits your workflow speed. Here are the tools I install immediately on a fresh machine.

1. **PowerToys (Windows)**: Specifically for *FancyZones* (superior window management) and *PowerToys Run* (Spotlight for Windows).
2. **Raycast (macOS)**: Simply the best launcher to ever exist. Deeply integrated with extensions for GitHub, Jira, and local scripts.
3. **Obsidian**: Local-first, markdown-based knowledge management. Your brain, mapped as a graph.
4. **Espanso**: Open-source, cross-platform text expander. Stop typing your email signature or common git commands.
    `,coverImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",date:"2026-05-05",readingTime:"4 min read",category:"Developer Tools",tags:["Productivity","Setup","Workflow"],author:t},{id:"8",slug:"best-ai-coding-tools-2026",title:"Best AI Coding Tools in 2026",excerpt:"An overview of the AI assistants that are actually worth your time regarding software architecture and code generation.",content:`
# Best AI Coding Tools in 2026

We've moved past simple autocomplete. AI coding tools are now context-aware architectural assistants. 

## 1. Cursor
Built on VS Code, Cursor remains the king of developer-first AI editors. It understands your entire codebase out-of-the-box and integrates seamlessly with various LLMs (Claude 3.5 Sonnet being the current preference for code).

## 2. GitHub Copilot
The standard. While it lacks the deep workspace awareness of Cursor in some default contexts, its enterprise integration and reliable autocomplete make it a staple.

## 3. Supermaven
Incredible speed. Supermaven focuses on low-latency, 1-million-token context windows, predicting huge chunks of boilerplates nearly instantly without the thinking-lag of other providers.
    `,coverImage:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",date:"2026-05-02",readingTime:"5 min read",category:"Developer Tools",tags:["AI Tools","Programming","IDE"],author:t},{id:"9",slug:"cursor-vs-windsurf-vs-replit",title:"Cursor vs Windsurf vs Replit",excerpt:"Comparing the heavyweights of the AI-native development environments. Which IDE deserves your workflow?",content:`
# Cursor vs Windsurf vs Replit

Choosing an AI-native IDE dictates how efficiently you can build applications.

### Cursor
- **Vibe:** Highly technical, VS Code fork.
- **Best For:** Professional developers who want total control, local extensions, and multi-model support.
- **Verdict:** The reigning champion for local heavy lifting.

### Windsurf by Codeium
- **Vibe:** The intelligent agent approach.
- **Best For:** Developers who want autonomous agents to build features contextually without navigating file trees manually.
- **Verdict:** The best 'Copilot on steroids' experience.

### Replit
- **Vibe:** Cloud-first, instantaneous setup.
- **Best For:** Rapid prototyping, hackathons, and deploying full-stack apps from a browser without local environment configuration.
- **Verdict:** Unmatched for zero-to-deployment velocity.
    `,coverImage:"https://images.unsplash.com/photo-1618401471353-b98a520d9c1a?q=80&w=1200&auto=format&fit=crop",date:"2026-04-28",readingTime:"5 min read",category:"Developer Tools",tags:["IDE","Cursor","Codeium","Replit"],author:t},{id:"10",slug:"building-ai-agents-with-nextjs",title:"Building AI Agents with Next.js",excerpt:"A practical developer guide to executing recursive AI agent loops inside a Next.js server environment.",content:`
# Building AI Agents with Next.js

Next.js, with its App Router and Server Actions, provides a fantastic backend for building AI agents. 

## The Concept
An AI agent requires:
1. **Memory** (Contextual state)
2. **Tools** (Functions it can execute)
3. **Execution Loop** (The ability to observe, think, and act)

## Using the Google Gen AI SDK
You can orchestrate an agent by defining functions on your server and passing them to the model as tools.

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The tool definition
const fetchWeatherTool = {
  name: "getWeather",
  description: "Fetches current weather for a specific city.",
  parameters: {
    type: "object",
    properties: { city: { type: "string" } }
  }
};
\`\`\`

By utilizing Next.js React Server Components, you can stream the agent's thought processes directly to the client interface cleanly, resulting in highly dynamic AI-driven web apps.
    `,coverImage:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",date:"2026-04-25",readingTime:"8 min read",category:"Automation",tags:["Next.js","AI Agents","TypeScript"],author:t},{id:"11",slug:"how-to-make-local-chatgpt-clone",title:"How to Make a Local ChatGPT Clone",excerpt:"Ditch subscription fees. Build your own conversational interface using Next.js, Tailwind, and local models.",content:`
# How to Make a Local ChatGPT Clone

In this tutorial, we will utilize Next.js and LM Studio to create a beautiful local conversational UI.

## The Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Local LM Studio server (Hosting Llama 3)
- **State Management:** React hooks / Vercel AI SDK

By binding the \`useChat\` hook from the Vercel AI SDK pointing to the \`http://localhost:1234/v1\` endpoint, your frontend won't know the difference between a cloud provider and a local graphical unit.

*Detailed code layout for this build will be expanded in a secondary deep-dive.*
    `,coverImage:"https://images.unsplash.com/photo-1531297180773-4b07fb1b6370?q=80&w=1200&auto=format&fit=crop",date:"2026-04-20",readingTime:"6 min read",category:"Artificial Intelligence",tags:["Project","Next.js","Local AI"],author:t},{id:"12",slug:"best-open-source-ai-models-low-end",title:"Best Open Source AI Models for Low-End PCs",excerpt:"You don't need an RTX 4090 to run AI. Exploring the best highly compressed computational models for budget laptops.",content:`
# Best Open Source AI Models for Low-End PCs

Not everyone has 24GB of VRAM. If you're on a student laptop or a budget rig, these are the models you should be running via Ollama or LM Studio.

1. **Qwen 1.5 (0.5B / 1.8B parameter versions)**: Astounding multi-lingual capabilities running on literal potatoes.
2. **Gemma 2 (2B)**: Google's lightweight open model. Very smart for its size class.
3. **TinyLlama (1.1B)**: The classic 1B model, great for simple categorization or sentiment analysis scripts.

Always look for the \`Q4_K_M\` GGUF files to maximize the VRAM / RAM efficiency without degrading the smarts too heavily.
    `,coverImage:"https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",date:"2026-04-18",readingTime:"4 min read",category:"Artificial Intelligence",tags:["Open Source","Models","Budget"],author:t},{id:"13",slug:"how-i-built-vasudev-ai",title:"How I Built Vasudev AI",excerpt:"The architecture behind this platform. Examining Next.js App Router, Framer Motion, and Tailwind CSS.",content:`
# How I Built Vasudev AI

A developer's blog is their ultimate playground. Here is the technical breakdown of how Vasudev AI was structured to be lightning-fast, visually calm, and highly scalable.

## Framework: Next.js (App router)
I migrated away from traditional single-page applications (Vite/React) to Next.js to gain absolute control over SEO metadata, server-side rendering, and dynamic sitemaps.

## Styling: Tailwind CSS
Utility classes provide a zero-context-switching experience. Paired with a custom color palette consisting of deep slate gradients, teal accents, and pure minimal borders, it achieves the 'futuristic editorial' look.

## Animations: Framer Motion
Every micro-interaction (the navbar indicator, page reveals, card hovers) utilizes mathematical spring physics rather than rigid CSS cubic-beziers. 
    `,coverImage:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",date:"2026-04-15",readingTime:"5 min read",category:"Developer Tools",tags:["System Design","Next.js","Web Dev"],author:t},{id:"14",slug:"how-to-speed-up-old-laptops",title:"How to Speed Up Old Laptops",excerpt:"Reviving sluggish hardware using software optimization, thermal repasting, and lightweight OS selections.",content:`
# How to Speed Up Old Laptops

Before throwing your 5-year-old laptop out, try these specific optimization techniques.

## 1. The Hardware Necessity (SSD & RAM)
If your laptop has a mechanical Hard Drive (HDD), upgrading to a cheap SATA SSD will improve speeds by roughly 800%. Double the RAM if there is an empty sodimm slot.

## 2. Linux Mint / ChromeOS Flex
Windows demands resources. Installing Linux Mint (XFCE edition) or Google's ChromeOS Flex turns older sluggish hardware into a rapid, secure browsing and coding machine instantly.

## 3. Thermal Maintenance
Processors heavily thermal-throttle when dust builds up. Open the back cover, use compressed air on the fans, and repaste the CPU die with high-quality thermal paste like Arctic MX-4. 
    `,coverImage:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop",date:"2026-04-10",readingTime:"5 min read",category:"Performance Optimization",tags:["Hardware","Laptops","Maintenance"],author:t},{id:"15",slug:"best-free-ai-tools-for-students",title:"Best Free AI Tools for Students",excerpt:"Maximizing academic productivity without paying expensive SaaS subscription fees.",content:`
# Best Free AI Tools for Students

Students are often gated by expensive AI subscriptions. Here is a curated list of completely free (or generous free-tier) tools to enhance learning.

1. **Perplexity AI**: The ultimate research engine. It provides web-cited responses, making finding academic papers significantly faster.
2. **Google AI Studio**: Free API access to the incredibly powerful Gemini models for developer students building applications.
3. **Claude (Free Tier)**: The best free-tier model for writing, essay structuring, and deep contextual reading of PDFs. 
4. **NotebookLM**: Google's free AI notebook that excels at ingesting massive class syllabus PDFs and generating audio podcasts or study guides from them.
    `,coverImage:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",date:"2026-04-05",readingTime:"4 min read",category:"Artificial Intelligence",tags:["Students","Productivity","Free Tools"],author:t}],o=Array.from(new Set(a.map(e=>e.category)));e.s(["categories",0,o,"posts",0,a])},83244,e=>{"use strict";var t=e.i(43476),a=e.i(18566),o=e.i(46932),n=e.i(22016),r=e.i(31317),i=e.i(1851);e.s(["CategoriesContent",0,function({posts:e}){let s=(0,a.useSearchParams)(),l=(0,a.useRouter)(),d=s?.get("q")||"All",c=e=>{e.q?l.push(`?q=${e.q}`):l.push("?")},u="All"===d?e:e.filter(e=>e.category===d);return(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20",children:[(0,t.jsxs)("div",{className:"text-center mb-16",children:[(0,t.jsx)("h1",{className:"text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6",children:"Topics & Modules"}),(0,t.jsx)("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Explore specific domains of systems engineering, AI research, and architecture."})]}),(0,t.jsxs)("div",{className:"flex flex-wrap justify-center gap-3 mb-16",children:[(0,t.jsx)("button",{onClick:()=>c({}),className:`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${"All"===d?"bg-foreground text-background border-foreground":"bg-card text-foreground border-border hover:border-teal/50 hover:text-teal"}`,children:"All Signals"}),r.categories.map(e=>(0,t.jsx)("button",{onClick:()=>c({q:e}),className:`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border ${d===e?"bg-foreground text-background border-foreground":"bg-card text-foreground border-border hover:border-teal/50 hover:text-teal"}`,children:e},e))]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:u.map((e,a)=>(0,t.jsxs)(o.motion.article,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{delay:.05*a},className:"group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-teal/30 relative",children:[(0,t.jsx)(n.default,{href:`/article/${e.slug}`,className:"absolute inset-0 z-10"}),(0,t.jsxs)("div",{className:"flex flex-col flex-grow p-6",children:[(0,t.jsx)("span",{className:"text-xs font-semibold tracking-wider uppercase text-teal mb-4 block",children:e.category}),(0,t.jsx)("h3",{className:"text-xl font-serif font-bold mb-3 group-hover:text-teal transition-colors line-clamp-2",children:e.title}),(0,t.jsx)("p",{className:"text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow",children:e.excerpt}),(0,t.jsxs)("div",{className:"pt-4 border-t border-border mt-auto flex items-center justify-between text-xs font-medium text-muted-foreground",children:[(0,t.jsx)("span",{children:(0,i.format)(new Date(e.date),"MMM d, yyyy")}),(0,t.jsx)("span",{className:"font-mono",children:e.readingTime})]})]})]},e.id))}),0===u.length&&(0,t.jsx)("div",{className:"py-24 text-center",children:(0,t.jsx)("p",{className:"text-xl font-serif text-muted-foreground",children:"No records found in this sector."})})]})}])}]);