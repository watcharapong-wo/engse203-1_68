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
      // TODO: ตรวจสอบว่าไฟล์มีอยู่หรือไม่
      // ถ้าไม่มี ให้ return empty array
      // ถ้ามี ให้อ่านและ parse JSON
      
      // 💡 คำแนะนำ:
      // 1. ใช้ fs.access() เพื่อเช็คว่าไฟล์มีอยู่
      // 2. ใช้ fs.readFile() เพื่ออ่านไฟล์
      // 3. ใช้ JSON.parse() เพื่อแปลงเป็น object
      
      // 📝 ตัวอย่าง:
      // try {
      //   await fs.access(this.dataFile);
      //   const data = await fs.readFile(this.dataFile, 'utf-8');
      //   return JSON.parse(data);
      // } catch {
      //   return [];
      // }
      
      // ============================================
      // YOUR CODE HERE (ประมาณ 7 บรรทัด)
      // ============================================
      
      
      
      
      
      
      
      
      // ============================================
      
    } catch (error) {
      logger.error(`Failed to read data: ${error.message}`);
      return [];
    }
  }

  // บันทึกข้อมูล tasks ลงไฟล์
  async write(data) {
    try {
      // TODO: สร้างโฟลเดอร์ data ถ้ายังไม่มี
      // TODO: แปลง data เป็น JSON string (แบบ pretty print)
      // TODO: เขียนลงไฟล์
      
      // 💡 คำแนะนำ:
      // 1. ใช้ path.dirname() เพื่อหา directory
      // 2. ใช้ fs.mkdir() เพื่อสร้างโฟลเดอร์ (recursive: true)
      // 3. ใช้ JSON.stringify() พร้อม indent (null, 2)
      // 4. ใช้ fs.writeFile() เพื่อเขียนไฟล์
      
      // 📝 ตัวอย่าง:
      // const dir = path.dirname(this.dataFile);
      // await fs.mkdir(dir, { recursive: true });
      // const jsonData = JSON.stringify(data, null, 2);
      // await fs.writeFile(this.dataFile, jsonData, 'utf-8');
      
      // ============================================
      // YOUR CODE HERE (ประมาณ 4 บรรทัด)
      // ============================================
      
      
      
      
      
      // ============================================
      
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
      // TODO: ทำคล้ายกับ write() แต่ใช้ filename ที่ระบุ
      
      // 💡 คำแนะนำ:
      // คล้ายกับ write() แต่ใช้ filename แทน this.dataFile
      
      // ============================================
      // YOUR CODE HERE (ประมาณ 4 บรรทัด)
      // ============================================
      
      
      
      
      
      // ============================================
      
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
      // TODO: อ่านไฟล์ที่ระบุและ return data
      
      // 💡 คำแนะนำ:
      // คล้ายกับ read() แต่ใช้ filename แทน this.dataFile
      
      // ============================================
      // YOUR CODE HERE (ประมาณ 3 บรรทัด)
      // ============================================
      
      
      
      
      // ============================================
      
    } catch (error) {
      logger.error(`Failed to import: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new Storage();
