import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Address from '../../paymentLogic/Address.js/address';
import Delivery from '../../paymentLogic/delivery/delivery';
import Payment from '../../paymentLogic/paymentOption/payment';
import Order from '../../paymentLogic/oder/order';
import Thankyou from '../../paymentLogic/thnakyou/thankyou';


const OrderScreen = () => {
    const navigation=useNavigation()
    const demoAddresses = [
        {
          _id: 1,
          name: "Harshit Singh",
          location: "12, XYZ, NH-7",
          street: "Anywhere....",
          city: "Bhubneswar, India",
          phoneNumber: "+91-XXXXXXXXXX"
        },
        // Add more addresses as needed
      ];
    
      // Array to define the steps in the confirmation process
      const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
      ];
      const [currentStep, setCurrentStep] = useState(0);
      const [selectedAddress, setSelectedAddress] = useState(null);
      const [option, setOption] = useState(false);
      const [selectedOption, setSelectedOption] = useState("");

      useEffect(() => {
        if (currentStep === 4) {
          moveToHome();
        }
      }, [currentStep]);
    
      // Function to navigate to the home screen after a delay
      const moveToHome = () => {
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      };
  return (
    <ScrollView style={styles.container}>
    {/* Step indicators */}
    <View style={styles.stepsContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          {index > 0 && <View style={styles.stepSeparator} />}
          <View style={[styles.stepCircle, index < currentStep && styles.completedStep]}>
            {index < currentStep ? (
              <Text style={styles.stepTextCompleted}>&#10003;</Text>
            ) : (
              <Text style={styles.stepText}>{index + 1}</Text>
            )}
          </View>
          <Text style={styles.stepTitle}>{step.title}</Text>
        </View>
      ))}
    </View>

    {currentStep === 0 && (
        <Address
          addresses={demoAddresses}
          selectedAddress={selectedAddress}
          onSelectAddress={setSelectedAddress}
          onNextStep={() => setCurrentStep(1)}
        />
      )}

{currentStep === 1 && (
        <Delivery
          onSelectOption={setOption}
          onNextStep={() => setCurrentStep(2)}
        />
      )}

{currentStep === 2 && (
        <Payment
          onSelectPaymentMethod={setSelectedOption}
          onNextStep={() => setCurrentStep(3)}
        />
      )}

{currentStep === 3 && selectedOption === "cash" && (
        <Order setCurrentStep={setCurrentStep} />
      )}

{currentStep === 4 && (
        <Thankyou />
      )}
    </ScrollView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    stepsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    stepItem: {
      alignItems: "center",
    },
    stepSeparator: {
      flex: 1,
      height: 2,
      backgroundColor: "green",
    },
    stepCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
    },
    completedStep: {
      backgroundColor: "green",
    },
    stepText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    stepTextCompleted: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    stepTitle: {
      textAlign: "center",
      marginTop: 8,
    },
  });