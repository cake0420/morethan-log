declare module 'notion-types' {
  export type ID = string;

  export interface Block {
    id: string;
    parent_table?: string;
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

  export interface ExtendedRecordMap {
    collection: {
      [key: string]: {
        value: any;
      };
    };
    block: any;
    collection_query: {
      [key: string]: {
        [key: string]: {
          blockIds: ID[];
          collection_group_results?: {
            blockIds: ID[];
          };
        };
      };
    };
  }
}
