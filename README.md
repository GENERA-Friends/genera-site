# GENERA — ปฏิทินกิจกรรมในสวน / Park activity calendar

เว็บไซต์โครงการ GENERA (SDG 11) แจ้งกิจกรรมในสวนสาธารณะกรุงเทพฯ ให้คนทั่วไปรู้ว่า **วันนี้มีอะไร** และดูล่วงหน้าทั้งปีแบบปฏิทิน ใช้ได้ทั้งภาษาไทยและอังกฤษ
มีแผนผังอุทยาน 100 ปี จุฬาฯ และระบบจองที่ (ตัวอย่าง) สำหรับโปรแกรมประจำสัปดาห์

A static website (HTML/CSS/JS, no build step) with an admin panel (หลังบ้าน) at `/admin` so the team can edit content without touching code.

---

## โครงสร้างไฟล์ / Structure

```
index.html              หน้าเว็บ (หน้าแรก กิจกรรม แผนผัง เกี่ยวกับ)
assets/css/styles.css   สไตล์
assets/js/app.js        การทำงานของเว็บ
assets/js/icons.js      ไอคอน (Lucide)
assets/img/             รูปภาพ, แผนผังอุทยาน (park-map.svg)
assets/img/uploads/     รูปที่อัปโหลดผ่านหลังบ้าน
data/events.json        กิจกรรมจริง (คอนเสิร์ต หนังกลางแปลง ตลาดนัด ฯลฯ)
data/programme.json     โปรแกรมประจำสัปดาห์ GENERA (จองได้)
data/zones.json         โซนบนแผนผังอุทยาน
data/site.json          ข้อมูลการเข้าใช้อุทยาน และแหล่งที่มา
admin/                  หลังบ้าน (Sveltia CMS)
```

**แก้เนื้อหา = แก้ไฟล์ใน `data/`** ผ่านหลังบ้าน หรือแก้ JSON ตรง ๆ ก็ได้

---

## 1. เปิดดูในเครื่อง / Run locally

เว็บโหลดข้อมูลจาก `data/*.json` จึง **ดับเบิลคลิก index.html เฉย ๆ ไม่ได้** ต้องเปิดผ่านเซิร์ฟเวอร์:

```bash
npx serve .            # หรือ
python3 -m http.server 8000
```

แล้วเปิด http://localhost:3000 (หรือ :8000). ใน VS Code ใช้ส่วนขยาย **Live Server** ก็ได้

## 2. ขึ้น GitHub และเปิดเว็บจริง / Publish with GitHub Pages

1. สร้าง repo ใหม่บน GitHub เช่น `genera-site` (Public)
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (ลากใส่หน้า repo ได้เลย หรือใช้คำสั่ง)
   ```bash
   git init && git add . && git commit -m "GENERA site"
   git branch -M main
   git remote add origin https://github.com/<ชื่อผู้ใช้>/genera-site.git
   git push -u origin main
   ```
3. ไปที่ **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save
4. รอ 1–2 นาที เว็บจะอยู่ที่ `https://<ชื่อผู้ใช้>.github.io/genera-site/`

## 3. ตั้งค่าหลังบ้าน / Set up the admin (หลังบ้าน)

1. เปิดไฟล์ `admin/config.yml` แก้ 2 บรรทัดที่เขียนว่า `# <-- แก้ตรงนี้`
   ```yaml
   repo: <ชื่อผู้ใช้>/genera-site
   site_url: https://<ชื่อผู้ใช้>.github.io/genera-site/
   ```
   แล้ว commit
2. **เพิ่มเพื่อนในทีม:** Settings → Collaborators → Add people (ทุกคนต้องมีบัญชี GitHub)
3. **แต่ละคนสร้าง token ของตัวเอง:**
   GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
   - Repository access: *Only select repositories* → เลือก `genera-site`
   - Permissions → Repository → **Contents: Read and write**
   - กด Generate แล้วคัดลอก token ไว้ (เห็นครั้งเดียว ห้ามส่งให้คนอื่น)
4. เปิด `https://<ชื่อผู้ใช้>.github.io/genera-site/admin/` → กด **Sign In Using Access Token** → วาง token
5. แก้ข้อมูล → กด **Save** → ระบบจะ commit เข้า GitHub ให้เอง เว็บอัปเดตใน ~1 นาที

> **ทางเลือกไม่ต้องใช้ token:** ถ้า clone repo ไว้ในเครื่องแล้ว เปิด `http://localhost:3000/admin/` ใน Chrome/Edge → **Work with Local Repository** → เลือกโฟลเดอร์ repo แก้เสร็จค่อย commit/push เอง
>
> ใช้ token แทนการล็อกอิน OAuth จึงไม่ต้องมีเซิร์ฟเวอร์เพิ่ม ถ้า token หลุด ให้ลบทิ้งที่หน้า token แล้วสร้างใหม่

## 4. เพิ่มกิจกรรมใหม่ / Adding an event

หลังบ้าน → **ข้อมูลเว็บไซต์ → กิจกรรมจริง** → *Add กิจกรรม*

- **รหัส** ภาษาอังกฤษตัวเล็ก ไม่ซ้ำกับอันอื่น เช่น `klangplaeng4`
- **วันที่** ต้องใส่ ถ้าจัดหลายวันใส่ **วันที่สิ้นสุด** ด้วย
- **เวลา** รูปแบบ `17:00` ถ้าไม่รู้เวลาจบ ติ๊ก *ไม่ระบุเวลาจบ*
- **แหล่งที่มา** ใส่อย่างน้อย 1 อัน (เพจผู้จัด, ข่าว) เพื่อให้คนตรวจสอบได้
- **รูป/โปสเตอร์** อัปโหลดได้ (ควรใช้รูปที่ผู้จัดเผยแพร่ หรือรูปที่ทีมถ่ายเอง)
- ถ้าข้อมูลยังไม่แน่นอน ติ๊ก *สถานที่ยังไม่ยืนยัน* หรือ *ข้อมูลจากโปสเตอร์เท่านั้น* เว็บจะขึ้นคำเตือนให้

กิจกรรมที่ผ่านไปแล้วไม่ต้องลบ ปฏิทินยังแสดงย้อนหลังได้

## 5. หมายเหตุ / Notes

- การจองที่ในเว็บเป็น **ตัวอย่าง (demo)** เก็บไว้ในเบราว์เซอร์ของผู้ใช้ (localStorage) ไม่ได้ส่งไปไหน
- แผนผังอุทยานใน `assets/img/park-map.svg` เป็น **ภาพประกอบ** วาดจากผังเผยแพร่ของ LANDPROCESS / PMCU ไม่ใช่แบบก่อสร้าง
- ข้อมูลกิจกรรมตรวจสอบล่าสุดตามวันที่ใน `data/site.json` ควรเช็กกับเพจผู้จัดก่อนเผยแพร่
- **รูปภาพ** เป็นรูปจริงจาก Wikimedia Commons (สัญญาอนุญาต CC ใช้ได้ฟรีถ้าใส่เครดิต) โหลดตรงจาก Wikimedia เครดิตทุกภาพอยู่ในหน้า "เกี่ยวกับ" (`data/site.json` → `photo_credits`)
  - เปลี่ยนรูปได้ที่หลังบ้าน: รูปหน้าแรก / รูปของแต่ละสวน (ข้อมูลอุทยาน), รูปโซน, รูปโปรแกรม
  - **ห้ามใช้รูปจาก Google หรือเพจอื่นโดยไม่ได้รับอนุญาต** ใช้รูปที่ทีมถ่ายเอง โปสเตอร์ที่ผู้จัดเผยแพร่ หรือรูป CC แล้วใส่เครดิตทุกครั้ง
  - กิจกรรมที่ยังไม่มีโปสเตอร์ จะแสดงรูปของสวนที่จัดแทน (มีป้าย "ภาพสถานที่")
