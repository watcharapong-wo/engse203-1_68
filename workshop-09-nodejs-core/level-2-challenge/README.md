# 🎓 Workshop 9 - Level 2: Challenge Workshop

## 📌 ภาพรวม
ใน Level 2 นี้ คุณจะได้สร้าง **Task Manager CLI** ที่ซับซ้อนกว่า Level 1 โดยมี code ให้มาประมาณ **70%** และคุณต้อง**เขียนส่วนที่เหลือ 30% เอง**

## 🎯 ฟีเจอร์ทั้งหมด

- ✅ เพิ่ม/แก้ไข/ลบ tasks
- ✅ ทำเครื่องหมาย task เสร็จ
- ✅ แสดง tasks ตามสถานะ (all/pending/completed)
- ✅ เรียงลำดับ tasks ตามวันที่/ความสำคัญ
- ✅ Export/Import tasks เป็น JSON
- ✅ Statistics (จำนวน tasks, completion rate, ฯลฯ)

## 📁 โครงสร้างโปรเจค

```
level-2-challenge/
├── .env                     ✅ ให้มาครบ
├── .gitignore              ✅ ให้มาครบ
├── package.json            ✅ ให้มาครบ
├── index.js                ✅ ให้มาครบ (main entry)
├── modules/
│   ├── config.js          ✅ ให้มาครบ
│   ├── logger.js          ✅ ให้มาครบ
│   ├── storage.js         🔨 ต้องเขียนเอง 50%
│   └── taskManager.js     🔨 ต้องเขียนเอง 30%
├── data/
│   └── tasks.json         (จะถูกสร้างอัตโนมัติ)
└── docs/
    └── SOLUTION.md        💡 คำแนะนำและเฉลย
```

## 🚀 Quick Start

### 1. ติดตั้ง Dependencies (ทำเรียบร้อยแล้ว)
```bash
npm install
```

Dependencies:
- `chalk@4.1.2` - สำหรับสีใน terminal
- `dotenv` - สำหรับ environment variables
- `uuid` - สำหรับสร้าง unique IDs
- `nodemon` - สำหรับ auto-reload (dev)

### 2. เริ่มเขียนโค้ด

คุณต้องเขียนโค้ดในไฟล์เหล่านี้:

#### 📝 ไฟล์ที่ต้องเขียน:

**A. modules/storage.js** (50% ของงาน)
- `async read()` - อ่าน tasks จากไฟล์
- `async write(data)` - บันทึก tasks ลงไฟล์
- `async exportTo(filename, data)` - Export tasks
- `async importFrom(filename)` - Import tasks

**B. modules/taskManager.js** (30% ของงาน)
- `async addTask(title, priority)` - เพิ่ม task
- `async listTasks(filter)` - แสดงรายการ tasks
- `async completeTask(id)` - ทำเครื่องหมาย task เสร็จ
- `async deleteTask(id)` - ลบ task
- `async updateTask(id, newTitle)` - แก้ไข task
- `async showStats()` - แสดงสถิติ
- `async exportTasks(filename)` - Export tasks
- `async importTasks(filename)` - Import tasks

### 3. ดูคำแนะนำ

เปิดไฟล์ [docs/SOLUTION.md](docs/SOLUTION.md) เพื่อดู:
- 💡 Hints สำหรับแต่ละ method
- ✅ เฉลยแบบเต็ม (ถ้าติดจริงๆ)
- 📝 ตัวอย่าง code

### 4. ทดสอบ

```bash
# ดู help
node index.js help

# เพิ่ม tasks
node index.js add "Buy groceries" high
node index.js add "Finish homework" medium

# แสดง tasks
node index.js list

# ทำเครื่องหมาย task เสร็จ
node index.js complete 1

# แสดงสถิติ
node index.js stats
```

## 📖 วิธีใช้งาน (หลังเขียนเสร็จ)

### คำสั่งพื้นฐาน

#### เพิ่ม Task
```bash
node index.js add "Task title" [priority]

# Examples:
node index.js add "Buy groceries" high
node index.js add "Call mom" low
node index.js add "Study Node.js"  # default: medium
```

#### แสดงรายการ Tasks
```bash
node index.js list [filter]

# Examples:
node index.js list              # แสดงทั้งหมด
node index.js list pending      # แสดงเฉพาะที่ยังไม่เสร็จ
node index.js list completed    # แสดงเฉพาะที่เสร็จแล้ว
```

#### ทำเครื่องหมาย Task เสร็จ
```bash
node index.js complete <id>

# Example:
node index.js complete 1
```

#### แก้ไข Task
```bash
node index.js update <id> "New title"

# Example:
node index.js update 2 "Buy groceries and cook dinner"
```

#### ลบ Task
```bash
node index.js delete <id>

# Example:
node index.js delete 3
```

#### แสดงสถิติ
```bash
node index.js stats
```

#### Export/Import
```bash
# Export
node index.js export ./backup.json

# Import
node index.js import ./backup.json
```

## 🔨 การเขียนโค้ด

### Step-by-Step Guide:

#### 1️⃣ เริ่มจาก storage.js
เปิดไฟล์ `modules/storage.js` และเขียน:

**Method 1: `async read()`**
```javascript
// TODO: ตรวจสอบว่าไฟล์มีอยู่หรือไม่
// ถ้าไม่มี ให้ return empty array
// ถ้ามี ให้อ่านและ parse JSON

// 💡 Hints:
// - ใช้ fs.access() เช็คไฟล์
// - ใช้ fs.readFile() อ่านไฟล์
// - ใช้ JSON.parse() แปลง string เป็น object
```

**Method 2: `async write(data)`**
```javascript
// TODO: สร้างโฟลเดอร์ data ถ้ายังไม่มี
// TODO: แปลง data เป็น JSON string
// TODO: เขียนลงไฟล์

// 💡 Hints:
// - ใช้ path.dirname() หา directory
// - ใช้ fs.mkdir() สร้างโฟลเดอร์
// - ใช้ JSON.stringify(data, null, 2) แปลง + pretty print
// - ใช้ fs.writeFile() เขียนไฟล์
```

#### 2️⃣ ต่อด้วย taskManager.js
เปิดไฟล์ `modules/taskManager.js` และเขียน:

**Method 1: `async addTask(title, priority)`**
```javascript
// TODO: Validate priority (low/medium/high)
// TODO: สร้าง task object
// TODO: เพิ่มใน this.tasks array

// 💡 Task object ควรมี:
// - id: ใช้ this.nextId++
// - title: ชื่อ task
// - priority: ระดับความสำคัญ
// - completed: false (ยังไม่เสร็จ)
// - createdAt: timestamp
```

**Method 2: `async listTasks(filter)`**
```javascript
// TODO: กรอง tasks ตาม filter
// TODO: จัดรูปแบบข้อมูลสำหรับแสดง
// TODO: แสดงผลเป็น table

// 💡 Filter:
// - 'all': แสดงทั้งหมด
// - 'pending': แสดงเฉพาะ completed = false
// - 'completed': แสดงเฉพาะ completed = true
```

### 🧪 ทดสอบทีละ Method

หลังเขียนแต่ละ method ให้ทดสอบทันที:

```bash
# ทดสอบ addTask
node index.js add "Test task" high

# ตรวจสอบว่าไฟล์ถูกสร้าง
cat data/tasks.json

# ทดสอบ listTasks
node index.js list
```

## 💡 Tips & Best Practices

### 1. การ Debug
```javascript
// เพิ่ม console.log เพื่อ debug
console.log('Tasks loaded:', this.tasks);
console.log('Filter:', filter);
```

### 2. Error Handling
```javascript
// ใช้ try-catch ทุกที่ที่มี async operations
try {
  await storage.write(data);
} catch (error) {
  logger.error(`Failed: ${error.message}`);
  throw error;
}
```

### 3. Validation
```javascript
// Validate input ก่อนใช้งาน
if (!task) {
  throw new Error(`Task ${id} not found`);
}
```

### 4. Array Methods
```javascript
// ใช้ array methods อย่างเหมาะสม
const pending = tasks.filter(t => !t.completed);
const task = tasks.find(t => t.id === id);
const index = tasks.findIndex(t => t.id === id);
```

## 📚 เอกสารเพิ่มเติม

- **[docs/SOLUTION.md](docs/SOLUTION.md)** - คำแนะนำและเฉลยทั้งหมด
- **Node.js fs.promises** - https://nodejs.org/api/fs.html#promises-api
- **Array Methods** - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## ✅ Checklist

ตรวจสอบว่าทำครบหรือยัง:

### Storage Module (modules/storage.js)
- [ ] `async read()` - อ่านไฟล์ JSON
- [ ] `async write(data)` - เขียนไฟล์ JSON
- [ ] `async exportTo(filename, data)` - Export tasks
- [ ] `async importFrom(filename)` - Import tasks

### Task Manager Module (modules/taskManager.js)
- [ ] `async addTask(title, priority)` - เพิ่ม task
- [ ] `async listTasks(filter)` - แสดง tasks
- [ ] `async completeTask(id)` - ทำเครื่องหมายเสร็จ
- [ ] `async deleteTask(id)` - ลบ task
- [ ] `async updateTask(id, newTitle)` - แก้ไข task
- [ ] `async showStats()` - แสดงสถิติ
- [ ] `async exportTasks(filename)` - Export
- [ ] `async importTasks(filename)` - Import

### Testing
- [ ] ทดสอบ add task
- [ ] ทดสอบ list tasks (all/pending/completed)
- [ ] ทดสอบ complete task
- [ ] ทดสอบ update task
- [ ] ทดสอบ delete task
- [ ] ทดสอบ statistics
- [ ] ทดสอบ export/import

## 🎯 Learning Objectives

หลังจากทำ Workshop นี้เสร็จ คุณจะได้เรียนรู้:

- ✅ File System operations (async/await)
- ✅ JSON data persistence
- ✅ Array methods (filter, find, map, findIndex)
- ✅ Object manipulation
- ✅ Error handling
- ✅ Data validation
- ✅ CLI application design
- ✅ Module organization
- ✅ Testing strategies

## 🆘 ต้องการความช่วยเหลือ?

1. **อ่าน TODO comments** - มีคำแนะนำในโค้ด
2. **ดู SOLUTION.md** - มี hints และ examples
3. **ทดสอบทีละส่วน** - อย่าเขียนทั้งหมดแล้วค่อยทดสอบ
4. **ใช้ console.log** - Debug ดูค่าตัวแปร
5. **ถามอาจารย์/เพื่อน** - ถ้าติดจริงๆ

## 🎉 เมื่อทำเสร็จแล้ว

1. ✅ ทดสอบทุก features
2. ✅ เขียน documentation (ถ้ามีเวลา)
3. ✅ Refactor code ให้สวยงาม
4. ✅ เพิ่ม features ใหม่ (optional)
5. ✅ พร้อมไป Level 3 หรือโปรเจคถัดไป!

---

## 🚀 Quick Commands (Windows + WSL)

```powershell
# เข้า WSL
wsl

# ไปยัง project directory
cd /home/labadmin/class/engse203/engse203-1_68/workshop-09-nodejs-core/level-2-challenge

# เริ่มเขียนโค้ด
code modules/storage.js
code modules/taskManager.js

# ทดสอบ
node index.js help
node index.js add "Test" high
node index.js list
```

---

**สร้างโดย:** Workshop 9 - Node.js Core  
**Level:** 2 - Challenge  
**Difficulty:** ⭐⭐⭐ (Intermediate)  
**Time:** 2-3 hours

**Happy Coding! 🚀**
