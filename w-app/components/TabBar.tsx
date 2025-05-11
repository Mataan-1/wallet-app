import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { colors } from '@/constants/colors';

const { width } = Dimensions.get('window');

const TabBar = ({ state, descriptors, navigation }) => {
  const indicatorPosition = useSharedValue(0);
  const tabWidth = width / state.routes.length;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  React.useEffect(() => {
    // Animate indicator to current tab position
    indicatorPosition.value = withTiming(state.index * tabWidth, {
      duration: 250,
    });
  }, [state.index, tabWidth]);

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View style={[styles.indicator, { width: tabWidth }, indicatorStyle]} />
      
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {options.tabBarIcon && 
              options.tabBarIcon({ 
                color: isFocused ? colors.primary[700] : colors.gray[400], 
                size: 24,
                focused: isFocused
              })
            }
            <Text 
              style={[
                styles.tabLabel, 
                { color: isFocused ? colors.primary[700] : colors.gray[400] }
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    backgroundColor: colors.primary[700],
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabBar;