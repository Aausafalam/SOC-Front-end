import React from "react";
import DynamicForm from "../../../components/Form/DynamicForm";
import { ICON } from "../../../utils/icon";

const CaseForm = ({ data, onSuccess, onCancel }) => {
  const handleSubmit = async (formData) => {
    if (data) {
      //edit
    } else {
        //add
    }
    onSuccess();
  };

  const buttons = [
    {
      label: "Submit",
      className: "btn-green",
      type: "Submit",
      icon: ICON.CHECK_MARK,
    },
    {
      label: "Cancel",
      className: "btn-red",
      onClick: onCancel,
      icon: ICON.CANCEL,
    },
  ];

  const userOptions = [{label:"User1", value:1}, {label:"User2", value:2}, {label:"User3", value:3}];
  const serverityOptions = [{label:"High", value:1}, {label:"Medium", value:2}, {label:"Low", value:3}];
  const caseStateOptions = [{label:"New", value:1}, {label:"InProgress", value:2}, {label:"Closed", value:3},{label:"OnHold", value:4}];

  const formData = [
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
      grid:4,
      defaultValue: data?.title,
    },
    {
        type: "text",
        name: "tlp",
        label: "TLP",
        required: true,
        grid:4,
        defaultValue: data?.tlp,
      },
      {
        type: "text",
        name: "pap",
        label: "PAP",
        required: true,
        grid:4,
        defaultValue: data?.pap,
      },
    {
        type: "select",
        name: "serverity",
        label: "Severity",
        grid: 4,
        required: true,
        options: serverityOptions,
        defaultValue: data?.severity,
    },
    {
        type: "select",
        name: "caseState",
        label: "Case State",
        grid: 2,
        required: true,
        options: caseStateOptions,
        defaultValue: data?.caseState,
    },
    {
        type: "select",
        name: "assignedTo",
        label: "Assign To",
        grid: 2,
        required: true,
        options: userOptions,
        defaultValue: data?.assignedTo,
    },
    {
      type: "textarea",
      name: "intel",
      label: "Intel",
      grid: 2,
      style: {input:{ height: "100px" }},
      defaultValue: data?.intel,
    },
    {
        type: "textarea",
        name: "remarks",
        label: "Remarks",
        grid: 2,
        style: {input:{ height: "100px" }},
        defaultValue: data?.remarks,
      },
      {
        type: "textarea",
        name: "observation",
        label: "Observation",
        grid: 2,
        style: {input:{ height: "100px" }},
        defaultValue: data?.observation,
      },
      {
        type: "textarea",
        name: "learning",
        label: "Learning",
        grid: 2,
        style: {input:{ height: "100px" }},
        defaultValue: data?.learning,
      },
  ];

  return (
    <div>
      <DynamicForm
        formData={formData}
        formButtons={buttons}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CaseForm;
