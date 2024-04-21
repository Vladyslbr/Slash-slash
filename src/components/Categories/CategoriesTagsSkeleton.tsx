import React from "react";
import ContentLoader from "react-content-loader";

const CategoriesTagsSkeleton = () => (
   <ContentLoader
      speed={1.5}
      width={65}
      height={21}
      viewBox="0 0 65 21"
      backgroundColor="#111111"
      foregroundColor="#46acc2"
   >
      <rect x="2" y="2" rx="7" ry="7" width="61" height="17" />
   </ContentLoader>
);

export default CategoriesTagsSkeleton;
