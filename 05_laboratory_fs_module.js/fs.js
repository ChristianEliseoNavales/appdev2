const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("The File doesn't exist", err);
    return;
  }
  console.log('File read:', data);
});

fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
    return;
  }
  console.log('File created successfully!');
});

fs.appendFile('sample.txt', '\nAppended content.', (err) => {
  if (err) {
    console.error("The File doesn't exist", err);
    return;
  }
  console.log('Content appended successfully!');
});

fs.unlink('newfile.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    console.log('File deleted successfully!');
});