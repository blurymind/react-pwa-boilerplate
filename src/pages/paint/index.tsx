import React, { useState } from "react";
import {
  useBrush,
  useMarker,
  useAirbrush,
  Artboard,
  ArtboardRef,
  useShadingBrush,
  useWatercolor,
  ToolHandlers,
} from "react-artboard";
// import { useHistory } from "react-artboard/dist/history";
import {
  FaPencilAlt,
  FaPaintBrush,
  FaMarker,
  FaSprayCan,
  FaDownload,
  FaTrash,
  FaUndo,
  FaRedo,
  FaGithub,
} from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import type { IconType } from "react-icons/lib";

export function Paint() {
  const [color, setColor] = useState("#531B93");
  const [strokeWidth, setStrokeWidth] = useState(40);
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [artboardRef, setArtboardRef] = useState<ArtboardRef | null>();
  // const brush = useBrush({ color, strokeWidth });
  // const marker = useMarker({ color, strokeWidth });
  // const watercolor = useWatercolor({ color, strokeWidth });
  const airbrush = useAirbrush({ color: "red", strokeWidth: 40 });
  // const shading = useShadingBrush({
  //   color,
  //   spreadFactor: (1 / 45) * strokeWidth,
  //   distanceThreshold: 100,
  // });
  // const tools: Array<[ToolHandlers, IconType]> = [
  //   [shading, FaPencilAlt],
  //   [watercolor, IoMdWater],
  //   [brush, FaPaintBrush],
  //   [marker, FaMarker],
  //   [airbrush, FaSprayCan],
  // ];
  // const [currentTool, setCurrentTool] = useState(0);

  // const { undo, redo, history, canUndo, canRedo } = useHistory();

  console.log();
  // return <Artboard tool={marker} style={{ width: 800, height: 600 }} />;
  return <div>err</div>;
}

export default Paint;
