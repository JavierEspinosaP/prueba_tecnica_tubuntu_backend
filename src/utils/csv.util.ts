import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

export const generateCsv = async (data: any[]): Promise<string> => {
  const filePath = path.join(__dirname, '../../pokemons.csv');
  
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'name', title: 'name' },
      { id: 'base_experience', title: 'base_experience' },
      { id: 'height', title: 'height' },
      { id: 'weight', title: 'weight' },
    ],
  });

  await csvWriter.writeRecords(data);
  return filePath;
};
