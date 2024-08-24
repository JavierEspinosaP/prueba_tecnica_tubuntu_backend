import path from 'path';
import fs from 'fs';

// Define the file path where the CSV will be saved
const filePath = path.join(__dirname, '../../pokemons.csv');

export const generateCsv = async (data: { name: string, base_experience: number, height: number, weight: number }[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Sort the data by base_experience in ascending order
      const sortedData = data.sort((a, b) => a.base_experience - b.base_experience);

      // Convert the sorted data to CSV format using a semicolon as the separator
      const csvRows = sortedData.map(row => {
        return `${row.name};${row.base_experience};${row.height};${row.weight}`;
      }).join('\n');

      // Add the CSV header
      const header = `name;base_experience;height;weight`;
      const csvContent = `${header}\n${csvRows}`;

      // Write the CSV content to a file
      fs.writeFile(filePath, csvContent, 'utf8', (err) => {
        if (err) {
          // Handle any errors that occur during file writing
          reject('Some error occurred - file either not saved or corrupted file saved.');
        } else {
          // Resolve the promise with the file path if successful
          resolve(filePath);
        }
      });
    } catch (error) {
      // Handle any errors that occur during CSV generation
      reject('Error during CSV generation');
    }
  });
};
