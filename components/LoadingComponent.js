import React from 'react'
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native'

const styles = StyleSheet.create({
    loadingView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    loadingText: {
        color: '#512DA8',
        fontSize: 14,
        fontWeight: "bold"
    }
})

 function Loading() {
    return <View style={styles.loadingView}>

            <Text style={styles.loadingText}>Loading . . .</Text>

    </View>
}

export default Loading