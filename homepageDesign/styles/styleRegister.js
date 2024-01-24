import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  titleContainer: {
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  countryCode: {
    width: '16%',
    borderRightWidth: 1,
    borderLeftColor: 'grey',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 15,
    fontSize: 17,
  },
  errorText: {
    color: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 4,
    borderRadius: 10,
  },
  socialIcon: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22,
  },
  alreadyHaveAccountText: {
    fontSize: 16,
    color: 'black',
  },
  loginLink: {
    fontSize: 16,
    color: '#007260',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default styles;
