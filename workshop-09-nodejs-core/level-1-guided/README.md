# 🎓 Workshop 9 - Level 1: Node.js File Manager CLI

## 📌 ภาพรวม
Workshop นี้สอนพื้นฐาน Node.js ผ่านการสร้าง File Manager CLI Tool ที่สามารถจัดการไฟล์และโฟลเดอร์ได้

## ✨ ฟีเจอร์
- ✅ แสดงรายการไฟล์ในโฟลเดอร์
- ✅ สร้างไฟล์ใหม่
- ✅ อ่านเนื้อหาไฟล์
- ✅ ลบไฟล์
- ✅ สร้างโฟลเดอร์
- ✅ คัดลอกไฟล์
- ✅ ใช้ Environment Variables
- ✅ บันทึก Log ลงไฟล์

## 📁 โครงสร้างโปรเจค
```
level-1-guided/
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # NPM configuration
├── index.js               # Main application
├── modules/
│   ├── config.js          # Configuration module
│   ├── logger.js          # Logger module
│   └── fileManager.js     # File manager module
├── data/
│   └── sample.txt         # Sample data file
├── logs/
│   └── app.log           # Application log file
└── EXPERIMENT_RESULTS.md  # Experiment results template
```

## 🚀 การติดตั้ง

### 1. ติดตั้ง Dependencies (ทำเรียบร้อยแล้ว)
```bash
npm install
```

Dependencies ที่ติดตั้ง:
- `dotenv` - สำหรับจัดการ Environment Variables
- `chalk@4.1.2` - สำหรับแสดงสีใน terminal
- `nodemon` - สำหรับ development (auto-reload)

## 📖 วิธีใช้งาน

### คำสั่งพื้นฐาน

#### 1. แสดงความช่วยเหลือ
```bash
node index.js help
```

#### 2. แสดงรายการไฟล์
```bash
node index.js list
```

#### 3. สร้างไฟล์ใหม่
```bash
node index.js create <filename> [content]
```
ตัวอย่าง:
```bash
node index.js create hello.txt "Hello World!"
```

#### 4. อ่านไฟล์
```bash
node index.js read <filename>
```
ตัวอย่าง:
```bash
node index.js read sample.txt
```

#### 5. คัดลอกไฟล์
```bash
node index.js copy <source> <destination>
```
ตัวอย่าง:
```bash
node index.js copy sample.txt backup.txt
```

#### 6. สร้างโฟลเดอร์
```bash
node index.js mkdir <dirname>
```
ตัวอย่าง:
```bash
node index.js mkdir my-folder
```

#### 7. ลบไฟล์
```bash
node index.js delete <filename>
```
ตัวอย่าง:
```bash
node index.js delete test.txt
```

## 🧪 ตัวอย่างการทดสอบ

### ทดสอบแบบครบวงจร
```bash
# 1. แสดงไฟล์ทั้งหมด
node index.js list

# 2. สร้างไฟล์ใหม่
node index.js create test1.txt "This is a test file"

# 3. อ่านไฟล์
node index.js read test1.txt

# 4. คัดลอกไฟล์
node index.js copy test1.txt test2.txt

# 5. สร้างโฟลเดอร์
node index.js mkdir documents

# 6. แสดงไฟล์ทั้งหมดอีกครั้ง
node index.js list

# 7. ตรวจสอบ log
cat logs/app.log
```

## 🔧 การพัฒนา

### Development Mode (Auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🌍 Environment Variables

ตั้งค่าใน `.env` file:
```env
APP_NAME=File Manager CLI
LOG_LEVEL=info
DATA_DIR=./data
LOG_DIR=./logs
```

## 📚 สิ่งที่ได้เรียนรู้

### 1. Node.js Modules
- ใช้ `require()` สำหรับ import modules
- ใช้ `module.exports` สำหรับ export
- CommonJS module system

### 2. File System Operations
- `fs.readdir()` - อ่านรายการไฟล์
- `fs.readFile()` - อ่านเนื้อหาไฟล์
- `fs.writeFile()` - เขียนไฟล์
- `fs.unlink()` - ลบไฟล์
- `fs.mkdir()` - สร้างโฟลเดอร์
- `fs.copyFile()` - คัดลอกไฟล์
- `fs.stat()` - รับข้อมูลไฟล์

### 3. Async/Await Pattern
- ใช้ `fs.promises` สำหรับ async operations
- Error handling ด้วย try-catch
- Sequential และ parallel operations

### 4. Environment Variables
- ใช้ `dotenv` package
- `process.env` สำหรับเข้าถึง environment variables
- การตรวจสอบ required variables

### 5. Command Line Arguments
- `process.argv` - รับ arguments
- การ parse และ validate arguments
- Switch-case สำหรับ routing commands

### 6. Error Handling
- Try-catch blocks
- Custom error messages
- Exit codes (`process.exit()`)

### 7. Logger Pattern
- Singleton pattern
- Console และ file logging
- Color-coded messages (chalk)

## 🎯 Challenges (ถ้ามีเวลา)

### Challenge 1: เพิ่มคำสั่ง `append`
เพิ่มข้อความต่อท้ายไฟล์ที่มีอยู่

**Hint:** ใช้ `fs.appendFile()`

### Challenge 2: เพิ่มคำสั่ง `search`
ค้นหาไฟล์ที่มีข้อความที่ต้องการ

**Hint:** 
1. ใช้ `fs.readdir()` อ่านรายการไฟล์
2. Loop อ่านแต่ละไฟล์ด้วย `fs.readFile()`
3. ใช้ `String.includes()` ค้นหาข้อความ

### Challenge 3: เพิ่มคำสั่ง `stats`
แสดงข้อมูลรายละเอียดของไฟล์

**Hint:** ใช้ `fs.stat()` และแสดง:
- ขนาดไฟล์
- วันที่สร้าง (birthtime)
- วันที่แก้ไขล่าสุด (mtime)
- จำนวนบรรทัด (ใช้ `content.split('\n').length`)

## 🔗 Resources
- [Node.js File System Documentation](https://nodejs.org/api/fs.html)
- [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- [Chalk Documentation](https://www.npmjs.com/package/chalk)

## 📝 หมายเหตุ
- ไฟล์ทั้งหมดจะถูกจัดการใน `./data` directory
- Log จะถูกบันทึกใน `./logs/app.log`
- ใช้ WSL สำหรับรัน commands: `wsl -e bash -c "cd /path/to/project && node index.js <command>"`

## ✅ สถานะ
- [x] Setup project structure
- [x] สร้าง config module
- [x] สร้าง logger module
- [x] สร้าง fileManager module
- [x] สร้าง main CLI application
- [x] ทดสอบทุก features
- [ ] ทำ Challenges (ถ้ามีเวลา)

## 👉 Next Steps
เมื่อทำ Level 1 เสร็จแล้ว ไปทำ: **Level 2: Challenge Workshop**
