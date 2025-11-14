

import StringCellView from "../renderers/StringCellView";
import NumberCellView from "../renderers/NumberCellView";
import BooleanCellView from "../renderers/BooleanCellView";
import SelectCellView from "../renderers/SelectCellView";
import StringEditor from "../editors/StringEditor";
import NumberEditor from "../editors/NumberEditor";
import BooleanEditor from "../editors/BooleanEditor";
import SelectEditor from "../editors/SelectEditor";

/**
 * Centralized table configuration:
 *  - CELL_RENDERERS: maps column types to view components
 *  - CELL_EDITORS: maps column types to editor components
 *  - SUPPORTED_COLUMN_TYPES: allowed schema types
 *  - LOCAL_STORAGE_KEYS: keys used for persistence
 *  - DEFAULT_GENERATED_ROWS: default dataset size
 *
 * These constants define the type system and behavior used by the table.
 */

export const CELL_EDITORS = {
  string: StringEditor,
  number: NumberEditor,
  boolean: BooleanEditor,
  select: SelectEditor,
};

export const SUPPORTED_COLUMN_TYPES = ["string", "number", "boolean", "select"];

export const CELL_RENDERERS = {
  string: StringCellView,
  number: NumberCellView,
  boolean: BooleanCellView,
  select: SelectCellView,
};

// NEW: Step 1 – localStorage keys
export const LOCAL_STORAGE_KEYS = {
  SCHEMA: "generic_table_schema",
  DATA: "generic_table_data",
};

export const DEFAULT_GENERATED_ROWS = 200;


// Optional defaults (not required but helpful)
export const DEFAULT_ROW_HEIGHT = 40;
export const DEFAULT_TABLE_HEIGHT = 400;
