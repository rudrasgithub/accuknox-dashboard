import { FC, useState } from "react";
import Button from "./Button";
import { PlusSvg } from "./Svg";

interface AddCategoryInputProps {
    isAddingCategory: boolean;
    setIsAddingCategory: (value: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    onAddCategory: (newCategoryName: string) => void;
}

const AddCategoryInput: FC<AddCategoryInputProps> = ({ 
    isAddingCategory, 
    setIsAddingCategory, 
    inputRef, 
    onAddCategory 
}) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddCategory(newCategoryName);
            setNewCategoryName('');
            setIsAddingCategory(false);
        }
    };

    return (
        <>
            {isAddingCategory ? (
                <div>
                    <input
                        type="text"
                        ref={inputRef}
                        autoFocus
                        className="px-2 py-1 border rounded"
                        placeholder="Enter Category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            ) : (
                <Button
                    className="flex items-center gap-1 bg-white h-9 text-gray-700 px-2 py-1 rounded-lg border-2 border-gray-300 hover:text-red-500 hover:border-transparent transition-colors"
                    onClick={() => setIsAddingCategory(true)}
                >
                    <PlusSvg />
                    <p className='font-semibold'>Add Category</p>
                </Button>
            )}
        </>
    );
}

export default AddCategoryInput;
