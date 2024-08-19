import { useDispatch, useSelector } from "react-redux";
import { searchWidget, setSearchTerm } from "../redux/dashboardSlice";
import { RootState } from '../redux/store';
import { SearchSvg } from "./Svg";

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.dashboard.searchTerm);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
        dispatch(searchWidget(searchTerm));
    };
    return (
        <div className="flex justify-center items-center bg-slate-200 h-9 w-96 text-gray-500 py-1.5 px-2 rounded-md border-2 border-gray-300">
            <SearchSvg />
            <input
                type="text"
                className="flex-1 bg-slate-200 outline-none ml-2"
                placeholder="Search anything..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    )
}
