import React from 'react';
import Select, { components } from 'react-select';

const DropdownIndicator = (props) => {
    if (props.selectProps.isDisabled) {
        return null;
    }
    
    return (
        <components.DropdownIndicator {...props} />
    );
};

const MultiValueRemove = (props) => {
    if (props.selectProps.isDisabled) {
        return null;
    }
  
    return (
        <components.MultiValueRemove {...props} />
    );
};

const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
        {props.isDisabled ? <span>{props.data.label}</span> : props.children}
    </components.SingleValue>
);

const CustomMultiValueLabel = (props) => (
    <components.MultiValueLabel {...props}>
        {props.data.disabled ? <span>{props.data.label}</span> : props.children}
    </components.MultiValueLabel>
);

const CustomSelect = ({
    name,
    formValues,
    handleSelectChange,
    options,
    multiple,
    required,
    disabled,
    style,
    classNames,
}) => (
    <Select
        id={name}
        name={name}
        value={multiple ? options.filter(option => formValues[name]?.includes(option.value)) : options.find(option => option.value === formValues[name])}
        onChange={(selectedOption) => handleSelectChange({ target: { name, value: multiple ? selectedOption.map(opt => opt.value) : selectedOption?.value } })}
        options={options}
        isMulti={multiple}
        required={required || false}
        isDisabled={disabled}
        components={{
            DropdownIndicator,
            MultiValueRemove,
            SingleValue: CustomSingleValue,
            MultiValueLabel: CustomMultiValueLabel,
        }}
        styles={{
            control: (provided) => ({
                ...provided,
                backgroundColor: '#f0f0f0',
                textAlign:"left",
                color: 'white'
            }),
            menu: (provided) => ({
                ...provided,
                textAlign: 'left',
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: "rgb(244, 134, 52, 0.9)",
                color: 'white',
                borderRadius: "5px",
                paddingInline:"0.5rem"
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                color: 'white',
            }),
            ...style
        }}
        className={["react-select-container", ...classNames].join(' ')}
    />
);

export default CustomSelect;
