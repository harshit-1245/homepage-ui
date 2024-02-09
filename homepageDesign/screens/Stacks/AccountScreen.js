import React, { memo, useCallback, useContext } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Feather, FontAwesome, SimpleLineIcons, Entypo, Ionicons, Octicons, EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { UserType } from '../../context/contextApi';

const AccountScreen = () => {
  const {authenticated}=useContext(UserType);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {authenticated ? (
        
          
          <>
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
        </>
        ):(
          
          <View style={styles.verifyContainer1}>
          <View style={styles.accountSettingHeader}>
            <Text style={styles.accountText1}>Account</Text>
          </View>
          <Text style={styles.verifyText1}>Log in for exclusive offers</Text>
          <Pressable style={styles.verifyButton1}>
            <Text style={styles.verifyButtonText1}>Log In</Text>
          </Pressable>
        </View>
        )}
       
        {/* for verifying email */}
        <View style={styles.verifyContainer}>
          <Text style={styles.verifyText}>Verify your email</Text>
          <Pressable>
            <Text style={styles.verifyButton}>Update</Text>
          </Pressable>
        </View>
        {/* Account Setting */}
        <View style={styles.accountSection}>
          <Text style={styles.accountText}>Account Setting</Text>
          <View style={styles.accountItem}>
            <FontAwesome name="plus-square-o" size={20} color="gray" />
            <Text style={styles.accountItemText}>HarryCart Plus</Text>
          </View>
          <View style={styles.accountItem}>
            <MaterialCommunityIcons name="account-circle-outline" size={20} color="black" />
            <Text style={styles.accountItemText}>Edit Profile</Text>
          </View>
          <View style={styles.accountItem}>
            <MaterialCommunityIcons name="wallet-outline" size={20} color="black" />
            <Text style={styles.accountItemText}>Saved Wallet</Text>
          </View>
          <View style={styles.accountItem}>
            <SimpleLineIcons name="location-pin" size={20} color="black" />
            <Text style={styles.accountItemText}>Saved Address</Text>
          </View>
          <View style={styles.accountItem}>
            <Entypo name="language" size={19} color="black" />
            <Text style={styles.accountItemText}>Select Language</Text>
          </View>
          <View style={styles.accountItem}>
            <Ionicons name="notifications-outline" size={20} color="black" />
            <Text style={styles.accountItemText}>Notification Setting</Text>
          </View>
        </View>
        {/* my Activity section */}
        <View style={styles.accountSection}>
          <Text style={styles.accountText}>My Activity</Text>
          <View>
            <View style={styles.accountItem}>
              <Octicons name="code-review" size={20} color="black" />
              <Text style={styles.accountItemText}>Reviews</Text>
            </View>
            <View style={styles.accountItem}>
              <EvilIcons name="question" size={20} color="black" />
              <Text style={styles.accountItemText}>Questions and Answers</Text>
            </View>
          </View>
        </View>

        {/* Earning section */}
        <View style={styles.accountSection}>
          <Text style={styles.accountText}>Earn with HarryCart</Text>
          <View>
            <View style={styles.accountItem}>
            <FontAwesome5 name="tiktok" size={19} color="black" />
              <Text style={styles.accountItemText}>HarryCart creator Studio</Text>
            </View>
            <View style={styles.accountItem}>
            <FontAwesome name="dollar" size={20} color="black" />
              <Text style={styles.accountItemText}>Sell on HarryCart</Text>
            </View>
          </View>
        </View>

        {/* feedback and information */}
        <View style={styles.accountSection}>
          <Text style={styles.accountText}>Feedback & Information</Text>
          <View>
            <View style={styles.accountItem}>
            <Entypo name="documents" size={20} color="black" />
              <Text style={styles.accountItemText}>Terms,Policies and Licences</Text>
            </View>
            <View style={styles.accountItem}>
            <MaterialIcons name="question-answer" size={20} color="black" />
              <Text style={styles.accountItemText}>Browse FAQs</Text>
            </View>
          </View>
        </View>

         {/* Logout button */}
         {authenticated ? (
          <View style={styles.logoutContainer}>
          <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </View>
         ):(
null
         )}
        
      </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
    paddingLeft: 35,
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
  verifyContainer: {
    flexDirection: 'row',
    paddingLeft: 12,
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
  verifyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 7,
    color: '#333',
    marginRight: 60,
  },
  verifyButton: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    textAlign: 'center',
    overflow: 'hidden',
    elevation: 3, // Add elevation for Android shadow
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  accountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  accountSection: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
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
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  accountItemText: {
    fontSize: 16,
    marginLeft: 7,
    color: '#333',
  },
  logoutContainer: {
    
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  verifyContainer1: {
    flexDirection: 'row',
    paddingLeft: 5,
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
  verifyContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  accountSettingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  verifyText1: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  verifyButton1: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  verifyButtonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default AccountScreen;
