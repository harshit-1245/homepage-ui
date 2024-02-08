import React, { memo, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.boldText]}>+ Phone Number</Text>
        <Text style={[styles.headerText, styles.boldText]}>Explore + Premium</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.menuContainer}>
        <MenuItem icon="CodeSandbox" text="Order" />
        <MenuItem icon="hearto" text="Wishlist" />
        <MenuItem icon="offer" text="Coupons" />
        <MenuItem icon="headphones" text="Help Center" />
      </View>
    </SafeAreaView>
  );
};

const MenuItem = memo(({ icon, text }) => {
  const handlePress = useCallback(() => {
    console.log(`Pressed ${text}`);
  }, [text]);

  return (
    <View style={styles.menuItem} onTouchEnd={handlePress}>
      {renderIcon(icon)}
      <Text style={styles.menuItemText}>{text}</Text>
    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.icon === nextProps.icon && prevProps.text === nextProps.text;
});

const renderIcon = (icon) => {
  switch (icon) {
    case 'CodeSandbox':
      return <AntDesign name={icon} size={24} color="black" />;
    case 'hearto':
      return <AntDesign name={icon} size={20} color="black" />;
    case 'offer':
      return <MaterialCommunityIcons name={icon} size={24} color="black" />;
    case 'headphones':
      return <Feather name={icon} size={20} color="black" />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  menuItem: {
    width: '48%',
    flexDirection: 'row',
    paddingLeft:35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
});

export default AccountScreen;
