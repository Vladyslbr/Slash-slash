import React from "react";
import ContentLoader from "react-content-loader";

export const NoteContainerSkeleton = () => (
   <ContentLoader
      className="note-container"
      speed={1.5}
      width={250}
      height={450}
      viewBox="0 0 250 450"
      backgroundColor="#111111"
      foregroundColor="#46acc2"
   >
      <rect x="10" y="10" rx="4" ry="4" width="230" height="8" />
      <rect x="10" y="35" rx="4" ry="4" width="210" height="8" />
      <rect x="10" y="50" rx="4" ry="4" width="185" height="8" />
      <rect x="10" y="75" rx="4" ry="4" width="200" height="8" />
      <rect x="10" y="100" rx="4" ry="4" width="150" height="8" />
      <rect x="10" y="115" rx="4" ry="4" width="190" height="8" />
      <rect x="10" y="130" rx="4" ry="4" width="220" height="8" />
      <rect x="10" y="145" rx="4" ry="4" width="230" height="8" />
      <rect x="10" y="160" rx="4" ry="4" width="205" height="8" />
      <rect x="10" y="185" rx="4" ry="4" width="155" height="8" />
      <rect x="10" y="200" rx="4" ry="4" width="125" height="8" />
      <rect x="0" y="345" rx="4" ry="4" width="250" height="1" />
      <rect x="42" y="365" rx="7" ry="7" width="50" height="21" />
      <rect x="100" y="365" rx="7" ry="7" width="50" height="21" />
      <rect x="158" y="365" rx="7" ry="7" width="50" height="21" />
      <rect x="62" y="400" rx="4" ry="4" width="120" height="8" />
      <rect x="108" y="427" rx="4" ry="4" width="30" height="8" />
   </ContentLoader>
);
