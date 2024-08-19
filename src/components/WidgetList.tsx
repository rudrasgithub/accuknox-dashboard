import React from 'react';
import { Widget } from '../types';
import WidgetComponent from './Widget';

interface WidgetListProps {
  widgets: Widget[];
  onRemoveWidget: (widgetId: number) => void;
}

const WidgetList: React.FC<WidgetListProps> = ({ widgets, onRemoveWidget }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-3">
      {widgets.map(widget => (
        <WidgetComponent
          key={widget.id}
          widget={widget}
          onRemove={() => onRemoveWidget(widget.id)}
        />
      ))}
    </div>
  );
};

export default WidgetList;
