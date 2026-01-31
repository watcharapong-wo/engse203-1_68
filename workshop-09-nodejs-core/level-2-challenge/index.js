// index.js
const taskManager = require('./modules/taskManager');
const logger = require('./modules/logger');
const { config, validateConfig } = require('./modules/config');

// Validate configuration
try {
  validateConfig();
} catch (error) {
  logger.error(error.message);
  process.exit(1);
}

// Show banner
function showBanner() {
  console.log('\n' + '='.repeat(60));
  console.log(`  📝 ${config.appName}`);
  console.log('='.repeat(60) + '\n');
}

// Show help
function showHelp() {
  console.log('Usage: node index.js <command> [arguments]\n');
  console.log('Commands:');
  console.log('  add <title> [priority] [options]  - Add a new task (priority: low/medium/high)');
  console.log('  list [filter] [options]           - List tasks (filter: all/pending/completed)');
  console.log('  complete <id>                     - Mark task as completed');
  console.log('  delete <id>                       - Delete a task');
  console.log('  update <id> <title>               - Update task title');
  console.log('  stats                             - Show statistics');
  console.log('  export <filename>                 - Export tasks to JSON file');
  console.log('  import <filename>                 - Import tasks from JSON file');
  console.log('  search <keyword>                  - 🎁 BONUS: Search tasks by keyword');
  console.log('  help                              - Show this help\n');
  console.log('Options:');
  console.log('  --sort <priority|date>            - 🎁 BONUS: Sort tasks');
  console.log('  --due <YYYY-MM-DD>                - 🎁 BONUS: Set due date');
  console.log('  --tag <tagname>                   - 🎁 BONUS: Add/filter by tag');
  console.log('  --overdue                         - 🎁 BONUS: Show overdue tasks\n');
  console.log('Examples:');
  console.log('  node index.js add "Buy groceries" high');
  console.log('  node index.js add "Meeting" high --due 2024-12-31 --tag work');
  console.log('  node index.js list pending --sort priority');
  console.log('  node index.js list --overdue');
  console.log('  node index.js list --tag work');
  console.log('  node index.js search "Node"');
}

// Main function
async function main() {
  showBanner();

  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'add':
        if (!args[1]) {
          logger.error('Please provide a task title');
          break;
        }
        const priority = args[2] || 'medium';
        const dueDate = args.find(arg => arg.startsWith('--due'));
        const tag = args.find(arg => arg.startsWith('--tag'));
        const options = {};
        if (dueDate) options.dueDate = args[args.indexOf(dueDate) + 1];
        if (tag) options.tag = args[args.indexOf(tag) + 1];
        await taskManager.addTask(args[1], priority, options);
        break;

      case 'list':
        const filter = args[1] && !args[1].startsWith('--') ? args[1] : 'all';
        const sortBy = args.find(arg => arg === '--sort') ? args[args.indexOf('--sort') + 1] : null;
        const filterTag = args.find(arg => arg === '--tag') ? args[args.indexOf('--tag') + 1] : null;
        const showOverdue = args.includes('--overdue');
        await taskManager.listTasks(filter, { sortBy, tag: filterTag, overdue: showOverdue });
        break;

      case 'complete':
        if (!args[1]) {
          logger.error('Please provide task ID');
          break;
        }
        await taskManager.completeTask(parseInt(args[1]));
        break;

      case 'delete':
        if (!args[1]) {
          logger.error('Please provide task ID');
          break;
        }
        await taskManager.deleteTask(parseInt(args[1]));
        break;

      case 'update':
        if (!args[1] || !args[2]) {
          logger.error('Please provide task ID and new title');
          break;
        }
        await taskManager.updateTask(parseInt(args[1]), args[2]);
        break;

      case 'stats':
        await taskManager.showStats();
        break;

      case 'export':
        if (!args[1]) {
          logger.error('Please provide export filename');
          break;
        }
        await taskManager.exportTasks(args[1]);
        break;

      case 'import':
        if (!args[1]) {
          logger.error('Please provide import filename');
          break;
        }
        await taskManager.importTasks(args[1]);
        break;

      case 'search':
        if (!args[1]) {
          logger.error('Please provide search keyword');
          break;
        }
        await taskManager.searchTasks(args[1]);
        break;

      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
