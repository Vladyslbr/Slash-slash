import React from "react";
import { useLocation } from "react-router-dom";
//@ts-ignoretype
import debounce from "lodash.debounce";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/filter/slice";

function HeaderSearch() {
   const location = useLocation();
   const dispatch = useDispatch();

   const searchRef = React.useRef<HTMLInputElement>(null);

   const [searchInput, setSearchInput] = React.useState<string>("");

   const cleanResults = () => {
      (document.activeElement as HTMLElement).blur();
      dispatch(setSearchValue(""));
      setSearchInput("");
   };

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const _debounceSearchValue = React.useCallback(
      debounce((val: string) => {
         dispatch(setSearchValue(val));
      }, 250),
      [],
   );

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
      _debounceSearchValue(event.target.value);
   };

   React.useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
         const isContentElement =
            (event.target as HTMLElement).closest(".content") !== null;
         if (
            event.key === "/" &&
            document.activeElement?.tagName !== "INPUT" &&
            document.activeElement?.tagName !== "TEXTAREA" &&
            !isContentElement
         ) {
            event.preventDefault();
            searchRef.current?.focus();
         }
      };

      document.addEventListener("keydown", handleKeyPress);

      return () => {
         document.removeEventListener("keydown", handleKeyPress);
      };
   }, []);

   return (
      <div className="header-search__wrapper">
         <button
            className={
               location.pathname === "/bin"
                  ? "header-search__wrapper__button header-search__wrapper__button--bin"
                  : "header-search__wrapper__button"
            }
         >
            <div className="icon-search">
               <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M10.4858 5.99165C10.4858 7.18332 10.0125 8.32618 9.16982 9.16882C8.32718 10.0115 7.18432 10.4848 5.99265 10.4848C4.80099 10.4848 3.65813 10.0115 2.81549 9.16882C1.97286 8.32618 1.49947 7.18332 1.49947 5.99165C1.49947 4.79999 1.97286 3.65713 2.81549 2.81449C3.65813 1.97186 4.80099 1.49847 5.99265 1.49847C7.18432 1.49847 8.32718 1.97186 9.16982 2.81449C10.0125 3.65713 10.4858 4.79999 10.4858 5.99165ZM9.6669 10.7255C8.46283 11.6603 6.94778 12.1011 5.43018 11.9581C3.91258 11.8151 2.50651 11.0991 1.49822 9.95592C0.489929 8.81272 -0.0447822 7.32822 0.00294017 5.80465C0.0506625 4.28107 0.677231 2.83295 1.75509 1.75509C2.83295 0.677231 4.28107 0.0506625 5.80465 0.00294017C7.32822 -0.0447822 8.81272 0.489929 9.95592 1.49822C11.0991 2.50651 11.8151 3.91258 11.9581 5.43018C12.1011 6.94778 11.6603 8.46283 10.7255 9.6669L13.7616 12.703C13.8352 12.7715 13.8942 12.8542 13.9352 12.9461C13.9761 13.038 13.9981 13.1372 13.9999 13.2378C14.0017 13.3383 13.9832 13.4382 13.9455 13.5315C13.9078 13.6248 13.8517 13.7095 13.7806 13.7806C13.7095 13.8517 13.6248 13.9078 13.5315 13.9455C13.4382 13.9832 13.3383 14.0017 13.2378 13.9999C13.1372 13.9981 13.038 13.9761 12.9461 13.9352C12.8542 13.8942 12.7715 13.8352 12.703 13.7616L9.6669 10.7255Z"
                     fill="white"
                  />
               </svg>
            </div>
            <input
               name="header_search"
               ref={searchRef}
               onChange={handleSearch}
               value={searchInput}
               className="search-input"
               placeholder={
                  location.pathname === "/bin"
                     ? "Bin search..."
                     : "Search for a note..."
               }
            />
            <div className="icon-press">
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <rect
                     x="0.5"
                     y="0.5"
                     width="19"
                     height="19"
                     rx="3.5"
                     fill="#111111"
                     fillOpacity="0.0666667"
                     stroke="#777777"
                  />
                  <path
                     d="M7.30234 15.32L11.5623 4.04H12.7023L8.44234 15.32H7.30234Z"
                     fill="#FFFEFE"
                  />
               </svg>
            </div>
            <div onClick={cleanResults} className="icon-close">
               <svg
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.531 9.94855L6.91119 5.99999L10.531 2.05143C10.9218 1.62513 11.2523 1.35426 10.531 0.512516C9.75935 -0.387911 9.51101 0.0862159 9.12021 0.512516L5.50041 4.46108L1.88062 0.512516C1.48981 0.0862159 1.24147 -0.387903 0.469842 0.512516C-0.355612 1.35426 0.0790371 1.62513 0.469842 2.05143L4.08964 5.99999L0.469842 9.94855C0.0790371 10.3749 -0.355612 10.6458 0.469842 11.4875C1.2415 12.3879 1.48981 11.9138 1.88062 11.4875L5.50041 7.5389L9.12021 11.4875C9.51101 11.9138 9.75938 12.3879 10.531 11.4875C11.3565 10.6458 10.919 10.3718 10.531 9.94855Z"
                     fill="white"
                  />
               </svg>
            </div>
         </button>
      </div>
   );
}

export default HeaderSearch;
