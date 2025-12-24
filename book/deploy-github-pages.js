// Script to deploy to GitHub Pages
const { execSync } = require('child_process');
const fs = require('fs');

console.log('Building Docusaurus site for GitHub Pages...');

try {
  // Build the site
  execSync('npm run build', { cwd: process.cwd(), stdio: 'inherit' });

  console.log('Build completed successfully!');
  console.log('Deploying to GitHub Pages...');

  // Deploy to GitHub Pages
  execSync('npx docusaurus deploy', { cwd: process.cwd(), stdio: 'inherit' });

  console.log('Deployment to GitHub Pages completed successfully!');
} catch (error) {
  console.error('Error during build or deployment:', error.message);
  process.exit(1);
}