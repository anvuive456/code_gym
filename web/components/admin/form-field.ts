// Base field structure
interface BaseField {
    key: string;
    label: string;
    required?: boolean;
}

// Specific types for each field variant
interface TextField extends BaseField {
    type: "text";
}

interface NumberField extends BaseField {
    type: "number";
    step?: number;
}

interface DateField extends BaseField {
    type: "date";
}

interface TextAreaField extends BaseField {
    type: "textarea";
}

interface SelectField extends BaseField {
    type: "select";
    options: { value: string | number; label: string }[];
}

// Multi-select field for selecting multiple items
interface MultiSelectField extends BaseField {
    type: "multi-select";
    options: { value: string | number; label: string }[];
    multiple: true;
}

// Union type for all possible fields
export type DialogFormField =
    | TextField
    | NumberField
    | DateField
    | TextAreaField
    | SelectField
    | MultiSelectField;
