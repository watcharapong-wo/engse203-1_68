# 🎯 Workshop 9 - Level 2: Bonus Challenges

## 📌 ภาพรวม
หลังจากทำ basic features เสร็จแล้ว ลองเพิ่ม features ต่อไปนี้เพื่อพัฒนาทักษะเพิ่มเติม!

---

## 🏆 Bonus Challenge 1: Search Tasks

### เป้าหมาย:
ค้นหา tasks จาก keyword ในชื่อ task

### ตัวอย่างการใช้งาน:
```bash
node index.js search "Node"
node index.js search "API"
node index.js search "test"
```

### ผลลัพธ์ที่คาดหวัง:
```
ℹ Found 2 task(s) matching 'Node':

┌─────────┬─────────────────┬──────────┬────────────┬────────────┐
│ (index) │     Title       │ Priority │   Status   │  Created   │
├─────────┼─────────────────┼──────────┼────────────┼────────────┤
│    0    │'Learn Node.js'  │  'HIGH'  │ '⏳ Pending' │ '1/31/2026' │
│    1    │'Node.js API'    │ 'MEDIUM' │ '⏳ Pending' │ '1/31/2026' │
└─────────┴─────────────────┴──────────┴────────────┴────────────┘
```

### คำแนะนำการเขียน:

#### 1. เพิ่มใน index.js:
```javascript
case 'search':
  if (!args[1]) {
    logger.error('Please provide search keyword');
    break;
  }
  await taskManager.searchTasks(args[1]);
  break;
```

#### 2. เพิ่ม method ใน taskManager.js:
```javascript
async searchTasks(keyword) {
  await this.loadTasks();
  
  // TODO: กรอง tasks ที่มี keyword ใน title (case-insensitive)
  const results = this.tasks.filter(task => 
    task.title.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (results.length === 0) {
    logger.warning(`No tasks found matching '${keyword}'`);
    return;
  }
  
  logger.info(`\nFound ${results.length} task(s) matching '${keyword}':\n`);
  
  // แสดงผลเหมือน listTasks()
  const displayData = results.map(task => ({
    ID: task.id,
    Title: task.title,
    Priority: task.priority.toUpperCase(),
    Status: task.completed ? '✓ Done' : '⏳ Pending',
    Created: new Date(task.createdAt).toLocaleDateString()
  }));
  
  logger.table(displayData);
}
```

#### 3. อัพเดท help:
```javascript
console.log('  search <keyword>             - Search tasks by keyword');
```

---

## 🏆 Bonus Challenge 2: Sort Tasks

### เป้าหมาย:
เรียงลำดับ tasks ตาม priority หรือ date

### ตัวอย่างการใช้งาน:
```bash
node index.js list --sort priority
node index.js list --sort date
node index.js list pending --sort priority
```

### ผลลัพธ์ที่คาดหวัง:
```
ℹ 
ALL TASKS (sorted by priority):

┌─────────┬─────────────────┬──────────┬────────────┬────────────┐
│ (index) │     Title       │ Priority │   Status   │  Created   │
├─────────┼─────────────────┼──────────┼────────────┼────────────┤
│    0    │'Fix critical bug'│  'HIGH'  │ '⏳ Pending' │ '1/31/2026' │
│    1    │  'Build API'    │ 'MEDIUM' │ '⏳ Pending' │ '1/31/2026' │
│    2    │ 'Write docs'    │  'LOW'   │ '⏳ Pending' │ '1/31/2026' │
└─────────┴─────────────────┴──────────┴────────────┴────────────┘
```

### คำแนะนำการเขียน:

#### 1. แก้ไข index.js:
```javascript
case 'list':
  const filter = args[1] || 'all';
  const sortFlag = args.indexOf('--sort');
  const sortBy = sortFlag !== -1 ? args[sortFlag + 1] : null;
  await taskManager.listTasks(filter, sortBy);
  break;
```

#### 2. แก้ไข listTasks() ใน taskManager.js:
```javascript
async listTasks(filter = 'all', sortBy = null) {
  await this.loadTasks();
  
  // ... existing filter code ...
  
  // Sort if requested
  if (sortBy === 'priority') {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    filteredTasks.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sortBy === 'date') {
    filteredTasks.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  
  const sortText = sortBy ? ` (sorted by ${sortBy})` : '';
  logger.info(`\n${filter.toUpperCase()} TASKS${sortText}:\n`);
  
  // ... existing display code ...
}
```

---

## 🏆 Bonus Challenge 3: Due Date

### เป้าหมาย:
เพิ่ม due date ให้กับ tasks และแสดง tasks ที่เลยกำหนด

### ตัวอย่างการใช้งาน:
```bash
node index.js add "Meeting" high --due 2026-12-31
node index.js add "Report" medium --due 2026-02-15
node index.js list --overdue
node index.js list --upcoming
```

### ผลลัพธ์ที่คาดหวัง:
```
ℹ 
OVERDUE TASKS:

┌─────────┬──────────┬──────────┬────────────┬─────────────┐
│ (index) │  Title   │ Priority │   Status   │  Due Date   │
├─────────┼──────────┼──────────┼────────────┼─────────────┤
│    0    │'Report'  │ 'MEDIUM' │ '⏳ Pending' │ '2/15/2026' │
│         │          │          │            │ (⚠ overdue)│
└─────────┴──────────┴──────────┴────────────┴─────────────┘
```

### คำแนะนำการเขียน:

#### 1. แก้ไข addTask():
```javascript
async addTask(title, priority = 'medium', dueDate = null) {
  await this.loadTasks();
  
  // Validate priority
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(priority)) {
    priority = 'medium';
  }
  
  // Validate due date
  let validDueDate = null;
  if (dueDate) {
    const date = new Date(dueDate);
    if (!isNaN(date.getTime())) {
      validDueDate = date.toISOString();
    }
  }
  
  const task = {
    id: this.nextId++,
    title: title,
    priority: priority,
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: validDueDate
  };
  
  // ... rest of code ...
}
```

#### 2. เพิ่ม methods ใหม่:
```javascript
async listOverdueTasks() {
  await this.loadTasks();
  
  const now = new Date();
  const overdue = this.tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < now;
  });
  
  // Display overdue tasks
  // ... implementation ...
}

async listUpcomingTasks(days = 7) {
  await this.loadTasks();
  
  const now = new Date();
  const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  const upcoming = this.tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= future;
  });
  
  // Display upcoming tasks
  // ... implementation ...
}
```

---

## 🏆 Bonus Challenge 4: Categories/Tags

### เป้าหมาย:
เพิ่ม categories หรือ tags ให้กับ tasks

### ตัวอย่างการใช้งาน:
```bash
node index.js add "Code review" medium --tag work
node index.js add "Buy groceries" low --tag personal
node index.js add "Deploy app" high --tag work,urgent
node index.js list --tag work
node index.js list --tags
```

### ผลลัพธ์ที่คาดหวัง:
```
ℹ 
TASKS WITH TAG 'work':

┌─────────┬──────────────┬──────────┬────────────┬────────────┐
│ (index) │    Title     │ Priority │   Status   │    Tags    │
├─────────┼──────────────┼──────────┼────────────┼────────────┤
│    0    │'Code review' │ 'MEDIUM' │ '⏳ Pending' │   [work]   │
│    1    │'Deploy app'  │  'HIGH'  │ '⏳ Pending' │[work,urgent]│
└─────────┴──────────────┴──────────┴────────────┴────────────┘
```

### คำแนะนำการเขียน:

#### 1. แก้ไข task structure:
```javascript
const task = {
  id: this.nextId++,
  title: title,
  priority: priority,
  completed: false,
  createdAt: new Date().toISOString(),
  tags: tags ? tags.split(',').map(t => t.trim()) : []
};
```

#### 2. เพิ่ม filter by tags:
```javascript
async listTasksByTag(tag) {
  await this.loadTasks();
  
  const filtered = this.tasks.filter(task => 
    task.tags && task.tags.includes(tag)
  );
  
  // Display tasks
  // ... implementation ...
}

async listAllTags() {
  await this.loadTasks();
  
  const allTags = new Set();
  this.tasks.forEach(task => {
    if (task.tags) {
      task.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  console.log('\n📌 Available Tags:');
  Array.from(allTags).sort().forEach(tag => {
    const count = this.tasks.filter(t => 
      t.tags && t.tags.includes(tag)
    ).length;
    console.log(`  - ${tag} (${count} task${count > 1 ? 's' : ''})`);
  });
}
```

---

## 🏆 Bonus Challenge 5: Subtasks

### เป้าหมาย:
เพิ่มความสามารถในการสร้าง subtasks

### ตัวอย่างการใช้งาน:
```bash
node index.js add "Build feature" high
node index.js subtask add 1 "Write code"
node index.js subtask add 1 "Write tests"
node index.js subtask add 1 "Deploy"
node index.js subtask list 1
node index.js subtask complete 1 1
```

### Task structure:
```javascript
const task = {
  id: this.nextId++,
  title: title,
  priority: priority,
  completed: false,
  createdAt: new Date().toISOString(),
  subtasks: [
    { id: 1, title: "Write code", completed: false },
    { id: 2, title: "Write tests", completed: true },
    { id: 3, title: "Deploy", completed: false }
  ]
};
```

---

## 🏆 Bonus Challenge 6: Task Dependencies

### เป้าหมาย:
กำหนดว่า task ต้องรอ task อื่นเสร็จก่อน

### ตัวอย่างการใช้งาน:
```bash
node index.js add "Write code" high
node index.js add "Write tests" medium --depends-on 1
node index.js add "Deploy" high --depends-on 1,2
node index.js complete 1  # สามารถ complete ได้
node index.js complete 3  # ไม่สามารถ complete เพราะ task 2 ยังไม่เสร็จ
```

---

## 🏆 Bonus Challenge 7: Task Templates

### เป้าหมาย:
สร้าง templates สำหรับ tasks ที่ทำบ่อย

### ตัวอย่างการใช้งาน:
```bash
# บันทึก template
node index.js template save "development" "Write code,Write tests,Code review,Deploy"

# ใช้ template
node index.js template use "development" "New Feature"

# แสดง templates
node index.js template list
```

---

## 🏆 Bonus Challenge 8: Task Notes

### เป้าหมาย:
เพิ่ม notes/comments ให้กับ tasks

### ตัวอย่างการใช้งาน:
```bash
node index.js note add 1 "Remember to test edge cases"
node index.js note add 1 "Use async/await pattern"
node index.js note list 1
```

---

## 🏆 Bonus Challenge 9: Archive Tasks

### เป้าหมาย:
Archive tasks ที่เสร็จแล้วแทนการลบ

### ตัวอย่างการใช้งาน:
```bash
node index.js archive 1
node index.js list --archived
node index.js unarchive 1
```

---

## 🏆 Bonus Challenge 10: Recurring Tasks

### เป้าหมาย:
สร้าง tasks ที่ซ้ำตามระยะเวลา

### ตัวอย่างการใช้งาน:
```bash
node index.js add "Weekly review" medium --recur weekly
node index.js add "Monthly report" high --recur monthly
node index.js recur show  # แสดง recurring tasks
```

---

## 📊 Bonus Challenges Checklist

### Basic Enhancements:
- [ ] Search tasks
- [ ] Sort tasks
- [ ] Due dates
- [ ] Categories/Tags

### Advanced Features:
- [ ] Subtasks
- [ ] Task dependencies
- [ ] Task templates
- [ ] Task notes

### Pro Features:
- [ ] Archive system
- [ ] Recurring tasks
- [ ] Task history
- [ ] Analytics dashboard

---

## 💡 Tips

### 1. เริ่มจากง่ายไปยาก
เริ่มจาก Challenge 1-4 ก่อน แล้วค่อยทำ advanced features

### 2. ทดสอบทุกครั้ง
ทดสอบหลังเพิ่มแต่ละ feature

### 3. Refactor เป็นระยะ
ถ้า code เริ่มยุ่ง ให้ refactor เป็นระยะ

### 4. เขียน Documentation
อธิบายการใช้งาน features ใหม่

---

## 🎯 การส่งงาน Bonus

ถ้าทำ Bonus Challenges:
1. บันทึกใน DEVELOPMENT_LOG.md
2. อัพเดท README.md ให้ครอบคลุม features ใหม่
3. เขียน tests สำหรับ features ใหม่
4. Screenshot การทำงาน
5. Push to GitHub with clear commit messages

---

**Have fun coding! 🚀**

*Bonus Challenges for Workshop 9 - Level 2*  
*Created: January 31, 2026*
