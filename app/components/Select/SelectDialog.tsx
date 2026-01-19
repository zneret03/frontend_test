import Select, { SingleValue } from "react-select";
import {
  DirectionOption,
  SortField,
  SortDirection,
  FieldOption,
} from "@/lib/type/sort";

const FIELD_OPTIONS: FieldOption[] = [
  { label: "Name", value: "name" },
  { label: "Company", value: "company" },
  { label: "Email", value: "email" },
];

const DIRECTION_OPTIONS: DirectionOption[] = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

interface ControlsProps {
  onSortFieldChange: (value: SortField) => void;
  onSortDirectionChange: (value: SortDirection) => void;
}

const SelectDialog = ({
  onSortFieldChange,
  onSortDirectionChange,
}: ControlsProps) => {
  const handleFieldChange = (newValue: SingleValue<FieldOption>) => {
    if (newValue) onSortFieldChange(newValue.value);
  };

  const handleDirectionChange = (newValue: SingleValue<DirectionOption>) => {
    if (newValue) onSortDirectionChange(newValue.value);
  };

  return (
    <div className="gallery-sorting sorting">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          instanceId="sort-field-select"
          inputId="sort-field"
          options={FIELD_OPTIONS}
          defaultValue={FIELD_OPTIONS[0]}
          onChange={handleFieldChange}
          classNamePrefix="react-select"
          isSearchable={false}
        />
      </div>

      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          instanceId="sort-direction-select"
          inputId="sort-direction"
          options={DIRECTION_OPTIONS}
          defaultValue={DIRECTION_OPTIONS[0]}
          onChange={handleDirectionChange}
          classNamePrefix="react-select"
          isSearchable={false}
        />
      </div>
    </div>
  );
};

export default SelectDialog;
