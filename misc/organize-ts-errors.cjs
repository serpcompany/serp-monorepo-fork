#!/usr/bin/env node

const fs = require('fs');

// Read the typecheck errors file
const content = fs.readFileSync('reports/typecheck-errors.txt', 'utf8');

// Extract only the actual error lines (filter out turbo output)
const errorLines = content
  .split('\n')
  .filter(line => line.includes('error TS'))
  .map(line => line.replace(/^@[^:]*:typecheck:\s*/, '')) // Remove turbo prefixes

// Categorize errors by TypeScript error code
const errorCategories = {};
const errorDetails = [];

errorLines.forEach(line => {
  const match = line.match(/error (TS\d+):/);
  if (match) {
    const errorCode = match[1];
    const filePath = line.split('(')[0];
    const location = line.match(/\((\d+,\d+)\)/)?.[1] || '';
    const message = line.split('): error TS' + errorCode.slice(2) + ': ')[1] || '';
    
    if (!errorCategories[errorCode]) {
      errorCategories[errorCode] = [];
    }
    
    const errorDetail = {
      code: errorCode,
      file: filePath,
      location: location,
      message: message,
      fullLine: line
    };
    
    errorCategories[errorCode].push(errorDetail);
    errorDetails.push(errorDetail);
  }
});

// Create organized output
let output = '# TypeScript Error Analysis\n\n';
output += `Total errors found: ${errorDetails.length}\n\n`;

// Summary by error type
output += '## Error Summary by Type\n\n';
const sortedCodes = Object.keys(errorCategories).sort((a, b) => 
  errorCategories[b].length - errorCategories[a].length
);

sortedCodes.forEach(code => {
  const count = errorCategories[code].length;
  const description = getErrorDescription(code);
  output += `- **${code}** (${count} errors): ${description}\n`;
});

output += '\n## Detailed Breakdown\n\n';

// Detailed breakdown by category
sortedCodes.forEach(code => {
  const errors = errorCategories[code];
  const description = getErrorDescription(code);
  
  output += `### ${code}: ${description} (${errors.length} errors)\n\n`;
  
  // Group by file for easier fixing
  const fileGroups = {};
  errors.forEach(error => {
    if (!fileGroups[error.file]) {
      fileGroups[error.file] = [];
    }
    fileGroups[error.file].push(error);
  });
  
  Object.keys(fileGroups).sort().forEach(file => {
    output += `**${file}**\n`;
    fileGroups[file].forEach(error => {
      output += `- Line ${error.location}: ${error.message}\n`;
    });
    output += '\n';
  });
  
  output += '---\n\n';
});

// Write the organized output
fs.writeFileSync('reports/typecheck-errors-organized.md', output);

console.log('Organization complete! Check reports/typecheck-errors-organized.md');
console.log(`Found ${errorDetails.length} total errors across ${sortedCodes.length} different error types`);

function getErrorDescription(code) {
  const descriptions = {
    'TS2339': 'Property does not exist on type',
    'TS18046': 'Value is of type unknown',
    'TS18047': 'Value is possibly null',
    'TS18049': 'Value is possibly null or undefined', 
    'TS2322': 'Type is not assignable to type',
    'TS2345': 'Argument type mismatch',
    'TS7006': 'Parameter implicitly has any type',
    'TS7053': 'Element implicitly has any type (no index signature)',
    'TS2532': 'Object is possibly undefined',
    'TS2304': 'Cannot find name/type',
    'TS2307': 'Cannot find module',
    'TS2353': 'Object literal unknown properties',
    'TS7034': 'Variable implicitly has any type',
    'TS7005': 'Variable implicitly has any type',
    'TS2769': 'No overload matches this call',
    'TS18048': 'Value is possibly undefined'
  };
  
  return descriptions[code] || 'Unknown error type';
}