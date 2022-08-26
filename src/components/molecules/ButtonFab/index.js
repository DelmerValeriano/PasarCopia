import React from "react";
import { Fab, Button } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ButtonFab = ({
  active,
  showTraffic,
  eventActive,
  options,
  backgroundColor,
  color,
  name,
}) => {
  return (
    <Fab
      active={active}
      direction="up"
      style={{ backgroundColor: color }}
      position="bottomRight"
      onPress={() => eventActive(!active, "active")}
    >
      <Icon name={name} color={color} />
      {options.map((option, index) => (
        <Button
          key={index}
          style={{ backgroundColor: option.backgroundColor }}
          onPress={() => option.event()}
        >
          {option.icon}
        </Button>
      ))}
    </Fab>
  );
};
export default ButtonFab;
