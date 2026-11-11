/* GENERA park calendar — app logic. Content lives in /data/*.json (edit via /admin). */
const ICONS = window.GENERA_ICONS || {};
const IMG = {hero:"assets/img/hero.jpg",yoga:"assets/img/yoga.jpg",yoga2:"assets/img/yoga2.jpg",rest:"assets/img/rest.jpg",art:"assets/img/art.jpg",music:"assets/img/music.jpg",garden:"assets/img/garden.jpg"};

/* ================= copy ================= */
const T = {
  th:{
    skip:"ข้ามไปที่เนื้อหา", nav:{home:"หน้าแรก",events:"กิจกรรม",map:"แผนผังอุทยาน",about:"เกี่ยวกับ"},
    myBookings:"กิจกรรมของฉัน", menu:"เมนู", close:"ปิด", back:"ย้อนกลับ",
    heroTitle:"สวนของชุมชน พื้นที่ของทุกวัน", heroText:"ต้นแบบปฏิทินกิจกรรมของอุทยาน 100 ปี จุฬาฯ รวมกิจกรรมจริงในสวนและสวนใกล้เคียง กับโปรแกรมประจำสัปดาห์ที่ออกแบบให้คนเลิกงาน",
    exploreMap:"ดูแผนผังอุทยาน", joinActs:"ดูกิจกรรม",
    heroScript:"ที่ที่เมืองได้หายใจ", evScript:"ทุกวันในสวน", mapScript:"เดินเล่นทั่วอุทยาน", aboutScript:"เรื่องของเรา", heroBig:"สวนของทุก\u2060คน ทุก\u2060วัน",
    aboutLabel:"เกี่ยวกับเรา", aboutA:"GENERA คือปฏิทินกิจกรรมของอุทยาน 100 ปี จุฬาฯ ", aboutHi:"สำหรับคนทำงาน ครอบครัว ผู้สูงอายุ และทุกคนในย่านสามย่าน", aboutB:" ที่อยากรู้ว่าวันนี้สวนมีอะไร แล้วออกมาใช้พื้นที่สีเขียวของเมืองได้ง่ายขึ้น",
    addr:"ถนน 100 ปี จุฬาฯ (จุฬาฯ ซอย 5) เขตปทุมวัน กรุงเทพฯ", hours:"เปิดทุกวัน 05:00–22:00 น. · เข้าฟรี", fLoc:"ที่ตั้ง", fHours:"เวลาเปิด",
    moodScript:"เลือกตามใจ", realScript:"เร็วๆ นี้ในสวน", progScript:"ทุกสัปดาห์", parkScript:"รู้จักสวนของเรา",
    upNextReal:"กิจกรรมจริง", upNextProg:"โปรแกรม GENERA",
    nextRound:"รอบถัดไป", book:"จองที่",
    faqScript:"สงสัยไหม", faqTitle:"คำถามที่พบบ่อย", faqSub:"ข้อมูลพื้นฐานก่อนไปอุทยาน 100 ปี จุฬาฯ",
    faq:[["อุทยานเปิดกี่โมง เสียค่าเข้าไหม","เปิดทุกวันประมาณ 05:00–22:00 น. และเข้าฟรี กิจกรรมส่วนใหญ่ฟรีเช่นกัน บางงานอาจต้องลงทะเบียนล่วงหน้า ดูรายละเอียดได้ในแต่ละกิจกรรม"],
         ["เดินทางไปอย่างไร","MRT สามย่าน ทางออก 2 แล้วเดินตามถนนพญาไทราว 8–10 นาที หรือรถเมล์สายที่ผ่านถนนพระราม 1 / พระราม 4 แล้วเข้าถนน 100 ปี จุฬาฯ (จุฬาฯ ซอย 5)"],
         ["มีที่จอดรถไหม","มีที่จอดรถใต้อาคารอเนกประสงค์ ประมาณ 200 คัน"],
         ["ถ้าฝนตก กิจกรรมยังจัดไหม","โปรแกรมกลางแจ้งของ GENERA จะย้ายเข้าอาคารอเนกประสงค์ ส่วนกิจกรรมจริงให้ดูประกาศจากผู้จัด"],
         ["การจองที่ในเว็บนี้ใช้ได้จริงไหม","ยังไม่ได้ การจองเป็นตัวอย่าง (ต้นแบบ) บันทึกไว้ในเบราว์เซอร์ของคุณเท่านั้น และยังไม่มีใครได้รับข้อมูล"]],
    ctaScript:"เจอกันที่สวน", ctaTitle:"พร้อม\u2060ออก\u2060ไป\u2060สวน หรือ\u2060ยัง?", ctaAbout:"เกี่ยวกับโครงการ",
    f1:"พักผ่อน ชาร์จพลัง", f1s:"ผ่อนคลาย ฟื้นตัว และคลายเครียด", f2:"กิจกรรมชุมชน", f2s:"กิจกรรมฟรีสำหรับทุกวัย", f3:"พื้นที่สำหรับทุกคน", f3s:"ออกแบบให้ทุกคนใช้ได้สบาย",
    todayEyebrow:"วันนี้ที่สวน", nowEyebrow:"กำลังจัดอยู่ตอนนี้", allDoneToday:"กิจกรรมวันนี้จบแล้ว · กิจกรรมถัดไป", seeDetails:"ดูรายละเอียด",
    moodTitle:"วันนี้รู้สึกอย่างไร", moodSub:"เลือกอารมณ์ของคุณ แล้วเราจะหากิจกรรมที่เหมาะให้",
    realTitle:"กิจกรรมจริงที่กำลังจะมาถึง", realSub:"กิจกรรมที่ประกาศจริงในอุทยาน 100 ปี จุฬาฯ และสวนสาธารณะใกล้เคียง พร้อมแหล่งที่มา", seeAllReal:"ดูกิจกรรมจริงทั้งหมด",
    progTitle:"โปรแกรมประจำสัปดาห์ของ GENERA", progSub:"กิจกรรมเบาๆ หลังเลิกงานที่ GENERA เสนอให้จัดทุกสัปดาห์ (ต้นแบบ ยังไม่ได้จัดจริง)", seeAllProg:"ดูโปรแกรมทั้งหมด",
    parkTitle:"รู้จักอุทยาน 100 ปี จุฬาฯ", parkSub:"สวนสาธารณะที่ออกแบบให้เป็นทั้งที่พักผ่อนและพื้นที่รับน้ำของเมือง", seePlan:"ดูแผนผังอุทยาน",
    parkAbout:"อุทยาน 100 ปี จุฬาลงกรณ์มหาวิทยาลัย เปิดเมื่อ 26 มีนาคม 2560 ในวาระครบรอบ 100 ปีของจุฬาฯ ออกแบบโดย LANDPROCESS (กชกร วรอาคม) ร่วมกับ N7A Architects ทั้งสวนลาดเอียงเพื่อให้น้ำฝนไหลจากหลังคาเขียวผ่านพื้นที่ชุ่มน้ำลงสู่บ่อหน่วงน้ำ ดูแลโดยสำนักงานจัดการทรัพย์สิน จุฬาฯ (PMCU)",
    stats:[["29 ไร่","พื้นที่สีเขียวย่านสวนหลวง–สามย่าน"],["5,200 ตร.ม.","หลังคาเขียวที่เดินขึ้นได้"],["3°","ทั้งสวนลาดเอียงให้น้ำไหลลงบ่อ"],["2560","เปิดวันครบรอบ 100 ปี จุฬาฯ"]],
    evTitle:"กิจกรรม", evLede:"กิจกรรมจริงในอุทยาน 100 ปี จุฬาฯ และสวนใกล้เคียง รวมกับโปรแกรมที่ GENERA เสนอ ค้นหา กรอง หรือเลือกวันในปฏิทิน",
    searchL:"ค้นหากิจกรรม", searchPh:"เช่น หนังกลางแปลง ดนตรี โยคะ", filters:"ตัวกรอง", all:"ทั้งหมด",
    srcAll:"ทั้งหมด", srcReal:"กิจกรรมจริง", srcProg:"โปรแกรม GENERA",
    week:"สัปดาห์", month:"เดือน", year:"ทั้งปี", backToday:"ไปที่วันนี้",
    prevWeek:"สัปดาห์ก่อน", nextWeek:"สัปดาห์ถัดไป", prevMonth:"เดือนก่อน", nextMonth:"เดือนถัดไป", prevYear:"ปีก่อน", nextYear:"ปีถัดไป",
    acts:n=>`${n} กิจกรรม`, todayTag:"วันนี้", comingUp:"กิจกรรมถัดไป", matches:q=>`ผลการค้นหา “${q}” · 60 วันข้างหน้า`,
    grpReal:"กิจกรรมจริง", grpProg:"โปรแกรม GENERA (ข้อเสนอ)",
    emptyDay:"วันนี้ไม่มีกิจกรรมที่ตรงกับตัวกรอง", emptyLater:"ไม่มีกิจกรรมที่ตรงกับตัวกรองในช่วงนี้", clear:"ล้างตัวกรองทั้งหมด", emptyMonth:"เดือนนี้ไม่มีกิจกรรมที่ตรงกับตัวกรอง",
    restNote:"อุทยานเปิดให้เข้าฟรีทุกวัน แวะมานั่งพักใต้ร่มจามจุรีหรือเดินรอบสวนได้เสมอ ไม่ต้องรอมีกิจกรรม",
    now:"กำลังจัดอยู่ตอนนี้", startsIn:x=>`เริ่มในอีก ${x}`, ended:"จบแล้ว", almostFull:"ใกล้เต็มแล้ว",
    hm:(h,m)=> h? `${h} ชม. ${m} นาที` : `${m} นาที`, timeSuffix:" น.", fromT:s=>`${s} น. เป็นต้นไป`, allDayT:"ดูเวลาเปิดจากผู้จัด",
    seatsShort:(l,c)=>`ว่าง ${l} / ${c} ที่`, full:"เต็มแล้ว", free:"ฟรี",
    bookNow:"จองที่", booked:"จองแล้ว", viewBooking:"ดูการจอง", finished:"จบแล้ว", fullBtn:"ที่นั่งเต็ม", register:"ลงทะเบียน / กดบัตร",
    save:"บันทึก", saved:"บันทึกแล้ว", saveA:n=>`บันทึก ${n}`, unsaveA:n=>`เอา ${n} ออกจากที่บันทึก`,
    shareLine:"แชร์ทาง LINE", copy:"คัดลอกรายละเอียด", copied:"คัดลอกแล้ว วางในแชท LINE ได้เลย", copyFail:"คัดลอกไม่ได้ กรุณาเลือกข้อความแล้วคัดลอกเอง",
    viewOnMap:"ดูบนแผนผัง", addGcal:"เพิ่มลง Google ปฏิทิน", addCal:"เพิ่มลงปฏิทิน",
    fDate:"วันที่", fTime:"เวลา", fPlace:"สถานที่", fLevel:"ความเหนื่อย", fShelter:"ร่มเงา", fSeats:"ที่นั่ง", fBring:"ควรเตรียม",
    fCost:"ค่าเข้า", fReg:"การลงทะเบียน", fOrg:"ผู้จัด", fSched:"ตารางกิจกรรม", fSources:"แหล่งที่มา",
    badgeReal:"กิจกรรมจริง", badgeProg:"โปรแกรม GENERA (ข้อเสนอ)",
    progNote:"โปรแกรมนี้เป็นข้อเสนอของโครงการ GENERA ยังไม่ได้จัดจริง การจองใช้สาธิตระบบเท่านั้น",
    venueCheck:"แหล่งข้อมูลระบุรายละเอียดรายการนี้ (สถานที่หรือวงดนตรี) ไม่ตรงกัน กรุณาตรวจสอบกับประกาศของ กทม. ก่อนไป",
    posterOnly:"ข้อมูลจากโปสเตอร์ที่ทีมแชร์ ยังไม่พบประกาศออนไลน์ กรุณาตรวจสอบกับผู้จัด",
    bookHead:"จองที่นั่ง", nameL:"ชื่อของคุณ", nameHint:"ให้เจ้าหน้าที่หาชื่อคุณเจอที่จุดลงทะเบียน", nameErr:"กรุณาใส่ชื่อ เพื่อให้เจ้าหน้าที่หาการจองของคุณเจอ",
    peopleL:"จำนวนคน", personN:n=>`${n} คน`, confirmBook:"ยืนยันการจอง", cancel:"ยกเลิก",
    spotL:"เลือกที่ของคุณ", spotHint:"แตะที่ว่างบนผังเพื่อเลือกตำแหน่ง หรือข้ามไปให้เราเลือกให้", left:n=>`ว่าง ${n}`,
    stage:{mat:"ผู้นำกิจกรรม",chair:"ผู้นำวง / จุดชงชา",table:"โต๊ะวิทยากร"}, entrance:"ทางเข้า · ทางเดินสำหรับรถเข็น",
    yourSpot:"ที่ของคุณ", anySpot:t=>`${t}ที่ว่างไหนก็ได้ — เราเลือกให้`, spotName:(t,n)=>`${t} ${n}`,
    lgFree:"ว่าง", lgTaken:"มีคนจองแล้ว", lgMine:"ที่ของคุณ",
    spotErr:(n,t)=>`${t}ว่างเหลือ ${n} ที่ ลดจำนวนคน หรือเลือกประเภทที่นั่งอื่น`,
    openArea:"พื้นที่เปิดโล่ง ไม่มีที่นั่งประจำ มาถึงช่วงไหนของกิจกรรมก็ได้",
    youreBooked:"จองเรียบร้อยแล้ว!", seeYou:"แล้วพบกันที่", codeL:"รหัสการจอง", codeHint:"แสดงรหัสนี้ที่จุดลงทะเบียน", viewMine:"ดูกิจกรรมของฉัน",
    tUp:"ที่จะถึง", tPast:"ที่ผ่านมา", tSaved:"ที่บันทึกไว้",
    emptyUpH:"ยังไม่มีการจอง", emptyUp:"กิจกรรมที่คุณจองจะแสดงที่นี่ พร้อมรหัสการจอง วัน เวลา และสถานที่ เลือกโปรแกรมของ GENERA แล้วกด “จองที่” เพื่อเริ่มต้น",
    emptyPastH:"ยังไม่มีกิจกรรมที่ผ่านมา", emptyPast:"เมื่อคุณร่วมกิจกรรมแล้ว ประวัติจะแสดงที่นี่ ช่วยให้กลับมาร่วมกิจกรรมที่ชอบได้ง่ายขึ้น",
    emptySavedH:"ยังไม่มีกิจกรรมที่บันทึกไว้", emptySaved:"กดไอคอนบันทึกบนการ์ดกิจกรรม เพื่อเก็บกิจกรรมที่สนใจไว้ดูภายหลัง",
    browse:"ดูกิจกรรม", seeBooking:"ดูการจอง", remove:"เอาออก", nextOcc:"ครั้งถัดไป",
    cancelBooking:"ยกเลิกการจอง", keepBooking:"เก็บการจองไว้", cancelQ:n=>`ยกเลิกการจอง “${n}” ไหม?`, cancelD:d=>`ที่นั่งของคุณใน${d} จะเปิดให้คนอื่นจองแทน`,
    cancelledMsg:n=>`ยกเลิกการจอง ${n} แล้ว`, peopleShort:n=>`${n} คน`, bookedFor:"จองในชื่อ",
    fTitle:"ตัวกรอง", fMood:"อารมณ์", fEffort:"ความเหนื่อย", fTod:"ช่วงเวลา", fZone:"โซนในอุทยาน", fPark:"สวน", fCovered:"มีหลังคา จัดได้แม้ฝนตก", any:"ทั้งหมด",
    parkOpt:{chula:"อุทยาน 100 ปี จุฬาฯ",other:"สวนอื่นในกรุงเทพฯ"},
    tod:{morning:"ช่วงเช้า (ก่อน 12:00)",afternoon:"ช่วงบ่าย (12:00–17:00)",after:"หลังเลิกงาน (17:00 เป็นต้นไป)"},
    showN:n=>`แสดง ${n} กิจกรรม`, nWeek:"ใน 7 วันข้างหน้า", removeF:l=>`เอาตัวกรอง ${l} ออก`, qChip:q=>`ค้นหา: ${q}`, coveredChip:"มีหลังคา",
    mapTitle:"แผนผังอุทยาน 100 ปี จุฬาฯ", mapLede:"สำรวจพื้นที่ในอุทยาน ตั้งแต่บ่อหน่วงน้ำที่ทางเข้า ลานสนามหญ้า ไปจนถึงหลังคาเขียวบนอาคารอเนกประสงค์",
    mapCap:"แผนผังแสดงแนวคิด ไม่ใช่มาตราส่วนจริง วาดจากข้อมูลการออกแบบของ LANDPROCESS และ PMCU",
    allZones:"ทุกโซน", todayHere:"โปรแกรม GENERA วันนี้ที่โซนนี้", laterHere:"สัปดาห์นี้ที่โซนนี้", nothingToday:"วันนี้ไม่มีโปรแกรมในโซนนี้ แวะมาพักผ่อนได้ตามสบาย",
    viewZone:"ดูรายละเอียดโซน", seeZoneActs:"ดูโปรแกรมในโซนนี้", nToday:n=>`วันนี้ ${n} โปรแกรม`,
    facilitiesIn:z=>`จุดเด่น · ${z}`, facilitiesAll:"ข้อมูลการเข้าใช้อุทยาน", fGood:"ควรรู้", fZoneLbl:"โซน",
    aboutTitle:"เกี่ยวกับ GENERA", aboutLede:"GENERA เป็นโครงการด้าน SDG 11 ที่ต้องการให้สวนสาธารณะใกล้บ้านเป็นที่ที่ทุกคนอยากมา อยากอยู่ และอยากกลับมาอีก โดยเฉพาะคนทำงานกะและคนทำงานใช้แรงย่านจามจุรีสแควร์และรองเมือง",
    hmwLabel:"โจทย์ของเรา", hmw:"เราจะลดช่องว่างระหว่าง “สวนที่ฟรีและเดินทางไปได้” กับ “สวนที่คนใช้จริงทุกวัน” ได้อย่างไร เมื่อคนต่างวัยและต่างความสนใจยังมีเหตุผลน้อยที่จะมา อยู่ และกลับมา",
    a1:"ตารางกิจกรรมที่คาดเดาได้", a1s:"รวมกิจกรรมจริงไว้ที่เดียว และเสนอโปรแกรมประจำที่จัดวันเดิม เวลาเดิมทุกสัปดาห์ เน้นหลัง 17:00 น.",
    a2:"พักผ่อนได้ ไม่ต้องออกแรง", a2s:"มีทั้งกิจกรรมเบาๆ ที่นั่งในร่ม และมุมสงบ สำหรับคนที่เหนื่อยมาทั้งวัน",
    a3:"ใช้ได้ทุกวัย ทุกร่างกาย", a3s:"ทางเดินเข้าถึงง่าย ร่มเงา ที่หลบฝน และไฟส่องสว่าง ตาม SDG เป้าหมาย 11.7",
    a4:"ชุมชนเป็นเจ้าของร่วม", a4s:"ทำงานร่วมกับ PMCU กทม. สำนักงานเขต และผู้นำชุมชน เพื่อให้กิจกรรมยั่งยืน",
    srcTitle:"แหล่งที่มาของข้อมูล", srcSub:"ข้อมูลกิจกรรมจริงและข้อมูลอุทยานบนเว็บไซต์นี้อ้างอิงจากแหล่งต่อไปนี้ ตรวจสอบล่าสุด 10 พ.ย. 2569",
    teamTitle:"ทีม Latte and Friends",
    everyWeek:"โปรแกรมประจำสัปดาห์ของ GENERA", everyWeekSub:"กิจกรรมที่ GENERA เสนอให้จัดซ้ำทุกสัปดาห์ ในวันและเวลาเดิม (ต้นแบบ)",
    openMonth:m=>`เปิดเดือน${m}`, noHighlights:"ยังไม่พบกิจกรรมจริงในเดือนนี้",
    nextOn:(d,t)=>`${d} เวลา ${t}`,
    foot1:"ต้นแบบเว็บไซต์โครงการ GENERA (SDG 11) · Latte and Friends, BAScii จุฬาลงกรณ์มหาวิทยาลัย", foot2:"กิจกรรมจริงอ้างอิงแหล่งที่มาในแต่ละรายการ · โปรแกรม GENERA และการจองเป็นต้นแบบ",
    cellLabel:(d,n)=> n? `${d}, ${n} กิจกรรม` : `${d}, ไม่มีกิจกรรม`
  },
  en:{
    skip:"Skip to content", nav:{home:"Home",events:"Events",map:"Park plan",about:"About"},
    myBookings:"My activities", menu:"Menu", close:"Close", back:"Go back",
    heroTitle:"Your community park, your everyday space", heroText:"A prototype activity calendar for Chula Centenary Park — real events in the park and nearby parks, plus a weekly programme designed for people after work.",
    exploreMap:"View park plan", joinActs:"See events",
    heroScript:"Where the city slows down", evScript:"Every day in the park", mapScript:"Wander the park", aboutScript:"Our story", heroBig:"A park for everyone, every day",
    aboutLabel:"About us", aboutA:"GENERA is an activity calendar for Chula Centenary Park, ", aboutHi:"made for workers, families, older people and everyone around Samyan", aboutB:" who want to know what's on today and get out into the city's green space more easily.",
    addr:"100 Years Chulalongkorn Rd (Chula Soi 5), Pathum Wan, Bangkok", hours:"Open daily 05:00–22:00 · Free entry", fLoc:"Location", fHours:"Opening hours",
    moodScript:"Pick your pace", realScript:"Coming up in the park", progScript:"Every week", parkScript:"Know your park",
    upNextReal:"Real event", upNextProg:"GENERA programme",
    nextRound:"Next session", book:"Book a spot",
    faqScript:"Good to know", faqTitle:"Frequently asked questions", faqSub:"The basics before you visit Chula Centenary Park.",
    faq:[["When is the park open, and is it free?","It's open every day, about 05:00–22:00, and entry is free. Most events are free too; some need you to register first — check each event."],
         ["How do I get there?","Take the MRT to Samyan, exit 2, then walk along Phaya Thai Road for 8–10 minutes. Buses on Rama 1 or Rama 4 Road also stop nearby; enter via 100 Years Chulalongkorn Road (Chula Soi 5)."],
         ["Is there parking?","Yes — an underground car park under the multipurpose building holds about 200 cars."],
         ["What happens if it rains?","Outdoor GENERA sessions move into the multipurpose building. For real events, check the organiser's announcements."],
         ["Are bookings on this site real?","Not yet. Booking is a prototype — it's saved only in your browser and nobody receives it."]],
    ctaScript:"See you in the park", ctaTitle:"Ready to head outside?", ctaAbout:"About the project",
    f1:"Rest & recharge", f1s:"Relax, recover and unwind.", f2:"Community activities", f2s:"Free events for all ages.", f3:"Inclusive space", f3s:"Designed for everyone.",
    todayEyebrow:"Today at the park", nowEyebrow:"Happening now", allDoneToday:"Today's activities have finished · Up next", seeDetails:"See details",
    moodTitle:"How do you feel today?", moodSub:"Pick a mood and we'll show activities that fit.",
    realTitle:"Real events coming up", realSub:"Announced events at Chula Centenary Park and nearby public parks, each with its source", seeAllReal:"See all real events",
    progTitle:"GENERA weekly programme", progSub:"Gentle after-work sessions GENERA proposes to run every week (prototype — not running yet)", seeAllProg:"See the whole programme",
    parkTitle:"About Chula Centenary Park", parkSub:"A public park designed to be both a place to rest and a rainwater sponge for the city", seePlan:"View park plan",
    parkAbout:"Chulalongkorn University Centenary Park opened on 26 March 2017 for the university's 100th anniversary. Designed by LANDPROCESS (Kotchakorn Voraakhom) with N7A Architects, the whole park slopes so rain flows from the green roof through constructed wetlands into the retention pond. It is managed by Chula's Property Management Office (PMCU).",
    stats:[["29 rai","of green space in Suan Luang–Samyan"],["5,200 m²","walkable green roof"],["3°","site-wide slope that drains to the pond"],["2017","opened on Chula's 100th anniversary"]],
    evTitle:"Events", evLede:"Real events at Chula Centenary Park and nearby parks, alongside the programme GENERA proposes. Search, filter or pick a day on the calendar.",
    searchL:"Search activities", searchPh:"e.g. outdoor cinema, music, yoga", filters:"Filters", all:"All",
    srcAll:"All", srcReal:"Real events", srcProg:"GENERA programme",
    week:"Week", month:"Month", year:"Year", backToday:"Go to today",
    prevWeek:"Previous week", nextWeek:"Next week", prevMonth:"Previous month", nextMonth:"Next month", prevYear:"Previous year", nextYear:"Next year",
    acts:n=> n===1?"1 activity":`${n} activities`, todayTag:"Today", comingUp:"Coming up next", matches:q=>`Matches for “${q}” · next 60 days`,
    grpReal:"Real events", grpProg:"GENERA programme (proposed)",
    emptyDay:"Nothing on this day matches your filters.", emptyLater:"Nothing coming up matches your filters.", clear:"Clear all filters", emptyMonth:"Nothing this month matches your filters.",
    restNote:"The park is free to enter every day. Drop by to rest under the rain trees or walk the loop — no activity needed.",
    now:"Happening now", startsIn:x=>`Starts in ${x}`, ended:"Finished", almostFull:"Almost full",
    hm:(h,m)=> h? `${h} h ${m} min` : `${m} min`, timeSuffix:"", fromT:s=>`From ${s}`, allDayT:"See organiser for opening hours",
    seatsShort:(l,c)=>`${l} / ${c} seats left`, full:"Full", free:"Free",
    bookNow:"Book now", booked:"Booked", viewBooking:"View booking", finished:"Finished", fullBtn:"Fully booked", register:"Register / get tickets",
    save:"Save", saved:"Saved", saveA:n=>`Save ${n}`, unsaveA:n=>`Remove ${n} from saved`,
    shareLine:"Share on LINE", copy:"Copy details", copied:"Copied — paste it into a LINE chat", copyFail:"Couldn't copy. Select the text and copy it yourself.",
    viewOnMap:"View on plan", addGcal:"Add to Google Calendar", addCal:"Add to calendar",
    fDate:"Date", fTime:"Time", fPlace:"Place", fLevel:"Effort", fShelter:"Shade", fSeats:"Seats", fBring:"What to bring",
    fCost:"Entry", fReg:"Registration", fOrg:"Organiser", fSched:"Schedule", fSources:"Sources",
    badgeReal:"Real event", badgeProg:"GENERA programme (proposed)",
    progNote:"This session is proposed by Project GENERA and is not running yet. Booking is a demo only.",
    venueCheck:"Sources disagree on the details of this one (venue or performer). Check the BMA announcement before you go.",
    posterOnly:"From a poster shared by the team — no online announcement found yet. Check with the organiser.",
    bookHead:"Save a seat", nameL:"Your name", nameHint:"So staff can find you at check-in", nameErr:"Enter your name so staff can find your booking.",
    peopleL:"How many people", personN:n=> n===1?"1 person":`${n} people`, confirmBook:"Confirm booking", cancel:"Cancel",
    spotL:"Choose your spot", spotHint:"Tap a free spot on the plan, or skip and we'll choose one for you.", left:n=>`${n} left`,
    stage:{mat:"Instructor",chair:"Host / tea table",table:"Host table"}, entrance:"Entrance · wheelchair path",
    yourSpot:"Your spot", anySpot:t=>`Any free ${t.toLowerCase()} — we'll choose for you`, spotName:(t,n)=>`${t} ${n}`,
    lgFree:"Free", lgTaken:"Taken", lgMine:"Yours",
    spotErr:(n,t)=>`Only ${n} ${t.toLowerCase()} spots are free. Choose fewer people or another spot type.`,
    openArea:"Open area with no fixed spots. Arrive any time during the session.",
    youreBooked:"You're booked!", seeYou:"See you at", codeL:"Booking code", codeHint:"Show this code at the check-in desk", viewMine:"View my activities",
    tUp:"Upcoming", tPast:"Past", tSaved:"Saved",
    emptyUpH:"No bookings yet", emptyUp:"Activities you book show up here with their booking code, time and place. Pick a GENERA session and tap “Book now” to start.",
    emptyPastH:"No past activities yet", emptyPast:"Activities you've joined show up here, so it's easy to come back to the ones you liked.",
    emptySavedH:"Nothing saved yet", emptySaved:"Tap the bookmark on any activity card to keep it here for later.",
    browse:"Browse events", seeBooking:"See booking", remove:"Remove", nextOcc:"Next session",
    cancelBooking:"Cancel booking", keepBooking:"Keep booking", cancelQ:n=>`Cancel booking for “${n}”?`, cancelD:d=>`Your seat on ${d} will be released for someone else.`,
    cancelledMsg:n=>`Booking for ${n} cancelled`, peopleShort:n=> n===1?"1 person":`${n} people`, bookedFor:"Booked for",
    fTitle:"Filters", fMood:"Mood", fEffort:"Effort", fTod:"Time of day", fZone:"Zone in the park", fPark:"Park", fCovered:"Covered — runs rain or shine", any:"Any",
    parkOpt:{chula:"Chula Centenary Park",other:"Other Bangkok parks"},
    tod:{morning:"Morning (before 12:00)",afternoon:"Afternoon (12:00–17:00)",after:"After work (from 17:00)"},
    showN:n=> n===1?"Show 1 activity":`Show ${n} activities`, nWeek:"in the next 7 days", removeF:l=>`Remove filter ${l}`, qChip:q=>`Search: ${q}`, coveredChip:"Covered",
    mapTitle:"Chula Centenary Park plan", mapLede:"Explore the park — from the retention pond at the entrance, across the lawns, up to the green roof on the multipurpose hall.",
    mapCap:"Illustrative plan, not to scale. Drawn from LANDPROCESS and PMCU design information.",
    allZones:"All zones", todayHere:"GENERA sessions here today", laterHere:"This week in this zone", nothingToday:"No GENERA session here today. Drop by and relax anyway.",
    viewZone:"View zone details", seeZoneActs:"See sessions here", nToday:n=> n===1?"1 today":`${n} today`,
    facilitiesIn:z=>`Highlights · ${z}`, facilitiesAll:"Visiting the park", fGood:"Good to know", fZoneLbl:"Zone",
    aboutTitle:"About GENERA", aboutLede:"GENERA is an SDG 11 project that wants the nearby park to be a place people actually want to come to, stay in and return to — especially shift and manual workers around Chamchuri 10 and Rong Mueang.",
    hmwLabel:"Our challenge", hmw:"How might we close the gap between public parks being free and reachable and their limited everyday use, when people of different ages and interests often have little reason to come, stay, or return?",
    a1:"A predictable schedule", a1s:"Real events in one place, plus a proposed programme that repeats on the same day and time each week, mostly after 17:00.",
    a2:"Rest, not just exercise", a2s:"Gentle activities, shaded seating and quiet corners for people who have been on their feet all day.",
    a3:"For every age and ability", a3s:"Accessible paths, shade, rain shelter and lighting, in line with SDG target 11.7.",
    a4:"Owned with the community", a4s:"Built with PMCU, the BMA, the district office and community leaders so activities can last.",
    srcTitle:"Sources", srcSub:"Real events and park facts on this site come from the sources below. Last checked 10 Nov 2026.",
    teamTitle:"Team Latte and Friends",
    everyWeek:"GENERA weekly programme", everyWeekSub:"Sessions GENERA proposes to repeat on the same day and time every week (prototype).",
    openMonth:m=>`Open ${m}`, noHighlights:"No real events found for this month yet",
    nextOn:(d,t)=>`${d} at ${t}`,
    foot1:"Draft prototype for Project GENERA (SDG 11) · Latte and Friends, BAScii, Chulalongkorn University", foot2:"Real events cite their sources · GENERA programme and bookings are a prototype",
    cellLabel:(d,n)=> n? `${d}, ${n===1?"1 activity":n+" activities"}` : `${d}, no activities`
  }
};

const CATS = {
  music:{th:"ดนตรี",en:"Music",c:"var(--c-festival)",icon:"music"},
  film:{th:"หนังกลางแปลง",en:"Outdoor cinema",c:"var(--c-family)",icon:"clapperboard"},
  market:{th:"ตลาดนัด",en:"Market",c:"var(--c-workshop)",icon:"store"},
  culture:{th:"ศิลปะ & การอ่าน",en:"Arts & reading",c:"var(--c-community)",icon:"book-open"},
  family:{th:"ครอบครัว",en:"Family",c:"var(--c-family)",icon:"smile"},
  wellness:{th:"สุขภาพ",en:"Wellness",c:"var(--c-wellness)",icon:"leaf"},
  workshop:{th:"เวิร์กช็อป",en:"Workshop",c:"var(--c-workshop)",icon:"palette"},
  community:{th:"ชุมชน",en:"Community",c:"var(--c-community)",icon:"users"},
  rest:{th:"พักผ่อน",en:"Rest",c:"var(--c-rest)",icon:"sofa"}
};
const PARKS = {
  chula:{th:"อุทยาน 100 ปี จุฬาฯ",en:"Chula Centenary Park",dth:"เขตปทุมวัน",den:"Pathum Wan"},
  benjakitti:{th:"สวนเบญจกิติ",en:"Benjakitti Park",dth:"เขตคลองเตย",den:"Khlong Toei"},
  benjasiri:{th:"อุทยานเบญจสิริ",en:"Benjasiri Park",dth:"เขตคลองเตย",den:"Khlong Toei"},
  rama8:{th:"สวนหลวงพระราม 8",en:"Rama VIII Park",dth:"เขตบางพลัด",den:"Bang Phlat"},
  lumpini:{th:"ลุมพินีสถาน สวนลุมพินี",en:"Lumphinisathan, Lumphini Park",dth:"เขตปทุมวัน",den:"Pathum Wan"},
  santi:{th:"สวนสันติชัยปราการ",en:"Santichaiprakan Park",dth:"เขตพระนคร",den:"Phra Nakhon"},
  wachira:{th:"สวนวชิรเบญจทัศ (สวนรถไฟ)",en:"Wachirabenchathat (Rot Fai) Park",dth:"เขตจตุจักร",den:"Chatuchak"}
};
const MOODS = {
  rest:{icon:"sofa",th:"เหนื่อย อยากพัก",en:"Tired — I just want to rest",sth:"กิจกรรมเบามาก นั่งฟัง นั่งดู",sen:"Very gentle — sit, listen, watch",fn:e=>e.lv==="gentle"&&e.cat!=="market"},
  chat:{icon:"coffee",th:"อยากเจอผู้คน",en:"I want to be around people",sth:"วงชา ดนตรี ตลาดนัด",sen:"Tea circles, music, markets",fn:e=>["community","music","market"].includes(e.cat)},
  move:{icon:"footprints",th:"อยากขยับตัวนิดหน่อย",en:"I want to move a little",sth:"โยคะ ไทเก๊ก เดินเล่น",sen:"Yoga, tai chi, easy walks",fn:e=>e.cat==="wellness"||["walk","stretch","play"].includes(e.id)},
  make:{icon:"palette",th:"อยากลองทำอะไรใหม่",en:"I want to make something",sth:"งานฝีมือ ปลูกผัก เวิร์กช็อป",sen:"Crafts, gardening, workshops",fn:e=>e.cat==="workshop"||["klangplaeng3","letsplay3"].includes(e.id)},
  kids:{icon:"smile",th:"มากับเด็กๆ",en:"I'm with my kids",sth:"การละเล่น หนังกลางแปลง กิจกรรมครอบครัว",sen:"Games, movies, family fun",fn:e=>["family","film"].includes(e.cat)||["garden"].includes(e.id)}
};
let ZONES = {}, PARK_INFO = [];
const LEVEL = {
  gentle:{th:"เบามาก",en:"Gentle",sth:"เหมาะกับหลังเลิกงานที่เหนื่อยมาทั้งวัน",sen:"Good after a long shift"},
  light:{th:"เบา",en:"Light movement",sth:"ขยับร่างกายเล็กน้อย ทำตามจังหวะตัวเองได้",sen:"Move at your own pace"},
  moderate:{th:"ปานกลาง",en:"Moderately active",sth:"มีการเดินและเคลื่อนไหวพอสมควร",sen:"Some walking and moving around"}
};
const SHELTER = {
  true:{th:"ในร่ม มีหลังคา",en:"Indoors, covered",sth:"จัดได้แม้ฝนตก",sen:"Runs rain or shine"},
  false:{th:"กลางแจ้ง มีร่มไม้",en:"Outdoors, under trees",sth:"ถ้าฝนตกย้ายเข้าอาคารอเนกประสงค์",sen:"Moves into the multipurpose hall if it rains"}
};
const SPOT = {
  mat:{icon:"rectangle-horizontal",th:"เสื่อ",en:"Mat",sth:"นั่งหรือนอนบนพื้น",sen:"On the floor"},
  chair:{icon:"armchair",th:"เก้าอี้มีพนักพิง",en:"Chair",sth:"มีพนักพิง เหมาะกับผู้สูงอายุ",sen:"With back support"},
  wheel:{icon:"accessibility",th:"ที่สำหรับรถเข็น",en:"Wheelchair space",sth:"ใกล้ทางเข้า พื้นเรียบ",sen:"Near the entrance, level ground"}
};
let BRING = {};
const PLAN = {stretch:"mat",yoga:"mat",taichi:"mat",tea:"chair",music:"chair",garland:"table"};

let PROG = [], REAL = [], SOURCES = [], CREDITS = [];

/* ---- load content from /data (JSON edited through the admin panel) ---- */
const P=o=>o?[o.th||"",o.en||""]:null;
async function loadData(){
  const get=f=>fetch(`data/${f}.json`,{cache:"no-cache"}).then(r=>{if(!r.ok)throw new Error(f);return r.json();});
  const [ev,pg,zn,site]=await Promise.all([get("events"),get("programme"),get("zones"),get("site")]);
  REAL=(ev.events||[]).map(r=>{
    const x={id:r.id,th:r.title.th,en:r.title.en,dth:r.description.th,den:r.description.en,park:r.park,cat:r.category,lv:r.effort||"gentle",
      s:r.start||"",e:r.end||"",openEnd:!!r.open_end,allDay:!!r.all_day,venueCheck:!!r.venue_check,posterOnly:!!r.poster_only};
    x.d=r.date;x.from=r.date;if(r.end_date&&r.end_date!==r.date)x.end=r.end_date;
    if(r.venue&&(r.venue.th||r.venue.en))x.venue=P(r.venue);
    if(r.cost&&(r.cost.th||r.cost.en))x.cost=P(r.cost);
    if(r.organiser&&(r.organiser.th||r.organiser.en))x.org=P(r.organiser);
    if(r.registration&&(r.registration.text&&(r.registration.text.th||r.registration.text.en)))x.reg=[...P(r.registration.text),r.registration.url||""];
    if(r.schedule&&r.schedule.length)x.sched=r.schedule.map(q=>[q.time,q.th,q.en]);
    x.src=(r.sources||[]).map(q=>[q.label.th||q.label.en,q.label.en||q.label.th,q.url||""]);
    if(r.image)IMG[r.id]=r.image;
    return x;});
  PROG=(pg.sessions||[]).map(p=>{IMG["p:"+p.id]=p.image||IMG.hero;BRING[p.id]=P(p.bring);
    return {id:p.id,dow:+p.weekday,cat:p.category,s:p.start,e:p.end,z:p.zone,lv:p.effort,sh:!!p.covered,cap:+p.capacity,img:"p:"+p.id,th:p.title.th,en:p.title.en,dth:p.description.th,den:p.description.en};});
  ZONES={};(zn.zones||[]).forEach(z=>{IMG["z:"+z.id]=z.image||IMG.rest;
    ZONES[z.id]={th:z.name.th,en:z.name.en,short:P(z.short),icon:z.icon,color:z.color,x:+z.x,y:+z.y,img:"z:"+z.id,dth:z.description.th,den:z.description.en,gth:z.good_to_know.th,gen:z.good_to_know.en,fac:(z.highlights||[]).map(P)};});
  PARK_INFO=(site.park_info||[]).map(P);
  SOURCES=(site.sources||[]).map(q=>[q.label,q.url]);
  CREDITS=(site.photo_credits||[]).map(q=>[q.label,q.url]);
  if(site.hero_image)IMG.hero=site.hero_image;
  (site.park_photos||[]).forEach(q=>{if(q.image)IMG["park:"+q.park]=q.image;});
}

/* ================= helpers ================= */
const pad=n=>String(n).padStart(2,"0");
const keyOf=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;
const dim=(y,m)=>new Date(Date.UTC(y,m+1,0)).getUTCDate();
const dowOf=(y,m,d)=>new Date(Date.UTC(y,m,d)).getUTCDay();
const toMin=s=>{const [h,m]=s.split(":").map(Number);return h*60+m;};
const addDays=(o,n)=>{const dt=new Date(Date.UTC(o.y,o.m,o.d+n));return {y:dt.getUTCFullYear(),m:dt.getUTCMonth(),d:dt.getUTCDate()};};
const same=(a,b)=>a.y===b.y&&a.m===b.m&&a.d===b.d;
const parseKey=k=>{const [y,m,d]=k.split("-").map(Number);return {y,m:m-1,d};};
function bkkNow(){const p={};new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()).forEach(x=>p[x.type]=x.value);return {y:+p.year,m:+p.month-1,d:+p.day,min:(+p.hour)*60+(+p.minute)};}
function hash(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function icon(n){return `<span class="icon" aria-hidden="true">${ICONS[n]||""}</span>`;}

function realOn(key){return REAL.filter(r=>r.dates?r.dates.includes(key):r.end?(key>=r.d&&key<=r.end):r.d===key);}
function eventsOn(y,m,d){
  const dow=dowOf(y,m,d),key=keyOf(y,m,d),out=[];
  PROG.forEach(t=>{if(t.dow===dow)out.push({...t,kind:"prog",park:"chula"});});
  realOn(key).forEach(r=>out.push({...r,kind:"real",s:r.s||"00:00",e:r.e||r.s||"23:59"}));
  return out.map(e=>({...e,y,m,d,key,uid:`${e.id}@${key}`})).sort((a,b)=>(a.allDay?-1:0)-(b.allDay?-1:0)||toMin(a.s)-toMin(b.s));
}
function findEvent(uid){const k=uid.split("@")[1];const o=parseKey(k);return eventsOn(o.y,o.m,o.d).find(e=>e.uid===uid);}
function nextOccurrence(id){for(let i=0;i<400;i++){const o=addDays(TODAY,i);const e=eventsOn(o.y,o.m,o.d).find(x=>x.id===id&&!isPast(x));if(e)return e;}return null;}

/* ================= state ================= */
const NOW=bkkNow(), TODAY={y:NOW.y,m:NOW.m,d:NOW.d};
const DEF={cat:"all",src:"all",park:null,mood:null,effort:null,tod:null,zone:null,covered:false,q:""};
const state={lang:"th",route:"home",view:"week",...DEF,sel:{...TODAY},y:NOW.y,m:NOW.m,mapZone:null,mineTab:"up"};
let bookings=[],savedIds=[],savedName="";
const ls={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
{const l=ls.get("genera-lang2",null);if(l==="en"||l==="th")state.lang=l;}
bookings=ls.get("genera-bookings2",[]);if(!Array.isArray(bookings))bookings=[];
savedIds=ls.get("genera-saved",[]);if(!Array.isArray(savedIds))savedIds=[];
savedName=ls.get("genera-name2","");
const saveBookings=()=>ls.set("genera-bookings2",bookings), saveSaved=()=>ls.set("genera-saved",savedIds);

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const t=k=>T[state.lang][k], L=o=>o[state.lang], S=(o,k)=>o[(k||"")+(state.lang==="th"?"th":"en")];
const LA=a=>a?a[state.lang==="th"?0:1]:"";
const loc=()=>state.lang==="th"?"th-TH":"en-GB";
const fmt=(y,m,d,o)=>new Intl.DateTimeFormat(loc(),{timeZone:"UTC",...o}).format(new Date(Date.UTC(y,m,d)));
const fmtLong=e=>fmt(e.y,e.m,e.d,{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const fmtShort=e=>fmt(e.y,e.m,e.d,{weekday:"short",day:"numeric",month:"short"});
function rangeText(e){
  if(e.kind!=="real"||!(e.end||e.dates))return null;
  const a=parseKey(e.dates?e.dates[0]:(e.from||e.key)),b=parseKey(e.dates?e.dates[e.dates.length-1]:e.end);
  return `${fmt(a.y,a.m,a.d,{day:"numeric",month:"short"})} – ${fmt(b.y,b.m,b.d,{day:"numeric",month:"short",year:"numeric"})}`;
}
const timeRange=e=>e.allDay?t("allDayT"):e.openEnd?t("fromT")(e.s):`${e.s}–${e.e}${t("timeSuffix")}`;
const endMin=e=>e.allDay?1439:e.openEnd?toMin(e.s)+180:toMin(e.e);
const isToday=(y,m,d)=>y===NOW.y&&m===NOW.m&&d===NOW.d;
const bringOf=e=>BRING[e.id]?LA(BRING[e.id]):"";
const placeOf=e=>e.kind==="real"?`${L(PARKS[e.park])}${e.venue?" · "+LA(e.venue):""}`:`${L(ZONES[e.z])} · ${L(PARKS.chula)}`;
const placeShort=e=>e.kind==="real"?L(PARKS[e.park]):LA(ZONES[e.z].short);

function matchQ(e,q){if(!q)return true;q=q.toLowerCase();return [e.th,e.en,e.dth,e.den,L(PARKS[e.park]||{}),PARKS[e.park]&&PARKS[e.park].en,e.z&&ZONES[e.z].th,e.z&&ZONES[e.z].en,CATS[e.cat].th,CATS[e.cat].en,e.venue&&e.venue.join(" ")].some(s=>s&&String(s).toLowerCase().includes(q));}
function todOf(e){const s=toMin(e.s);return e.allDay?"all":s<720?"morning":s<1020?"afternoon":"after";}
const visible=e=>(state.cat==="all"||e.cat===state.cat)&&(state.src==="all"||e.kind===state.src)&&(!state.park||(state.park==="chula"?e.park==="chula":e.park!=="chula"))&&(!state.mood||MOODS[state.mood].fn(e))&&(!state.effort||e.lv===state.effort)&&(!state.tod||todOf(e)===state.tod)&&(!state.zone||e.z===state.zone)&&(!state.covered||e.sh)&&matchQ(e,state.q.trim());
const filterCount=()=>["mood","effort","tod","zone","park"].filter(k=>state[k]).length+(state.covered?1:0);

const bookingOf=uid=>bookings.find(b=>b.uid===uid);
const baseLeft=e=>Math.max(1,e.cap-2-(hash(e.uid)%Math.ceil(e.cap*.55)));
function seatsLeft(e){if(e.kind!=="prog")return null;const b=bookingOf(e.uid);return Math.max(0,baseLeft(e)-(b?b.people:0));}
function isPast(e){const now=bkkNow();const ek=e.y*10000+e.m*100+e.d,nk=now.y*10000+now.m*100+now.d;return ek<nk||(ek===nk&&now.min>=endMin(e));}
function statusOf(e){const now=bkkNow();if(e.allDay||!(e.y===now.y&&e.m===now.m&&e.d===now.d))return null;const s=toMin(e.s),en=endMin(e);
  if(now.min>=en)return{cls:"done",txt:t("ended")};if(now.min>=s)return{cls:"now",txt:t("now")};
  const diff=s-now.min;return{cls:diff<=120?"soon":"",txt:t("startsIn")(t("hm")(Math.floor(diff/60),diff%60))};}
function codeFor(uid,name){const h=(hash(uid+"|"+name+"|"+Date.now())).toString(36).toUpperCase().replace(/[^A-Z0-9]/g,"");return "GN-"+(h+"7K2Q").slice(0,4);}

/* ---- spot plans (floor plan) ---- */
function spotsOf(e){
  const kind=PLAN[e.id]; if(e.kind!=="prog"||!kind||e.cap>40)return null;
  const wheel=Math.max(2,Math.round(e.cap*.08)), chair=kind==="mat"?Math.round(e.cap*.2):e.cap-wheel, mat=kind==="mat"?e.cap-wheel-chair:0;
  const list=[]; let i=0;
  for(let k=0;k<mat;k++)list.push({i:i++,type:"mat"}); for(let k=0;k<chair;k++)list.push({i:i++,type:"chair"}); for(let k=0;k<wheel;k++)list.push({i:i++,type:"wheel"});
  const takenN=e.cap-baseLeft(e);
  const order=list.map(s=>s.i).sort((a,b)=>hash(e.uid+"#"+a)-hash(e.uid+"#"+b));
  const taken=new Set(order.slice(0,takenN)), mine=new Set((bookingOf(e.uid)||{}).spots||[]);
  list.forEach(s=>{s.taken=taken.has(s.i);s.mine=mine.has(s.i);s.free=!s.taken&&!s.mine;});
  const cnt={};list.forEach(s=>{cnt[s.type]=(cnt[s.type]||0)+1;s.n=cnt[s.type];});
  return {kind,list,cols:e.cap<=20?5:6};
}
const spotLabel=(type,kind)=> type==="chair"&&kind==="table" ? (state.lang==="th"?"ที่นั่งที่โต๊ะ":"Table seat") : L(SPOT[type]);

/* ================= shared components ================= */
function bookButton(e){
  if(e.kind==="real"){
    if(isPast(e)) return `<span class="btn btn-static">${esc(t("finished"))}</span>`;
    return `<button type="button" class="btn btn-primary" data-open="${e.uid}" data-uid="${e.uid}">${esc(t("seeDetails"))}</button>`;
  }
  if(bookingOf(e.uid)) return `<button type="button" class="btn btn-secondary" data-ticket="${e.uid}" data-uid="${e.uid}">${icon("check")}<span>${esc(t("viewBooking"))}</span></button>`;
  if(isPast(e)) return `<span class="btn btn-static">${esc(t("finished"))}</span>`;
  if(seatsLeft(e)===0) return `<span class="btn btn-static">${esc(t("fullBtn"))}</span>`;
  return `<button type="button" class="btn btn-primary" data-book="${e.uid}" data-uid="${e.uid}">${esc(t("bookNow"))}</button>`;
}
function saveBtn(e,cls="icon-btn save-btn"){
  const on=savedIds.includes(e.id), lbl=on?t("unsaveA")(L(e)):t("saveA")(L(e));
  return `<button type="button" class="${cls}" data-save="${e.id}" aria-pressed="${on}" aria-label="${esc(lbl)}" data-tip="${esc(on?t("saved"):t("save"))}">${icon(on?"bookmark-check":"bookmark")}</button>`;
}
function badge(e){return e.kind==="real"?`<span class="src-badge real">${icon("badge-check")}${esc(t("badgeReal"))}</span>`:`<span class="src-badge prog">${icon("sprout")}${esc(t("badgeProg"))}</span>`;}
function media(e){
  if(e.kind==="real"&&!IMG[e.id]){
    const a=e.dates?parseKey(e.dates[0]):e.end?parseKey(e.from||e.key||e.d):e;
    const ph=IMG["park:"+e.park];
    if(ph)return `<div class="card-media"><img src="${ph}" alt="" loading="lazy"><span class="tag" style="--c:${CATS[e.cat].c}"><i></i>${esc(L(CATS[e.cat]))}</span><span class="pz-chip"><b>${a.d}</b>${esc(fmt(a.y,a.m,a.d,{month:"short"}))}</span>${saveBtn(e)}</div>`;
    return `<div class="card-media poster" style="--c:${CATS[e.cat].c}"><span class="pz-ic">${icon(CATS[e.cat].icon)}</span><span class="pz-date"><b>${a.d}</b>${esc(fmt(a.y,a.m,a.d,{month:"short"}))}</span><span class="pz-park">${esc(L(PARKS[e.park]))}</span><span class="tag" style="--c:${CATS[e.cat].c}"><i></i>${esc(L(CATS[e.cat]))}</span>${saveBtn(e)}</div>`;
  }
  return `<div class="card-media"><img src="${IMG[e.id]||IMG[e.img]}" alt="" loading="lazy"><span class="tag" style="--c:${CATS[e.cat].c}"><i></i>${esc(L(CATS[e.cat]))}</span>${saveBtn(e)}</div>`;
}
function card(e,showDate=true){
  const st=statusOf(e), left=seatsLeft(e), almost=left!=null&&left>0&&left/e.cap<.25&&!isPast(e), rt=rangeText(e);
  return `<article class="card">${media(e)}
    <div class="card-body">
      ${badge(e)}
      <h3 class="card-title"><button type="button" data-open="${e.uid}">${esc(L(e))}</button></h3>
      ${showDate||rt?`<div class="meta-row">${icon("calendar-days")}${esc(rt||fmtShort(e))}</div>`:""}
      <div class="meta-row">${icon("clock")}${esc(timeRange(e))}</div>
      <div class="meta-row">${icon("map-pin")}${esc(placeShort(e))}</div>
      ${left!=null?`<div class="meta-row">${icon("users")}${esc(left?t("seatsShort")(left,e.cap):t("full"))}${almost?` · <span class="status soon">${esc(t("almostFull"))}</span>`:""}</div>`:e.cost?`<div class="meta-row">${icon("ticket")}${esc(LA(e.cost))}</div>`:""}
      ${st?`<div class="status ${st.cls}">${esc(st.txt)}</div>`:""}
      <div class="card-actions">${bookButton(e)}</div>
    </div></article>`;
}
function upcoming(from,days,filter=true){const out=[];for(let i=0;i<days;i++){const o=addDays(from,i);eventsOn(o.y,o.m,o.d).forEach(e=>{if((!filter||visible(e))&&!isPast(e))out.push(e);});}return out;}
const dedupe=list=>{const seen=new Set();return list.filter(e=>{if(e.kind==="real"&&(e.end||e.dates)){if(seen.has(e.id))return false;seen.add(e.id);}return true;});};
function rowItem(e,attr){return `<button type="button" class="row" ${attr}><img src="${IMG[e.img]||IMG.rest}" alt=""><span><span class="t" style="display:block">${esc(fmtShort(e))} · ${esc(timeRange(e))}</span><span class="n" style="display:block">${esc(L(e))}</span></span><span class="chev">${icon("chevron-right")}</span></button>`;}
function shareText(e){return `${L(e)}\n${rangeText(e)||fmtLong(e)} · ${timeRange(e)}\n${placeOf(e)}${e.cost?"\n"+LA(e.cost):""}`;}
const lineUrl=e=>"https://line.me/R/share?text="+encodeURIComponent(shareText(e));
function gcalUrl(e){
  const z=(hm)=>{const [h,mi]=hm.split(":").map(Number);return new Date(Date.UTC(e.y,e.m,e.d,h-7,mi)).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");};
  let dates;
  if(e.allDay){const n=addDays(e,1);dates=`${e.y}${pad(e.m+1)}${pad(e.d)}/${n.y}${pad(n.m+1)}${pad(n.d)}`;}
  else{const em=endMin(e);dates=`${z(e.s)}/${z(`${Math.floor(em/60)}:${em%60}`)}`;}
  return "https://calendar.google.com/calendar/render?"+new URLSearchParams({action:"TEMPLATE",text:L(e),dates,details:S(e,"d"),location:placeOf(e),ctz:"Asia/Bangkok"}).toString();
}

/* ================= chrome ================= */
const ROUTES=["home","events","map","about"];
function renderChrome(){
  document.documentElement.lang=state.lang;
  $$("[data-i18n]").forEach(el=>{const v=t(el.dataset.i18n);if(typeof v==="string")el.textContent=v;});
  $$("[data-i18n-ph]").forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  $$("[data-lang]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lang===state.lang)));
  const nav=ROUTES.map(r=>`<a href="#${r}"${state.route===r?' aria-current="page"':""}>${esc(t("nav")[r])}</a>`).join("");
  $("#mainNav").innerHTML=nav;$("#sheetNav").innerHTML=nav;
  $("#footNav").innerHTML=ROUTES.map(r=>`<a href="#${r}">${icon("arrow-up-right")}${esc(t("nav")[r])}</a>`).join("");
  document.body.dataset.route=state.route;
  $("#menuBtn").setAttribute("aria-label",t("menu"));$("#menuBtn").dataset.tip=t("menu");
  $$(".icon-btn[data-close]").forEach(b=>{b.setAttribute("aria-label",t("close"));b.dataset.tip=t("close");});
  const up=bookings.filter(b=>{const e=findEvent(b.uid);return e&&!isPast(e);}).length;
  $$("[data-count]").forEach(c=>{c.hidden=!up;c.textContent=up;});
  const titles={home:"GENERA",events:t("evTitle"),map:t("mapTitle"),about:t("aboutTitle")};
  document.title=`${titles[state.route]} — GENERA`;
  $$("[data-img]").forEach(i=>i.src=IMG[i.dataset.img]);
}
const statsHtml=()=>t("stats").map(([a,b])=>`<div class="stat"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("");

/* ================= home ================= */
function evImg(e){return e.kind==="real"?(IMG[e.id]||IMG["park:"+e.park]||IMG.hero):IMG[e.img];}
const LOGO_SVG='<svg viewBox="0 0 104 104" aria-hidden="true"><use href="#genera-logo"/></svg>';
function renderHome(){
  const now=bkkNow(),today=eventsOn(now.y,now.m,now.d).filter(e=>!e.allDay);
  let ev=today.find(e=>now.min<endMin(e)),eyebrow,when,live=false;
  if(ev){live=now.min>=toMin(ev.s);eyebrow=live?t("nowEyebrow"):`${t("todayEyebrow")} · ${t("acts")(today.length)}`;when=live?timeRange(ev):`${timeRange(ev)} · ${statusOf(ev).txt}`;}
  else{ev=upcoming(addDays(TODAY,1),14,false).filter(e=>!e.allDay)[0];eyebrow=t("allDoneToday");when=t("nextOn")(fmt(ev.y,ev.m,ev.d,{weekday:"long",day:"numeric",month:"long"}),timeRange(ev));}
  $("#todayNote").innerHTML=`<div class="upnext-media"><img src="${evImg(ev)}" alt=""><span class="upnext-kind">${esc(ev.kind==="real"?t("upNextReal"):t("upNextProg"))}</span></div>
    <div class="upnext-body"><div class="upnext-eyebrow${live?" live":""}"><span class="dot" aria-hidden="true"></span>${esc(eyebrow)}</div>
    <h2 class="upnext-title">${esc(L(ev))}</h2>
    <div class="meta-row">${icon("clock")}${esc(when)}</div><div class="meta-row">${icon("map-pin")}${esc(placeShort(ev))}</div>
    <button type="button" class="btn btn-dark btn-arrow" data-open="${ev.uid}"><span class="arrow-dot" aria-hidden="true">${icon("arrow-up-right")}</span>${esc(t("seeDetails"))}</button></div>`;
  const rib=[...Object.values(CATS).map(c=>L(c)),...Object.values(PARKS).map(q=>L(q))];
  const one=rib.map(x=>`<span class="rb-item">${esc(x)}</span><span class="rb-logo">${LOGO_SVG}</span>`).join("");
  $("#ribbon").innerHTML=`<div class="rb-run">${one}</div><div class="rb-run">${one}</div>`;
  $("#aboutStmt").innerHTML=`${esc(t("aboutA"))}<em>${esc(t("aboutHi"))}</em>${esc(t("aboutB"))}`;
  $("#moods").innerHTML=Object.entries(MOODS).map(([k,m])=>`<button type="button" class="mood" data-mood="${k}"><span class="mood-ic">${icon(m.icon)}</span><span><b>${esc(L(m))}</b><span>${esc(S(m,"s"))}</span></span></button>`).join("");
  const real=dedupe(upcoming(TODAY,60,false).filter(e=>e.kind==="real"));
  const chulaFirst=[...real.filter(e=>e.park==="chula"),...real.filter(e=>e.park!=="chula")].slice(0,4).sort((a,b)=>a.key.localeCompare(b.key)||toMin(a.s)-toMin(b.s));
  $("#realCards").innerHTML=chulaFirst.map(e=>card(e)).join("");
  const nextOf={};upcoming(TODAY,8,false).filter(e=>e.kind==="prog").forEach(e=>{if(!nextOf[e.id])nextOf[e.id]=e;});
  const rows=PROG.map(p=>nextOf[p.id]).filter(Boolean).sort((a,b)=>a.key.localeCompare(b.key)||toMin(a.s)-toMin(b.s));
  $("#progList").innerHTML=rows.map((e,i)=>`<li class="hx-row" data-pimg="${evImg(e)}" data-pcap="${esc(L(e))}">
    <span class="hx-num">${String(i+1).padStart(2,"0")}</span>
    <span class="hx-ic" style="--c:${CATS[e.cat].c}">${icon(CATS[e.cat].icon)}</span>
    <div class="hx-row-main"><h3 class="display-sm"><button type="button" data-open="${e.uid}">${esc(L(e))}</button></h3>
      <p>${esc(S(e,"d"))}</p>
      <div class="hx-row-meta"><span>${icon("calendar-days")}${esc(t("nextRound"))}: ${esc(fmtShort(e))}</span><span>${icon("clock")}${esc(timeRange(e))}</span><span>${icon("map-pin")}${esc(placeShort(e))}</span></div></div>
  </li>`).join("");
  const f=rows[0];if(f){$("#progImg").src=evImg(f);$("#progCap").textContent=L(f);}
  $("#parkStats").innerHTML=statsHtml();
  $("#faq").innerHTML=t("faq").map(([q,a],i)=>`<details class="faq-item"${i===0?" open":""}><summary><span>${esc(q)}</span><span class="faq-ic" aria-hidden="true">${icon("plus")}</span></summary><p>${esc(a)}</p></details>`).join("");
  observeReveal();
}
let revealObs=null;
function observeReveal(){
  const els=$$(".reveal:not(.in)");
  const reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce||!("IntersectionObserver" in window)){els.forEach(x=>x.classList.add("in"));return;}
  if(!revealObs)revealObs=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");revealObs.unobserve(en.target);}}),{rootMargin:"0px 0px -8% 0px",threshold:.05});
  els.forEach(x=>revealObs.observe(x));
}
document.addEventListener("pointerover",ev=>{const r=ev.target.closest&&ev.target.closest(".hx-row[data-pimg]");if(!r)return;const im=$("#progImg");if(im&&im.getAttribute("src")!==r.dataset.pimg){im.src=r.dataset.pimg;$("#progCap").textContent=r.dataset.pcap;}});
document.addEventListener("focusin",ev=>{const r=ev.target.closest&&ev.target.closest(".hx-row[data-pimg]");if(!r)return;const im=$("#progImg");if(im){im.src=r.dataset.pimg;$("#progCap").textContent=r.dataset.pcap;}});

function renderFilters(){
  const opts=[["all",t("all"),null],...Object.entries(CATS).map(([k,c])=>[k,L(c),c.c])];
  $("#chips").innerHTML=opts.map(([k,l,c])=>`<button type="button" class="chip" data-cat="${k}" aria-pressed="${state.cat===k}"${c?` style="--c:${c}"`:""}>${c?'<span class="dot" aria-hidden="true"></span>':""}${esc(l)}</button>`).join("");
  $("#chips").setAttribute("aria-label",state.lang==="th"?"หมวดกิจกรรม":"Category");
  $$("[data-src]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.src===state.src)));
  $("#srcSeg").setAttribute("aria-label",state.lang==="th"?"ประเภทข้อมูล":"Source");
  const fc=filterCount();$("#fCount").hidden=!fc;$("#fCount").textContent=fc;
  $("#filterBtn").setAttribute("aria-label",fc?`${t("filters")} (${fc})`:t("filters"));
  if($("#q").value!==state.q)$("#q").value=state.q;
  const chips=[];
  if(state.q.trim())chips.push(["q",t("qChip")(state.q.trim())]);
  if(state.park)chips.push(["park",t("parkOpt")[state.park]]);
  if(state.mood)chips.push(["mood",L(MOODS[state.mood])]);
  if(state.effort)chips.push(["effort",L(LEVEL[state.effort])]);
  if(state.tod)chips.push(["tod",t("tod")[state.tod]]);
  if(state.zone)chips.push(["zone",L(ZONES[state.zone])]);
  if(state.covered)chips.push(["covered",t("coveredChip")]);
  $("#activeFilters").innerHTML=chips.map(([k,l])=>`<span class="zone-filter">${esc(l)}<button type="button" data-unfilter="${k}" aria-label="${esc(t("removeF")(l))}" data-tip="${esc(t("removeF")(l))}">${icon("x")}</button></span>`).join("")+(chips.length>1?`<button type="button" class="link-btn" data-clear>${esc(t("clear"))}</button>`:"");
  $$("[data-view]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.view===state.view)));
  $("#viewSeg").setAttribute("aria-label",state.lang==="th"?"มุมมองปฏิทิน":"Calendar view");
  const p={week:["prevWeek","nextWeek"],month:["prevMonth","nextMonth"],year:["prevYear","nextYear"]}[state.view];
  $("#prev").setAttribute("aria-label",t(p[0]));$("#prev").dataset.tip=t(p[0]);
  $("#next").setAttribute("aria-label",t(p[1]));$("#next").dataset.tip=t(p[1]);
}
function renderStrip(){
  const s=state.sel,mon=addDays(s,-((dowOf(s.y,s.m,s.d)+6)%7));
  $("#periodLabel").textContent=state.view==="year"?fmt(state.y,0,1,{year:"numeric"}):state.view==="month"?fmt(state.y,state.m,1,{month:"long",year:"numeric"}):fmt(s.y,s.m,s.d,{month:"short",year:"numeric"});
  $("#weekStrip").hidden=state.view!=="week";if(state.view!=="week")return;
  let h="";
  for(let i=0;i<7;i++){const o=addDays(mon,i);h+=`<span class="wd" aria-hidden="true">${esc(fmt(o.y,o.m,o.d,{weekday:"short"}))}</span>`;}
  for(let i=0;i<7;i++){const o=addDays(mon,i),evs=eventsOn(o.y,o.m,o.d).filter(visible),n=evs.length,hasReal=evs.some(e=>e.kind==="real");
    h+=`<button type="button" data-pick="${keyOf(o.y,o.m,o.d)}" class="${n?"has":""}${hasReal?" real":""}${isToday(o.y,o.m,o.d)?" today":""}" aria-pressed="${same(o,s)}" aria-label="${esc(T[state.lang].cellLabel(fmt(o.y,o.m,o.d,{weekday:"long",day:"numeric",month:"long"}),n))}"${isToday(o.y,o.m,o.d)?' aria-current="date"':""}>${o.d}</button>`;}
  $("#weekStrip").innerHTML=h;
}
function renderWeek(){
  const s=state.sel,evs=eventsOn(s.y,s.m,s.d).filter(visible);
  $("#dayTitle").textContent=fmt(s.y,s.m,s.d,{weekday:"long",day:"numeric",month:"long"});
  $("#dayCount").innerHTML=`${isToday(s.y,s.m,s.d)?`<span class="today-mark">${esc(t("todayTag"))}</span> · `:""}${esc(t("acts")(evs.length))}`;
  const rl=evs.filter(e=>e.kind==="real"),pg=evs.filter(e=>e.kind==="prog");
  let h="";
  if(!evs.length)h=`<div class="empty">${esc(t("emptyDay"))} <button type="button" class="link-btn" data-clear>${esc(t("clear"))}</button></div>`;
  else{ if(rl.length)h+=`<h3 class="grp">${icon("badge-check")}${esc(t("grpReal"))}</h3><div class="cards">${rl.map(e=>card(e,false)).join("")}</div>`;
        if(pg.length)h+=`<h3 class="grp">${icon("sprout")}${esc(t("grpProg"))}</h3><div class="cards">${pg.map(e=>card(e,false)).join("")}</div>`; }
  $("#dayGroups").innerHTML=h;
  const q=state.q.trim();
  $("#laterTitle").textContent=q?t("matches")(q):t("comingUp");
  const later=q?dedupe(upcoming(TODAY,60).filter(e=>!same(e,s))).slice(0,12):dedupe(upcoming(addDays(s,1),7)).slice(0,8);
  $("#laterCards").innerHTML=later.length?later.map(e=>card(e)).join(""):`<div class="empty">${esc(t("emptyLater"))} <button type="button" class="link-btn" data-clear>${esc(t("clear"))}</button></div>`;
}
function renderMonth(){
  const base=Date.UTC(2024,0,1);
  $("#dow").innerHTML=Array.from({length:7},(_,i)=>`<div>${esc(new Intl.DateTimeFormat(loc(),{timeZone:"UTC",weekday:"short"}).format(new Date(base+i*864e5)))}</div>`).join("");
  const first=(dowOf(state.y,state.m,1)+6)%7,total=Math.ceil((first+dim(state.y,state.m))/7)*7,cells=[];let cnt=0;
  for(let i=0;i<total;i++){
    const o=addDays({y:state.y,m:state.m,d:1},i-first),{y,m,d}=o,evs=eventsOn(y,m,d).filter(visible);if(m===state.m)cnt+=evs.length;
    const ordered=[...evs.filter(e=>e.kind==="real"),...evs.filter(e=>e.kind==="prog")];
    const sel=same(o,state.sel),bars=ordered.slice(0,2).map(e=>`<span class="bar${e.kind==="real"?" real":""}" style="--c:${CATS[e.cat].c}"><b>${e.allDay?"":e.s}</b>${esc(L(e))}</span>`).join("");
    cells.push(`<button type="button" class="cell${m!==state.m?" out":""}${isToday(y,m,d)?" today":""}" data-day="${keyOf(y,m,d)}" aria-pressed="${sel}" tabindex="${sel?0:-1}" aria-label="${esc(T[state.lang].cellLabel(fmt(y,m,d,{weekday:"long",day:"numeric",month:"long"}),evs.length))}"${isToday(y,m,d)?' aria-current="date"':""}><span class="num" aria-hidden="true">${d}</span><span class="bars" aria-hidden="true">${bars}${evs.length>2?`<span class="more">+${evs.length-2}</span>`:""}</span><span class="dots" aria-hidden="true">${ordered.slice(0,4).map(e=>`<i style="--c:${CATS[e.cat].c}"></i>`).join("")}</span></button>`);
  }
  $("#grid").innerHTML=(cnt?"":`<div class="grid-msg" role="status">${esc(t("emptyMonth"))} <button type="button" class="link-btn" data-clear>${esc(t("clear"))}</button></div>`)+cells.join("");
  $("#grid").setAttribute("aria-label",fmt(state.y,state.m,1,{month:"long",year:"numeric"}));
  if(!$("#grid [tabindex='0']")){const c=$("#grid .cell:not(.out)");if(c)c.tabIndex=0;}
  const s=state.sel,evs=eventsOn(s.y,s.m,s.d).filter(visible);
  $("#dayPanel").innerHTML=`<h3>${esc(fmt(s.y,s.m,s.d,{weekday:"long",day:"numeric",month:"long"}))}</h3><p class="count">${isToday(s.y,s.m,s.d)?`<b style="color:var(--green)">${esc(t("todayTag"))}</b> · `:""}${esc(t("acts")(evs.length))}</p>`+
    (evs.length?`<ul class="rows">${evs.map(e=>`<li><button type="button" class="row" data-open="${e.uid}">${e.kind==="real"?`<span class="row-ic" style="--c:${CATS[e.cat].c}">${icon(CATS[e.cat].icon)}</span>`:`<img src="${IMG[e.img]}" alt="">`}<span><span class="t" style="display:block">${esc(timeRange(e))} · ${esc(placeShort(e))}</span><span class="n" style="display:block">${esc(L(e))}</span></span><span class="chev">${icon("chevron-right")}</span></button></li>`).join("")}</ul>`:`<div class="empty" style="margin-top:var(--s4)">${esc(t("emptyDay"))} <button type="button" class="link-btn" data-clear>${esc(t("clear"))}</button></div>`)+
    `<div class="rest-note">${icon("armchair")}<span>${esc(t("restNote"))}</span></div>`;
}
function renderYear(){
  const base=Date.UTC(2024,0,1),order=[1,2,3,4,5,6,0];
  const names=Array.from({length:7},(_,i)=>new Intl.DateTimeFormat(loc(),{timeZone:"UTC",weekday:"long"}).format(new Date(base+i*864e5)));
  $("#weekRhythm").innerHTML=order.map((dw,i)=>{const it=PROG.filter(w=>w.dow===dw&&visible({...w,kind:"prog",park:"chula"}));return `<div class="wk"><div class="d">${esc(names[i])}</div>${it.length?it.map(w=>`<div class="it" style="--c:${CATS[w.cat].c}"><b>${w.s}${t("timeSuffix")}</b>${esc(L(w))}</div>`).join(""):`<div class="it" style="--c:var(--line-strong)">—</div>`}</div>`;}).join("");
  const short=Array.from({length:7},(_,i)=>new Intl.DateTimeFormat(loc(),{timeZone:"UTC",weekday:"narrow"}).format(new Date(base+i*864e5)));
  let out="";
  for(let m=0;m<12;m++){
    const y=state.y,n=dim(y,m),first=(dowOf(y,m,1)+6)%7,hl=[],seen=new Set();
    let cells=short.map(s=>`<span class="h">${esc(s)}</span>`).join("")+"<span></span>".repeat(first);
    for(let d=1;d<=n;d++){const sp=eventsOn(y,m,d).filter(e=>e.kind==="real"&&visible(e));sp.forEach(e=>{if(!seen.has(e.id)||!e.end){hl.push(e);seen.add(e.id);}});const td=isToday(y,m,d)?" today":"";
      if(sp.length)cells+=`<span class="md has${td}" style="--c:${CATS[sp[0].cat].c}">${d}</span>`;else cells+=`<span class="md${td}">${d}</span>`;}
    const mName=fmt(y,m,1,{month:"long"});
    out+=`<article class="mcard${y===NOW.y&&m===NOW.m?" current":""}"><div class="mhead"><button type="button" data-month="${m}" aria-label="${esc(t("openMonth")(mName))}">${esc(mName)}${icon("chevron-right")}</button></div><div class="mini" aria-hidden="true">${cells}</div><ul class="hl">${hl.map(e=>`<li><button type="button" data-open="${e.uid}" style="--c:${CATS[e.cat].c}"><span class="dot" aria-hidden="true"></span><span class="dt">${e.d} ${esc(fmt(y,m,e.d,{month:"short"}))}</span><span>${esc(L(e))}<small class="hl-park">${esc(L(PARKS[e.park]))}</small></span></button></li>`).join("")||`<li class="none">${esc(t("noHighlights"))}</li>`}</ul></article>`;
  }
  $("#months").innerHTML=out;
}
function renderEvents(){
  renderFilters();renderStrip();
  $("#weekView").hidden=state.view!=="week";$("#monthView").hidden=state.view!=="month";$("#yearView").hidden=state.view!=="year";
  ({week:renderWeek,month:renderMonth,year:renderYear})[state.view]();
}

/* ================= map ================= */
const zoneToday=z=>eventsOn(TODAY.y,TODAY.m,TODAY.d).filter(e=>e.z===z);
function renderMap(){
  const z=state.mapZone;
  $("#zoneList").innerHTML=[["",t("allZones"),"layout-grid"],...Object.entries(ZONES).map(([k,v])=>[k,L(v),v.icon])].map(([k,l,ic])=>{const n=k?zoneToday(k).length:0;return `<li><button type="button" data-zone="${k}" aria-pressed="${(z||"")===k}">${icon(ic)}<span class="zl">${esc(l)}</span>${k&&n?`<span class="zc">${esc(t("nToday")(n))}</span>`:""}</button></li>`;}).join("");
  $$("#mapCanvas .marker").forEach(m=>m.remove());
  $("#mapCanvas").insertAdjacentHTML("beforeend",Object.entries(ZONES).map(([k,v])=>{const n=zoneToday(k).length;return `<button type="button" class="marker" data-zone="${k}" aria-pressed="${z===k}" style="left:${v.x}%;top:${v.y}%;--z:${v.color}" aria-label="${esc(L(v)+(n?", "+t("nToday")(n):""))}" data-tip="${esc(L(v))}" data-tip-narrow><span class="mi">${icon(v.icon)}</span><span class="ml">${esc(LA(v.short))}</span>${n?`<span class="mbadge" aria-hidden="true">${n}</span>`:""}</button>`;}).join(""));
  $("#mapCanvas > img").alt=t("mapTitle");
  $("#mapCard").classList.toggle("has-sel",!!z);
  const pop=$("#zonePop");
  if(z){const v=ZONES[z],td=zoneToday(z).slice(0,2);pop.hidden=false;
    pop.innerHTML=`<img src="${IMG[v.img]}" alt=""><div class="zp"><h3>${esc(L(v))}</h3><p>${esc(S(v,"d"))}</p>${td.length?`<ul class="ztoday">${td.map(e=>`<li><b>${e.s}</b> ${esc(L(e))}</li>`).join("")}</ul>`:""}
      <button type="button" class="btn" data-zonepanel="${z}">${esc(t("viewZone"))}${icon("arrow-right")}</button></div>
      <button type="button" class="icon-btn close" data-zone="" aria-label="${esc(t("close"))}" data-tip="${esc(t("close"))}">${icon("x")}</button>`;
  } else pop.hidden=true;
  const fac=z?ZONES[z].fac:PARK_INFO;
  $("#facilities").innerHTML=`<h3>${esc(z?t("facilitiesIn")(L(ZONES[z])):t("facilitiesAll"))}</h3><ul>${fac.map(f=>`<li>${icon("check")}<span>${esc(LA(f))}</span></li>`).join("")}</ul>`;
}
function renderAbout(){
  $("#aboutStats").innerHTML=statsHtml();
  $("#srcList").innerHTML=SOURCES.concat(CREDITS).map(([l,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(l)}${icon("external-link")}</a></li>`).join("")+`<li class="muted-li">${esc(state.lang==="th"?"โปสเตอร์และรายการกิจกรรมที่ทีม Latte and Friends รวบรวมในแชท (10 พ.ย. 2569)":"Posters and event lists collected by team Latte and Friends (10 Nov 2026)")}</li>`;
}

/* ================= router ================= */
let READY=false;
function render(){
  if(!READY)return;
  renderChrome();
  $$("[data-route]").forEach(s=>s.hidden=s.dataset.route!==state.route);
  ({home:renderHome,events:renderEvents,map:renderMap,about:renderAbout})[state.route]();
  if(panel.mode)renderPanel();
}
function fromHash(){const h=location.hash.replace("#","");state.route=ROUTES.includes(h)?h:"home";}
window.addEventListener("hashchange",()=>{fromHash();closeAll(false);render();window.scrollTo(0,0);const h=$(`[data-route="${state.route}"] h1`);if(h)h.focus({preventScroll:true});});
function go(route){if(location.hash==="#"+route){render();window.scrollTo(0,0);}else location.hash=route;}

/* ================= overlays ================= */
const overlay={current:null,opener:null,stack:[]};
const panel={mode:null,uid:null,hist:[],sel:null};
function focusables(el){return [...el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null);}
function show(id,opener){
  if(overlay.current&&overlay.current!==id)overlay.stack.push({id:overlay.current,opener:overlay.opener});else if(!overlay.current)overlay.stack=[];
  overlay.opener=opener||document.activeElement;overlay.current=id;
  $("#"+id).classList.add("on");$("#scrim").classList.add("on");$("#app").setAttribute("inert","");document.body.style.overflow="hidden";
  if(id==="menuSheet")$("#menuBtn").setAttribute("aria-expanded","true");
  hideTip();setTimeout(()=>focusIn(id),40);
}
function focusIn(id){const el=$("#"+id);const f=el.querySelector("[data-autofocus]")||focusables(el)[0];if(f)f.focus();}
function hide(restore=true){
  const id=overlay.current;if(!id)return;
  $("#"+id).classList.remove("on");hideTip();
  if(id==="menuSheet")$("#menuBtn").setAttribute("aria-expanded","false");
  if(id==="panel"){panel.mode=null;panel.hist=[];}
  const opener=overlay.opener,prev=overlay.stack.pop();
  if(prev){overlay.current=prev.id;overlay.opener=prev.opener;if(prev.id==="panel")renderPanel();
    if(restore&&opener&&document.contains(opener))setTimeout(()=>opener.focus(),20);else setTimeout(()=>focusIn(prev.id),20);return;}
  overlay.current=null;$("#scrim").classList.remove("on");$("#app").removeAttribute("inert");document.body.style.overflow="";
  const key=opener&&(opener.dataset.uid||opener.dataset.open||opener.dataset.book||opener.dataset.ticket||opener.dataset.zonepanel||opener.dataset.action||opener.id);
  render();
  if(!restore)return;
  if(opener&&document.contains(opener)&&opener.offsetParent!==null){opener.focus();return;}
  const rs=`[data-route="${state.route}"]`;
  const alt=key&&($(`${rs} [data-uid="${key}"]`)||$(`${rs} [data-open="${key}"]`)||$(`${rs} [data-zonepanel="${key}"]`)||$(`${rs} [data-zone="${key}"]`)||(key==="mine"&&($(".head-mine").offsetParent?$(".head-mine"):$("#menuBtn")))||$(`#${CSS.escape(key)}`));
  if(alt&&alt.offsetParent!==null)alt.focus();else $("#main").focus();
}
function closeAll(restore){while(overlay.current)hide(restore);}
$("#scrim").addEventListener("click",()=>hide());
document.addEventListener("keydown",ev=>{
  if(!overlay.current)return;
  if(ev.key==="Escape"){ev.preventDefault();hide();return;}
  if(ev.key==="Tab"){const f=focusables($("#"+overlay.current));if(!f.length)return;const i=f.indexOf(document.activeElement);
    if(ev.shiftKey&&i<=0){ev.preventDefault();f[f.length-1].focus();}else if(!ev.shiftKey&&i===f.length-1){ev.preventDefault();f[0].focus();}}
});
function announce(msg){const l=$("#live");l.textContent="";setTimeout(()=>l.textContent=msg,30);}

/* tooltips */
const tipEl=$("#tip");
function showTip(el){const txt=el.dataset.tip;if(!txt)return;if(el.hasAttribute("data-tip-narrow")&&!matchMedia("(max-width:767.98px)").matches)return;
  tipEl.textContent=txt;tipEl.hidden=false;const r=el.getBoundingClientRect(),w=tipEl.offsetWidth,h=tipEl.offsetHeight;
  let x=Math.min(Math.max(8,r.left+r.width/2-w/2),innerWidth-w-8),y=r.bottom+8;if(y+h>innerHeight-8)y=r.top-h-8;tipEl.style.left=x+"px";tipEl.style.top=y+"px";}
function hideTip(){tipEl.hidden=true;}
document.addEventListener("pointerover",e=>{const el=e.target.closest("[data-tip]");if(el&&e.pointerType==="mouse")showTip(el);});
document.addEventListener("pointerout",e=>{const el=e.target.closest("[data-tip]");if(el&&!el.contains(e.relatedTarget))hideTip();});
let lastPtr=0;document.addEventListener("pointerdown",()=>{lastPtr=Date.now();hideTip();},true);
document.addEventListener("focusin",e=>{const el=e.target.closest("[data-tip]");if(el&&el.matches(":focus-visible")&&Date.now()-lastPtr>600)showTip(el);else hideTip();});
document.addEventListener("focusout",hideTip);addEventListener("scroll",hideTip,{passive:true});

/* ---------- side panel ---------- */
function openPanel(mode,uid,opener){
  if(overlay.current==="panel")panel.hist.push({mode:panel.mode,uid:panel.uid});else panel.hist=[];
  panel.mode=mode;panel.uid=uid;panel.sel=null;renderPanel();
  if(overlay.current!=="panel"){if(overlay.current)closeAll(false);show("panel",opener);}else setTimeout(()=>focusIn("panel"),20);
}
function panelBack(){const p=panel.hist.pop();if(!p)return hide();panel.mode=p.mode;panel.uid=p.uid;renderPanel();setTimeout(()=>focusIn("panel"),20);}
const closeBtn=()=>`<button class="icon-btn" type="button" data-close="panel" aria-label="${esc(t("close"))}" data-tip="${esc(t("close"))}">${icon("x")}</button>`;
const backBtn=()=>panel.hist.length?`<button class="icon-btn" type="button" data-back aria-label="${esc(t("back"))}" data-tip="${esc(t("back"))}">${icon("chevron-left")}</button>`:"";
const fact=(ic,l,a,s)=>`<div><dt>${icon(ic)}<span class="sr-only">${esc(l)}</span></dt><dd>${esc(a)}${s?`<small>${esc(s)}</small>`:""}</dd></div>`;
function renderPanel(){
  const head=$("#pHead"),body=$("#pBody"),foot=$("#pFoot"),m=panel.mode;if(!m)return;
  const e=panel.uid&&panel.uid.includes("@")?findEvent(panel.uid):null;
  if(m==="detail"){
    const st=statusOf(e),rt=rangeText(e);
    head.innerHTML=`${backBtn()}<span class="cat-line" style="--c:${CATS[e.cat].c}"><span class="dot" aria-hidden="true"></span>${esc(L(CATS[e.cat]))}</span>${saveBtn(e)}${closeBtn()}`;
    const vph=e.kind==="real"&&!IMG[e.id]&&IMG["park:"+e.park];
    const top=vph?`<div class="d-media"><img src="${vph}" alt=""><span class="venue-cap">${esc((state.lang==="th"?"ภาพสถานที่: ":"Venue photo: ")+L(PARKS[e.park]))}</span></div>`:e.kind==="real"&&!IMG[e.id]?`<div class="d-media poster" style="--c:${CATS[e.cat].c}"><span class="pz-ic">${icon(CATS[e.cat].icon)}</span><span class="pz-park">${esc(L(PARKS[e.park]))}</span></div>`:`<div class="d-media"><img src="${IMG[e.id]||IMG[e.img]}" alt=""></div>`;
    let facts=fact("calendar-days",t("fDate"),rt||fmtLong(e),rt?fmtLong(e):"")+fact("clock",t("fTime"),timeRange(e),st?st.txt:"")+fact("map-pin",t("fPlace"),placeOf(e),e.kind==="real"?S(PARKS[e.park],"d"):"");
    let extra="";
    if(e.kind==="real"){
      if(e.cost)facts+=fact("ticket",t("fCost"),LA(e.cost));
      if(e.reg)facts+=fact("external-link",t("fReg"),LA(e.reg));
      if(e.org)facts+=fact("users",t("fOrg"),LA(e.org));
      if(e.sched)extra+=`<h3 class="grp">${icon("clock")}${esc(t("fSched"))}</h3><ul class="sched">${e.sched.map(r=>`<li><b>${esc(r[0])}</b><span>${esc(state.lang==="th"?r[1]:r[2])}</span></li>`).join("")}</ul>`;
      if(e.venueCheck)extra+=`<p class="warn">${icon("info")}<span>${esc(t("venueCheck"))}</span></p>`;
      if(e.posterOnly)extra+=`<p class="warn">${icon("info")}<span>${esc(t("posterOnly"))}</span></p>`;
      extra+=`<h3 class="grp">${icon("book-open")}${esc(t("fSources"))}</h3><ul class="srcs">${e.src.map(s=>s[2]?`<li><a href="${s[2]}" target="_blank" rel="noopener">${esc(LA(s))}${icon("external-link")}</a></li>`:`<li>${esc(LA(s))}</li>`).join("")}</ul>`;
    } else {
      const lv=LEVEL[e.lv],sh=SHELTER[e.sh],b=bookingOf(e.uid),left=seatsLeft(e);
      facts+=fact("leaf",t("fLevel"),L(lv),S(lv,"s"))+fact("umbrella",t("fShelter"),L(sh),S(sh,"s"))+fact("backpack",t("fBring"),bringOf(e))+
        fact("users",t("fSeats"),`${t("free")} · ${left?t("seatsShort")(left,e.cap):t("full")}`,b?`${t("booked")} · ${t("peopleShort")(b.people)}`:"");
      extra=`<div class="inline-acts"><button type="button" class="link-btn" data-zonepanel="${e.z}">${icon("map")}${esc(t("viewZone"))}</button></div>`;
    }
    body.innerHTML=`${top}<div class="d-content">${badge(e)}<h2 id="pTitle" tabindex="-1">${esc(L(e))}</h2>${e.kind==="prog"?`<p class="warn">${icon("info")}<span>${esc(t("progNote"))}</span></p>`:""}<p class="desc">${esc(S(e,"d"))}</p><dl class="facts">${facts}</dl>${extra}</div>`;
    const regBtn=e.kind==="real"&&e.reg&&e.reg[2]&&!isPast(e)?`<a class="btn btn-primary" href="${e.reg[2]}" target="_blank" rel="noopener">${icon("external-link")}<span>${esc(t("register"))}</span></a>`:"";
    foot.innerHTML=(e.kind==="real"?regBtn:bookButton(e))+`<div class="foot-row"><a class="btn btn-secondary" href="${lineUrl(e)}" target="_blank" rel="noopener">${icon("share-2")}<span>${esc(t("shareLine"))}</span></a><a class="btn btn-secondary" href="${gcalUrl(e)}" target="_blank" rel="noopener">${icon("calendar-plus")}<span>${esc(t("addCal"))}</span></a></div><button type="button" class="link-btn" style="justify-content:center" data-copy="${e.uid}">${icon("copy")}${esc(t("copy"))}</button><p class="note" id="copyNote" aria-live="polite"></p>`;
  }
  else if(m==="book"){
    const max=Math.max(1,Math.min(4,seatsLeft(e))),plan=spotsOf(e);
    head.innerHTML=`${backBtn()}<span class="head-title">${esc(t("bookHead"))}</span>${closeBtn()}`;
    let spotHtml=`<p class="open-note">${icon("info")}<span>${esc(t("openArea"))}</span></p>`;
    if(plan){
      const types=["mat","chair","wheel"].filter(ty=>plan.list.some(s=>s.type===ty));
      if(!panel.selType)panel.selType=types.find(ty=>plan.list.some(s=>s.type===ty&&s.free))||types[0];
      const lbl=ty=>spotLabel(ty,plan.kind);
      const typeCards=types.map(ty=>{const free=plan.list.filter(s=>s.type===ty&&s.free).length;return `<label class="tcard${free?"":" off"}"><input type="radio" name="stype" value="${ty}" ${panel.selType===ty?"checked":""} ${free?"":"disabled"}><span class="ti">${icon(SPOT[ty].icon)}</span><span class="tt"><b>${esc(lbl(ty))}</b><span>${esc(S(SPOT[ty],"s"))}</span></span><span class="tl">${esc(t("left")(free))}</span></label>`;}).join("");
      const spots=plan.list.map(s=>{const name=t("spotName")(lbl(s.type),s.n),st=s.mine?t("lgMine"):s.taken?t("lgTaken"):t("lgFree"),selc=panel.sel===s.i;
        return `<button type="button" class="spot ${s.type}${s.taken?" taken":""}${s.mine?" mine":""}${s.type!==panel.selType?" dim":""}" data-spot="${s.i}" aria-pressed="${selc}" ${s.free?"":'aria-disabled="true"'} aria-label="${esc(name+", "+st)}" data-tip="${esc(name)}">${icon(SPOT[s.type].icon)}</button>`;}).join("");
      const selS=panel.sel!=null?plan.list.find(s=>s.i===panel.sel):null;
      spotHtml=`<fieldset class="field spotset"><legend>${esc(t("spotL"))}</legend><p class="hint">${esc(t("spotHint"))}</p>
        <div class="tcards">${typeCards}</div>
        <div class="plan" role="group" aria-label="${esc(t("spotL"))}"><div class="stage">${esc(t("stage")[plan.kind])}</div><div class="spots" style="--cols:${plan.cols}">${spots}</div><div class="entrance">${icon("accessibility")}${esc(t("entrance"))}</div></div>
        <div class="legend" aria-hidden="true"><span><i class="lg free"></i>${esc(t("lgFree"))}</span><span><i class="lg taken"></i>${esc(t("lgTaken"))}</span><span><i class="lg sel"></i>${esc(t("yourSpot"))}</span></div>
        <p class="your-spot" aria-live="polite"><b>${esc(t("yourSpot"))}:</b> ${esc(selS?t("spotName")(lbl(selS.type),selS.n):t("anySpot")(lbl(panel.selType)))}</p>
        <p class="err" id="spotErr" hidden></p></fieldset>`;
    }
    body.innerHTML=`<form id="bookForm" class="d-content" novalidate>
      <div class="book-sum"><img src="${IMG[e.img]}" alt=""><div><h2 id="pTitle" tabindex="-1">${esc(L(e))}</h2><p>${esc(fmtShort(e))} · ${esc(timeRange(e))}</p><p>${esc(placeOf(e))}</p></div></div>
      <div class="field"><label for="bName">${esc(t("nameL"))}</label><p class="hint" id="bNameHint">${esc(t("nameHint"))}</p>
        <input id="bName" name="name" autocomplete="name" value="${esc(savedName)}" aria-describedby="bNameHint bNameErr" data-autofocus><p class="err" id="bNameErr" hidden></p></div>
      <div class="field"><label for="bPeople">${esc(t("peopleL"))}</label>
        <select id="bPeople">${Array.from({length:max},(_,i)=>`<option value="${i+1}" ${panel.people===i+1?"selected":""}>${esc(t("personN")(i+1))}</option>`).join("")}</select></div>
      ${spotHtml}
    </form>`;
    foot.innerHTML=`<button type="submit" form="bookForm" class="btn btn-primary">${esc(t("confirmBook"))}</button><button type="button" class="btn btn-secondary" ${panel.hist.length?"data-back":'data-close="panel"'}>${esc(t("cancel"))}</button>`;
    wireBooking(e,plan);
  }
  else if(m==="booked"||m==="ticket"){
    const b=bookingOf(e.uid);if(!b){panel.mode="mine";return renderPanel();}
    const plan=spotsOf(e),spotTxt=b.spots&&b.spots.length&&plan?b.spots.map(i=>{const s=plan.list.find(x=>x.i===i);return s?t("spotName")(spotLabel(s.type,plan.kind),s.n):"";}).join(", "):"";
    head.innerHTML=`${m==="ticket"?backBtn():""}<span class="head-title">${esc(m==="booked"?t("bookHead"):t("viewBooking"))}</span>${closeBtn()}`;
    body.innerHTML=`<div class="d-content ${m==="booked"?"success":""}">${m==="booked"?`<div class="check">${icon("check")}</div><h2 id="pTitle" tabindex="-1">${esc(t("youreBooked"))}</h2><p>${esc(t("seeYou"))}<b>${esc(L(e))}</b></p>`:`<h2 id="pTitle" tabindex="-1">${esc(L(e))}</h2>`}
      <div class="ticket"><span class="tk-l">${esc(t("codeL"))}</span><span class="tk-code">${esc(b.code)}</span><span class="tk-h">${esc(t("codeHint"))}</span></div>
      <dl class="facts">${fact("calendar-days",t("fDate"),fmtLong(e))+fact("clock",t("fTime"),timeRange(e))+fact("map-pin",t("fPlace"),placeOf(e))+fact("users",t("bookedFor"),`${b.name} · ${t("peopleShort")(b.people)}`,spotTxt)+fact("backpack",t("fBring"),bringOf(e))}</dl></div>`;
    foot.innerHTML=`<div class="foot-row"><a class="btn btn-secondary" href="${gcalUrl(e)}" target="_blank" rel="noopener">${icon("calendar-plus")}<span>${esc(t("addCal"))}</span></a><a class="btn btn-secondary" href="${lineUrl(e)}" target="_blank" rel="noopener">${icon("share-2")}<span>${esc(t("shareLine"))}</span></a></div>`+
      (m==="booked"?`<button type="button" class="btn btn-primary" data-close="panel" data-autofocus>${esc(t("close"))}</button><button type="button" class="link-btn" style="justify-content:center" data-action="mine">${esc(t("viewMine"))}</button>`
                   :(isPast(e)?"":`<button type="button" class="link-btn danger" style="justify-content:center" data-cancel="${e.uid}">${esc(t("cancelBooking"))}</button>`));
  }
  else if(m==="mine"){
    head.innerHTML=`${backBtn()}<h2 id="pTitle" class="head-title" tabindex="-1">${esc(t("myBookings"))}</h2>${closeBtn()}`;
    const all=bookings.map(b=>({b,e:findEvent(b.uid)})).filter(x=>x.e).sort((a,c)=>a.e.key.localeCompare(c.e.key)||toMin(a.e.s)-toMin(c.e.s));
    const up=all.filter(x=>!isPast(x.e)),past=all.filter(x=>isPast(x.e)).reverse();
    const tabs=[["up",t("tUp"),up.length],["past",t("tPast"),past.length],["saved",t("tSaved"),savedIds.length]];
    let list="";
    const emptyBox=(h,p,cta)=>`<div class="empty"><b style="display:block;color:var(--ink)">${esc(h)}</b>${esc(p)}</div>${cta?`<div style="margin-top:var(--s4)"><a class="btn btn-primary" href="#events">${esc(t("browse"))}</a></div>`:""}`;
    const item=(e,inner,acts)=>`<li class="mine-item"><img src="${IMG[e.img]||IMG.rest}" alt=""><div style="min-width:0"><div class="n">${esc(L(e))}</div>${inner}<div class="acts">${acts}</div></div></li>`;
    if(state.mineTab==="up")list=up.length?`<ul class="mine-list">${up.map(({b,e})=>item(e,`<div class="m">${esc(fmtShort(e))} · ${esc(timeRange(e))}</div><div class="m">${esc(placeShort(e))} · ${esc(t("peopleShort")(b.people))} · <b>${esc(b.code)}</b></div>`,`<button type="button" class="link-btn" data-ticket="${e.uid}">${esc(t("seeBooking"))}</button><button type="button" class="link-btn danger" data-cancel="${e.uid}">${esc(t("cancelBooking"))}</button>`)).join("")}</ul>`:emptyBox(t("emptyUpH"),t("emptyUp"),true);
    if(state.mineTab==="past")list=past.length?`<ul class="mine-list">${past.map(({b,e})=>item(e,`<div class="m">${esc(fmtShort(e))} · ${esc(timeRange(e))}</div>`,`<button type="button" class="link-btn" data-ticket="${e.uid}">${esc(t("seeBooking"))}</button>`)).join("")}</ul>`:emptyBox(t("emptyPastH"),t("emptyPast"),false);
    if(state.mineTab==="saved"){const sv=savedIds.map(id=>({id,e:nextOccurrence(id)})).filter(x=>x.e);
      list=sv.length?`<ul class="mine-list">${sv.map(({id,e})=>item(e,`<div class="m">${esc(t("nextOcc"))}: ${esc(fmtShort(e))} · ${esc(timeRange(e))}</div><div class="m">${esc(placeShort(e))}</div>`,`<button type="button" class="link-btn" data-open="${e.uid}">${esc(t("seeDetails"))}</button><button type="button" class="link-btn" data-save="${id}" aria-pressed="true">${esc(t("remove"))}</button>`)).join("")}</ul>`:emptyBox(t("emptySavedH"),t("emptySaved"),true);}
    body.innerHTML=`<div class="d-content"><div class="seg tabs" role="group" aria-label="${esc(t("myBookings"))}">${tabs.map(([k,l,n])=>`<button type="button" data-tab="${k}" aria-pressed="${state.mineTab===k}">${esc(l)} <span class="tn">${n}</span></button>`).join("")}</div>${list}</div>`;
    foot.innerHTML="";
  }
  else if(m==="zone"){
    const z=panel.uid,v=ZONES[z],td=zoneToday(z),later=upcoming(addDays(TODAY,1),6,false).filter(x=>x.z===z).slice(0,4);
    head.innerHTML=`${backBtn()}<span class="cat-line" style="--c:${v.color}"><span class="dot" aria-hidden="true"></span>${esc(t("fZoneLbl"))} · ${esc(L(PARKS.chula))}</span>${closeBtn()}`;
    body.innerHTML=`<div class="d-media"><img src="${IMG[v.img]}" alt=""></div><div class="d-content"><h2 id="pTitle" tabindex="-1">${esc(L(v))}</h2><p class="desc">${esc(S(v,"d"))}</p>
      <dl class="facts">${fact("info",t("fGood"),S(v,"g"))}</dl>
      <h3 class="grp">${esc(t("todayHere"))}</h3>${td.length?`<ul class="rows">${td.map(x=>`<li>${rowItem(x,`data-open="${x.uid}"`)}</li>`).join("")}</ul>`:`<p class="muted">${esc(t("nothingToday"))}</p>`}
      ${later.length?`<h3 class="grp">${esc(t("laterHere"))}</h3><ul class="rows">${later.map(x=>`<li>${rowItem(x,`data-open="${x.uid}"`)}</li>`).join("")}</ul>`:""}
      <h3 class="grp">${esc(t("facilitiesIn")(L(v)))}</h3><ul class="faclist">${v.fac.map(f=>`<li>${icon("check")}<span>${esc(LA(f))}</span></li>`).join("")}</ul></div>`;
    foot.innerHTML=`<button type="button" class="btn btn-primary" data-zoneacts="${z}">${esc(t("seeZoneActs"))}</button>`+(state.route!=="map"?`<a class="btn btn-secondary" href="#map" data-mapzone="${z}">${icon("map")}<span>${esc(t("viewOnMap"))}</span></a>`:"");
  }
  else if(m==="filters"){
    head.innerHTML=`<h2 id="pTitle" class="head-title" tabindex="-1">${esc(t("fTitle"))}</h2>${closeBtn()}`;
    const radios=(name,opts,cur)=>opts.map(([v,l,sub,ic])=>`<label class="opt"><input type="radio" name="${name}" value="${v}" ${(cur||"")===v?"checked":""}>${ic?icon(ic):""}<span><b>${esc(l)}</b>${sub?`<span>${esc(sub)}</span>`:""}</span></label>`).join("");
    body.innerHTML=`<form class="d-content filters-form" id="fForm">
      <fieldset><legend>${esc(t("fPark"))}</legend>${radios("park",[["",t("any")],["chula",t("parkOpt").chula,"","trees"],["other",t("parkOpt").other,"","map-pin"]],state.park)}</fieldset>
      <fieldset><legend>${esc(t("fMood"))}</legend>${radios("mood",[["",t("any")],...Object.entries(MOODS).map(([k,m])=>[k,L(m),S(m,"s"),m.icon])],state.mood)}</fieldset>
      <fieldset><legend>${esc(t("fEffort"))}</legend>${radios("effort",[["",t("any")],...Object.entries(LEVEL).map(([k,l])=>[k,L(l),S(l,"s")])],state.effort)}</fieldset>
      <fieldset><legend>${esc(t("fTod"))}</legend>${radios("tod",[["",t("any")],...Object.entries(t("tod")).map(([k,l])=>[k,l])],state.tod)}</fieldset>
      <fieldset><legend>${esc(t("fZone"))}</legend>${radios("zone",[["",t("any")],...Object.entries(ZONES).map(([k,v])=>[k,L(v),"",v.icon])],state.zone)}</fieldset>
      <fieldset><legend class="sr-only">${esc(t("fCovered"))}</legend><button type="button" class="switch" role="switch" id="fCovered" aria-checked="${state.covered}"><span class="track" aria-hidden="true"></span><span>${esc(t("fCovered"))}</span></button></fieldset>
    </form>`;
    const n=upcoming(state.sel,7).length;
    foot.innerHTML=`<button type="button" class="btn btn-primary" data-close="panel">${esc(t("showN")(n))} <span class="sub">${esc(t("nWeek"))}</span></button><button type="button" class="btn btn-secondary" data-clear>${esc(t("clear"))}</button>`;
    $("#fForm").addEventListener("change",ev=>{const i=ev.target;if(i.type==="radio"){state[i.name]=i.value||null;renderEvents();renderPanelFoot();}});
  }
  foot.hidden=!foot.innerHTML;
}
function renderPanelFoot(){const n=upcoming(state.sel,7).length;const b=$("#pFoot .btn-primary");if(b)b.innerHTML=`${esc(t("showN")(n))} <span class="sub">${esc(t("nWeek"))}</span>`;}
function wireBooking(e,plan){
  const inp=$("#bName"),err=$("#bNameErr");
  const validate=()=>{const bad=!inp.value.trim();inp.setAttribute("aria-invalid",String(bad));err.hidden=!bad;err.textContent=bad?t("nameErr"):"";return !bad;};
  inp.addEventListener("blur",ev=>{if(ev.relatedTarget&&ev.relatedTarget.matches("[data-back],[data-close],[data-spot],input[name=stype]"))return;validate();});
  inp.addEventListener("input",()=>{savedName=inp.value;ls.set("genera-name2",savedName);if(inp.getAttribute("aria-invalid")==="true"){inp.setAttribute("aria-invalid","false");err.hidden=true;}});
  $("#bPeople").addEventListener("change",ev=>{panel.people=+ev.target.value;});
  $$('#bookForm input[name=stype]').forEach(r=>r.addEventListener("change",()=>{panel.selType=r.value;if(panel.sel!=null&&plan.list[panel.sel].type!==r.value)panel.sel=null;keepForm(()=>renderPanel(),`input[name=stype][value=${r.value}]`);}));
  $("#bookForm").addEventListener("submit",ev=>{ev.preventDefault();
    if(!validate()){inp.focus();return;}
    const people=+$("#bPeople").value;let spots=[];
    if(plan){const ty=panel.selType;const free=plan.list.filter(s=>s.type===ty&&s.free);
      if(free.length<people){const se=$("#spotErr");se.hidden=false;se.textContent=t("spotErr")(free.length,spotLabel(ty,plan.kind));se.scrollIntoView({block:"nearest"});return;}
      const start=panel.sel!=null?panel.sel:free[0].i;spots=[start,...free.filter(s=>s.i!==start).sort((a,b)=>Math.abs(a.i-start)-Math.abs(b.i-start)).slice(0,people-1).map(s=>s.i)];}
    savedName=inp.value.trim();ls.set("genera-name2",savedName);
    bookings.push({uid:e.uid,name:savedName,people,spots,type:plan?panel.selType:null,code:codeFor(e.uid,savedName)});saveBookings();
    panel.hist=[];panel.mode="booked";panel.selType=null;panel.sel=null;panel.people=null;renderPanel();renderChrome();announce(t("youreBooked"));setTimeout(()=>focusIn("panel"),20);});
}
function keepForm(fn,refocus){const name=$("#bName")?$("#bName").value:"";const scroll=$("#pBody").scrollTop;fn();if($("#bName"))$("#bName").value=name;$("#pBody").scrollTop=scroll;const f=refocus&&$("#pBody").querySelector(refocus);if(f)f.focus();}
function askCancel(uid,opener){const e=findEvent(uid);
  $("#confirmBody").innerHTML=`<h2 id="cTitle">${esc(t("cancelQ")(L(e)))}</h2><p id="cDesc">${esc(t("cancelD")(fmtShort(e)))}</p><div class="dlg-actions"><button type="button" class="btn btn-secondary" data-close="confirm" data-autofocus>${esc(t("keepBooking"))}</button><button type="button" class="btn btn-danger" data-docancel="${uid}">${esc(t("cancelBooking"))}</button></div>`;
  show("confirm",opener);}

/* ================= events wiring ================= */
let qTimer=null;
$("#q").addEventListener("input",ev=>{clearTimeout(qTimer);qTimer=setTimeout(()=>{state.q=ev.target.value;renderEvents();},150);});
document.addEventListener("click",async ev=>{
  const b=ev.target.closest("button,a");if(!b)return;
  if(b.getAttribute("aria-disabled")==="true"){ev.preventDefault();return;}
  if(b.dataset.lang){state.lang=b.dataset.lang;ls.set("genera-lang2",state.lang);render();return;}
  if(b.hasAttribute("data-back")){panelBack();return;}
  if(b.dataset.close){hide();return;}
  if(b.id==="menuBtn"){show("menuSheet",b);return;}
  if(b.closest("#sheetNav")&&b.tagName==="A"){closeAll(false);return;}
  if(b.dataset.action==="mine"){const op=overlay.current==="menuSheet"?$("#menuBtn"):b;if(overlay.current==="menuSheet")closeAll(false);if(panel.mode==="booked")panel.hist=[];state.mineTab="up";openPanel("mine",null,op);return;}
  if(b.dataset.tab){state.mineTab=b.dataset.tab;renderPanel();$(`[data-tab="${b.dataset.tab}"]`).focus();return;}
  if(b.dataset.open){openPanel("detail",b.dataset.open,b);return;}
  if(b.dataset.book){panel.selType=null;panel.people=null;openPanel("book",b.dataset.book,b);return;}
  if(b.dataset.ticket){openPanel("ticket",b.dataset.ticket,b);return;}
  if(b.dataset.zonepanel){openPanel("zone",b.dataset.zonepanel,b);return;}
  if(b.dataset.spot){const i=+b.dataset.spot,e=findEvent(panel.uid),plan=spotsOf(e),s=plan.list[i];panel.sel=panel.sel===i?null:i;panel.selType=s.type;keepForm(()=>renderPanel(),`[data-spot="${i}"]`);return;}
  if(b.dataset.save){const id=b.dataset.save,on=savedIds.includes(id);savedIds=on?savedIds.filter(x=>x!==id):[...savedIds,id];saveSaved();
    const e=nextOccurrence(id)||{th:id,en:id};announce(on?t("unsaveA")(L(e)):t("saved")+": "+L(e));
    const inPanel=!!b.closest("#panel");if(inPanel)renderPanel();if(state.route==="home")renderHome();if(state.route==="events")renderEvents();
    const f=(inPanel?$("#panel"):document).querySelector(`[data-save="${id}"]`);if(f)f.focus();else if(inPanel)focusIn("panel");return;}
  if(b.dataset.cancel){askCancel(b.dataset.cancel,b);return;}
  if(b.dataset.docancel){const e=findEvent(b.dataset.docancel);bookings=bookings.filter(x=>x.uid!==b.dataset.docancel);saveBookings();renderChrome();
    hide(false);if(panel.mode==="ticket"){panel.mode="mine";panel.hist=[];}renderPanel();announce(t("cancelledMsg")(L(e)));setTimeout(()=>{const f=$("#pBody button")||$("#pBody a[href]")||$("#pHead button");if(f)f.focus();},40);return;}
  if(b.dataset.copy){const e=findEvent(b.dataset.copy);try{await navigator.clipboard.writeText(shareText(e));$("#copyNote").textContent=t("copied");}catch(x){$("#copyNote").textContent=t("copyFail");}return;}
  if(b.dataset.src){state.src=b.dataset.src;renderEvents();$(`[data-src="${state.src}"]`).focus();return;}
  if(b.dataset.gosrc){Object.assign(state,DEF,{src:b.dataset.gosrc});state.view="week";state.sel={...TODAY};go("events");return;}
  if(b.dataset.mood){Object.assign(state,DEF,{mood:b.dataset.mood});state.view="week";state.sel={...TODAY};go("events");return;}
  if(b.id==="filterBtn"){openPanel("filters",null,b);return;}
  if(b.id==="fCovered"){state.covered=!state.covered;b.setAttribute("aria-checked",String(state.covered));renderEvents();renderPanelFoot();return;}
  if(b.dataset.unfilter){const k=b.dataset.unfilter;if(k==="q"){state.q="";$("#q").value="";}else state[k]=DEF[k];renderEvents();const n=$("#activeFilters button")||$("#filterBtn");n.focus();return;}
  if(b.hasAttribute("data-clear")){const wasPanel=panel.mode==="filters";Object.assign(state,DEF);$("#q").value="";if(state.route==="events")renderEvents();if(wasPanel){renderPanel();focusIn("panel");}else $("#q").focus();return;}
  if(b.classList.contains("chip")&&b.dataset.cat){state.cat=b.dataset.cat;renderEvents();$(`.chip[data-cat="${state.cat}"]`).focus();return;}
  if(b.dataset.view){state.view=b.dataset.view;if(state.view!=="week"){state.y=state.sel.y;state.m=state.sel.m;}renderEvents();$(`[data-view="${state.view}"]`).focus();return;}
  if(b.dataset.pick){const [y,m,d]=b.dataset.pick.split("-").map(Number);state.sel={y,m:m-1,d};renderEvents();$(`[data-pick="${b.dataset.pick}"]`).focus();return;}
  if(b.dataset.day){const [y,m,d]=b.dataset.day.split("-").map(Number);state.sel={y,m:m-1,d};state.y=y;state.m=m-1;renderMonth();renderStrip();const c=$(`#grid [data-day="${b.dataset.day}"]`);if(c)c.focus();
    if(matchMedia("(max-width:767.98px)").matches){const r=$("#dayPanel").getBoundingClientRect();if(r.top>innerHeight-140)$("#dayPanel").scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}return;}
  if(b.dataset.month){state.m=+b.dataset.month;state.sel={y:state.y,m:state.m,d:(state.y===NOW.y&&state.m===NOW.m)?NOW.d:1};state.view="month";renderEvents();window.scrollTo(0,0);$('[data-view="month"]').focus();return;}
  if(b.id==="prev"||b.id==="next"){const s=b.id==="prev"?-1:1;
    if(state.view==="week")state.sel=addDays(state.sel,7*s);
    else if(state.view==="month"){const dt=new Date(Date.UTC(state.y,state.m+s,1));state.y=dt.getUTCFullYear();state.m=dt.getUTCMonth();state.sel=(state.y===NOW.y&&state.m===NOW.m)?{...TODAY}:{y:state.y,m:state.m,d:Math.min(state.sel.d,dim(state.y,state.m))};}
    else state.y+=s;renderEvents();return;}
  if(b.id==="todayBtn"){state.sel={...TODAY};state.y=NOW.y;state.m=NOW.m;renderEvents();return;}
  if(b.hasAttribute("data-zone")){selectZone(b.dataset.zone||null,b);return;}
  if(b.dataset.zoneacts){Object.assign(state,DEF,{zone:b.dataset.zoneacts,src:"prog"});state.view="week";go("events");return;}
  if(b.dataset.mapzone){state.mapZone=b.dataset.mapzone;return;}
});
function selectZone(z,src){
  state.mapZone=z;
  const narrow=matchMedia("(max-width:767.98px)").matches;
  if(narrow&&z){renderMap();openPanel("zone",z,src);return;}
  renderMap();
  const fromMarker=src&&src.classList.contains("marker");
  const target=fromMarker?$(`#mapCanvas [data-zone="${z}"]`):$(`#zoneList [data-zone="${z||""}"]`);if(target)target.focus();
}
$("#zoneList").addEventListener("keydown",ev=>{
  const keys=["",...Object.keys(ZONES)],i=keys.indexOf(state.mapZone||"");
  if(ev.key==="ArrowDown"||ev.key==="ArrowUp"){ev.preventDefault();const n=keys[(i+(ev.key==="ArrowDown"?1:-1)+keys.length)%keys.length];state.mapZone=n||null;renderMap();$(`#zoneList [data-zone="${n}"]`).focus();}
  if(ev.key==="Enter"&&state.mapZone&&!matchMedia("(max-width:767.98px)").matches){const f=$("#zonePop [data-zonepanel]");if(f){ev.preventDefault();f.focus();}}
});
$("#grid").addEventListener("keydown",ev=>{const st={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[ev.key];if(!st)return;ev.preventDefault();
  const o=addDays(state.sel,st);state.sel=o;state.y=o.y;state.m=o.m;renderMonth();renderStrip();const c=$(`#grid [data-day="${keyOf(o.y,o.m,o.d)}"]`);if(c)c.focus();});

$$("[data-icon]").forEach(el=>el.innerHTML=ICONS[el.dataset.icon]||"");
fromHash();
loadData().then(()=>{READY=true;render();setInterval(()=>{if(!overlay.current)render();},60000);})
  .catch(err=>{console.error(err);$("#main").insertAdjacentHTML("afterbegin",`<div class="warn" role="alert">${icon("info")}<span>${state.lang==="th"?"โหลดข้อมูลกิจกรรมไม่สำเร็จ ลองรีเฟรชหน้านี้ ถ้าเปิดไฟล์จากเครื่อง ให้รันผ่านเซิร์ฟเวอร์ (ดู README)":"Couldn't load the activity data. Refresh the page — if you opened the file directly, run it through a local server (see README)."}</span></div>`);});
