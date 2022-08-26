import React, { useContext } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import wrappedView from "../../../WrappedView";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthUserContext } from "../../../contexts/authUserProvider";
import { THEME } from "../../../styles";
import { Actions } from "react-native-router-flux";
import { NavigationEvents } from "react-navigation";

const MyProfile = () => {
  const AuthUser = useContext(AuthUserContext);
  const { email, fullName, phone, updateUser } = AuthUser;

  const inforUser = [
    {
      key: 1,
      title: email,
      icon: "email",
      color: THEME.pronto.yellow,
    },
    {
      key: 2,
      title: fullName,
      icon: "account",
      color: THEME.pronto.blue,
    },
    {
      key: 3,
      title: phone,
      icon: "phone",
      color: THEME.pronto.green,
    },
    {
      key: 3,
      title: "cambiar contraseña",
      icon: "lock",
      color: THEME.pronto.green,
    },
  ];
  const openUpdateProfile = () => {
    Actions.updateProfile();
  };

  const onWillFocus = () => {
    updateUser();
  };

  const handleChangePassword = (title) => {
    if (title === "cambiar contraseña")
      Actions.changePasswordModal({ goTo: "changePasswordModal" });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.containerHeader}></View>
      <View style={styles.containerHeaderIcon}>
        <View style={styles.header}>
          <Icon style={styles.IconProfile} name="account" />
        </View>
      </View>
      <View style={styles.containerTittle}>
        <Text style={styles.textTittle}>MI PERFIL</Text>
      </View>
      <TouchableOpacity onPress={() => openUpdateProfile()}>
        <View style={styles.containerIconEdit}>
          <Text style={styles.textEdit}>
            Editar
            <Icon style={styles.IconEdit} name="pencil" />
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerInfo}>
        {inforUser.map((element, index) => {
          const { title, icon } = element;
          return (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => handleChangePassword(title)}
            >
              <View>
                <Icon name={icon} style={styles.IconItem} />
              </View>
              <View>
                <Text numberOfLines={2} style={styles.textItem}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <NavigationEvents onWillFocus={onWillFocus} />
    </ScrollView>
  );
};

const MyProfileConfig = { showHeader: true };

export default wrappedView(MyProfile, MyProfileConfig);
