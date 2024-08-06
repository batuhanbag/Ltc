const { execSync } = require('child_process');

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error('Please provide a commit message.');
  console.error('Usage: node commit-and-release.js "Your commit message"');
  process.exit(1);
}

try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  execSync('yarn clean', { stdio: 'inherit' });
  execSync('yarn prepare', { stdio: 'inherit' });
  execSync('yarn release', { stdio: 'inherit' });
  console.log('All operations completed successfully!');
} catch (error) {
  console.error('An error occurred during the process:', error.message);
  process.exit(1);
}
