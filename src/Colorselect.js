import React, { useState } from "react";
import { BlockPicker } from "react-color";

/**
 * 색상 선택 컴포넌트
 */
function ColorSelect({ onColor, colors }) {
  const [dispalyColors, setDispalyColors] = useState(false);
  const [initColor, setInitColor] = useState(colors);

  const onClick = () => {
    setDispalyColors(true);
  };
  const onChangeColor = (color) => {
    console.log(color);
    onColor(color.hex);
    // setInitColor(color.hex);
  };
  const onClose = () => {
    setDispalyColors(false);
  };
  return (
    <>
      <div
        style={{
          height: "20px",
          width: "50px",
          background: colors,
          borderRadius: "25px",
          display: "inline-block",
          position: "absolute",
          right: "24px",
          top: "71px",
        }}
        onClick={onClick}
      ></div>
      {dispalyColors && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            right: "24px",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={onClose}
          />
          <BlockPicker
            triangle="hide"
            color={colors}
            onChange={onChangeColor}
          />
        </div>
      )}
    </>
  );
}

export default ColorSelect;
