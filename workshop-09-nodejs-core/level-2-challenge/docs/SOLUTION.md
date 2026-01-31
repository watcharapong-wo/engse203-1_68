# 📚 Workshop 9 - Level 2: Solutions & Hints

## 📌 ภาพรวม
เอกสารนี้มีคำแนะนำและเฉลยสำหรับส่วนที่ต้องเขียนเอง (30%)

---

## 🔨 Part 1: modules/storage.js

### Method 1: `async read()`

**สิ่งที่ต้องทำ:**
- ตรวจสอบว่าไฟล์มีอยู่หรือไม่
- ถ้าไม่มี ให้ return empty array
- ถ้ามี ให้อ่านและ parse JSON

**💡 Hints:**
```javascript
// 1. ใช้ fs.access() ตรวจสอบไฟล์
await fs.access(this.dataFile);

// 2. ใช้ fs.readFile() อ่านไฟล์
const data = await fs.readFile(this.dataFile, 'utf-8');

// 3. ใช้ JSON.parse() แปลงเป็น object
return JSON.parse(data);
```

**✅ Solution:**
```javascript
async read() {
  try {
    try {
      await fs.access(this.dataFile);
      const data = await fs.readFile(this.dataFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      // ไฟล์ยังไม่มี
      return [];
    }
  } catch (error) {
    logger.error(`Failed to read data: ${error.message}`);
    return [];
  }
}
```

---

### Method 2: `async write(data)`

**สิ่งที่ต้องทำ:**
- สร้างโฟลเดอร์ถ้ายังไม่มี
- แปลง data เป็น JSON string (pretty print)
- เขียนลงไฟล์

**💡 Hints:**
```javascript
// 1. หา directory path
const dir = path.dirname(this.dataFile);

// 2. สร้างโฟลเดอร์
await fs.mkdir(dir, { recursive: true });

// 3. แปลงเป็น JSON string (indent 2 spaces)
const jsonData = JSON.stringify(data, null, 2);

// 4. เขียนไฟล์
await fs.writeFile(this.dataFile, jsonData, 'utf-8');
```

**✅ Solution:**
```javascript
async write(data) {
  try {
    const dir = path.dirname(this.dataFile);
    await fs.mkdir(dir, { recursive: true });
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(this.dataFile, jsonData, 'utf-8');
    
    logger.success('Data saved successfully');
    return true;
  } catch (error) {
    logger.error(`Failed to write data: ${error.message}`);
    throw error;
  }
}
```

---

### Method 3: `async exportTo(filename, data)`

**สิ่งที่ต้องทำ:**
- ทำคล้าย write() แต่ใช้ filename ที่ระบุ

**✅ Solution:**
```javascript
async exportTo(filename, data) {
  try {
    const dir = path.dirname(filename);
    await fs.mkdir(dir, { recursive: true });
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, jsonData, 'utf-8');
    
    logger.success(`Exported to ${filename}`);
    return true;
  } catch (error) {
    logger.error(`Failed to export: ${error.message}`);
    throw error;
  }
}
```

---

### Method 4: `async importFrom(filename)`

**สิ่งที่ต้องทำ:**
- อ่านไฟล์ที่ระบุและ return data

**✅ Solution:**
```javascript
async importFrom(filename) {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Failed to import: ${error.message}`);
    throw error;
  }
}
```

---

## 🔨 Part 2: modules/taskManager.js

### Method 1: `async addTask(title, priority)`

**สิ่งที่ต้องทำ:**
- ตรวจสอบ priority ว่าถูกต้อง (low/medium/high)
- สร้าง task object พร้อม id, title, priority, completed, createdAt
- เพิ่มใน array

**💡 Hints:**
```javascript
// 1. Validate priority
const validPriorities = ['low', 'medium', 'high'];
const validPriority = validPriorities.includes(priority) ? priority : 'medium';

// 2. สร้าง task object
const task = {
  id: this.nextId++,
  title: title,
  priority: validPriority,
  completed: false,
  createdAt: new Date().toISOString()
};
```

**✅ Solution:**
```javascript
async addTask(title, priority = 'medium') {
  await this.loadTasks();

  // Validate priority
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
    logger.warning(`Invalid priority '${priority}'. Using 'medium' instead.`);
    priority = 'medium';
  }

  const task = {
    id: this.nextId++,
    title: title,
    priority: priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  this.tasks.push(task);
  await this.saveTasks();
  
  logger.success(`Task added: "${title}" (ID: ${task.id})`);
  return task;
}
```

---

### Method 2: `async listTasks(filter)`

**สิ่งที่ต้องทำ:**
- กรอง tasks ตาม filter (all/pending/completed)
- จัดรูปแบบข้อมูลสำหรับแสดงใน table

**💡 Hints:**
```javascript
// 1. กรอง tasks
let filteredTasks = this.tasks;
if (filter === 'pending') {
  filteredTasks = this.tasks.filter(t => !t.completed);
} else if (filter === 'completed') {
  filteredTasks = this.tasks.filter(t => t.completed);
}

// 2. จัดรูปแบบข้อมูล
const displayData = filteredTasks.map(task => ({
  ID: task.id,
  Title: task.title,
  Priority: task.priority.toUpperCase(),
  Status: task.completed ? '✓ Done' : '⏳ Pending',
  Created: new Date(task.createdAt).toLocaleDateString()
}));

// 3. แสดงผล
logger.table(displayData);
```

**✅ Solution:**
```javascript
async listTasks(filter = 'all') {
  await this.loadTasks();

  if (this.tasks.length === 0) {
    logger.warning('No tasks found');
    return;
  }

  // Filter tasks
  let filteredTasks = this.tasks;
  if (filter === 'pending') {
    filteredTasks = this.tasks.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filteredTasks = this.tasks.filter(t => t.completed);
  }

  if (filteredTasks.length === 0) {
    logger.warning(`No ${filter} tasks found`);
    return;
  }

  // Display as table
  logger.info(`\n${filter.toUpperCase()} TASKS:\n`);
  
  const displayData = filteredTasks.map(task => ({
    ID: task.id,
    Title: task.title,
    Priority: task.priority.toUpperCase(),
    Status: task.completed ? '✓ Done' : '⏳ Pending',
    Created: new Date(task.createdAt).toLocaleDateString()
  }));
  
  logger.table(displayData);
  
  console.log(`\nTotal: ${filteredTasks.length} task(s)\n`);
}
```

---

### Method 3: `async completeTask(id)`

**สิ่งที่ต้องทำ:**
- หา task จาก id
- เปลี่ยน completed เป็น true
- เพิ่ม completedAt timestamp

**✅ Solution:**
```javascript
async completeTask(id) {
  await this.loadTasks();

  const task = this.tasks.find(t => t.id === id);
  
  if (!task) {
    throw new Error(`Task ${id} not found`);
  }
  
  if (task.completed) {
    logger.warning('Task already completed');
    return;
  }
  
  task.completed = true;
  task.completedAt = new Date().toISOString();
  
  await this.saveTasks();
  logger.success(`Task ${id} marked as completed`);
}
```

---

### Method 4: `async deleteTask(id)`

**สิ่งที่ต้องทำ:**
- หา index ของ task
- ลบ task ออกจาก array

**✅ Solution:**
```javascript
async deleteTask(id) {
  await this.loadTasks();

  const index = this.tasks.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error(`Task ${id} not found`);
  }
  
  this.tasks.splice(index, 1);
  
  await this.saveTasks();
  logger.success(`Task ${id} deleted`);
}
```

---

### Method 5: `async updateTask(id, newTitle)`

**สิ่งที่ต้องทำ:**
- หา task และแก้ไข title
- เพิ่ม updatedAt timestamp

**✅ Solution:**
```javascript
async updateTask(id, newTitle) {
  await this.loadTasks();

  const task = this.tasks.find(t => t.id === id);
  
  if (!task) {
    throw new Error(`Task ${id} not found`);
  }
  
  task.title = newTitle;
  task.updatedAt = new Date().toISOString();
  
  await this.saveTasks();
  logger.success(`Task ${id} updated`);
}
```

---

### Method 6: `async showStats()`

**สิ่งที่ต้องทำ:**
- คำนวณสถิติต่างๆ
- แสดงผลในรูปแบบที่อ่านง่าย

**✅ Solution:**
```javascript
async showStats() {
  await this.loadTasks();

  const total = this.tasks.length;
  const completed = this.tasks.filter(t => t.completed).length;
  const pending = total - completed;
  
  const highPriority = this.tasks.filter(t => t.priority === 'high').length;
  const mediumPriority = this.tasks.filter(t => t.priority === 'medium').length;
  const lowPriority = this.tasks.filter(t => t.priority === 'low').length;
  
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
  
  console.log('\n' + '='.repeat(40));
  console.log('  📊 TASK STATISTICS');
  console.log('='.repeat(40));
  console.log(`\n  Total Tasks:      ${total}`);
  console.log(`  ✓ Completed:      ${completed}`);
  console.log(`  ⏳ Pending:        ${pending}`);
  console.log(`  📈 Completion:     ${completionRate}%`);
  console.log('\n' + '-'.repeat(40));
  console.log('  Priority Breakdown:');
  console.log('-'.repeat(40));
  console.log(`  🔴 High:          ${highPriority}`);
  console.log(`  🟡 Medium:        ${mediumPriority}`);
  console.log(`  🟢 Low:           ${lowPriority}`);
  console.log('='.repeat(40) + '\n');
}
```

---

### Method 7: `async exportTasks(filename)`

**สิ่งที่ต้องทำ:**
- ใช้ storage.exportTo() เพื่อ export

**✅ Solution:**
```javascript
async exportTasks(filename) {
  await this.loadTasks();
  
  await storage.exportTo(filename, this.tasks);
  
  logger.success(`Tasks exported to ${filename}`);
}
```

---

### Method 8: `async importTasks(filename)`

**สิ่งที่ต้องทำ:**
- ใช้ storage.importFrom() เพื่อ import
- Merge กับ tasks ที่มีอยู่
- ระวัง id ซ้ำ

**✅ Solution:**
```javascript
async importTasks(filename) {
  const importedTasks = await storage.importFrom(filename);
  
  await this.loadTasks();
  
  // Find max id from existing tasks
  const maxId = this.tasks.length > 0 
    ? Math.max(...this.tasks.map(t => t.id)) 
    : 0;
  
  // Reassign IDs to imported tasks
  importedTasks.forEach((task, index) => {
    task.id = maxId + index + 1;
    this.tasks.push(task);
  });
  
  await this.saveTasks();
  logger.success(`Tasks imported from ${filename}`);
}
```

---

## 📝 Complete Files

### ✅ modules/storage.js (Complete)

<details>
<summary>คลิกเพื่อดู Complete Code</summary>

```javascript
// modules/storage.js
const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');
const { config } = require('./config');

class Storage {
  constructor() {
    this.dataFile = config.dataFile;
  }

  async read() {
    try {
      try {
        await fs.access(this.dataFile);
        const data = await fs.readFile(this.dataFile, 'utf-8');
        return JSON.parse(data);
      } catch {
        return [];
      }
    } catch (error) {
      logger.error(`Failed to read data: ${error.message}`);
      return [];
    }
  }

  async write(data) {
    try {
      const dir = path.dirname(this.dataFile);
      await fs.mkdir(dir, { recursive: true });
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.dataFile, jsonData, 'utf-8');
      
      logger.success('Data saved successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to write data: ${error.message}`);
      throw error;
    }
  }

  async exportTo(filename, data) {
    try {
      const dir = path.dirname(filename);
      await fs.mkdir(dir, { recursive: true });
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(filename, jsonData, 'utf-8');
      
      logger.success(`Exported to ${filename}`);
      return true;
    } catch (error) {
      logger.error(`Failed to export: ${error.message}`);
      throw error;
    }
  }

  async importFrom(filename) {
    try {
      const data = await fs.readFile(filename, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      logger.error(`Failed to import: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new Storage();
```

</details>

### ✅ modules/taskManager.js (Complete)

<details>
<summary>คลิกเพื่อดู Complete Code</summary>

```javascript
// modules/taskManager.js
const { v4: uuidv4 } = require('uuid');
const storage = require('./storage');
const logger = require('./logger');

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  async loadTasks() {
    this.tasks = await storage.read();
    if (this.tasks.length > 0) {
      this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
    }
  }

  async saveTasks() {
    await storage.write(this.tasks);
  }

  async addTask(title, priority = 'medium') {
    await this.loadTasks();

    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      logger.warning(`Invalid priority '${priority}'. Using 'medium' instead.`);
      priority = 'medium';
    }

    const task = {
      id: this.nextId++,
      title: title,
      priority: priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    await this.saveTasks();
    
    logger.success(`Task added: "${title}" (ID: ${task.id})`);
    return task;
  }

  async listTasks(filter = 'all') {
    await this.loadTasks();

    if (this.tasks.length === 0) {
      logger.warning('No tasks found');
      return;
    }

    let filteredTasks = this.tasks;
    if (filter === 'pending') {
      filteredTasks = this.tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filteredTasks = this.tasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
      logger.warning(`No ${filter} tasks found`);
      return;
    }

    logger.info(`\n${filter.toUpperCase()} TASKS:\n`);
    
    const displayData = filteredTasks.map(task => ({
      ID: task.id,
      Title: task.title,
      Priority: task.priority.toUpperCase(),
      Status: task.completed ? '✓ Done' : '⏳ Pending',
      Created: new Date(task.createdAt).toLocaleDateString()
    }));
    
    logger.table(displayData);
    
    console.log(`\nTotal: ${filteredTasks.length} task(s)\n`);
  }

  async completeTask(id) {
    await this.loadTasks();

    const task = this.tasks.find(t => t.id === id);
    
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    
    if (task.completed) {
      logger.warning('Task already completed');
      return;
    }
    
    task.completed = true;
    task.completedAt = new Date().toISOString();
    
    await this.saveTasks();
    logger.success(`Task ${id} marked as completed`);
  }

  async deleteTask(id) {
    await this.loadTasks();

    const index = this.tasks.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error(`Task ${id} not found`);
    }
    
    this.tasks.splice(index, 1);
    
    await this.saveTasks();
    logger.success(`Task ${id} deleted`);
  }

  async updateTask(id, newTitle) {
    await this.loadTasks();

    const task = this.tasks.find(t => t.id === id);
    
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    
    task.title = newTitle;
    task.updatedAt = new Date().toISOString();
    
    await this.saveTasks();
    logger.success(`Task ${id} updated`);
  }

  async showStats() {
    await this.loadTasks();

    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    const highPriority = this.tasks.filter(t => t.priority === 'high').length;
    const mediumPriority = this.tasks.filter(t => t.priority === 'medium').length;
    const lowPriority = this.tasks.filter(t => t.priority === 'low').length;
    
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
    
    console.log('\n' + '='.repeat(40));
    console.log('  📊 TASK STATISTICS');
    console.log('='.repeat(40));
    console.log(`\n  Total Tasks:      ${total}`);
    console.log(`  ✓ Completed:      ${completed}`);
    console.log(`  ⏳ Pending:        ${pending}`);
    console.log(`  📈 Completion:     ${completionRate}%`);
    console.log('\n' + '-'.repeat(40));
    console.log('  Priority Breakdown:');
    console.log('-'.repeat(40));
    console.log(`  🔴 High:          ${highPriority}`);
    console.log(`  🟡 Medium:        ${mediumPriority}`);
    console.log(`  🟢 Low:           ${lowPriority}`);
    console.log('='.repeat(40) + '\n');
  }

  async exportTasks(filename) {
    await this.loadTasks();
    
    await storage.exportTo(filename, this.tasks);
    
    logger.success(`Tasks exported to ${filename}`);
  }

  async importTasks(filename) {
    const importedTasks = await storage.importFrom(filename);
    
    await this.loadTasks();
    
    const maxId = this.tasks.length > 0 
      ? Math.max(...this.tasks.map(t => t.id)) 
      : 0;
    
    importedTasks.forEach((task, index) => {
      task.id = maxId + index + 1;
      this.tasks.push(task);
    });
    
    await this.saveTasks();
    logger.success(`Tasks imported from ${filename}`);
  }
}

module.exports = new TaskManager();
```

</details>

---

## 🧪 Testing Guide

### Basic Tests:
```bash
# 1. Add tasks
node index.js add "Buy groceries" high
node index.js add "Finish homework" medium
node index.js add "Call mom" low

# 2. List all tasks
node index.js list

# 3. List pending tasks
node index.js list pending

# 4. Complete a task
node index.js complete 1

# 5. List completed tasks
node index.js list completed

# 6. Update a task
node index.js update 2 "Finish Node.js homework"

# 7. Show statistics
node index.js stats

# 8. Export tasks
node index.js export ./backup.json

# 9. Delete a task
node index.js delete 3

# 10. Import tasks
node index.js import ./backup.json
```

---

## 🎯 Learning Objectives Checklist

- [ ] เข้าใจการอ่าน/เขียน JSON files
- [ ] เข้าใจการใช้ async/await
- [ ] เข้าใจ Array methods (filter, find, map)
- [ ] เข้าใจการจัดการ errors
- [ ] เข้าใจการออกแบบ class และ methods
- [ ] เข้าใจ data persistence
- [ ] เข้าใจการ validate input
- [ ] เข้าใจการจัดรูปแบบข้อมูล

---

## 💡 Tips

1. **Testing:** ทดสอบทีละ method อย่าเขียนทั้งหมดแล้วค่อยทดสอบ
2. **Error Handling:** ใส่ try-catch ทุกที่ที่มี async operations
3. **Validation:** ตรวจสอบ input ก่อนใช้งานเสมอ
4. **Logging:** ใช้ logger เพื่อ debug ง่ายขึ้น
5. **Code Style:** เขียนโค้ดให้อ่านง่าย ใส่ comments ที่จำเป็น

---

**สำเร็จแล้ว! 🎉** เมื่อเขียนครบทุก method แล้ว ให้ทดสอบให้แน่ใจว่าทำงานถูกต้อง
