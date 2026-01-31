// modules/storage.js
const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');
const { config } = require('./config');

class Storage {
  constructor() {
    this.dataFile = config.dataFile;
  }

  // อ่านข้อมูล tasks จากไฟล์
  async read() {
    try {
      // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
      try {
        await fs.access(this.dataFile);
        const data = await fs.readFile(this.dataFile, 'utf-8');
        return JSON.parse(data);
      } catch {
        // ไฟล์ยังไม่มี return empty array
        return [];
      }
      
    } catch (error) {
      logger.error(`Failed to read data: ${error.message}`);
      return [];
    }
  }

  // บันทึกข้อมูล tasks ลงไฟล์
  async write(data) {
    try {
      // สร้างโฟลเดอร์ data ถ้ายังไม่มี
      const dir = path.dirname(this.dataFile);
      await fs.mkdir(dir, { recursive: true });
      
      // แปลง data เป็น JSON string (แบบ pretty print)
      const jsonData = JSON.stringify(data, null, 2);
      
      // เขียนลงไฟล์
      await fs.writeFile(this.dataFile, jsonData, 'utf-8');
      
      logger.success('Data saved successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to write data: ${error.message}`);
      throw error;
    }
  }

  // Export tasks ไปยังไฟล์อื่น
  async exportTo(filename, data) {
    try {
      // สร้างโฟลเดอร์ถ้ายังไม่มี
      const dir = path.dirname(filename);
      await fs.mkdir(dir, { recursive: true });
      
      // แปลงเป็น JSON และเขียนไฟล์
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(filename, jsonData, 'utf-8');
      
      logger.success(`Exported to ${filename}`);
      return true;
    } catch (error) {
      logger.error(`Failed to export: ${error.message}`);
      throw error;
    }
  }

  // Import tasks จากไฟล์อื่น
  async importFrom(filename) {
    try {
      // อ่านไฟล์และแปลง JSON
      const data = await fs.readFile(filename, 'utf-8');
      const tasks = JSON.parse(data);
      
      logger.success(`Imported from ${filename}`);
      return tasks;
    } catch (error) {
      logger.error(`Failed to import: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new Storage();
