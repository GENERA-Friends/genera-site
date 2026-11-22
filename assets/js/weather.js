/* GENERA weather & heat warnings.
   Forecast data: Open-Meteo (https://open-meteo.com) — free, no API key, CC BY 4.0.
   Heat index levels follow the Thai Meteorological Department (TMD) heat-index scale.
   Loaded after icons.js and before app.js; app.js renders the UI using window.GENERA_WX. */
(function(){
  /* ---- extra icons (Lucide, ISC licence) ---- */
  const svg=p=>`<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  Object.assign(window.GENERA_ICONS=window.GENERA_ICONS||{},{
    "thermometer":svg('<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>'),
    "cloud":svg('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'),
    "cloud-sun":svg('<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>'),
    "cloud-rain":svg('<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>'),
    "cloud-lightning":svg('<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>'),
    "cloud-fog":svg('<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/>'),
    "refresh-cw":svg('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'),
    "triangle-alert":svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>')
  });

  /* ---- park locations (approximate centre of each park) ---- */
  const COORDS={
    chula:[13.7387,100.5248], benjakitti:[13.7295,100.5586], benjasiri:[13.7302,100.5683],
    rama8:[13.7700,100.4935], lumpini:[13.7314,100.5413], santi:[13.7637,100.4957],
    wachira:[13.8078,100.5530], somdetya:[13.7324,100.4948]
  };
  const IDS=Object.keys(COORDS);
  const FORECAST_DAYS=16, STALE_MS=30*60*1000, CACHE_KEY="genera-wx1";

  /* ---- copy ---- */
  const TXT={
    th:{
      levels:["อากาศปกติ","เฝ้าระวัง","เตือนภัย","อันตราย","อันตรายมาก"],
      advice:[
        "อากาศไม่ร้อนจัด ดื่มน้ำตามปกติ",
        "อยู่กลางแดดนานอาจเหนื่อยง่าย พกน้ำและหาที่ร่มเป็นระยะ",
        "เสี่ยงตะคริวและเพลียแดด ดื่มน้ำทุก 15–20 นาที ใส่หมวกและเสื้อผ้าโปร่ง พักในร่มบ่อย ๆ",
        "เสี่ยงโรคลมร้อน (ฮีตสโตรก) เลี่ยงกิจกรรมกลางแจ้งช่วงนี้ โดยเฉพาะเด็ก ผู้สูงอายุ และผู้มีโรคประจำตัว",
        "อันตรายมาก ควรงดกิจกรรมกลางแจ้ง อยู่ในที่เย็นและดื่มน้ำมาก ๆ"
      ],
      wxScript:"ก่อนออกจากบ้าน", wxTitle:"อากาศที่สวนวันนี้", wxSub:"ดัชนีความร้อนและโอกาสฝนแบบเรียลไทม์ ช่วยตัดสินใจก่อนไปร่วมกิจกรรม",
      park:"สวน", now:"ตอนนี้", feels:"ดัชนีความร้อน (รู้สึกเหมือน)", humidity:"ความชื้น", rain:"โอกาสฝน", uv:"UV",
      next12:"12 ชั่วโมงข้างหน้า", heads:"กิจกรรมที่ควรเตรียมตัว (7 วันข้างหน้า)", noHeads:"7 วันข้างหน้าไม่มีกิจกรรมที่เสี่ยงร้อนจัดหรือฝนตกหนัก",
      src:"พยากรณ์จาก Open-Meteo · ระดับความร้อนตามเกณฑ์ดัชนีความร้อน กรมอุตุนิยมวิทยา", updated:"อัปเดต",
      loading:"กำลังโหลดพยากรณ์อากาศ…", error:"โหลดพยากรณ์อากาศไม่สำเร็จ ตรวจสอบอินเทอร์เน็ตแล้วลองใหม่", retry:"ลองใหม่", refresh:"อัปเดตตอนนี้",
      evTitle:"พยากรณ์อากาศช่วงกิจกรรม", evLater:d=>`พยากรณ์อากาศจะมีให้ดูตั้งแต่ ${d} (ล่วงหน้าได้ไม่เกิน 16 วัน)`,
      evHi:"ดัชนีความร้อนสูงสุด", evTemp:"อุณหภูมิ", evRain:"โอกาสฝนสูงสุด", evUv:"UV สูงสุด",
      rainTip:p=>`มีโอกาสฝนตก ${p}% พกร่มหรือเสื้อกันฝน`, uvTip:"UV สูงมาก ทาครีมกันแดดและสวมหมวก",
      covered:"กิจกรรมนี้จัดในที่มีหลังคา ความเสี่ยงจากแดดต่ำกว่า แต่ยังควรดื่มน้ำบ่อย ๆ",
      chipRain:p=>`ฝน ${p}%`, chipHeat:(l,v)=>`${l} ${v}°`,
      codes:{clear:"ท้องฟ้าแจ่มใส",partly:"มีเมฆบางส่วน",cloudy:"เมฆมาก",fog:"หมอก",rain:"ฝนตก",storm:"ฝนฟ้าคะนอง"}
    },
    en:{
      levels:["Normal","Caution","Extreme caution","Danger","Extreme danger"],
      advice:[
        "Not too hot. Drink water as usual.",
        "Long spells in the sun can tire you out. Bring water and take shade breaks.",
        "Risk of heat cramps and exhaustion. Drink water every 15–20 minutes, wear a hat and light clothes, rest in the shade often.",
        "Risk of heat stroke. Avoid outdoor activity at this time, especially children, older people and anyone with a health condition.",
        "Extremely dangerous. Skip outdoor activity, stay somewhere cool and drink plenty of water."
      ],
      wxScript:"Before you head out", wxTitle:"Park weather today", wxSub:"Live heat index and rain chance, so you can decide before you go.",
      park:"Park", now:"Now", feels:"Heat index (feels like)", humidity:"Humidity", rain:"Rain chance", uv:"UV",
      next12:"Next 12 hours", heads:"Activities to prepare for (next 7 days)", noHeads:"No activities with extreme heat or heavy rain risk in the next 7 days.",
      src:"Forecast by Open-Meteo · Heat levels follow the Thai Meteorological Department heat index scale", updated:"Updated",
      loading:"Loading the forecast…", error:"Couldn't load the forecast. Check your connection and try again.", retry:"Try again", refresh:"Refresh",
      evTitle:"Weather during this activity", evLater:d=>`The forecast will be available from ${d} (up to 16 days ahead).`,
      evHi:"Highest heat index", evTemp:"Temperature", evRain:"Highest rain chance", evUv:"Highest UV",
      rainTip:p=>`${p}% chance of rain. Bring an umbrella or raincoat.`, uvTip:"Very high UV. Wear sunscreen and a hat.",
      covered:"This activity is under a roof, so sun exposure is lower, but keep drinking water.",
      chipRain:p=>`Rain ${p}%`, chipHeat:(l,v)=>`${l} ${v}°`,
      codes:{clear:"Clear",partly:"Partly cloudy",cloudy:"Cloudy",fog:"Fog",rain:"Rain",storm:"Thunderstorms"}
    }
  };

  /* ---- heat index (NOAA / Rothfusz), °C in, °C out ---- */
  function heatIndex(tC,rh){
    const T=tC*9/5+32;let HI=0.5*(T+61+(T-68)*1.2+rh*0.094);
    if((HI+T)/2>=80){
      HI=-42.379+2.04901523*T+10.14333127*rh-0.22475541*T*rh-0.00683783*T*T-0.05481717*rh*rh+0.00122874*T*T*rh+0.00085282*T*rh*rh-0.00000199*T*T*rh*rh;
      if(rh<13&&T>=80&&T<=112)HI-=((13-rh)/4)*Math.sqrt((17-Math.abs(T-95))/17);
      else if(rh>85&&T>=80&&T<=87)HI+=((rh-85)/10)*((87-T)/5);
    }
    return Math.round((HI-32)*5/9*10)/10;
  }
  /* TMD scale: <27 normal · 27–32.9 caution · 33–41.9 extreme caution · 42–51.9 danger · ≥52 extreme danger */
  const levelOf=hi=>hi>=52?4:hi>=42?3:hi>=33?2:hi>=27?1:0;
  const codeOf=c=>c==null?"partly":c===0?"clear":c<=2?"partly":c===3?"cloudy":c<=48?"fog":c>=95?"storm":"rain";
  const ICON_OF={clear:"sun",partly:"cloud-sun",cloudy:"cloud",fog:"cloud-fog",rain:"cloud-rain",storm:"cloud-lightning"};

  /* ---- data ---- */
  let data=null, fetchedAt=0, status="idle", inflight=null;
  try{const c=JSON.parse(sessionStorage.getItem(CACHE_KEY)||"null");if(c&&c.data&&Date.now()-c.t<STALE_MS){data=c.data;fetchedAt=c.t;status="ok";}}catch(e){}

  function url(){
    const lat=IDS.map(id=>COORDS[id][0]).join(","),lon=IDS.map(id=>COORDS[id][1]).join(",");
    return "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+
      "&current=temperature_2m,relative_humidity_2m,weather_code"+
      "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,uv_index,weather_code"+
      "&timezone=Asia%2FBangkok&forecast_days="+FORECAST_DAYS;
  }
  function shape(raw){
    const arr=Array.isArray(raw)?raw:[raw],out={};
    IDS.forEach((id,i)=>{const r=arr[i];if(!r||!r.hourly)return;const h=r.hourly;
      const byDay={};
      h.time.forEach((ts,j)=>{const day=ts.slice(0,10),hour=+ts.slice(11,13);const t=h.temperature_2m[j],rh=h.relative_humidity_2m[j];
        if(t==null||rh==null)return;
        (byDay[day]=byDay[day]||[])[hour]={h:hour,t,rh,hi:heatIndex(t,rh),rain:h.precipitation_probability?h.precipitation_probability[j]:null,uv:h.uv_index?h.uv_index[j]:null,code:h.weather_code?h.weather_code[j]:null};});
      const c=r.current||{};
      out[id]={days:byDay,first:h.time[0].slice(0,10),last:h.time[h.time.length-1].slice(0,10),
        current:c.temperature_2m!=null?{time:c.time,t:c.temperature_2m,rh:c.relative_humidity_2m,hi:heatIndex(c.temperature_2m,c.relative_humidity_2m),code:c.weather_code}:null};
    });
    return out;
  }
  function load(force){
    if(!force&&data&&Date.now()-fetchedAt<STALE_MS)return Promise.resolve(data);
    if(inflight)return inflight;
    if(!data)status="loading";
    inflight=fetch(url()).then(r=>{if(!r.ok)throw new Error("weather "+r.status);return r.json();})
      .then(raw=>{data=shape(raw);fetchedAt=Date.now();status="ok";try{sessionStorage.setItem(CACHE_KEY,JSON.stringify({t:fetchedAt,data}));}catch(e){}return data;})
      .catch(err=>{console.warn(err);if(!data)status="error";throw err;})
      .finally(()=>{inflight=null;});
    return inflight;
  }

  /* Summary of the forecast for one park, date (YYYY-MM-DD) and window in minutes. */
  function forWindow(park,key,startMin,endMin){
    const p=data&&data[park];if(!p)return null;
    if(key<p.first)return null;
    if(key>p.last){const d=new Date(key+"T00:00:00Z");d.setUTCDate(d.getUTCDate()-(FORECAST_DAYS-1));return {later:true,from:d.toISOString().slice(0,10)};}
    const day=p.days[key];if(!day)return null;
    const h0=Math.max(0,Math.floor(startMin/60)),h1=Math.min(23,Math.floor(Math.max(startMin,endMin-1)/60));
    const hrs=[];for(let h=h0;h<=h1;h++)if(day[h])hrs.push(day[h]);
    if(!hrs.length)return null;
    const mx=k=>{const v=hrs.map(x=>x[k]).filter(x=>x!=null);return v.length?Math.max(...v):null;};
    const hiMax=mx("hi"),peak=hrs.reduce((a,b)=>b.hi>a.hi?b:a);
    return {hours:hrs,hiMax,level:levelOf(hiMax),peakHour:peak.h,tMin:Math.min(...hrs.map(x=>x.t)),tMax:mx("t"),rain:mx("rain"),uv:mx("uv"),code:codeOf(peak.code)};
  }
  /* Next n hourly points from now for a park. */
  function nextHours(park,nowKey,nowHour,n){
    const p=data&&data[park];if(!p)return [];
    const keys=Object.keys(p.days).sort(),out=[];
    for(const k of keys){if(k<nowKey)continue;const day=p.days[k];
      for(let h=0;h<24;h++){if(k===nowKey&&h<nowHour)continue;if(day[h])out.push({...day[h],key:k});if(out.length>=n)return out;}}
    return out;
  }

  window.GENERA_WX={COORDS,IDS,TXT,heatIndex,levelOf,codeOf,ICON_OF,load,forWindow,nextHours,
    get status(){return status;}, get fetchedAt(){return fetchedAt;}, get data(){return data;},
    current(park){return data&&data[park]?data[park].current:null;}};
})();
