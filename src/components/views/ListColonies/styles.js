import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { THEME } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.backgroundAllViews,
  },
  item: {
    backgroundColor: THEME.drawer.background,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
  },
  inputSearch: {
    flexDirection: 'row',
  },
  iconSearch: {
    width: 50,
    height: 45,
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 23,
    borderBottomLeftRadius: 22,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: THEME.whiteColor,
  },
  input: {
    width: width - 70,
    height: 45,
    fontSize: 17,
    borderTopRightRadius: 23,
    borderBottomRightRadius: 22,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: THEME.whiteColor,
  },
});
export default styles;
