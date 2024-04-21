import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import { deleteNotes } from "../../redux/data/base";

export const BackBtn = ({ binStatus }: { binStatus?: boolean }) => {
   return (
      <>
         <Link to={binStatus ? "/bin" : "/"}>
            <div className="top-menu-btn-back">
               <div className="icon-back">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="9"
                     height="18"
                     viewBox="0 0 9 18"
                     fill="none"
                  >
                     <path
                        d="M7.28746 17.75C7.10072 17.7506 6.9162 17.7094 6.74748 17.6294C6.57876 17.5493 6.43011 17.4325 6.31246 17.2875L0.274961 9.78748C0.0911084 9.56381 -0.00939941 9.28326 -0.00939941 8.99373C-0.00939941 8.7042 0.0911084 8.42364 0.274961 8.19998L6.52496 0.699979C6.73713 0.444708 7.04202 0.284177 7.37256 0.253702C7.70309 0.223228 8.03219 0.325305 8.28746 0.537478C8.54273 0.749651 8.70326 1.05454 8.73374 1.38507C8.76421 1.71561 8.66213 2.04471 8.44996 2.29998L2.86246 8.99998L8.26246 15.7C8.41531 15.8835 8.51241 16.1069 8.54226 16.3438C8.57211 16.5808 8.53346 16.8213 8.43089 17.0369C8.32832 17.2526 8.16612 17.4344 7.96349 17.5607C7.76085 17.6871 7.52625 17.7528 7.28746 17.75Z"
                        fill="white"
                     />
                  </svg>
               </div>
               <span>Back</span>
            </div>
         </Link>
      </>
   );
};

type RemoveBtnProps = {
   binStatus: boolean;
   onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const RemoveBtn: React.FC<RemoveBtnProps> = ({ binStatus, onClick }) => {
   return (
      <div onClick={onClick} className="top-menu-btn-remove">
         <div className="icon-remove">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="11"
               height="15"
               viewBox="0 0 11 15"
               fill="none"
            >
               <path
                  d="M10.6071 0.906598H7.66071L7.42991 0.376808C7.38102 0.263544 7.30571 0.168269 7.21244 0.101702C7.11918 0.0351338 7.01167 -8.57854e-05 6.90201 4.9672e-06H4.09554C3.98612 -0.000480359 3.8788 0.0346079 3.78587 0.10125C3.69294 0.167892 3.61815 0.263391 3.57009 0.376808L3.33929 0.906598H0.392857C0.288665 0.906598 0.18874 0.954356 0.115065 1.03937C0.0413902 1.12438 0 1.23967 0 1.35989L0 2.26649C0 2.38671 0.0413902 2.50201 0.115065 2.58702C0.18874 2.67203 0.288665 2.71979 0.392857 2.71979H10.6071C10.7113 2.71979 10.8113 2.67203 10.8849 2.58702C10.9586 2.50201 11 2.38671 11 2.26649V1.35989C11 1.23967 10.9586 1.12438 10.8849 1.03937C10.8113 0.954356 10.7113 0.906598 10.6071 0.906598ZM1.30625 13.2306C1.32499 13.5758 1.45705 13.8999 1.67555 14.1367C1.89405 14.3736 2.18257 14.5055 2.48237 14.5055H8.51763C8.81743 14.5055 9.10595 14.3736 9.32445 14.1367C9.54295 13.8999 9.67501 13.5758 9.69375 13.2306L10.2143 3.62638H0.785714L1.30625 13.2306Z"
                  fill="white"
               />
            </svg>
         </div>
         <span>{binStatus ? "Delete" : "Bin"}</span>
      </div>
   );
};

export const PermanentRemoveBtn = () => {
   const dispatch = useAppDispatch();

   const handleClick = () => {
      if (window.confirm("Delete all notes in a bin?")) dispatch(deleteNotes());
   };

   return (
      <div onClick={handleClick} className="top-menu-btn-permanent-remove">
         <div className="icon-remove">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="11"
               height="15"
               viewBox="0 0 11 15"
               fill="none"
            >
               <path
                  d="M10.6071 0.906598H7.66071L7.42991 0.376808C7.38102 0.263544 7.30571 0.168269 7.21244 0.101702C7.11918 0.0351338 7.01167 -8.57854e-05 6.90201 4.9672e-06H4.09554C3.98612 -0.000480359 3.8788 0.0346079 3.78587 0.10125C3.69294 0.167892 3.61815 0.263391 3.57009 0.376808L3.33929 0.906598H0.392857C0.288665 0.906598 0.18874 0.954356 0.115065 1.03937C0.0413902 1.12438 0 1.23967 0 1.35989L0 2.26649C0 2.38671 0.0413902 2.50201 0.115065 2.58702C0.18874 2.67203 0.288665 2.71979 0.392857 2.71979H10.6071C10.7113 2.71979 10.8113 2.67203 10.8849 2.58702C10.9586 2.50201 11 2.38671 11 2.26649V1.35989C11 1.23967 10.9586 1.12438 10.8849 1.03937C10.8113 0.954356 10.7113 0.906598 10.6071 0.906598ZM1.30625 13.2306C1.32499 13.5758 1.45705 13.8999 1.67555 14.1367C1.89405 14.3736 2.18257 14.5055 2.48237 14.5055H8.51763C8.81743 14.5055 9.10595 14.3736 9.32445 14.1367C9.54295 13.8999 9.67501 13.5758 9.69375 13.2306L10.2143 3.62638H0.785714L1.30625 13.2306Z"
                  fill="white"
               />
            </svg>
         </div>
         <span>Delete all</span>
      </div>
   );
};