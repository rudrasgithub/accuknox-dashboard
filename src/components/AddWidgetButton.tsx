import React from 'react';
import Button from './Button';
import { PlusSvg } from './Svg';

interface AddWidgetButtonProps {
  onClick: () => void;
}

const AddWidgetButton: React.FC<AddWidgetButtonProps> = ({ onClick }) => {
  return (
    <div className='bg-white h-52 flex justify-center items-center rounded-xl'>
      <Button
        className="text-gray-700 py-1 px-2 rounded-lg border-2 border-gray-300"
        onClick={onClick}
      >
        <div className='flex justify-center items-center gap-1'>
          <PlusSvg />
          <p className='font-semibold text-gray-500'>Add Widget</p>
        </div>
      </Button>
    </div>
  );
};

export default AddWidgetButton;
