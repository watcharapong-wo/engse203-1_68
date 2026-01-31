# 🎓 Workshop 9 - Level 2: Student Quick Start Guide

## ยินดีต้อนรับสู่ Challenge Workshop! 🚀

ในส่วนนี้คุณจะได้เขียนโค้ด **Task Manager CLI** ด้วยตัวเอง โดยมี code ให้มา 70% และคุณต้องเขียนอีก 30%

---

## 📋 ก่อนเริ่ม - อ่านนี้ก่อน!

### สิ่งที่คุณจะได้เรียนรู้:
- ✅ การอ่าน/เขียน JSON files ด้วย Node.js
- ✅ Async/Await patterns
- ✅ Array methods (filter, find, map)
- ✅ Error handling
- ✅ Data validation
- ✅ CLI application design

### เวลาที่ใช้:
- ⏱️ **2-3 ชั่วโมง** สำหรับการเขียนและทดสอบ

### ระดับความยาก:
- 🌟🌟🌟 **Intermediate** (ต้องมีพื้นฐาน JavaScript)

---

## 🎯 เป้าหมาย

สร้าง Task Manager CLI ที่สามารถ:
1. เพิ่ม/แก้ไข/ลบ tasks
2. ทำเครื่องหมาย task เสร็จ
3. แสดง tasks ตามสถานะ
4. แสดงสถิติ
5. Export/Import tasks

---

## 📚 Step 1: อ่านเอกสาร (15 นาที)

### อ่านไฟล์เหล่านี้ตามลำดับ:

1. **README.md** (อ่านเลย!) 
   - ภาพรวม project
   - คำสั่งที่ใช้งาน
   - วิธีการทดสอบ

2. **docs/SOLUTION.md** (อ่านเฉพาะส่วน Hints ก่อน)
   - คำแนะนำสำหรับแต่ละ method
   - ตัวอย่าง code
   - เฉลย (ดูตอนติดจริงๆ)

3. **modules/storage.js** 
   - ดู TODO comments
   - อ่าน hints ในโค้ด

4. **modules/taskManager.js**
   - ดู TODO comments
   - อ่าน hints ในโค้ด

---

## 🔨 Step 2: เริ่มเขียนโค้ด (90-120 นาที)

### Phase A: storage.js (30-45 นาที)

เปิดไฟล์ [modules/storage.js](modules/storage.js)

#### Method 1: `async read()` ⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. ตรวจสอบว่าไฟล์มีอยู่หรือไม่
// 2. ถ้าไม่มี return []
// 3. ถ้ามี อ่านและ parse JSON
```

**💡 Hint:** ใช้ `fs.access()`, `fs.readFile()`, `JSON.parse()`

**✅ เมื่อเขียนเสร็จ ทดสอบ:**
```bash
node index.js add "Test task"
cat data/tasks.json  # ดูว่าไฟล์ถูกสร้างหรือไม่
```

---

#### Method 2: `async write(data)` ⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. สร้างโฟลเดอร์ data ถ้ายังไม่มี
// 2. แปลง data เป็น JSON string (pretty print)
// 3. เขียนลงไฟล์
```

**💡 Hint:** ใช้ `fs.mkdir()`, `JSON.stringify(data, null, 2)`, `fs.writeFile()`

**✅ เมื่อเขียนเสร็จ ทดสอบ:**
```bash
node index.js add "Another task"
node index.js list  # ควรเห็น tasks
```

---

#### Method 3 & 4: `exportTo()` และ `importFrom()` ⭐
**คำแนะนำ:** คล้ายกับ write() และ read() แต่ใช้ filename ที่ระบุ

---

### Phase B: taskManager.js (60-75 นาที)

เปิดไฟล์ [modules/taskManager.js](modules/taskManager.js)

#### Method 1: `async addTask(title, priority)` ⭐⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. Validate priority (low/medium/high)
// 2. สร้าง task object:
//    - id: this.nextId++
//    - title: title
//    - priority: priority
//    - completed: false
//    - createdAt: new Date().toISOString()
// 3. this.tasks.push(task)
```

**✅ ทดสอบ:**
```bash
node index.js add "Buy milk" high
node index.js add "Do homework" medium
node index.js add "Call friend" low
```

---

#### Method 2: `async listTasks(filter)` ⭐⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. กรอง tasks ตาม filter
// 2. จัดรูปแบบข้อมูลสำหรับ table
// 3. แสดงผลด้วย logger.table()
```

**💡 Hint:**
```javascript
// Filter
if (filter === 'pending') {
  filteredTasks = this.tasks.filter(t => !t.completed);
}

// Format
const displayData = filteredTasks.map(task => ({
  ID: task.id,
  Title: task.title,
  Priority: task.priority.toUpperCase(),
  Status: task.completed ? '✓ Done' : '⏳ Pending',
  Created: new Date(task.createdAt).toLocaleDateString()
}));
```

**✅ ทดสอบ:**
```bash
node index.js list
node index.js list pending
```

---

#### Method 3: `async completeTask(id)` ⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. หา task: const task = this.tasks.find(t => t.id === id)
// 2. ตรวจสอบว่าเจอหรือไม่
// 3. task.completed = true
// 4. task.completedAt = new Date().toISOString()
```

**✅ ทดสอบ:**
```bash
node index.js complete 1
node index.js list completed
```

---

#### Method 4: `async deleteTask(id)` ⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. หา index: const index = this.tasks.findIndex(t => t.id === id)
// 2. ตรวจสอบว่าเจอหรือไม่ (index !== -1)
// 3. this.tasks.splice(index, 1)
```

**✅ ทดสอบ:**
```bash
node index.js delete 2
node index.js list
```

---

#### Method 5: `async updateTask(id, newTitle)` ⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. หา task
// 2. task.title = newTitle
// 3. task.updatedAt = new Date().toISOString()
```

**✅ ทดสอบ:**
```bash
node index.js update 1 "Buy milk and eggs"
node index.js list
```

---

#### Method 6: `async showStats()` ⭐⭐⭐
**สิ่งที่ต้องทำ:**
```javascript
// 1. นับจำนวน tasks ทั้งหมด
// 2. นับ completed tasks
// 3. นับ pending tasks
// 4. นับตาม priority (high/medium/low)
// 5. คำนวณ completion rate (%)
// 6. แสดงผลสวยๆ
```

**💡 Hint:**
```javascript
const total = this.tasks.length;
const completed = this.tasks.filter(t => t.completed).length;
const highPriority = this.tasks.filter(t => t.priority === 'high').length;
const completionRate = ((completed / total) * 100).toFixed(1);
```

**✅ ทดสอบ:**
```bash
node index.js stats
```

---

#### Method 7 & 8: Export/Import ⭐⭐
**คำแนะนำ:** ใช้ storage methods ที่เขียนไว้แล้ว

---

## 🧪 Step 3: ทดสอบ (30 นาที)

### Test Case 1: Basic Operations
```bash
# 1. เพิ่ม tasks
node index.js add "Buy groceries" high
node index.js add "Finish homework" medium
node index.js add "Call mom" low

# 2. แสดง tasks
node index.js list

# 3. Complete task
node index.js complete 1

# 4. แสดง completed
node index.js list completed

# 5. แสดง pending
node index.js list pending
```

### Test Case 2: CRUD Operations
```bash
# Update
node index.js update 2 "Finish Node.js homework"

# Delete
node index.js delete 3

# Stats
node index.js stats
```

### Test Case 3: Export/Import
```bash
# Export
node index.js export ./backup.json

# ตรวจสอบไฟล์
cat backup.json

# ลบทุก task
node index.js delete 1
node index.js delete 2

# Import กลับมา
node index.js import ./backup.json

# ตรวจสอบ
node index.js list
```

---

## ✅ Checklist

### ก่อนเริ่ม:
- [ ] อ่าน README.md
- [ ] อ่าน docs/SOLUTION.md (hints only)
- [ ] เข้าใจ project structure
- [ ] พร้อม editor และ terminal

### ระหว่างทำ:
- [ ] เขียน storage.read()
- [ ] เขียน storage.write()
- [ ] ทดสอบ storage methods
- [ ] เขียน taskManager.addTask()
- [ ] เขียน taskManager.listTasks()
- [ ] เขียน taskManager.completeTask()
- [ ] เขียน taskManager.deleteTask()
- [ ] เขียน taskManager.updateTask()
- [ ] เขียน taskManager.showStats()
- [ ] เขียน export/import methods

### เมื่อเสร็จ:
- [ ] ทดสอบทุก features
- [ ] ไม่มี errors
- [ ] Data persist ลง JSON ได้
- [ ] Export/Import ทำงานได้
- [ ] Code สะอาดอ่านง่าย

---

## 💡 Tips สำหรับความสำเร็จ

### 1. เขียนทีละ Method
❌ **อย่า:** เขียนทุก method แล้วค่อยทดสอบ  
✅ **ควร:** เขียน 1 method → ทดสอบ → เขียนต่อ

### 2. ใช้ console.log
```javascript
console.log('Tasks loaded:', this.tasks);
console.log('Filter:', filter);
console.log('Task found:', task);
```

### 3. อ่าน Error Messages
```bash
# ถ้าเจอ error อ่านให้ดี จะบอกว่าปัญหาอยู่ตรงไหน
Error: Task 5 not found
  at TaskManager.deleteTask (taskManager.js:120:15)
```

### 4. ใช้ Hints
- อ่าน TODO comments ในโค้ด
- ดู hints ใน SOLUTION.md
- ดูตัวอย่าง code

### 5. ถ้าติดจริงๆ
1. อ่าน error message อีกครั้ง
2. console.log ดูค่าตัวแปร
3. ดู hints ใน SOLUTION.md
4. ดูเฉลยใน SOLUTION.md (ส่วนล่าง)
5. ถามเพื่อนหรืออาจารย์

---

## 🎯 เป้าหมายความสำเร็จ

### ⭐ Level 1: Basic (60%)
- เขียน storage.read() และ write() ได้
- เขียน addTask() และ listTasks() ได้
- ทดสอบผ่านขั้นพื้นฐาน

### ⭐⭐ Level 2: Good (80%)
- ทุก methods ทำงานได้
- มี error handling
- ทดสอบผ่านทุก test cases

### ⭐⭐⭐ Level 3: Excellent (100%)
- Code สะอาดอ่านง่าย
- Error handling ครบถ้วน
- Input validation
- Documentation

---

## 🚀 พร้อมแล้ว? เริ่มเลย!

```bash
# 1. เปิด editor
code modules/storage.js

# 2. เริ่มเขียน method แรก: async read()
# 3. ทดสอบทันที
# 4. เขียนต่อไป

# Good luck! 🎉
```

---

## 📞 ต้องการความช่วยเหลือ?

### Resources:
- **README.md** - คู่มือหลัก
- **docs/SOLUTION.md** - Hints & Solutions
- **Node.js docs** - https://nodejs.org/api/fs.html

### Debug Tips:
```javascript
// เพิ่มใน code เพื่อ debug
console.log('===== DEBUG =====');
console.log('Variable:', variable);
console.log('=================');
```

---

**ขอให้โชคดี! Happy Coding! 🚀**

*Workshop 9 - Level 2 Challenge*  
*Created: January 31, 2026*
