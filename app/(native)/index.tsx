import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { DATA } from '../../SampleData';
import { ProductData } from '../../src/types/types';
import HintItem from '../../src/components/common/HintItem/HintItem';

import {useResponsive} from '../../src/hooks/useResponsive';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SerphintProps {
  // Add any props you need
  currentHint: ProductData;
  setCurrentHint: (hint: ProductData) => void;
}



function Serphint(props: SerphintProps) {
    const insets = useSafeAreaInsets();
    const {height, width} = useResponsive();
    const ITEM_HEIGHT = height - insets.bottom;

    const { currentHint, setCurrentHint } = props;

    

  const onViewableItemsChanged = React.useCallback(({ viewableItems }: any) => {
    // Log the viewable items
    const item : ProductData = viewableItems[0].item;
    setCurrentHint(item);
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={DATA}
        renderItem={({ item }: { item: ProductData }) => (
          // Pass the entire item (ProductData) instead of just item.hint
          <HintItem item={item} />
        )}
        estimatedItemSize={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment='start'
        decelerationRate='fast'
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        onViewableItemsChanged={onViewableItemsChanged}
        
      />
    </View>
  );
}

export default Serphint;

const styles = StyleSheet.create({
        container: {
          flex: 1,
          width: '100%',
          backgroundColor: 'transparent',
        },
    
        listContent: {
          paddingBottom: 0, // No extra padding
        }

});