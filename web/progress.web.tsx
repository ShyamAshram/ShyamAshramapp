import React from 'react';

interface BarProps {
  progress?: number;
  width?: number | null;
  height?: number;
  color?: string;
  unfilledColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  style?: React.CSSProperties;
}

export const Bar = ({
  progress = 0,
  width = null,
  height = 10,
  color = '#23632c',
  unfilledColor = '#fff6f6',
  borderRadius = 5,
  style,
}: BarProps) => {
  const percentage = Math.max(0, Math.min(1, progress)) * 100;

  return (
    <div
      style={{
        width: width ?? '100%',
        height,
        backgroundColor: unfilledColor,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};