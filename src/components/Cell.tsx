import { PropsWithChildren } from "react";

const cellStyle: React.CSSProperties = {
    height: "80px",
    width: "150px",
    outline: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const Cell = (props: PropsWithChildren) => (<div style={cellStyle} {...props} />);

export default Cell;