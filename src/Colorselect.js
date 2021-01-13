import React, { useState } from "react";
import { BlockPicker } from "react-color";

/**
 * 색상 선택 컴포넌트
 */
function ColorSelect({ onColor, colors }) {
  const [dispalyColors, setDispalyColors] = useState(false);

  const onClick = () => {
    setDispalyColors(true);
  };
  const onChangeColor = (color) => {
    onColor(color.hex);
  };
  const onClose = () => {
    setDispalyColors(false);
  };
  return (
    <>
      <div
        style={{
          height: "20px",
          width: "20px",
          background: colors,
          borderRadius: "50%",
          display: "inline-block",
          position: "absolute",
          right: "24px",
          top: "71px",
          cursor: "pointer",
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
