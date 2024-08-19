import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addWidget, removeWidget, removeCategory } from '../redux/dashboardSlice';
import Category from './Category';
import WidgetComponent from './Widget';
import Button from './Button';
import { showMessage } from './utils';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.dashboard.categories);
  const searchResults = useSelector((state: RootState) => state.dashboard.searchResults);
  const personalizationWidgets = useSelector((state: RootState) => state.dashboard.personalizationWidgets);

  const handleRemoveCategory = (categoryId: number) => {
    dispatch(removeCategory(categoryId));
    showMessage('Category Removed Successfully!');
  };
  const handleAddWidget = (categoryId: number, widgetName: string, widgetText: string) => {
    dispatch(
      addWidget({
        categoryId,
        widget: {
          id: new Date().getTime(),
          name: widgetName,
          text: widgetText,
        },
      })
    );
  };
  const handleRemoveWidget = (categoryId: number, widgetId: number) => {
    dispatch(removeWidget({ categoryId, widgetId }));
    showMessage('Widget removed successfully!')
  }
  const personalizedWidgetIds = new Set(
    personalizationWidgets.flatMap(category => category.widgets.map(widget => widget.id))
  );
  const filteredCategories = categories
    .map(category => ({
      ...category,
      widgets: category.widgets.filter(widget => !personalizedWidgetIds.has(widget.id)),
    }))
  const renderCategories = (categoriesToRender: typeof categories) => (
    categoriesToRender.map(category => (
      <div key={category.id}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{category.name}</h2>
          <Button
            className="bg-red-500 text-white py-1 px-3 rounded"
            onClick={() => handleRemoveCategory(category.id)}
          >
            Remove {category.name}
          </Button>
        </div>
        <Category
          category={category}
          onAddWidget={handleAddWidget}
          onRemoveWidget={(widgetId: number) =>{
            handleRemoveWidget(category.id, widgetId);
          }
          }
        />
      </div>
    ))
  );

  return (
    <div className="flex-grow ml-16 mr-10 mt-4">
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {searchResults.flatMap((category) =>
            category.widgets.map(widget => (
              <WidgetComponent
                key={widget.id}
                widget={widget}
                onRemove={() => handleRemoveWidget(category.id, widget.id)}
              />
          )))}
        </div>
      ) : (
        filteredCategories.length > 0 ? (
          renderCategories(filteredCategories)
        ) : (
          <div className='text-center mt-20'>
            <h2 className="text-2xl font-bold">No Categories Available</h2>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
