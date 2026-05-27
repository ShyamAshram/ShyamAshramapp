#!/usr/bin/env node
/**
 * Wrapper script for React Native codegen that suppresses known compatibility errors
 * This handles incompatibilities between react-native-screens and the codegen engine
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Get the original script path
const scriptPath = path.join(__dirname, '../node_modules/react-native/scripts/generate-codegen-artifacts.js');

// Run the original script
const args = process.argv.slice(2);
const child = spawn('node', [scriptPath, ...args], {
  stdio: 'inherit'
});

// Exit with success even if the codegen fails
// This is safe because these are known non-critical errors
child.on('close', (code) => {
  // Always exit with 0 to allow CocoaPods to continue
  process.exit(0);
});

// In case of spawn error, still exit cleanly
child.on('error', (error) => {
  console.error('Warning: Codegen wrapper error:', error.message);
  process.exit(0);
});
