# 🚀 Quick Start Guide (Windows + WSL)

## การรันโปรแกรมบน Windows ที่มี WSL

เนื่องจากโปรเจคนี้อยู่ใน WSL (Windows Subsystem for Linux), คุณต้องใช้คำสั่งผ่าน WSL

### วิธีที่ 1: ใช้ WSL Command จาก PowerShell/CMD

#### Template:
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js <command>"
```

#### ตัวอย่างคำสั่ง:

**1. แสดงความช่วยเหลือ:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js help"
```

**2. แสดงรายการไฟล์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js list"
```

**3. อ่านไฟล์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js read sample.txt"
```

**4. สร้างไฟล์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js create myfile.txt 'Hello World'"
```

**5. คัดลอกไฟล์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js copy sample.txt backup.txt"
```

**6. สร้างโฟลเดอร์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js mkdir newfolder"
```

**7. ลบไฟล์:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js delete myfile.txt"
```

---

### วิธีที่ 2: เข้าไปใน WSL Shell โดยตรง (แนะนำ)

**1. เปิด WSL Terminal:**
```powershell
wsl
```

**2. ไปยัง Project Directory:**
```bash
cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided
```

**3. รันคำสั่งตามปกติ:**
```bash
# แสดงความช่วยเหลือ
node index.js help

# แสดงรายการไฟล์
node index.js list

# อ่านไฟล์
node index.js read sample.txt

# สร้างไฟล์
node index.js create test.txt "Hello"

# คัดลอกไฟล์
node index.js copy test.txt backup.txt

# สร้างโฟลเดอร์
node index.js mkdir myfolder

# ลบไฟล์
node index.js delete test.txt
```

---

### วิธีที่ 3: ใช้ VS Code Terminal

ถ้าคุณเปิดโปรเจคใน VS Code:

**1. เปิด Terminal ใน VS Code:**
   - กด `Ctrl + \`` (backtick)
   - หรือ View → Terminal

**2. เลือก WSL Shell:**
   - คลิกที่ dropdown ของ Terminal
   - เลือก "Ubuntu-24.04" หรือ WSL distribution ของคุณ

**3. รันคำสั่งตามปกติ:**
```bash
node index.js help
node index.js list
node index.js read sample.txt
```

---

## 📝 Script Shortcuts (แนะนำสร้าง)

สร้างไฟล์ `run.ps1` ใน project root เพื่อความสะดวก:

```powershell
# run.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$Command,
    
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$projectPath = "/home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided"
$allArgs = ($Args -join ' ')
$fullCommand = "cd $projectPath && node index.js $Command $allArgs"

wsl -e bash -c $fullCommand
```

**ใช้งาน:**
```powershell
# แสดงความช่วยเหลือ
.\run.ps1 help

# แสดงรายการไฟล์
.\run.ps1 list

# อ่านไฟล์
.\run.ps1 read sample.txt

# สร้างไฟล์
.\run.ps1 create test.txt "Hello"
```

---

## 🔍 ดู Log File

**ผ่าน WSL Command:**
```powershell
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && cat logs/app.log"
```

**หรือเข้าไปใน WSL:**
```bash
cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided
cat logs/app.log
# หรือ
tail -f logs/app.log  # ดูแบบ real-time
```

---

## ⚡ Tips

### 1. Alias ใน PowerShell Profile
เพิ่ม alias ใน PowerShell profile:

```powershell
# เปิด profile
notepad $PROFILE

# เพิ่มบรรทัดนี้:
function fm { wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js $args" }

# บันทึกและ reload
. $PROFILE
```

**ใช้งาน:**
```powershell
fm help
fm list
fm read sample.txt
```

### 2. Alias ใน WSL (.bashrc)
```bash
# เปิด .bashrc
nano ~/.bashrc

# เพิ่มบรรทัดนี้:
alias fm='cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js'

# บันทึกและ reload
source ~/.bashrc
```

**ใช้งาน:**
```bash
fm help
fm list
fm read sample.txt
```

---

## 🐛 แก้ปัญหา

### ปัญหา: "node: command not found"
**แก้ไข:** ติดตั้ง Node.js ใน WSL
```bash
# ใน WSL
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### ปัญหา: "Cannot find module 'dotenv'"
**แก้ไข:** ติดตั้ง dependencies
```bash
# ใน WSL
cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided
npm install
```

### ปัญหา: Permission denied
**แก้ไข:** เปลี่ยน permissions
```bash
# ใน WSL
chmod +x index.js
```

---

## 📚 เอกสารเพิ่มเติม

- [README.md](README.md) - คู่มือการใช้งานทั้งหมด
- [COMPLETION_STATUS.md](COMPLETION_STATUS.md) - สถานะและรายละเอียดโปรเจค
- [EXPERIMENT_RESULTS.md](EXPERIMENT_RESULTS.md) - Template บันทึกผลการทดลอง

---

## ✅ Quick Test

ทดสอบว่าโปรแกรมทำงานได้:

```powershell
# Test 1: แสดง help
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js help"

# Test 2: แสดงไฟล์
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js list"

# Test 3: อ่าน sample file
wsl -e bash -c "cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-1-guided && node index.js read sample.txt"
```

ถ้าทั้ง 3 คำสั่งทำงานได้ แสดงว่าโปรแกรมพร้อมใช้งาน! 🎉

---

*💡 Tip: วิธีที่ 2 (เข้าไปใน WSL Shell) จะสะดวกที่สุดสำหรับการทำงานต่อเนื่อง*
