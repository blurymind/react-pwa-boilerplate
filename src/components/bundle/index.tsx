import React, { useState } from "react";
import Spinner from "@components/spinner";

export interface Props {
  publicUrl: string;
  className?: string;
}

const Bundle = ({ publicUrl, className = "flex flex-1" }: Props) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const bundleUrl = `${process.env.PUBLIC_URL}/${publicUrl}`;

  return (
    <>
      {showSpinner && <Spinner />}
      <iframe
        src={bundleUrl}
        className={className}
        id={publicUrl + "iframe"}
        key={publicUrl}
        onLoad={() => {
          setShowSpinner(false);
        }}
      />
    </>
  );
};

export default Bundle;
