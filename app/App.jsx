import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Feather';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Slash from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function App () {
    const [resultDisplayText, setResultDisplayText] = useState("");
    const [displayOperators, setDisplayOperators] = useState("");
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme); 

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf')
    });

    const chars = ['0' ,'1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < chars.length; i++) {
        if (displayOperators === `0${chars[i]}`) {
            setDisplayOperators('')
        }
    }

    if (!fontsLoaded) [
        console.log("Fonts loaded!")
    ]

    function clearDisplay() {
        setResultDisplayText("");
        setDisplayOperators("");
    }

    function deleteFromDisplay() {
        if (displayOperators.length > 1) {
            setDisplayOperators(displayOperators.slice(0, -1));
        } else {
            setDisplayOperators("");
        }
    }

    const calculateResult = () => {
        try
        {
            setResultDisplayText("=" + (eval(displayOperators).toString().includes(".") ? eval(displayOperators).toFixed(2) : eval(displayOperators)));
        } catch (error) {
            setResultDisplayText("Error");
        }
    }

    const displayOperator = () => { 

        return displayOperators.split('').map((char, index) => {
            switch (char) {
                case "/":
                case "*":
                case "-":
                case "+":
                    return (
                        <Text key={index} style={styles.independentOutputText}>
                            {char}
                        </Text>
                    );
                default:
                    return (
                        <Text key={index} style={styles.otherOutputText}>
                            {char}
                        </Text>
                    );
            }
        });
    }

    const calculateSin = () => {
        try
        {
            if (displayOperators.includes("deg")) {
                let radians = Math.round(parseInt(displayOperators) * -57.296);
                
                setResultDisplayText("=" + (Math.sin(radians).toFixed(2).toString().includes("00") ? Math.round(Math.sin(radians)) : Math.sin(radians).toFixed(2)));
            } else {
                setResultDisplayText("=" + Math.sin(displayOperators).toFixed(2));
            }
        } catch (error) {
            setResultDisplayText("Error");
        }
    }

    const appendE = () => {
        setDisplayOperators(displayOperators + "2.718");
    }

    const appendDeg = () => {
        setDisplayOperators(displayOperators + "deg");
    }

    const appendNum1 = () => {
        setDisplayOperators(displayOperators + "1");
    }

    const appendNum2 = () => {
        setDisplayOperators(displayOperators + "2");
    }

    const appendNum3 = () => {
        setDisplayOperators(displayOperators + "3");
    }

    const appendNum4 = () => {
        setDisplayOperators(displayOperators + "4");
    }

    const appendNum5 = () => {
        setDisplayOperators(displayOperators + "5");
    }

    const appendNum6 = () => {
        setDisplayOperators(displayOperators + "6");
    }

    const appendNum7 = () => {
        setDisplayOperators(displayOperators + "7");
    }

    const appendNum8 = () => {
        setDisplayOperators(displayOperators + "8");
    }

    const appendNum9 = () => {
        setDisplayOperators(displayOperators + "9");
    }

    const appendDiv = () => {
        setDisplayOperators(displayOperators + "/");
    }

    const appendMultiply = () => {
        setDisplayOperators(displayOperators + "*");
    }

    const appendAdd = () => {
        setDisplayOperators(displayOperators + "+");
    }

    const appendSubtract = () => {
        setDisplayOperators(displayOperators + "-");
    }

    const appendNumZero = () => {
        setDisplayOperators(displayOperators + "0");
    }

    const appendDecimal = () => {
        setDisplayOperators(displayOperators + ".");
    }

    const cleanResultText = () => {
        for (let i = 0; i < resultDisplayText.length; i++) {
            if (resultDisplayText.length > 3 && !resultDisplayText.includes(',')) {
                const formatNum = resultDisplayText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setResultDisplayText(formatNum);
            }
          }
        return resultDisplayText;
    }

    return (
    <View style={styles.calculatorContainer}>
      <View style={styles.displayContainer}>
        <View style={styles.outputsContainer}>
            <View style={styles.diplayOutputContainer}>
                {displayOperator()}
            </View>
            
            <Text style={styles.resultText}>
                {cleanResultText()}
            </Text>

        </View>
      </View>

    <View style={styles.scientificButtonsContainer}>
        <TouchableOpacity style={styles.scientificButtons} onPress={ appendE }>
            <Text style={styles.scientificButtonsText}>
                e
            </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.scientificButtons}>
            <Text style={styles.scientificButtonsText}>
                µ
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scientificButtons} onPress={calculateSin}>
            <Text style={styles.scientificButtonsText}>
                sin
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scientificButtons} onPress={ appendDeg }>
            <Text style={styles.scientificButtonsText}>
                deg
            </Text>
        </TouchableOpacity>
    </View>

    <View style={[styles.mediumBtnContainer, { marginBottom: height * 0.03 }]}>

        <TouchableOpacity style={[styles.mainButtons, styles.deleteButtonBg]} onPress={() => clearDisplay()}>
            <Text style={styles.deleteButtonText}>
                Ac
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mainButtons, styles.deleteButtonBg]} onPress={() => deleteFromDisplay()}>
            <Icon name="delete" size={width * 0.06} color={colorScheme === 'dark' ? '#A5A5A5' : '#858585'} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mainButtons, styles.calculateButtonsBg]} onPress={ appendDiv }>
            <Slash name="slash-forward" size={width * 0.09} color={colorScheme === 'dark' ? '#339DFF' : '#109DFF'} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mainButtons, styles.calculateButtonsBg]} onPress={ appendMultiply }>
            <Font6 name="asterisk" size={width * 0.06} color={colorScheme === 'dark' ? '#339DFF' : '#109DFF'} />
        </TouchableOpacity>

    </View>

    <View style={styles.mediumBtnContainer}>
        <TouchableOpacity style={styles.mainButtons} onPress={ appendNum7 }>
            <Text style={styles.mainButtonsText}>
                7
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButtons} onPress={ appendNum8 }>
            <Text style={styles.mainButtonsText}>
                8
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButtons} onPress={ appendNum9 }>
            <Text style={styles.mainButtonsText}>
                9
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mainButtons, styles.calculateButtonsBg]} onPress={ appendSubtract }>
            <Font6 name="minus" size={width * 0.06} color={colorScheme === 'dark' ? '#24A5FF' : '#109DFF'} />
        </TouchableOpacity>
    </View>

    <View style={styles.bottomContainer}>
        <View style={styles.bottomNumbers}>
            <View style={[styles.bottomBtnContainer, { marginBottom: height * 0.02 }]}>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum4 }>
                    <Text style={styles.mainButtonsText}>
                        4
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum5 }>
                    <Text style={styles.mainButtonsText}>
                        5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum6 }>
                    <Text style={styles.mainButtonsText}>
                        6
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.bottomBtnContainer, { marginBottom: height * 0.02 }]}>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum1 }>
                    <Text style={styles.mainButtonsText}>
                        1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum2 }>
                    <Text style={styles.mainButtonsText}>
                        2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButtons} onPress={ appendNum3 }>
                    <Text style={styles.mainButtonsText}>
                        3
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBtnContainer}>
                <TouchableOpacity style={[styles.mainButtons, {width: width * 0.395, borderRadius: width * 0.04}]} onPress={ appendNumZero }>
                    <Text style={styles.mainButtonsText}>
                        0
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButtons} onPress={ appendDecimal }>
                    <Text style={[styles.mainButtonsText, styles.point]}>
                        .
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.bottomOperators}>
            <TouchableOpacity style={[styles.mainButtons, styles.calculateButtonsBg, { height: height * 0.12, marginBottom: height * 0.03, borderRadius: width * 0.03, marginTop: height * 0.01 }]} onPress={ appendAdd }>
                <Font6 name="plus" size={width * 0.06} color={colorScheme === 'dark' ? '#339DFF' : '#109DFF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mainButtons, styles.equalSignBg, { height: height * 0.12, borderRadius: width * 0.03 }]} onPress={ calculateResult }>
                <Font6 name="equals" size={width * 0.06} color={'#B2DAFF'} />
            </TouchableOpacity>
        </View>
    </View>

    </View>
  )
}
const getStyles = (theme) => {
return StyleSheet.create({
    calculatorContainer: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#17181A' : '#F7F8FB'
    },
    displayContainer: {
        height: height * 0.40,
        justifyContent: 'center'
    },
    mediumBtnContainer: {
        height: height * 0.08,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: height * 0.02,
        gap: width * 0.05,
    },
    bottomOperators: {
        alignItems: 'flex-start',
    },
    bottomNumbers: {
        width: width * 0.75,
        height: height * 0.28
    },
    bottomOperators: {
        width: width * 0.25,
        height: height * 0.28
    },
    bottomBtnContainer: {
        height: height * 0.08,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: width * 0.05,
        paddingRight: width * 0.05
    },
    bottomContainer: {
        flex: 0.55,
        flexDirection: 'row',
    },
    mainButtonsText: {
        color: theme === 'dark' ? '#29A8FF' : '#38B9FF',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.09
    },
    mainButtons: {
        backgroundColor: theme === 'dark' ? '#303136' : '#FFFFFF',
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scientificButtonsContainer: {
        height: height * 0.05,
        justifyContent: 'center',
        gap: width * 0.05,
        marginBottom: height * 0.02,
        flexDirection: 'row'
    },
    scientificButtons: {
        backgroundColor: theme === 'dark' ? '#303136' : '#FFFFFF',
        height: height * 0.05,
        width: width * 0.17,
        borderRadius: width * 0.06,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scientificButtonsText: {
        color: theme === 'dark' ? '#29A8FF' : '#7CC9FF',
        fontFamily: 'Poppins-Regular',
        fontSize: width * 0.05
    },
    calculateButtonsBg: {
        backgroundColor: theme === 'dark' ? '#005DB2' : '#ADE2FF'
    },
    equalSignBg: {
        backgroundColor: theme === 'dark' ? '#1991FF' : '#19ACFF'
    },
    point: {
        color: theme === 'dark' ? '#109DFF' : '#38B9FF'
    },
    deleteButtonText: {
        color: theme === 'dark' ? '#A5A5A5' : '#858585',
        fontFamily: 'Poppins-Regular',
        fontSize: width * 0.06
    },
    deleteButtonBg: {
        backgroundColor: theme === 'dark' ? '#616161' : '#FFFFFF'
    },
    outputsContainer: {
        paddingRight: width * 0.05,
    },
    resultText: {
        color: theme === 'dark' ? '#FFFFFF' : '#424242',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.13,
        textAlign: 'right'
    },
    independentOutputText: {
        fontSize: width * 0.06,
        color: '#109DFF',
        fontFamily: 'Poppins-Regular'
    },
    otherOutputText: {
        fontSize: width * 0.06,
        color: '#818181',
        fontFamily: 'Poppins-Regular'
    },
    diplayOutputContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    }
})
};