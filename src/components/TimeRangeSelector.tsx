import { FC } from "react";
import Button from "./Button";
import { ClockSvg, DropDownSvg } from "./Svg";

const TimeRangeSelector: FC = () => (
    <Button
        className="flex divide-x divide-indigo-600 justify-center items-center bg-white h-9 text-gray-700 py-3 rounded border border-blue-600 hover:border-transparent transition-colors"
    >
        <div className="px-0.5">
            <ClockSvg />
        </div>  
        <div className="flex items-center">
            <p className="text-blue-900 font-semibold mx-2">Last 2 days</p>
            <DropDownSvg />
        </div>
    </Button>
);

export default TimeRangeSelector;
