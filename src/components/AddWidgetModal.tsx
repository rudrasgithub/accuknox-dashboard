import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToPersonalization, removeFromPersonalization } from '../redux/dashboardSlice';
import { Widget } from '../types';
import Button from './Button';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.dashboard.categories);
  const personalizationWidgets = useSelector((state: RootState) => state.dashboard.personalizationWidgets);
  const [checkedWidgets, setCheckedWidgets] = useState<Set<number>>(new Set());
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const initialCategory = categories[0]?.id || null;
      setSelectedCategoryId(initialCategory);

      const initialCheckedWidgets = new Set(
        personalizationWidgets.flatMap(({ widgets }) => widgets.map(widget => widget.id))
      );
      setCheckedWidgets(initialCheckedWidgets);
    }
  }, [isOpen, personalizationWidgets, categories]);

  const handleCheckboxChange = (widget: Widget) => {
    setCheckedWidgets(prev => {
      const updatedCheckedWidgets = new Set(prev);
      if (updatedCheckedWidgets.has(widget.id)) {
        updatedCheckedWidgets.delete(widget.id);
      } else {
        updatedCheckedWidgets.add(widget.id);
      }
      return updatedCheckedWidgets;
    });
  };
  const handleConfirm = () => {
    const widgetsToAdd = categories.flatMap(category =>
      category.widgets.filter(widget => checkedWidgets.has(widget.id))
    );
    const widgetsToRemove = personalizationWidgets.flatMap(({ widgets }) =>
      widgets.filter(widget => !checkedWidgets.has(widget.id))
    );
    widgetsToAdd.forEach(widget => {
      const category = categories.find(category => category.widgets.some(w => w.id === widget.id));
      if (category) {
        dispatch(addToPersonalization({ categoryId: category.id, widget }));
      }
    });
    widgetsToRemove.forEach(widget => {
      const category = categories.find(category => category.widgets.some(w => w.id === widget.id));
      if (category) {
        dispatch(removeFromPersonalization({ categoryId: category.id, widget }));
      }
    });
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };
  const selectedCategory = categories.find(category => category.id === selectedCategoryId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-gray-700 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-1/2 h-full flex">
            <div className="w-full flex flex-col border-r border-gray-200">
                <div className="flex overflow-x-auto justify-between items-center bg-blue-800 text-white p-3">
                    <h2 className="text-xl font-bold">Add Widgets</h2>
                    <Button
                        onClick={handleCancel}
                        className='pr-1 h-8 w-6'
                    >
                        X
                    </Button>
                </div>
                <p className='pl-3 mt-2'>Personalise your dashboard by adding the following widget</p>
                {categories.length> 0 ? (
                  <div className="flex overflow-x-auto p-3">
                      {categories.map(category => (
                          <Button
                              key={category.id}
                              className={`px-4 py-2 mr-2 rounded ${category.id === selectedCategoryId ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                              onClick={() => handleCategoryClick(category.id)}
                          >
                              {category.name}
                          </Button>
                      ))}
                  </div>
                ):
                  <div className='flex justify-center w-full pt-2'>
                      <p className='text-xl font-semibold'>No Widgets available</p>
                  </div>
                }
                <div className="flex overflow-y-auto p-6">
                    {selectedCategory && (
                        <div className="flex flex-col w-full gap-4">
                            {selectedCategory.widgets.map(widget => (
                                <div 
                                  key={widget.id} 
                                  className="flex items-center border-2 border-gray-200 p-2 rounded-md hover:cursor-pointer"
                                  onClick={() => handleCheckboxChange(widget)}
                                >
                                  <input
                                      type="checkbox"
                                      checked={!checkedWidgets.has(widget.id)}
                                      onChange={(e) => e.stopPropagation()}
                                  />
                                  <span className="ml-2">{widget.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-4 p-6 mt-auto">
                    <Button 
                      onClick={handleCancel} 
                      className="py-1.5 px-8 rounded-lg border-2 border-gray-400"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleConfirm} 
                      className="bg-black text-white py-1.5 px-8 rounded-lg"
                    >
                      Confirm
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddWidgetModal;
