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
  useHistory,
} from "react-artboard";
import {
  FaPencilAlt,
  FaPaintBrush,
  FaMarker,
  FaSprayCan,
  FaDownload,
  FaTrash,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import type { IconType } from "react-icons/lib";

const addAlpha = (color: string, opacity: number): string => {
  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(
    Math.min(Math.max(opacity || 1, 0) + 0.1, 1) * 255
  );
  return color + _opacity.toString(16).toUpperCase();
};

const styles = { button: "w-full p-0 m-0 mb-1 mx-1 h-10" };
export function Paint() {
  const [color, setColor] = useState("#531B93");
  const [strokeWidth, setStrokeWidth] = useState(40);
  const [pressure, setPressure] = useState(1);
  const [artboardRef, setArtboardRef] = useState<ArtboardRef | null>();

  const colorWithAlpha = addAlpha(color, pressure);
  const brush = useBrush({
    color: colorWithAlpha,
    strokeWidth: strokeWidth * 2,
  });
  const marker = useMarker({
    color: colorWithAlpha,
    strokeWidth: pressure * 5 * strokeWidth,
  });
  const watercolor = useWatercolor({
    color,
    strokeWidth: pressure * strokeWidth * 10,
  });
  const airbrush = useAirbrush({
    color: colorWithAlpha,
    strokeWidth: pressure * strokeWidth,
  });
  const shading = useShadingBrush({
    color: colorWithAlpha,
    spreadFactor: (1 / 45) * pressure * strokeWidth,
    distanceThreshold: 10 * pressure * strokeWidth,
  });
  const tools: Array<[ToolHandlers, IconType]> = [
    [shading, FaPencilAlt],
    [watercolor, IoMdWater],
    [brush, FaPaintBrush],
    [marker, FaMarker],
    [airbrush, FaSprayCan],
  ];
  const [currentTool, setCurrentTool] = useState(0);
  const { undo, redo, history, canUndo, canRedo } = useHistory();

  const getWidth = (e: any) => {
    // alert(e.pointerType);
    switch (e.pointerType) {
      case "touch": {
        return 0;
        // if (e.width < 10 && e.height < 10) {
        //   return (e.width + e.height) * 2 + 10;
        // } else {
        //   return (e.width + e.height - 40) / 2;
        // }
      }
      case "pen":
        return e.pressure;
      default:
        return e.pressure || 1;
    }
  };

  const iseVertical = window.innerHeight > window.innerWidth;
  console.log(color, iseVertical);
  return (
    <main>
      {/*{color} {pressure}*/}
      <input
        type="range"
        min={5}
        max={50}
        value={strokeWidth}
        onInput={(evt) => setStrokeWidth(parseInt(evt.currentTarget.value))}
        className="p-0 m-0 mt-1"
      />
      <div className="flex flex-1 flex-row">
        <div className="flex flex-col w-9 mr-1">
          <input
            type="color"
            value={color}
            onInput={(evt) => setColor(evt.currentTarget.value)}
            className="w-9 h-9 mx-1"
          />

          {tools.map(([tool, Icon], index) => (
            <button
              aria-label={tool.name}
              key={tool.name}
              title={tool.name}
              style={{
                backgroundColor: currentTool === index ? "#aaaaff" : "black",
                textAlign: "-webkit-center" as any,
              }}
              onClick={() => setCurrentTool(index)}
              className={styles.button}
            >
              {<Icon size={14} title={tool.name} />}
            </button>
          ))}
          <button
            onClick={undo}
            disabled={!canUndo}
            className={styles.button}
            style={{ textAlign: "-webkit-center" as any }}
          >
            <FaUndo size={12} title="Undo" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={styles.button}
            style={{ textAlign: "-webkit-center" as any }}
          >
            <FaRedo size={12} title="Redo" />
          </button>
          <button
            onClick={() => artboardRef?.download()}
            className={styles.button}
            style={{ textAlign: "-webkit-center" as any }}
          >
            <FaDownload size={12} title="Download" />
          </button>
          <button
            onClick={() => artboardRef?.clear()}
            className={styles.button}
            style={{ textAlign: "-webkit-center" as any }}
          >
            <FaTrash size={12} title="Clear" />
          </button>
        </div>

        <div className="overflow-auto h-screen">
          <Artboard
            tool={tools[currentTool][0]}
            ref={setArtboardRef}
            history={history}
            style={{
              border: "1px gray solid",
              width: iseVertical ? "600px" : "800px",
              height: iseVertical ? "800px" : "600px",
              margin: "3px",
            }}
            onPointerMove={(e) => {
              setPressure(getWidth(e));
            }}
            onPointerDown={(e) => {
              setPressure(getWidth(e));
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default Paint;
