declare module 'notion-types' {
  export interface Block {
    format: {
      table_block_row_header?: boolean; // Add the missing property here
      collection_pointer: {
        id: string;
        table: string;
        spaceId: string;
      };
      table_block_column_format?: { [column: string]: { width?: number; color?: string } };
      table_block_column_header: boolean;
      table_block_column_order: string[];
    };
  }
}
