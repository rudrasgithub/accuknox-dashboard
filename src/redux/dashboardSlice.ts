import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Widget } from '../types';

interface DashboardState {
  categories: Category[];
  searchResults: Category[];
  searchTerm: string;
  personalizationWidgets: Category[];
}
const initialState: DashboardState = {
  categories: [],
  searchResults: [],
  searchTerm: '',
  personalizationWidgets: []
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    addWidget: (state, action: PayloadAction<{ categoryId: number; widget: Widget }>) => {
      const category = state.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        category.widgets.push(action.payload.widget);
      }
    },
    removeWidget: (state, action: PayloadAction<{ categoryId: number; widgetId: number }>) => {
      const category = state.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        category.widgets = category.widgets.filter(wid => wid.id !== action.payload.widgetId);
      }
      state.searchResults = state.searchResults.map(cat => ({
        ...cat,
        widgets: cat.widgets.filter(wid => wid.id !== action.payload.widgetId),
      }));
    },
    searchWidget: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();

      if (!searchTerm) {
        state.searchResults = [];
        return;
      }
      state.searchResults = state.categories
        .map(category => ({
          ...category,
          widgets: category.widgets.filter(widget => 
            widget.name.toLowerCase().includes(searchTerm) ||
            widget.text.toLowerCase().includes(searchTerm)
          )
        }))
        .filter(category => category.widgets.length > 0);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    addToPersonalization: (state, action: PayloadAction<{ categoryId: number; widget: Widget }>) => {
      const { categoryId, widget } = action.payload;
      let category = state.personalizationWidgets.find(cat => cat.id === categoryId);

      if (category) {
        category.widgets.push(widget);
      } else {
        category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
          state.personalizationWidgets.push({
            ...category,
            widgets: [widget]
          });
        }
      }
    },
    removeFromPersonalization: (state, action: PayloadAction<{ categoryId: number; widget: Widget }>) => {
      const { categoryId, widget } = action.payload;
      state.personalizationWidgets = state.personalizationWidgets
        .map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              widgets: category.widgets.filter(w => w.id !== widget.id),
            };
          }
          return category;
        })
        .filter(category => category.widgets.length > 0);
    },
  },
});

export const { 
  addCategory, 
  removeCategory, 
  addWidget, 
  removeWidget, 
  searchWidget,
  setSearchTerm,
  addToPersonalization,
  removeFromPersonalization
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
