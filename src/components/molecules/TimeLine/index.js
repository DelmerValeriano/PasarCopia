import React from "react";
import Timeline from "react-native-timeline-flatlist";

import styles from "./styles";

const TimeLine = ({ data }) => {
  return (
    <Timeline
      data={data}
      style={styles.root}
      innerCircle={"icon"}
      circleSize={30}
      options={{
        style: styles.options,
      }}
      separatorStyle={styles.margin}
      descriptionStyle={[styles.margin, styles.description]}
      timeContainerStyle={styles.time}
      timeStyle={styles.textTime}
    />
  );
};

export default TimeLine;
