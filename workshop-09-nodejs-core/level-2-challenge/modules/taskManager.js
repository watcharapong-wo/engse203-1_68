// modules/taskManager.js
const { v4: uuidv4 } = require('uuid');
const storage = require('./storage');
const logger = require('./logger');

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  // โหลด tasks จาก storage
  async loadTasks() {
    this.tasks = await storage.read();
    if (this.tasks.length > 0) {
      this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
    }
  }

  // บันทึก tasks ไปยัง storage
  async saveTasks() {
    await storage.write(this.tasks);
  }

  // เพิ่ม task ใหม่
  async addTask(title, priority = 'medium', options = {}) {
    await this.loadTasks();

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    const validPriority = validPriorities.includes(priority.toLowerCase()) 
      ? priority.toLowerCase() 
      : 'medium';

    // Create task object
    const task = {
      id: this.nextId++,
      title: title,
      priority: validPriority,
      completed: false,
      createdAt: new Date().toISOString(),
      ...(options.dueDate && { dueDate: options.dueDate }),
      ...(options.tag && { tag: options.tag })
    };

    this.tasks.push(task);
    await this.saveTasks();
    
    let message = `Task added: "${title}" (ID: ${task.id})`;
    if (task.dueDate) message += ` 📅 Due: ${task.dueDate}`;
    if (task.tag) message += ` 🏷️ Tag: ${task.tag}`;
    logger.success(message);
    return task;
  }

  // แสดงรายการ tasks
  async listTasks(filter = 'all', options = {}) {
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

    // Filter by tag
    if (options.tag) {
      filteredTasks = filteredTasks.filter(t => t.tag === options.tag);
    }

    // Filter overdue tasks
    if (options.overdue) {
      const now = new Date();
      filteredTasks = filteredTasks.filter(t => 
        t.dueDate && new Date(t.dueDate) < now && !t.completed
      );
    }

    // Sort tasks
    if (options.sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (options.sortBy === 'date') {
      filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (filteredTasks.length === 0) {
      logger.warning(`No ${filter} tasks found`);
      return;
    }

    // Display as table
    const filterLabel = options.overdue ? 'OVERDUE' : 
                       options.tag ? `${options.tag.toUpperCase()} TAG` : 
                       filter.toUpperCase();
    logger.info(`\n${filterLabel} TASKS:\n`);
    
    const displayData = filteredTasks.map(task => {
      const priorityEmoji = task.priority === 'high' ? '🔴' : 
                           task.priority === 'medium' ? '🟡' : '🟢';
      const obj = {
        ID: task.id,
        Title: task.title.length > 30 ? task.title.substring(0, 27) + '...' : task.title,
        Priority: `${priorityEmoji} ${task.priority.toUpperCase()}`,
        Status: task.completed ? '✓ Done' : '⏳ Pending',
        Created: new Date(task.createdAt).toLocaleDateString('th-TH')
      };
      if (task.dueDate) obj.Due = task.dueDate;
      if (task.tag) obj.Tag = task.tag;
      return obj;
    });
    
    logger.table(displayData);
    
    console.log(`\nTotal: ${filteredTasks.length} task(s)\n`);
  }

  // ทำเครื่องหมาย task เสร็จ
  async completeTask(id) {
    await this.loadTasks();

    // TODO: หา task จาก id
    // TODO: เปลี่ยน completed เป็น true
    // TODO: เพิ่ม completedAt timestamp
    
    // 💡 คำแนะนำ:
    // 1. ใช้ find() หา task ที่มี id ตรงกัน
    // 2. ตรวจสอบว่าเจอ task หรือไม่
    // 3. ตรวจสอบว่า task เสร็จแล้วหรือยัง
    // 4. ตั้งค่า completed = true และ completedAt
    
    // 📝 ตัวอย่าง:
    // const task = this.tasks.find(t => t.id === id);
    // if (!task) throw new Error(`Task ${id} not found`);
    // if (task.completed) {
    //   logger.warning('Task already completed');
    //   return;
    // }
    // task.completed = true;
    // task.completedAt = new Date().toISOString();
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 8 บรรทัด)
    // ============================================
    
    
    
    
    
    
    
    
    
    // ============================================
    
    await this.saveTasks();
    logger.success(`Task ${id} marked as completed`);
  }

  // ลบ task
  async deleteTask(id) {
    await this.loadTasks();

    // TODO: ลบ task ที่มี id ตรงกัน
    // TODO: ตรวจสอบว่าหา task เจอหรือไม่
    
    // 💡 คำแนะนำ:
    // 1. ใช้ findIndex() หา index ของ task
    // 2. ตรวจสอบว่าเจอหรือไม่ (index !== -1)
    // 3. ใช้ splice() ลบ task
    
    // 📝 ตัวอย่าง:
    // const index = this.tasks.findIndex(t => t.id === id);
    // if (index === -1) throw new Error(`Task ${id} not found`);
    // this.tasks.splice(index, 1);
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 4 บรรทัด)
    // ============================================
    
    
    
    
    
    // ============================================
    
    await this.saveTasks();
    logger.success(`Task ${id} deleted`);
  }

  // แก้ไข task
  async updateTask(id, newTitle) {
    await this.loadTasks();

    // TODO: หา task และแก้ไข title
    // TODO: เพิ่ม updatedAt timestamp
    
    // 💡 คำแนะนำ:
    // 1. หา task ด้วย find()
    // 2. ตรวจสอบว่าเจอหรือไม่
    // 3. อัพเดท title และเพิ่ม updatedAt
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 5 บรรทัด)
    // ============================================
    
    
    
    
    
    
    // ============================================
    
    await this.saveTasks();
    logger.success(`Task ${id} updated`);
  }

  // แสดง statistics
  async showStats() {
    await this.loadTasks();

    // TODO: คำนวณ statistics
    // - จำนวน tasks ทั้งหมด
    // - tasks ที่เสร็จแล้ว
    // - tasks ที่รอดำเนินการ
    // - แยกตาม priority (high/medium/low)
    
    // 💡 คำแนะนำ:
    // 1. นับจำนวน tasks ทั้งหมด
    // 2. filter นับ completed tasks
    // 3. filter นับ pending tasks
    // 4. filter นับตาม priority แต่ละระดับ
    // 5. คำนวณ completion rate (%)
    
    // 📝 ตัวอย่าง:
    // const total = this.tasks.length;
    // const completed = this.tasks.filter(t => t.completed).length;
    // const pending = total - completed;
    // const highPriority = this.tasks.filter(t => t.priority === 'high').length;
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 20 บรรทัด)
    // ============================================
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ============================================
  }

  // Export tasks
  async exportTasks(filename) {
    await this.loadTasks();
    
    // TODO: ใช้ storage.exportTo() เพื่อ export
    
    // 💡 คำแนะนำ:
    // เรียก storage.exportTo(filename, this.tasks)
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 1 บรรทัด)
    // ============================================
    
    
    // ============================================
    
    logger.success(`Tasks exported to ${filename}`);
  }

  // Import tasks
  async importTasks(filename) {
    // TODO: ใช้ storage.importFrom() เพื่อ import
    // TODO: merge กับ tasks ที่มีอยู่ (ถ้ามี)
    // TODO: ระวัง id ซ้ำ
    
    // 💡 คำแนะนำ:
    // 1. อ่าน tasks จาก file ด้วย storage.importFrom()
    // 2. โหลด tasks ที่มีอยู่
    // 3. หา id สูงสุดจาก tasks เดิม
    // 4. เพิ่ม id ใหม่ให้ tasks ที่ import เข้ามา
    // 5. merge tasks
    
    // 📝 ตัวอย่าง:
    // const importedTasks = await storage.importFrom(filename);
    // await this.loadTasks();
    // const maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) : 0;
    // importedTasks.forEach((task, index) => {
    //   task.id = maxId + index + 1;
    //   this.tasks.push(task);
    // });
    
    // ============================================
    // YOUR CODE HERE (ประมาณ 8 บรรทัด)
    // ============================================
    
    await this.saveTasks();
    logger.success(`Tasks imported from ${filename}`);
  }

  // 🎁 BONUS 1: Search tasks
  async searchTasks(keyword) {
    await this.loadTasks();

    const results = this.tasks.filter(task => 
      task.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (task.tag && task.tag.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (results.length === 0) {
      logger.warning(`No tasks found matching "${keyword}"`);
      return;
    }

    logger.info(`\n🔍 SEARCH RESULTS for "${keyword}":\n`);
    
    const displayData = results.map(task => {
      const priorityEmoji = task.priority === 'high' ? '🔴' : 
                           task.priority === 'medium' ? '🟡' : '🟢';
      const obj = {
        ID: task.id,
        Title: task.title,
        Priority: `${priorityEmoji} ${task.priority.toUpperCase()}`,
        Status: task.completed ? '✓ Done' : '⏳ Pending'
      };
      if (task.tag) obj.Tag = task.tag;
      return obj;
    });
    
    logger.table(displayData);
    console.log(`\nFound: ${results.length} task(s)\n`);
  }
}

module.exports = new TaskManager();
