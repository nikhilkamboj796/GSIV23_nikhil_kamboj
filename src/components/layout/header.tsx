import HomeIcon from "@/assets/homeIcon.webp";
import useDebounce from "@/utils/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const Header = () => {
  const [, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 2000); // Adjust the delay as needed

  // This function will be triggered after the debounce completes
  const handleDebouncedChange = (debouncedValue: string) => {
    // Perform your desired action here, e.g., API call, state update, etc.
    setSearchParams({ query: debouncedValue });
  };

  useEffect(() => {
    if (debouncedInputValue?.length) handleDebouncedChange(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target?.value);
  };
  return (
    <div className="fixed top-0 left-0 right-0 px-5 py-2 bg-white shadow-lg flex justify-between items-center">
      <input
        onChange={handleInputChange}
        className="bg-lightGray rounded px-2 py-1 outline-none border-none focus:ring-gray-500"
        type="text"
      />
      <img src={HomeIcon} />
    </div>
  );
};
export default Header;
