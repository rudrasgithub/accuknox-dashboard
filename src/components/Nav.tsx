import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../redux/dashboardSlice";
import SearchBar from "./SearchBar";
import AddWidgetModal from "./AddWidgetModal";
import { RefreshSvg, KebabSvg } from "./Svg";
import AddCategoryInput from "./AddCategoryInput";
import NavButton from "./NavButton";
import TimeRangeSelector from "./TimeRangeSelector";
import { showMessage } from "./utils";

export default function Nav() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsAddingCategory(false);
            }
        };

        if (isAddingCategory) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAddingCategory]);

    const handleAddCategory = (newCategoryName: string) => {
        if (newCategoryName.trim()) {
            dispatch(addCategory({
                id: new Date().getTime(),
                name: newCategoryName,
                widgets: [],
            }));
            showMessage('Successfully added category!');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="flex pt-5 pb-4 px-10 justify-between items-center">
                <div className="flex gap-12 items-center">
                    <h1 className="font-bold text-2xl">CNAPP Dashboard</h1>
                    <AddCategoryInput
                        isAddingCategory={isAddingCategory}
                        setIsAddingCategory={setIsAddingCategory}
                        inputRef={inputRef}
                        onAddCategory={handleAddCategory}
                    />
                </div>
                <div className="flex gap-4">
                    <SearchBar />
                    <NavButton onClick={() => setIsModalOpen(true)}>
                        <p className='font-semibold'>Personalize Widgets</p>
                    </NavButton>
                    <NavButton>
                        <RefreshSvg />
                    </NavButton>
                    <NavButton>
                        <KebabSvg />
                    </NavButton>
                    <TimeRangeSelector />
                </div>
            </div>
            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </nav>
    );
}
