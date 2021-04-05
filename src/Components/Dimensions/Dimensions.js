import { Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");
const statusbarHeight = StatusBar.currentHeight;

export { width, height, statusbarHeight };
