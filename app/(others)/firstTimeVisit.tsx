import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageTitle from '@/component/shared/PageTitle'
import { router, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, CloseCircle, TickCircle } from 'iconsax-react-nativejs'
import IconButton from '@/component/shared/IconButton'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import { useBookingStore } from '@/store/bookingStore'

const question = [
    {
        title: 'Yes',
        description: 'This is my first visit',
        label: true, // boolean now
    },
    {
        title: 'No',
        description: "I've visited before",
        label: false, // boolean now
    },
]

const FirstTimeVisit = () => {
    const { isFirstVisit, setSingleFirstVisit } = useBookingStore()
    const { vendor } = useLocalSearchParams()
    const vendorObj = JSON.parse(vendor)

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Back Button */}
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <IconButton onPress={() => router.back()}>
                        <ArrowLeft />
                    </IconButton>
                    <IconButton onPress={() => {}}>
                        <CloseCircle variant='Bulk' color='black' />
                    </IconButton>
                </View>

                {/* Page Title */}
                <PageTitle title={`Is this your first visit to ${vendorObj?.name}?`} />

                <View style={{marginTop: 10}}>
                    {question.map((quest, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSingleFirstVisit(quest.label)
                                router.push({
                                    pathname: '/(others)/orderSummery',
                                    params: { vendor: JSON.stringify(vendorObj) },
                                })
                            }}
                            style={{
                                paddingVertical: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View>
                                <Text style={typography.title}>{quest.title}</Text>
                                <Text style={typography.subtitle}>{quest.description}</Text>
                            </View>
                            {isFirstVisit === quest.label && (
                                <View style={styles.tickWrapper}>
                                    <TickCircle size={30} color={colors.primary} variant="Bulk" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default FirstTimeVisit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
        padding: 20,
    },
    tickWrapper: {
        marginLeft: 10,
    },
})
