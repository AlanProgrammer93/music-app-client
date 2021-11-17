import { searchIconGrey } from "../../assets";
import "./style.css";

const SearchInput = () => {
  return (
    <div className="search-input-container flex">
      <img src={searchIconGrey} alt="" />
      <input placeholder="Buscar" />
    </div>
  );
};

export default SearchInput;
