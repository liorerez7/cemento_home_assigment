// src/features/table/utils/constants.js

/*
  HIGH LEVEL (final design):

  This file should centralize:
    - type -> renderer component mapping
    - type -> editor component mapping
    - allowed column types
    - localStorage keys
    - any default configuration (e.g. default row height, default table height)

  CURRENT IMPLEMENTATION:

    - Defines CELL_RENDERERS using basic presentational components.
    - Leaves CELL_EDITORS empty for now (no editing yet).
    - Exposes basic constants for future use.
*/

import StringCellView from "../renderers/StringCellView";
import NumberCellView from "../renderers/NumberCellView";
import BooleanCellView from "../renderers/BooleanCellView";
import SelectCellView from "../renderers/SelectCellView";

// In the future, these editors should be implemented and wired here:
// import StringEditor from "../editors/StringEditor";
// import NumberEditor from "../editors/NumberEditor";
// import BooleanEditor from "../editors/BooleanEditor";
// import SelectEditor from "../editors/SelectEditor";

export const SUPPORTED_COLUMN_TYPES = [
  "string",
  "number",
  "boolean",
  "select",
];

export const CELL_RENDERERS = {
  string: StringCellView,
  number: NumberCellView,
  boolean: BooleanCellView,
  select: SelectCellView,
};

// For now, editing is disabled because no editors are provided.
// TableCell falls back to view mode when no editor exists for a type.
export const CELL_EDITORS = {
  // string: StringEditor,
  // number: NumberEditor,
  // boolean: BooleanEditor,
  // select: SelectEditor,
};

export const TABLE_LOCAL_STORAGE_KEY = "generic-table-schema-and-data";

// Optional configuration for future use
export const DEFAULT_ROW_HEIGHT = 40;
export const DEFAULT_TABLE_HEIGHT = 400;
