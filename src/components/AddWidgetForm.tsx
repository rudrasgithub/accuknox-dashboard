import React, { useState } from 'react';
import Button from './Button';
import { showMessage } from './utils';

interface AddWidgetFormProps {
  onAddWidget: (widgetName: string, widgetText: string) => void;
  onCancel: () => void;
  className?: string;
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({ onAddWidget, onCancel, className }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAddWidget = () => {
    if (widgetName.trim()) {
      onAddWidget(widgetName, widgetText);
      showMessage('Widget added successfully!')
      setWidgetName('');
      setWidgetText('');
    }
  };
  const isAddButtonDisabled = !widgetName.trim();

  return (
    <div className={`bg-white h-52 flex flex-col items-center rounded-xl px-4 py-4 ${className}`}>
      <input
        type="text"
        autoFocus
        className="w-full p-2 mb-2 rounded outline-none"
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      <textarea
        className="w-full h-full p-2 mb-2 rounded outline-none"
        placeholder="Widget Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />
      <div className="flex justify-end w-full mt-2">
        <Button
          className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className={`py-1 px-3 rounded transition-colors duration-300 ease-in-out ${isAddButtonDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          onClick={handleAddWidget}
          disabled={isAddButtonDisabled}
        >
          Add Widget
        </Button>
      </div>
    </div>
  );
};

export default AddWidgetForm;
