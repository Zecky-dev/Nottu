import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@components/Icon';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Icon name="left" type="antdesign" color={'white'} size={32} />
    </TouchableOpacity>
  );
};

export default BackButton;
