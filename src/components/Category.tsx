import React, { useState } from 'react';
import { Widget } from '../types';
import WidgetComponent from './Widget';
import AddWidgetForm from './AddWidgetForm';
import Button from './Button';
import { PlusSvg } from './Svg';

interface CategoryProps {
  category: {
    id: number;
    name: string;
    widgets: Widget[];
  };
  onAddWidget: (categoryId: number, widgetName: string, widgetText: string) => void;
  onRemoveWidget: (widgetId: number) => void;
}

const Category: React.FC<CategoryProps> = ({ category, onAddWidget, onRemoveWidget }) => {
  const [isAddingWidget, setIsAddingWidget] = useState(false);

  const handleAddWidget = (widgetName: string, widgetText: string) => {
    onAddWidget(category.id, widgetName, widgetText);
    setIsAddingWidget(false);
  };

  return (
    <div className="mb-3">
      <div className="grid grid-cols-3 gap-4">
        {category.widgets.map(widget => (
          <WidgetComponent
            key={widget.id}
            widget={widget}
            onRemove={() => onRemoveWidget(widget.id)}
          />
        ))}
        {isAddingWidget ? (
          <AddWidgetForm
            onAddWidget={handleAddWidget}
            onCancel={() => setIsAddingWidget(false)}
            className="col-span-1"
          />
        ) : (
          <div className="col-span-1 bg-white h-52 flex justify-center items-center rounded-xl">
            <Button
              className="text-gray-700 py-1 px-2 rounded-lg border-2 border-gray-300"
              onClick={() => setIsAddingWidget(true)}
            >
              <div className="flex justify-center items-center gap-1">
                <PlusSvg />
                <p className="font-semibold text-gray-500">Add Widget</p>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
