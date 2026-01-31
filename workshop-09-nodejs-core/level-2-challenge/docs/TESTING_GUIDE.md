# 🧪 Workshop 9 - Level 2: Testing Guide

## 📋 ก่อนทดสอบ

**⚠️ สำคัญ:** คุณต้องเขียนโค้ดใน `modules/storage.js` และ `modules/taskManager.js` ให้เสร็จก่อนจึงจะทดสอบได้

### Checklist ก่อนทดสอบ:
- [ ] เขียน storage.js ครบทั้ง 4 methods
- [ ] เขียน taskManager.js ครบทั้ง 8 methods
- [ ] ไม่มี syntax errors
- [ ] ทดสอบแต่ละ method เบื้องต้นแล้ว

---

## 🧪 Test Cases

### Test Case 1: เพิ่มและแสดง Tasks

#### คำสั่ง:
```bash
node index.js add "Learn Node.js" high
node index.js add "Build API" medium
node index.js add "Write tests" low
node index.js list
```

#### ผลลัพธ์ที่คาดหวัง:
```
✔ Task added: "Learn Node.js" (ID: 1)
✔ Task added: "Build API" (ID: 2)
✔ Task added: "Write tests" (ID: 3)

ℹ 
ALL TASKS:

┌─────────┬───────────────────┬──────────┬────────────┬────────────┐
│ (index) │      Title        │ Priority │   Status   │  Created   │
├─────────┼───────────────────┼──────────┼────────────┼────────────┤
│    0    │ 'Learn Node.js'   │  'HIGH'  │ '⏳ Pending' │ '1/31/2026' │
│    1    │   'Build API'     │ 'MEDIUM' │ '⏳ Pending' │ '1/31/2026' │
│    2    │  'Write tests'    │  'LOW'   │ '⏳ Pending' │ '1/31/2026' │
└─────────┴───────────────────┴──────────┴────────────┴────────────┘

Total: 3 task(s)
```

#### ตรวจสอบ:
- [ ] ✅ Tasks ทั้ง 3 ถูกเพิ่มสำเร็จ
- [ ] ✅ แสดง table ของ tasks
- [ ] ✅ Priority แสดงถูกต้อง
- [ ] ✅ Status เป็น "Pending"

#### ดูไฟล์ที่สร้าง:
```bash
cat data/tasks.json
```

**Expected JSON:**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-01-31T..."
  },
  {
    "id": 2,
    "title": "Build API",
    "priority": "medium",
    "completed": false,
    "createdAt": "2026-01-31T..."
  },
  {
    "id": 3,
    "title": "Write tests",
    "priority": "low",
    "completed": false,
    "createdAt": "2026-01-31T..."
  }
]
```

---

### Test Case 2: Complete Tasks

#### คำสั่ง:
```bash
node index.js complete 1
node index.js list pending
node index.js list completed
```

#### ผลลัพธ์ที่คาดหวัง:

**Complete command:**
```
✔ Task 1 marked as completed
```

**List pending:**
```
ℹ 
PENDING TASKS:

┌─────────┬──────────────┬──────────┬────────────┬────────────┐
│ (index) │    Title     │ Priority │   Status   │  Created   │
├─────────┼──────────────┼──────────┼────────────┼────────────┤
│    0    │ 'Build API'  │ 'MEDIUM' │ '⏳ Pending' │ '1/31/2026' │
│    1    │'Write tests' │  'LOW'   │ '⏳ Pending' │ '1/31/2026' │
└─────────┴──────────────┴──────────┴────────────┴────────────┘

Total: 2 task(s)
```

**List completed:**
```
ℹ 
COMPLETED TASKS:

┌─────────┬─────────────────┬──────────┬──────────┬────────────┐
│ (index) │     Title       │ Priority │  Status  │  Created   │
├─────────┼─────────────────┼──────────┼──────────┼────────────┤
│    0    │'Learn Node.js'  │  'HIGH'  │ '✓ Done' │ '1/31/2026' │
└─────────┴─────────────────┴──────────┴──────────┴────────────┘

Total: 1 task(s)
```

#### ตรวจสอบ:
- [ ] ✅ Task ID 1 ถูกทำเครื่องหมายเสร็จ
- [ ] ✅ list pending ไม่แสดง task ID 1
- [ ] ✅ list completed แสดง task ID 1
- [ ] ✅ Status เป็น "✓ Done"

---

### Test Case 3: Update และ Delete

#### คำสั่ง:
```bash
node index.js update 2 "Build REST API with Express"
node index.js list
node index.js delete 3
node index.js list
```

#### ผลลัพธ์ที่คาดหวัง:

**Update:**
```
✔ Task 2 updated
```

**After update list:**
- Task ID 2 มี title ใหม่: "Build REST API with Express"

**Delete:**
```
✔ Task 3 deleted
```

**After delete list:**
- แสดงเฉพาะ task ID 1 และ 2
- ไม่มี task ID 3

#### ตรวจสอบ:
- [ ] ✅ Update task สำเร็จ
- [ ] ✅ Title เปลี่ยนตามที่ระบุ
- [ ] ✅ Delete task สำเร็จ
- [ ] ✅ Task ที่ลบไม่แสดงในรายการ

---

### Test Case 4: Statistics

#### คำสั่ง:
```bash
node index.js add "Deploy app" high
node index.js add "Fix bugs" medium
node index.js complete 2
node index.js stats
```

#### ผลลัพธ์ที่คาดหวัง:
```
========================================
  📊 TASK STATISTICS
========================================

  Total Tasks:      3
  ✓ Completed:      2
  ⏳ Pending:        1
  📈 Completion:     66.7%

----------------------------------------
  Priority Breakdown:
----------------------------------------
  🔴 High:          2
  🟡 Medium:        1
  🟢 Low:           0
========================================
```

#### ตรวจสอบ:
- [ ] ✅ จำนวน tasks ทั้งหมดถูกต้อง
- [ ] ✅ จำนวน completed/pending ถูกต้อง
- [ ] ✅ Completion rate คำนวณถูกต้อง
- [ ] ✅ Priority breakdown ถูกต้อง

---

### Test Case 5: Export/Import

#### คำสั่ง:
```bash
# Export tasks
node index.js export ./backup.json

# ดูไฟล์
cat backup.json

# ลบ tasks ทั้งหมด (หรือสร้าง scenario ใหม่)
# สมมติว่าเราย้ายไฟล์ data/tasks.json ออกไปก่อน
mv data/tasks.json data/tasks.json.bak

# Import กลับมา
node index.js import ./backup.json

# ตรวจสอบ
node index.js list
```

#### ผลลัพธ์ที่คาดหวัง:

**Export:**
```
✔ Exported to ./backup.json
✔ Tasks exported to ./backup.json
```

**Import:**
```
✔ Tasks imported from ./backup.json
```

**List after import:**
- แสดง tasks ทั้งหมดที่ import มา
- IDs ต้องไม่ซ้ำกับ tasks เดิม (ถ้ามี)

#### ตรวจสอบ:
- [ ] ✅ Export สำเร็จ สร้างไฟล์ backup.json
- [ ] ✅ ไฟล์ backup.json มี JSON ที่ถูกต้อง
- [ ] ✅ Import สำเร็จ
- [ ] ✅ Tasks จาก import แสดงในรายการ
- [ ] ✅ ID management ถูกต้อง (ไม่ซ้ำ)

---

### Test Case 6: Error Handling

#### คำสั่ง:
```bash
# ลอง complete task ที่ไม่มี
node index.js complete 999

# ลอง delete task ที่ไม่มี
node index.js delete 999

# ลอง update task ที่ไม่มี
node index.js update 999 "New title"

# ลอง import ไฟล์ที่ไม่มี
node index.js import nonexistent.json

# ลอง complete task ที่เสร็จแล้ว
node index.js complete 1
node index.js complete 1
```

#### ผลลัพธ์ที่คาดหวัง:

**Complete task ที่ไม่มี:**
```
✖ Error: Task 999 not found
```

**Delete task ที่ไม่มี:**
```
✖ Error: Task 999 not found
```

**Import ไฟล์ที่ไม่มี:**
```
✖ Failed to import: ENOENT: no such file or directory...
✖ Error: ENOENT: no such file or directory...
```

**Complete task ซ้ำ:**
```
⚠ Task already completed
```

#### ตรวจสอบ:
- [ ] ✅ Error messages ชัดเจน
- [ ] ✅ ไม่มี crash/unhandled errors
- [ ] ✅ แสดง error icons (✖)
- [ ] ✅ แสดง warnings (⚠) เมื่อเหมาะสม

---

### Test Case 7: Priority Validation

#### คำสั่ง:
```bash
# Priority ถูกต้อง
node index.js add "Valid task" high

# Priority ไม่ถูกต้อง
node index.js add "Invalid priority" urgent
node index.js add "Another invalid" super-high

# ดูว่า fallback เป็น medium หรือไม่
node index.js list
```

#### ผลลัพธ์ที่คาดหวัง:

**Invalid priority:**
```
⚠ Invalid priority 'urgent'. Using 'medium' instead.
✔ Task added: "Invalid priority" (ID: X)
```

**List:**
- Tasks ที่มี invalid priority จะถูกตั้งเป็น "MEDIUM"

#### ตรวจสอบ:
- [ ] ✅ แสดง warning เมื่อ priority ไม่ถูกต้อง
- [ ] ✅ Fallback เป็น 'medium'
- [ ] ✅ Task ยังถูกเพิ่มได้ปกติ

---

## 📊 Test Summary

### Checklist การทดสอบ:

#### Basic CRUD:
- [ ] Add tasks - ใช้งานได้
- [ ] List tasks - ใช้งานได้
- [ ] Update tasks - ใช้งานได้
- [ ] Delete tasks - ใช้งานได้

#### Advanced Features:
- [ ] Complete tasks - ใช้งานได้
- [ ] Filter (pending/completed) - ใช้งานได้
- [ ] Statistics - ใช้งานได้
- [ ] Export - ใช้งานได้
- [ ] Import - ใช้งานได้

#### Quality:
- [ ] Error handling - ทำงานได้ดี
- [ ] Input validation - ทำงานได้ดี
- [ ] Data persistence - ข้อมูลบันทึกถูกต้อง
- [ ] JSON formatting - อ่านง่าย pretty print

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module"
**Error:**
```
Error: Cannot find module './modules/storage'
```

**Solution:**
- ตรวจสอบว่าไฟล์อยู่ในตำแหน่งที่ถูกต้อง
- ตรวจสอบ module.exports ใน storage.js

---

### Issue 2: "Task not found"
**Error:**
```
Error: Task 1 not found
```

**Solution:**
- ตรวจสอบว่า loadTasks() ทำงานถูกต้อง
- ดูใน data/tasks.json ว่ามี tasks หรือไม่
- ตรวจสอบ id type (number vs string)

---

### Issue 3: JSON parse error
**Error:**
```
SyntaxError: Unexpected token in JSON
```

**Solution:**
- ตรวจสอบว่า write() ใช้ JSON.stringify ถูกต้อง
- ดูไฟล์ tasks.json ว่า format ถูกต้องหรือไม่
- ลบไฟล์และสร้างใหม่

---

### Issue 4: Data not persisting
**Problem:** เพิ่ม task แล้วรัน list อีกครั้งไม่เห็น

**Solution:**
- ตรวจสอบว่า saveTasks() ถูกเรียกหลังแก้ไขข้อมูล
- ตรวจสอบว่า write() ทำงานถูกต้อง
- ดูว่ามี error ใน write() หรือไม่

---

## 🎯 Performance Testing

### Test ด้วยข้อมูลจำนวนมาก:

```bash
# เพิ่ม tasks จำนวนมาก
for i in {1..20}; do
  node index.js add "Task $i" medium
done

# ทดสอบ list
node index.js list

# ทดสอบ stats
node index.js stats

# ทดสอบ export/import
node index.js export large-backup.json
```

#### ตรวจสอบ:
- [ ] ✅ ทำงานได้กับ tasks จำนวนมาก
- [ ] ✅ Performance ยังดี
- [ ] ✅ ไม่มี memory issues

---

## 📸 Screenshots

บันทึก screenshots ของ:
1. การเพิ่ม tasks
2. การแสดง list (all/pending/completed)
3. Statistics
4. Export/Import
5. Error handling

---

## ✅ Final Checklist

ก่อนส่งงาน ให้แน่ใจว่า:
- [ ] ทดสอบทุก test cases แล้ว
- [ ] ไม่มี errors
- [ ] Data persistence ทำงานได้
- [ ] Error handling ครบถ้วน
- [ ] Code อ่านง่าย มี comments
- [ ] เขียน SOLUTION.md ครบถ้วน

---

**เมื่อทดสอบเสร็จแล้ว บันทึกผลใน `docs/DEVELOPMENT_LOG.md`**

---

*Testing Guide for Workshop 9 - Level 2*  
*Created: January 31, 2026*
