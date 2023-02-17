import React from "react";

interface LogoProps {
  size: number;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div className="flex gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2398.7 2467.8"
        xmlSpace="preserve"
        width={size}
        height={size}
      >
        <path
          d="M1576 1228.5c-4.3-186.9-158.2-335.6-345.2-333.4H340.7v666.7h576.5v560.7c-10 180.4 128.1 334.8 308.5 344.8 3.9.2 7.9.4 11.8.4 188.8-1.9 340.3-156.4 338.4-345.2l.1-894z"
          style={{
            fill: "#b366f6",
          }}
        />
        <circle
          cx={336.8}
          cy={1232.5}
          r={336.8}
          style={{
            fill: "#8430ce",
          }}
        />
        <path
          d="M2397.8 335.1C2396 149.5 2245 0 2059.4 0H1149C976 17.4 844.4 162.9 844.4 336.8S976 656.1 1149 673.5h583.2v560.1c-7.5 184 135.6 339.2 319.5 346.7 184 7.5 339.2-135.6 346.7-319.5.4-9 .4-18.1 0-27.1l-.6-898.6z"
          style={{
            fill: "#c58af8",
          }}
        />
      </svg>
      <span>MSCI 331</span>
    </div>
  );
};

export default Logo;
