import { AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Fab, Icon, Menu, Text } from 'native-base';

export function MenuFab() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Menu
      placement="top right"
      rounded={10}
      mb={2}
      bg="light.accent"
      trigger={(triggerProps) => {
        return (
          <Fab
            rounded="2xl"
            renderInPortal
            bg="light.accent"
            right="10"
            bottom="10"
            {...triggerProps}
            icon={<Icon color="dark.shade" as={AntDesign} name="plus" size="4" />}
          />
        );
      }}>
      <Menu.Item onPress={() => navigation.navigate('NewGoal')}>
        <Icon color="dark.shade" as={MaterialIcons} name="emoji-symbols" size="xs" />
        <Text color="dark.shade" fontSize="xs">
          Nova Meta
        </Text>
      </Menu.Item>
      <Menu.Item onPress={() => navigation.navigate('NewTask')}>
        <Icon color="dark.shade" as={SimpleLineIcons} name="list" size="xs" />
        <Text color="dark.shade" fontSize="xs">
          Nova Tarefa
        </Text>
      </Menu.Item>
    </Menu>
  );
}
