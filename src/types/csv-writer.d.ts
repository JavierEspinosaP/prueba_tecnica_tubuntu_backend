declare module 'csv-writer' {
    interface CsvWriter {
      writeRecords(records: any[]): Promise<void>;
    }
  
    interface CsvWriterParams {
      path: string;
      header: Array<{ id: string; title: string }>;
    }
  
    export function createObjectCsvWriter(params: CsvWriterParams): CsvWriter;
  }
  