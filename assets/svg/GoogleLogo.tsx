import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const SvgComponent = (props: SvgProps) => (
  <Svg
    // style={{ marginLeft: -10 }}
    viewBox="0 0 150 150"
    width={80}
    height={80}
    style={{ marginLeft: -15 }}
    {...props}
  >
    <Path
      d="M120 76.1c0-3.1-.3-6.3-.8-9.3H75.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C115 101.8 120 90 120 76.1z"
      fill="#4280ef"
    />
    <Path
      d="M75.9 120.9c12.4 0 22.8-4.1 30.4-11.1L91.5 98.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L34.9 95.6c7.8 15.5 23.6 25.3 41 25.3z"
      fill="#34a353"
    />
    <Path
      d="M50.1 83.8c-1.9-5.7-1.9-11.9 0-17.6L34.9 54.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
      fill="#f6b704"
    />
    <Path
      d="M75.9 47.3c6.5-.1 12.9 2.4 17.6 6.9L106.6 41c-8.3-7.8-19.3-12-30.7-11.9-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
      fill="#e54335"
    />
  </Svg>
);
export default SvgComponent;
