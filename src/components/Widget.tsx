import React from 'react';
import { Widget } from '../types';
import Button from './Button';

interface WidgetProps {
  widget: Widget;
  onRemove: () => void;
}

const WidgetComponent: React.FC<WidgetProps> = ({ widget, onRemove }) => {
  return (
    <div className="bg-white rounded-lg px-5 pt-2.5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{widget.name}</h2>
        <Button
          onClick={onRemove}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0.5"
        >
          X
        </Button>
      </div>
      <p className='h-[170px] overflow-y-auto [scrollbar-width:thin]'>{widget.text}</p>
    </div>
  );
};

export default WidgetComponent;
