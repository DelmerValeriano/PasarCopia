import { StyleSheet } from "react-native";
import { THEME } from "../../../styles";

// Marvin: estilos necesarios para aplicar en Markdown, solo es un ejemplo
const markdownStyle = {
  collectiveMd: {
    heading1: {
      color: "black",
      fontSize: 22,
      textAlign: "center",
      marginBottom: 20,
    },
    heading2: {
      color: "blue",
      textAlign: "right",
    },
    strong: {
      color: "blue",
    },
    em: {
      color: "cyan",
    },
    text: {
      color: "black",
    },
    blockQuoteText: {
      color: "grey",
    },
    blockQuoteSection: {
      flexDirection: "row",
    },
    blockQuoteSectionBar: {
      width: 3,
      height: null,
      backgroundColor: "#DDDDDD",
      marginRight: 15,
    },
    codeBlock: {
      fontFamily: "Courier",
      fontWeight: "500",
      backgroundColor: "#DDDDDD",
    },
    tableHeader: {
      backgroundColor: "grey",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.whiteColor,
    margin: 10,
    padding: 20,
  },
});

export { markdownStyle, styles };
