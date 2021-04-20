import React from "react";

export interface Props {
  publicUrl: string;
  className?: string;
}

const Bundle = ({ publicUrl, className = "flex flex-1" }: Props) => {
  const bundleUrl = `${process.env.PUBLIC_URL}/${publicUrl}`;
  return <iframe src={bundleUrl} className={className} />;
};

export default Bundle;
